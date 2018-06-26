"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const index_1 = require("./core/index");
class App {
    constructor() {
        this.express = express();
        this.middleware();
    }
    middleware() {
        this.express.use(logger("dev"));
        this.express.use(index_1.BaseMiddleware.configuration);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map