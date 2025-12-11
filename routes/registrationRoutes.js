import express from "express";
import upload from "../middleware/upload.js";
import {
  createRegistration,
  getAllRegistrations,
} from "../controllers/registrationController.js";

const router = express.Router();

// upload.fields → allow 3 files
router.post(
  "/",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "id_card", maxCount: 1 },
    { name: "payment_proof", maxCount: 1 },
  ]),
  createRegistration
);

router.get("/", getAllRegistrations);

export default router;
