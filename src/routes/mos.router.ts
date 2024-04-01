import express from "express";
import { getMosMetrics, updateMosMetricsHist, updateMosMetricsGauge, updateMosMetricsSummary, updateMosMetricsPayment } from "../controllers";

const router = express.Router();

router.get('/', getMosMetrics);
router.post('/gauge', updateMosMetricsGauge);
router.post('/hist', updateMosMetricsHist);
router.post('/summary', updateMosMetricsSummary);
router.post('/payment', updateMosMetricsPayment);

export default router;
