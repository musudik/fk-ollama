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

const app = new Hono();

// CORS setup
app.use("/*", cors({
  origin: environment === 'production' ? "http://207.180.235.87:5173" : "http://localhost:5173",
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