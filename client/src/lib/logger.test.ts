import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { existsSync, unlinkSync, readdirSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { logger, type LogLevel } from "../server/logger";

const logDir = join(tmpdir(), "junkcarri-logs-test");

function cleanLogs() {
  if (existsSync(logDir)) {
    readdirSync(logDir).forEach((f) => unlinkSync(join(logDir, f)));
  }
}

describe("Logger", () => {
  beforeEach(() => cleanLogs());
  afterEach(() => cleanLogs());

  it("logs to console by default", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    logger.info("test message");
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("test message"));
    spy.mockRestore();
  });

  it("respects level filter", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const custom = new (logger.constructor as any)({ level: "WARN" });
    custom.debug("hidden");
    custom.warn("visible");
    expect(spy).not.toHaveBeenCalledWith(expect.stringContaining("hidden"));
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("visible"));
    spy.mockRestore();
  });

  it("writes to file when configured", () => {
    const custom = new (logger.constructor as any)({ file: { dir: logDir } });
    custom.info("file test");
    const files = readdirSync(logDir);
    expect(files.length).toBe(1);
    expect(files[0]).toMatch(/app-.*\.log/);
  });

  it("sanitizes sensitive keys", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    logger.info("login", { username: "bob", password: "secret123", apiKey: "key" });
    const output = spy.mock.calls[0][0];
    expect(output).toContain("bob");
    expect(output).toContain("[REDACTED]");
    expect(output).not.toContain("secret123");
    expect(output).not.toContain("key");
    spy.mockRestore();
  });

  it("measures time and memory", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    const end = logger.time("task");
    // simulate work
    const arr = Array.from({ length: 1e5 }, (_, i) => i);
    arr.sort((a, b) => b - a);
    end();
    const output = spy.mock.calls[0][0];
    expect(output).toMatch(/task completed/);
    expect(output).toMatch(/\d+ms/);
    expect(output).toMatch(/\d+b/);
    spy.mockRestore();
  });
});