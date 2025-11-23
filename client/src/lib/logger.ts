export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface LogContext {
  [key: string]: unknown;
}

export interface LoggerOptions {
  level?: LogLevel;
}

const LEVELS: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

function sanitize(obj: unknown): unknown {
  if (typeof obj !== "object" || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(sanitize);
  const copy = { ...obj } as Record<string, unknown>;
  for (const key of Object.keys(copy)) {
    const lower = key.toLowerCase();
    if (lower.includes("password") || lower.includes("secret") || lower.includes("apikey") || lower.includes("token")) {
      copy[key] = "[REDACTED]";
    } else {
      copy[key] = sanitize(copy[key]);
    }
  }
  return copy;
}

function format(level: LogLevel, message: string, context?: LogContext): string {
  const ts = new Date().toISOString();
  const sanitized = context ? sanitize(context) : undefined;
  const meta = sanitized ? ` ${JSON.stringify(sanitized)}` : "";
  return `${ts} [${level}] ${message}${meta}`;
}

export class Logger {
  private level: LogLevel;

  constructor(options: LoggerOptions = {}) {
    this.level = options.level || "INFO";
  }

  private shouldLog(level: LogLevel): boolean {
    return LEVELS[level] >= LEVELS[this.level];
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.shouldLog(level)) return;
    const formatted = format(level, message, context);
    console.log(formatted);
  }

  debug(message: string, context?: LogContext): void {
    this.log("DEBUG", message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log("INFO", message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log("WARN", message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log("ERROR", message, context);
  }

  time(label: string): () => void {
    const start = performance.now();
    const startMem = (performance as any).memory?.usedJSHeapSize || 0;
    this.info(`${label} started`);
    return () => {
      const duration = Math.round(performance.now() - start);
      const endMem = (performance as any).memory?.usedJSHeapSize || 0;
      const delta = endMem - startMem;
      this.info(`${label} completed`, { duration: `${duration}ms`, memoryDelta: `${delta}b` });
    };
  }
}

export const logger = new Logger();