"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
class ErrorHandler {
    static Init(error, req, res, next) {
        let response = {
            status: 500,
            errors: error
        };
        index_1.Logger.logger.error(error);
        res.status(error.status || 500);
        res.json(response);
        next();
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error-handler.middleware.js.map