import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

async function startServer() {
  registerRoutes(app);
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("🔥 Error:", err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  const server = createServer(app);
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Use the port provided by the host (Render) and bind to 0.0.0.0 (all interfaces).
  const PORT = parseInt(process.env.PORT || "5000", 10);
  const HOST = process.env.HOST || "0.0.0.0";

  // Start listening on the correct host/port
  server.listen(PORT, HOST, () => {
    // For external URLs render will route via the assigned hostname, but logs should show the port and host we listen on.
    log(`✅ MindEase Campus listening on http://${HOST === "0.0.0.0" ? "0.0.0.0" : HOST}:${PORT}`);
  });

  // Optional: better error logging if listen fails
  server.on("error", (err: any) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
}

startServer();
