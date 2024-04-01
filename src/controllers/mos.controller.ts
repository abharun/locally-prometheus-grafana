import { Request, Response } from "express";
import * as promClient from "prom-client";
import {
  mosMetricsGauge,
  mosMetricsHist,
  mosMetricsSummary,
} from "../services/mos.service";

export const getMosMetrics = async (_req: Request, res: Response) => {
  res.set("Content-Type", promClient.register.contentType);
  const metrics = await promClient.register.metrics();
  res.status(200).send(metrics);
};

export const updateMosMetricsGauge = async (req: Request, res: Response) => {
  const { med } = req.query;
  const medVal = med ? parseInt(med.toString()) : 0;

  const label = Math.random() > 0.5 ? "Red" : "Blue";
  if (medVal === 0) {
    mosMetricsGauge.inc({
      metrics_color: label,
    });
  } else {
    mosMetricsGauge.dec({
      metrics_color: label,
    });
  }
  res.status(200).send({ Color: label });
};

export const updateMosMetricsHist = async (req: Request, res: Response) => {
  const { value, user, location } = req.query;
  const val = value ? parseFloat(value.toString()) : 0;
  const userStr = user ? user.toString() : "";
  const locationStr = location ? location.toString() : "";
  mosMetricsHist.observe({ user: userStr, location: locationStr }, val);

  res.status(200).send({
    value: val,
    user: userStr,
    location: locationStr,
  });
};

export const updateMosMetricsSummary = async (req: Request, res: Response) => {
  const { value, user, location } = req.query;
  const val = value ? parseFloat(value.toString()) : 0;
  const userStr = user ? user.toString() : "";
  const locationStr = location ? location.toString() : "";
  mosMetricsSummary.observe({ user: userStr, location: locationStr }, val);

  res.status(200).send({
    value: val,
    user: userStr,
    location: locationStr,
  });
};
