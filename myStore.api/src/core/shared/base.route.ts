import * as express from 'express';
import { CategoryRoutes, AccountRoutes } from '../../admin/index';
import { CommonRoutes } from './../../shared/index';

var app = express();

export class BaseRoutes {
    constructor() { }
    get routes() {
        app.use("/", new AccountRoutes().routes);
        app.use("/", new CommonRoutes().routes);
        
        app.use("/", new CategoryRoutes().routes);
        // app.use("*", function(req, res){
        //     res.status(403).send('not found');
        // });
        return app;
    }
}