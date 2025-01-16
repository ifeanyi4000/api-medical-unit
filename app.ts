require('dotenv').config();
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.routes";
import consultRouter from "./routes/consultation.routes";
import inventoryRouter from "./routes/inventory.routes";
import recordRouter from "./routes/healthrecords.routes";
import dRouter from "./routes/dashboardAnalysisStats";
import previousConsultRouter from "./routes/p.consultation.routes";


const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "https://medical-unit-web.onrender.com",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  }
});

app.use(cors({
  origin: process.env.FRONTEND_URL || "https://medical-unit-web.onrender.com",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes 
app.use("/api/v1",
  userRouter,
  consultRouter,
  inventoryRouter,
  recordRouter,
  dRouter,
  previousConsultRouter
);

// testing api
app.get("/decentralized-x", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "api is working"
  });
});

// unknown routes 
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found!`) as any;
  err.statusCode = 404;
  next(err);
});


// use errorhandler
app.use(ErrorMiddleware);

export { app, server, io };