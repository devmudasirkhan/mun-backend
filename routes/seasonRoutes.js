import express from "express";
import {
  createSeason,
  getAllSeasons,
  updateSeason,
  getCurrentSeason,
  deleteSeason,
} from "../controllers/seasonController.js";

const router = express.Router();

router.post("/", createSeason);   
router.get("/", getAllSeasons);   
router.get("/current", getCurrentSeason);
router.put("/seasons/:id", updateSeason);
router.delete("/seasons/:id", deleteSeason); 

export default router;
