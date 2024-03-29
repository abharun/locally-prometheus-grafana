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

export const updateMosMetricsHist = async (_req: Request, res: Response) => {
    const value = Math.random()
    const label = value < 0.3 ? "Small" : (value < 0.7 ? "Medium" : "Big" )
    mosMetricsHist.inc({
        metrics_size: label
    })
    res.status(200).send({ Size: label})
};
