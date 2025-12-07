import "dotenv/config";
import express from 'express';
import { registerRoutes } from '../server/routes.js';
import { createServer } from 'http';
import { connectDB } from '../server/db.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let initialized = false;

export default async function handler(req: any, res: any) {
    if (!initialized) {
        // Initialize MongoDB connection
        try {
            if (!process.env.MONGODB_URI) {
                console.error("❌ MONGODB_URI environment variable is not set!");
                return res.status(500).json({
                    error: "Database configuration error",
                    message: "MONGODB_URI is not configured. Please set it in Vercel environment variables."
                });
            }
            await connectDB();
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return res.status(500).json({
                error: "Database connection failed",
                message: errorMessage
            });
        }

        const server = createServer(app);
        await registerRoutes(server, app);
        initialized = true;
    }
    return app(req, res);
}
