// apps/backend-repo/functions/src/index.ts
import { onRequest } from 'firebase-functions/https';
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const userRoutes = require('../../dist/apps/backend-repo/routes/userRoutes.js').default;

const app = express();

app.get('/health-check', (_, res) => {
    res.json({ status: 'ok' });
});

// Use user routes
app.use('/', userRoutes);

// Export as Firebase function
export const api = onRequest(app);