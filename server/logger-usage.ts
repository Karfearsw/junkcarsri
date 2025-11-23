import { logger } from "./logger";

// example server usage
logger.info("Server starting", { port: process.env.PORT ?? 5000 });

const end = logger.time("db-connect");
// simulate DB connection
setTimeout(() => {
  end();
}, 150);

logger.warn("High CPU", { load: 2.3 });
logger.error("Uncaught exception", { err: "TypeError" });

export { logger };