import * as express from 'express';
import { ResponseModel } from '../../core/index';

export class CategoryValidator {
    constructor() {
    }

    static Validate(req: express.Request, res: express.Response): ResponseModel {
        req.assert('name', 'Name can\'t be empty.').notEmpty();
        req.check('description').notEmpty().withMessage('Description can\'t be empty.')
            .isLength({ min: 3, max: 1000 }).withMessage('Description length must be between 3 and 1000.');
        const errors = req.validationErrors();
        const response: ResponseModel = {
            status: errors ? 500 : 200,
            errors: errors
        }

        return response;
    }
}