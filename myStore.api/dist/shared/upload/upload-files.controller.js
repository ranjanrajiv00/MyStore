"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const path = require("path");
const guid = require("guid");
const fs = require("fs");
class UploadFilesController {
    upload(req, res) {
        const storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, './upload-files');
            },
            filename: function (req, file, callback) {
                callback(null, guid.create() + path.extname(file.originalname));
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
                return res.status(422).send(err);
            }
            // No error occured.
            let file = {
                fileName: req.file.filename,
                mimeType: req.file.mimetype
            };
            return res.status(200).send(file);
        });
    }
    delete(req, res) {
        let filePath = `./upload-files/${req.params.fileName}`;
        fs.unlinkSync(filePath);
        return res.status(200).send({ fileName: req.params.fileName });
    }
}
exports.UploadFilesController = UploadFilesController;
//# sourceMappingURL=upload-files.controller.js.map