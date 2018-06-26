import * as express from 'express';
import { ResponseModel, Logger } from '../index';

export class ErrorHandler {
    static Init(error: any, req: express.Request, res: express.Response, next: express.NextFunction): void {
        let response: ResponseModel = {
            status: 500,
            errors: error
        };
        Logger.logger.error(error);
        res.status(error.status || 500);
        res.json(response);
        next();
    }
}