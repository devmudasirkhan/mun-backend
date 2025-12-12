import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import registrationDataRoutes from "./routes/registrationDataRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import seasonRoutes from "./routes/seasonRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import delegateRoutes from "./routes/delegateRoutes.js";


dotenv.config();
const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  exposedHeaders: ['Content-Length', 'Content-Type'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/", registrationDataRoutes);
app.use("/api/delegates", delegateRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/seasons", seasonRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

app.get("/", (req, res) => {
  res.send("API working!");
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running...")
);