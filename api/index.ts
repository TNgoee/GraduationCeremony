import "dotenv/config";
import express from 'express';
import { registerRoutes } from '../server/routes';
import { createServer } from 'http';
import { connectDB } from '../server/db';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let initialized = false;

export default async function handler(req: any, res: any) {
    if (!initialized) {
        // Initialize MongoDB connection
        try {
            await connectDB();
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            return res.status(500).json({ error: "Database connection failed" });
        }
        
        const server = createServer(app);
        await registerRoutes(server, app);
        initialized = true;
    }
    return app(req, res);
}
