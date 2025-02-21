import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/ormconfig";
import authRoutes from "./routes/authRoutes";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();
const app = express();
const port = process.env.PORT || 6004;

const allowedOrigins = ["https://formflow.up.railway.app"];

const corsOptions = {
    origin: (origin: string | undefined, callback: Function) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header("Access-Control-Allow-Origin", "https://formflow.up.railway.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.status(200).json({});
        return;
    }
    next();
});

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/api/health", (_req: Request, res: Response): void => {
    res.json({ status: "ok", message: "Server is running" });
});

AppDataSource.initialize()
    .then(() => {
        const httpServer = createServer(app);
        const io = new SocketIOServer(httpServer, { cors: { origin: "*" } });
        io.on("connection", socket => {
            console.log("Socket connected:", socket.id);
        });
        httpServer.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch(error => console.log("TypeORM connection error: ", error));
