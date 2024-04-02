import express from "express";
import { getMosMetrics, updateMosMetrics } from "../controllers";

const router = express.Router();

router.get('/', getMosMetrics);
router.post('/', updateMosMetrics);

export default router;
