import { Request, Response } from 'express';

export const getHealthCheck = (_req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Server is running' });
};
