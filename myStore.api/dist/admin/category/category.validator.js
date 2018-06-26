"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryValidator {
    constructor() {
    }
    static Validate(req, res) {
        req.assert('name', 'Name can\'t be empty.').notEmpty();
        req.check('description').notEmpty().withMessage('Description can\'t be empty.')
            .isLength({ min: 3, max: 1000 }).withMessage('Description length must be between 3 and 1000.');
        const errors = req.validationErrors();
        const response = {
            status: errors ? 500 : 200,
            errors: errors
        };
        return response;
    }
}
exports.CategoryValidator = CategoryValidator;
//# sourceMappingURL=category.validator.js.map