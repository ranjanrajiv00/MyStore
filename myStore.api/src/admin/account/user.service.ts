import { UserModel, userSchema } from '../index';
import { BaseService } from '../../core/shared/index';

export class UserService extends BaseService<UserModel> {
    constructor() {
        super(userSchema);
    }
}