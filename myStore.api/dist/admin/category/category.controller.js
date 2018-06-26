"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
class CategoryController {
    getAll(req, res) {
        try {
            var categoryService = new index_1.CategoryService();
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
    getById(req, res) {
        try {
            var _id = req.params._id;
            var categoryService = new index_1.CategoryService();
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
    create(req, res) {
        let response = {};
        try {
            const errors = index_1.CategoryValidator.Validate(req, res);
            if (errors.status != 200) {
                res.send(errors);
                return;
            }
            var category = req.body;
            var categoryService = new index_1.CategoryService();
            categoryService.create(category, (error, result) => {
                if (error) {
                    response.status = 500;
                    response.errors = "Not able to create.";
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
    update(req, res) {
        try {
            var category = req.body;
            var categoryService = new index_1.CategoryService();
            var _id = req.params._id;
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
    delete(req, res) {
        try {
            var _id = req.params._id;
            var categoryService = new index_1.CategoryService();
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
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map