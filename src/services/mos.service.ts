import Prom from "prom-client";

export const mosMetricsGauge = new Prom.Gauge({
    name: 'request_colors',
    help: 'color types for requests',
    labelNames: ['metrics_color'],
})

export const mosMetricsHist = new Prom.Histogram({
    name: 'request_size',
    help: 'Size for request value',
    labelNames: ['user', 'location'],
    buckets: [0, 1, 2, 3, 4, 5, 6],
})
