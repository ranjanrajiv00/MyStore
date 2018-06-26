import * as express from 'express';
import { AccountController } from '../index'

var router = express.Router();
export class AccountRoutes {
    private _accountController: AccountController;

    constructor() {
        this._accountController = new AccountController();
    }

    get routes() {
        var controller = this._accountController;
        router.post("/admin/account/signin", controller.signIn);
        router.post("/admin/account/signup", controller.signUp);
        return router;
    }
}