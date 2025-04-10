import { onRequest } from "firebase-functions/v2/https";
import express from "express";

const userRoutes = require("../../dist/routes/userRoutes.js").default;

const app = express();

app.use("/", userRoutes);

export const api = onRequest(app);