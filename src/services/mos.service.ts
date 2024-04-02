import Prom from "prom-client";

export const mosPaymentMetrics = new Prom.Histogram({
  name: "payment_metrics",
  help: "payment data per store per retailer",
  labelNames: ["retailer", "store"],
  buckets: [5, 20, 50, 100],
});
