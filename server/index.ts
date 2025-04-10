import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Try different ports in case the default port is in use
  const tryPort = (port: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const serverInstance = server.listen({
        port,
        host: "0.0.0.0",
      }, () => {
        log(`serving on port ${port}`);
        resolve();
      });
      
      serverInstance.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          log(`Port ${port} is in use, trying ${port + 1}`);
          serverInstance.close();
          tryPort(port + 1).then(resolve).catch(reject);
        } else {
          reject(err);
        }
      });
    });
  };
  
  // Start with port 5000 as required by Replit workflow
  tryPort(5000).catch(err => {
    log(`Failed to bind to any port: ${err.message}`);
    process.exit(1);
  });
})();
