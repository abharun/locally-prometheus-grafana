import express from "express";
import { getMosMetrics, updateMosMetricsHist, updateMosMetricsGauge, updateMosMetricsSummary } from "../controllers";

const router = express.Router();

router.get('/', getMosMetrics);
router.post('/gauge', updateMosMetricsGauge);
router.post('/hist', updateMosMetricsHist);
router.post('/summary', updateMosMetricsSummary);

export default router;
