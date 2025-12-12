import express from "express";
import upload from "../middleware/upload.js";
import {
  acceptRegistration,
  createRegistration,
  getAllRegistrations,
  rejectRegistration,
} from "../controllers/registrationController.js";
import requireAdmin from "../middleware/requireAdmin.js";

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

router.put('/accept/:id', requireAdmin, acceptRegistration);
router.put('/reject/:id', requireAdmin, rejectRegistration);
router.get("/", requireAdmin, getAllRegistrations);

export default router;
