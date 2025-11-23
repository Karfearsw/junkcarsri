import { createWriteStream, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { format } from "date-fns";
import { hostname } from "os";

export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  source?: string;
  pid: number;
  hostname: string;
  duration?: number; // ms
  memory?: number; // RSS in bytes
}

export interface LoggerOptions {
  level?: LogLevel;
  console?: boolean;
  file?: { dir: string; maxSize?: number; maxFiles?: number };
  remote?: { url: string; headers?: Record<string, string> };
  sanitize?: (key: string, value: unknown) => unknown;
}

const LEVELS: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

class Logger {
  private level: LogLevel;
  private console: boolean;
  private file?: { dir: string; maxSize: number; maxFiles: number };
  private remote?: { url: string; headers: Record<string, string> };
  private sanitize?: (key: string, value: unknown) => unknown;
  private fileStream?: ReturnType<typeof createWriteStream>;
  private bytesWritten = 0;

  constructor(opts: LoggerOptions = {}) {
    this.level = opts.level ?? "INFO";
    this.console = opts.console ?? true;
    this.file = opts.file ? { maxSize: 10 * 1024 * 1024, maxFiles: 5, ...opts.file } : undefined;
    this.remote = opts.remote ? { headers: {}, ...opts.remote } : undefined;
    this.sanitize = opts.sanitize;
    if (this.file) {
      mkdirSync(this.file.dir, { recursive: true });
      this.rotate();
    }
  }

  private rotate() {
    if (!this.file) return;
    const date = format(new Date(), "yyyy-MM-dd");
    const filePath = join(this.file.dir, `app-${date}.log`);
    this.fileStream = createWriteStream(filePath, { flags: "a" });
    this.bytesWritten = 0;
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVELS[level] >= LEVELS[this.level];
  }

  private sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
    if (!this.sanitize) return obj;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = this.sanitize(k, v);
    }
    return out;
  }

  private formatEntry(entry: LogEntry): string {
    const ctx = entry.context ? ` ${JSON.stringify(this.sanitizeObject(entry.context))}` : "";
    const src = entry.source ? ` [${entry.source}]` : "";
    const perf = entry.duration || entry.memory ? ` (${entry.duration ?? 0}ms ${entry.memory ?? 0}b)` : "";
    return `${entry.timestamp} [${entry.level}]${src} ${entry.message}${ctx}${perf}`;
  }

  private write(entry: LogEntry) {
    if (!this.shouldLog(entry.level)) return;
    const line = this.formatEntry(entry) + "\n";
    if (this.console) console.log(line.trim());
    if (this.fileStream) {
      this.fileStream.write(line);
      this.bytesWritten += Buffer.byteLength(line);
      if (this.bytesWritten > (this.file?.maxSize ?? Infinity)) this.rotate();
    }
    if (this.remote) {
      fetch(this.remote.url, {
        method: "POST",
        headers: { "content-type": "application/json", ...this.remote.headers },
        body: JSON.stringify(entry),
      }).catch(() => {/* ignore */});
    }
  }

  private build(level: LogLevel, message: string, context?: Record<string, unknown>, source?: string, start?: number) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: context ? this.sanitizeObject(context) : undefined,
      source: source ?? new Error().stack?.split("\n")[3]?.trim(),
      pid: process.pid,
      hostname: hostname(),
    };
    if (start) {
      entry.duration = Date.now() - start;
      entry.memory = process.memoryUsage().rss;
    }
    this.write(entry);
  }

  debug(msg: string, ctx?: Record<string, unknown>, src?: string) { this.build("DEBUG", msg, ctx, src); }
  info(msg: string, ctx?: Record<string, unknown>, src?: string) { this.build("INFO", msg, ctx, src); }
  warn(msg: string, ctx?: Record<string, unknown>, src?: string) { this.build("WARN", msg, ctx, src); }
  error(msg: string, ctx?: Record<string, unknown>, src?: string) { this.build("ERROR", msg, ctx, src); }

  time(label: string) {
    const start = Date.now();
    return () => this.build("INFO", `${label} completed`, undefined, undefined, start);
  }
}

export const logger = new Logger({
  level: (process.env.LOG_LEVEL as LogLevel) ?? "INFO",
  console: true,
  file: process.env.LOG_DIR ? { dir: process.env.LOG_DIR } : undefined,
  sanitize: (k, v) => {
    const sensitive = ["password", "token", "secret", "apikey", "authorization"];
    if (sensitive.includes(k.toLowerCase())) return "[REDACTED]";
    return v;
  },
});

export default logger;