"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
const index_1 = require("../../index");
class BaseMiddleware {
    static get configuration() {
        var app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(index_1.passportJWTStrategy.initialize());
        app.use(bodyParser.json());
        app.use(expressValidator());
        app.use(cors());
        app.use('/upload-files', express.static('upload-files'));
        app.use(new index_1.BaseRoutes().routes);
        app.use(index_1.ErrorHandler.Init);
        index_1.DataAccess.connect();
        return app;
    }
}
exports.BaseMiddleware = BaseMiddleware;
//# sourceMappingURL=base.middleware.js.map