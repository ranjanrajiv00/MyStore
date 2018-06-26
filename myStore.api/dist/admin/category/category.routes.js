"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const index_1 = require("../index");
var router = express.Router();
class CategoryRoutes {
    constructor() {
        this._categoryController = new index_1.CategoryController();
    }
    get routes() {
        var controller = this._categoryController;
        router.use(passport.authenticate('jwt', { session: false }));
        router.get("/admin/category", controller.getAll);
        router.get("/admin/category/:_id", controller.getById);
        router.post("/admin/category", controller.create);
        router.put("/admin/category/:_id", controller.update);
        router.delete("/admin/category/:_id", controller.delete);
        return router;
    }
}
exports.CategoryRoutes = CategoryRoutes;
//# sourceMappingURL=category.routes.js.map