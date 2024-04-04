# Metric Data with Prometheus and Grafana

## Define Metrics Data
Prometheus provides several metrics types: `Counter`, `Gauge`, `Histogram`, `Summary`.

I'll work with `prom-client` node module to deal with metrics.

```typescript
import * as promClient from "prom-client";
```

## Define Metrics
```typescript
const mosPaymentMetrics = new promClient.Histogram({
  name: "payment_metrics",
  help: "payment data per store per retailer",
  labelNames: ["store", "retailer"],
  buckets: [5, 10, 50, 100]
});
```

## Capture metrics value
```typescript
mosPaymentMetrics.observe({
    store: store,
    retailer: retailer,
    },
    price
);
```

## Monitoring metrics with Prometheus queries

### Some fields and functions for histogram metrics
`payment_metrics_bucket`: Number of captured values per bucket. You can select the bucket by paraming: {le='20'} or {le='+Inf'}

`payment_metrics_sum`: Total sum of captured values.

`payment_metrics_count`: Total count of captured values.

### Some queries to get target values
get sum per stores: `sum(payment_metrics_sum) by (store)`

get counts per stores: `count(payment_metrics_count) by (store)`

increase rate per sec within interval: `rate(payment_metrics_sum[#interval])`

total sum within the latest interval: `rate(payment_metrics_sum[#interval]) * (#interval as second)`

total count within the latest interval: `rate(payment_metrics_count[#interval]) * (#interval as second)`

average value for captured values within the latest interval: `rate(payment_metrics_sum[#interval]) / rate(payment_metrics_count[#interval])`

total sum within the latest interval per store: `sum by (store) (rate(payment_metrics_sum[#interval]) * (#interval as second))`

total count within the latest interval per store: `count by (store) (rate(payment_metrics_count[#interval]) * (#interval as second))`
