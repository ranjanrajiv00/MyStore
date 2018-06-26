import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressValidator from 'express-validator';
import * as cors from 'cors';
import * as path from 'path';

import { 
    BaseRoutes, 
    ErrorHandler, 
    DataAccess,
    passportJWTStrategy
} from '../../index';

export class BaseMiddleware {
    static get configuration() {
        var app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(passportJWTStrategy.initialize());
        app.use(bodyParser.json());

        app.use(expressValidator());
        app.use(cors());
        app.use('/upload-files', express.static('upload-files'))

        app.use(new BaseRoutes().routes);
        app.use(ErrorHandler.Init);

        DataAccess.connect();

        return app;
    }
}