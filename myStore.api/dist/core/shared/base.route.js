"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../../admin/index");
const index_2 = require("./../../shared/index");
var app = express();
class BaseRoutes {
    constructor() { }
    get routes() {
        app.use("/", new index_1.AccountRoutes().routes);
        app.use("/", new index_2.CommonRoutes().routes);
        app.use("/", new index_1.CategoryRoutes().routes);
        // app.use("*", function(req, res){
        //     res.status(403).send('not found');
        // });
        return app;
    }
}
exports.BaseRoutes = BaseRoutes;
//# sourceMappingURL=base.route.js.map