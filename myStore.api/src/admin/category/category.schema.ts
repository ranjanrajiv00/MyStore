import { Schema, model } from 'mongoose';
import { CategoryModel } from '../index';

class CategorySchema {
    static get schema() {
        var schema = new Schema({
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
export const categorySchema = model<CategoryModel>("Category", CategorySchema.schema);;