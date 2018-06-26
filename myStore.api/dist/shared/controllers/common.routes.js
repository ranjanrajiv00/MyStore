"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../index");
var router = express.Router();
class CommonRoutes {
    constructor() {
        this._uploadFilesController = new index_1.UploadFilesController();
    }
    get routes() {
        router.post("/upload", this._uploadFilesController.upload);
        return router;
    }
}
exports.CommonRoutes = CommonRoutes;
