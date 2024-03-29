import { Request, Response } from "express";
import { mosMetrics } from "../services";
import * as promClient from "prom-client";

export const getMosMetrics = async (req: Request, res: Response) => {
    res.set('Content-Type', promClient.register.contentType)
    const metrics = await promClient.register.metrics()
    res.status(200).send(metrics)
};

export const updateMosMetrics = async (req: Request, res: Response) => {
    const label = Math.random() > 0.5 ? 'Red' : 'Blue'
    mosMetrics.inc({
        metrics_color: label
    })
    res.status(200).send({ Color: label })
};
