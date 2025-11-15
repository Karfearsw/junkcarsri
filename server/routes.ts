import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  const leadSchema = z.object({
    year: z.string().min(1),
    make: z.string().min(1),
    model: z.string().min(1),
    condition: z.string().min(1),
    name: z.string().min(2),
    phone: z.string().min(10),
    email: z.string().email().optional().or(z.literal("")),
    estimatedPrice: z.number(),
  });

  const storageDir = path.join(process.cwd(), "server", "storage");
  const csvPath = path.join(storageDir, "leads.csv");

  app.post("/api/lead", async (req, res) => {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const payload = parsed.data;
    const submittedAt = new Date().toISOString();
    const row = [
      payload.name,
      payload.email ?? "",
      payload.phone,
      payload.year,
      payload.make,
      payload.model,
      payload.condition,
      payload.estimatedPrice.toString(),
      submittedAt,
    ].join(",") + "\n";

    await fs.mkdir(storageDir, { recursive: true });
    try {
      await fs.access(csvPath);
    } catch {
      const header = "name,email,phone,year,make,model,condition,estimatedPrice,submittedAt\n";
      await fs.appendFile(csvPath, header);
    }
    await fs.appendFile(csvPath, row);

    return res.status(201).json({ receivedAt: submittedAt });
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);

  return httpServer;
}
