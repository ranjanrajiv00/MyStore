import { FileModel } from "../../../shared/index";

export interface Category {
    _id: string,
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
    image: FileModel,
    createdOn: Date,
    modifiedOn: Date
}