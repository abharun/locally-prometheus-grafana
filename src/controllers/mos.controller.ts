import { Request, Response } from "express";
import * as promClient from "prom-client";
import { mosPaymentMetrics } from "../services/mos.service";

export const getMosMetrics = async (_req: Request, res: Response) => {
  res.set("Content-Type", promClient.register.contentType);
  const metrics = await promClient.register.metrics();
  res.status(200).send(metrics);
};

export const updateMosMetrics = async (req: Request, res: Response) => {
  const { retailer, store, price } = req.body;

  mosPaymentMetrics.observe({ store: store, retailer: retailer }, price);

  res.status(200).send({
    retailer: retailer,
    store: store,
    totalPrice: price,
  });
};
