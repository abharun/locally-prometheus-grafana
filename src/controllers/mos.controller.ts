import { Request, Response } from "express";
import * as promClient from "prom-client";
import {
  mosMetricsGauge,
  mosMetricsHist,
  mosMetricsPayments,
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
  mosMetricsSummary.observe(
    {
      user: userStr,
      location: locationStr,
    },
    val
  );

  res.status(200).send({
    value: val,
    user: userStr,
    location: locationStr,
  });
};

/*

Prometheus Query for:
- Calculating payment avg for last 5 minutes
```promQuery
rate(payment_value_sum[5m]) / rate(payment_value_count[5m])
```
- Calculating payment counts for last 5 minutes
```promQuery
rate(payment_value_count[5m]) * 5 * 60
```

*/
export const updateMosMetricsPayment = async (req: Request, res: Response) => {
  const { store, value } = req.query;
  const payValue = value ? parseFloat(value.toString()) : 0;
  const storeName = store ? store.toString() : "";
  mosMetricsPayments.observe(
    {
      Store: storeName,
    },
    payValue
  );
  res.status(200).send(
    {
      Store: storeName,
      Value: payValue,
    }
  );
};
