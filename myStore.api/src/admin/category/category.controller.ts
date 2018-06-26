import * as express from 'express';
import { CategoryService, CategoryModel, CategoryValidator } from '../index';
import { ResponseModel, BaseController } from '../../core/index';

export class CategoryController implements BaseController {
    getAll(req: express.Request, res: express.Response): void {
        try {
            var categoryService = new CategoryService();
            categoryService.getAll((error, result) => {
                if (error)
                    res.status(500).send({ "error": "error in your request" });
                else
                    res.send(result);
            });
        }
        catch (e) {
            res.status(500).send({ "error": "error in your request" });
        }
    }

    getById(req: express.Request, res: express.Response): void {
        try {
            var _id: string = req.params._id;
            var categoryService = new CategoryService();
            categoryService.getById(_id, (error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send(result);
            });
        }
        catch (e) {
            res.send({ "error": "error in your request" });
        }
    }

    create(req: express.Request, res: express.Response): void {
        let response: ResponseModel = {};

        try {
            const errors = CategoryValidator.Validate(req, res);
            if (errors.status != 200) {
                res.send(errors);
                return;
            }
            var category: CategoryModel = <CategoryModel>req.body;
            var categoryService = new CategoryService();
            categoryService.create(category, (error, result) => {
                if (error) {
                    response.status = 500;
                    response.errors = "Not able to create."
                    res.status(500).send(response);
                }
                else {
                    response.status = 200;
                    res.send(response);
                }
            });
        }
        catch (e) {
            response.status = 500;
            response.errors = e;
            res.status(500).send(response);
        }
    }

    update(req: express.Request, res: express.Response): void {
        try {
            var category: CategoryModel = <CategoryModel>req.body;
            var categoryService = new CategoryService();
            var _id: string = req.params._id;
            categoryService.update(_id, category, (error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            res.send({ "error": "error in your request" });
        }
    }

    delete(req: express.Request, res: express.Response): void {

        try {
            var _id: string = req.params._id;
            var categoryService = new CategoryService();
            categoryService.delete(_id, (error, result) => {
                if (error)
                    res.send({ "error": "error" });
                else
                    res.send({ "success": "success" });
            });
        }
        catch (e) {
            res.send({ "error": "error in your request" });
        }
    }
}