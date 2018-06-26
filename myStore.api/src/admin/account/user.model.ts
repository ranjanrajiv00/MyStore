import { Document } from 'mongoose';
import { BaseModel } from '../../core/index';

export interface UserModel extends BaseModel, Document {
    userName: string,
    password: string,
    comparePassword(candidatePassword: string): Promise<boolean>
}