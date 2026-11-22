import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// Các thành viên khác sẽ thêm route tại đây:
// app.use("/api/public", publicRoutes);
// app.use("/api/houses", houseRoutes);
// app.use("/api/rooms", roomRoutes);
// app.use("/api/contracts", contractRoutes);
// app.use("/api/invoices", invoiceRoutes);
// app.use("/api/maintenances", maintenanceRoutes);
// app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));