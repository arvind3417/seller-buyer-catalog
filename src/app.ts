import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { httpResponse } from "./api/v1/helpers";
import { authRouter } from "./api/v1/routes/authRoutes";
import { routeNotFound } from "./api/v1/middleware/routeNotFound";
import { errorHandler } from "./api/v1/middleware/errorHandler";

import { PORT, BASEURL } from "./config/constants";


import { connectDB } from "./config/db";
import { grantAdminAccessrouter } from "./api/v1/routes/grant_Admin_Access";
import { sellerRouter } from "./api/v1/routes/sellerRoutes";
import { buyerRouter } from "./api/v1/routes/BuyerRoutes";
import swaggerDocs from "./config/swagger/swagger";

// Use express app 
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Routes

app.use(`${BASEURL}/auth`, authRouter); 
app.use(`${BASEURL}/buyer`, buyerRouter);
app.use(`${BASEURL}/seller`, sellerRouter);

swaggerDocs(app)


/**
 * @swagger
 * /ok:
 *   get:
 *     tags:
 *       - Healthcheck
 *     summary: Health Check
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.get("/ok", (_req, res) =>
  res.status(200).send(httpResponse(true, "OK", {}))
);

// Custom middleware
app.use(routeNotFound);
app.use(errorHandler);

const port = process.env.PORT || PORT;

try {
  // connect to database
  if (!process.env.CONNECTIONSTR)
    throw new Error("No connection string found in .env file");
  connectDB(process.env.CONNECTIONSTR);
  // Server setup
  app.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}/`);
    
  });
} catch (error) {
  console.error(error);
}
