import dotenv from 'dotenv';
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import path from 'path';
import chat from './routes/chat';

// Environment setup
const environment = process.env.NODE_ENV || 'development';
const envPath = path.resolve(process.cwd(), `.env.${environment}`);
console.log(`Using environment: ${environment}`);
console.log(`Using environment file: ${envPath}`);
dotenv.config({ path: envPath });

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://leonaidoo.com',
  'https://deccanchargers.de',
  'https://fkgpt.dev',
  'https://onemunich365.de',
  'https://iquiz.info',
  'https://takeaway24.info',
  'https://thinkeuros.de'
];

// Initialize Hono app
const app = new Hono();

// CORS setup with dynamic origin handling
app.use("/*", cors({
  origin: (origin) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return origin; // Allow request if the origin is in the list
    }
    return ""; // Block request if origin is not allowed
  },
  credentials: true
}));

// Mount routes
app.route('/chat', chat);

// Start server
const port = process.env.PORT || 3002;
serve({ 
  fetch: app.fetch, 
  port: parseInt(port.toString()) 
});

console.log(`Server running in ${environment} mode on port ${port}`);