import exporess from "express";
import requireAdmin from "../middleware/requireAdmin.js";
import getAllDeletegates from "../controllers/DelegatesController.js";

const router = exporess.Router();



router.get("/getAll", requireAdmin , getAllDeletegates)


export default router;