"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../index");
var router = express.Router();
class AccountRoutes {
    constructor() {
        this._accountController = new index_1.AccountController();
    }
    get routes() {
        var controller = this._accountController;
        router.post("/admin/account/signin", controller.signIn);
        router.post("/admin/account/signup", controller.signUp);
        return router;
    }
}
exports.AccountRoutes = AccountRoutes;
//# sourceMappingURL=account.routes.js.map