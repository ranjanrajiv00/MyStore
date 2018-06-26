import * as express from 'express';
import * as passport from 'passport';
import { UploadFilesController } from './index'

var router = express.Router();

export class CommonRoutes {
    private _uploadFilesController: UploadFilesController;

    constructor() {
        this._uploadFilesController = new UploadFilesController();
    }

    get routes() {
        router.post("/upload", this._uploadFilesController.upload);
        router.delete("/upload/:fileName", this._uploadFilesController.delete);

        return router;
    }
}