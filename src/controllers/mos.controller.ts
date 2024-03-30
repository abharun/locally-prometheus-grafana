import { Request, Response } from "express";
import * as promClient from "prom-client";
import { mosMetricsGauge, mosMetricsHist } from "../services/mos.service";

export const getMosMetrics = async (_req: Request, res: Response) => {
  res.set("Content-Type", promClient.register.contentType);
  const metrics = await promClient.register.metrics();
  res.status(200).send(metrics);
};

export const updateMosMetricsGauge = async (_req: Request, res: Response) => {
  const label = Math.random() > 0.5 ? "Red" : "Blue";
  mosMetricsGauge.inc({
    metrics_color: label,
  });
  res.status(200).send({ Color: label });
};

export const updateMosMetricsHist = async (req: Request, res: Response) => {
    const { value, user, location } = req.query;
    const val = value ? parseInt(value.toString()) : 0;
    const userStr = user ? user.toString() : '';
    const locationStr = location ? location.toString() : '';
    mosMetricsHist.labels(userStr, locationStr).observe(val);

    res.status(200).send({
      value: val,
      user: userStr,
      location: locationStr
    })
};
