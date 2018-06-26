import * as express from 'express';
import * as logger from 'morgan';
import { BaseMiddleware } from './core/index'

class App {
    public express: express.Application;
    constructor() {
        this.express = express();
        this.middleware();
    }

    private middleware(): void {
        this.express.use(logger("dev"));
        this.express.use(BaseMiddleware.configuration);
    }
}

export default new App().express;