import express from "express";
import { getRegistrationData } from "../controllers/registrationDataController.js";

const router = express.Router();

router.get("/registration-data", getRegistrationData);

export default router;
