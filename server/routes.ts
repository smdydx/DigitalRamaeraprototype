import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactDataArray = req.body;

      if (!Array.isArray(contactDataArray)) {
        return res.status(400).json({ message: "Invalid payload format. Expected an array." });
      }

      const contacts = [];
      for (const contactData of contactDataArray) {
        const validatedContactData = insertContactSchema.parse(contactData);
        const contact = await Contact.create(validatedContactData);
        contacts.push(contact);
      }

      res.status(201).json({ message: "Messages sent successfully", contacts });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to send messages" });
      }
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.createSubscriber(subscriberData);
      res.status(201).json({ message: "Subscribed successfully", subscriber });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to subscribe" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}