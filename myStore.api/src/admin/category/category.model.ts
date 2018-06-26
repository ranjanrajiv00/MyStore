import * as mongoose from 'mongoose';
import { BaseModel } from '../../core/index';
import { FileModel } from '../../shared/index';

export interface CategoryModel extends BaseModel, mongoose.Document {
    name: string,
    description: string,
    seo: {
        metaKeywords: string,
        metaDescription: string,
        metaTitle: string
    },
    config: {
        hasDiscountsApplied: Boolean,
        taxable: Boolean,
        freeDelivery: Boolean,
    },
    image: FileModel
};