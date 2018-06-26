import * as express from 'express';
import * as passport from 'passport';
import { CategoryController } from '../index'

var router = express.Router();
export class CategoryRoutes {
    private _categoryController: CategoryController;

    constructor() {
        this._categoryController = new CategoryController();
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