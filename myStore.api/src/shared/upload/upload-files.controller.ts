import * as express from 'express';
import * as multer from 'multer';
import * as path from 'path';
import * as guid from 'guid';
import * as fs from 'fs';
import { FileModel } from '../index';

export class UploadFilesController {
    upload(req: express.Request, res: express.Response): void {
        const storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, './upload-files')
            },
            filename: function (req, file, callback) {
                callback(null, guid.create() + path.extname(file.originalname))
            }
        });

        const upload = multer({
            storage: storage,
            fileFilter: function (req, file, callback) {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return callback(new Error('Only image files are allowed!'), false);
                }
                callback(null, true);
            }
        }).single('file');

        upload(req, res, function (err) {
            if (err) {
                return res.status(422).send(err)
            }

            // No error occured.
            let file: FileModel = {
                fileName: req.file.filename,
                mimeType: req.file.mimetype
            };
            return res.status(200).send(file);
        });
    }

    delete(req: express.Request, res: express.Response) {
        let filePath = `./upload-files/${req.params.fileName}`;
        fs.unlinkSync(filePath);
        return res.status(200).send({ fileName: req.params.fileName });
    }
}