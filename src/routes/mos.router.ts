import express from "express";
import { getMosMetrics, updateMosMetricsHist, updateMosMetricsGauge } from "../controllers";

const router = express.Router();

router.get('/', getMosMetrics);
router.post('/gauge', updateMosMetricsGauge);
router.post('/hist', updateMosMetricsHist);

export default router;
