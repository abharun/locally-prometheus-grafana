import { Router } from "express";
import mosRouter from "./mos.router";

const router = Router();

router.get('/', (_req, res) => {
    res.send('Hello, World!')
});

router.get('/health', (_req, res) => {
    res.send('Ok')
});

router.use('/metrics', mosRouter);

export default router;
