import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/Enquiry", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);

      // First save locally
      const contact = await storage.createContact(contactData);

      // Then forward to Ramestta API
      const ramesttaResponse = await fetch(
        "https://api.ramestta.com/api/Enquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify([
            {
              Id: 1,
              Name: contactData.name,
              Email: contactData.email,
              Subject: contactData.subject,
              Enq_Message: contactData.message,
              Company_Name: "Ramaera",
              CreatedDate: new Date().toISOString(),
            },
          ]),
        },
      );
      const responseData = await ramesttaResponse.json();
      console.log("Ramestta API Response:", JSON.stringify(responseData));

      if (!ramesttaResponse.ok) {
        throw new Error(`Failed to send to Ramestta API: ${JSON.stringify(responseData)}`);
      }

      res.status(201).json({ message: "Message sent successfully", contact });
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