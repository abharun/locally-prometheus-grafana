import Prom from "prom-client";

export const mosMetrics = new Prom.Gauge({
    name: 'request_colors',
    help: 'color types for requests',
    labelNames: ['metrics_color'],
})
