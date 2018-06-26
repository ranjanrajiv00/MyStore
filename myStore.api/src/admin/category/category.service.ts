import { CategoryModel, categorySchema } from '../index';
import { BaseService } from '../../core/shared/index';

export class CategoryService extends BaseService<CategoryModel> {
    constructor() {
        super(categorySchema);
    }
}