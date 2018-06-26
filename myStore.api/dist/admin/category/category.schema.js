"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class CategorySchema {
    static get schema() {
        var schema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            seo: {
                metaKeywords: String,
                metaDescription: String,
                metaTitle: String,
            },
            config: {
                hasDiscountsApplied: Boolean,
                taxable: Boolean,
                freeDelivery: Boolean
            },
            image: {
                fileName: String,
                mimeType: String
            },
            createdOn: Date,
            modifiedOn: Date
        });
        return schema;
    }
}
exports.categorySchema = mongoose_1.model("Category", CategorySchema.schema);
;
//# sourceMappingURL=category.schema.js.map