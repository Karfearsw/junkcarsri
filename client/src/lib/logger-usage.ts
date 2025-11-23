import { logger } from "@/lib/logger";

// usage examples
logger.info("Application started", { version: "1.0.0", env: import.meta.env.MODE });

const end = logger.time("fetch quote");
// simulate async work
setTimeout(() => {
  end();
}, 200);

logger.warn("Low memory", { memory: performance.memory?.usedJSHeapSize });
logger.error("Submission failed", { userId: 123, retry: true });

export { logger };