import Prom from "prom-client";

export const mosMetricsGauge = new Prom.Gauge({
    name: 'request_gauge',
    help: 'Metrics - Gauge',
    labelNames: ['metrics_color'],
})

export const mosMetricsHist = new Prom.Histogram({
    name: 'request_hist',
    help: 'Metrics - Histogram',
    labelNames: ['user', 'location'],
    buckets: [0, 1, 2, 3, 4],
})

export const mosMetricsSummary = new Prom.Summary({
    name: 'request_summary',
    help: 'Metrics - Summary',
    labelNames: ['user', 'location'],
    percentiles: [0, 1, 2, 3, 4]
})
