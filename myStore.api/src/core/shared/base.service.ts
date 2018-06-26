
import * as mongoose from 'mongoose';
import { BaseRepository } from './index'

export interface IBaseService<T> {
    getAll: (callback: (error: any, result: T) => void) => void;
    getById: (_id: string, callback: (error: any, result: T) => void) => void;
    getOne: (conditions: any, callback: (error: any, result: T) => void) => void;
    create: (item: T, callback: (error: any, result: any) => void) => void;
    update: (_id: string, item: T, callback: (error: any, result: any) => void) => void;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
}

export class BaseService<T extends mongoose.Document> implements IBaseService<T> {
    private repository: BaseRepository<T>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this.repository = new BaseRepository<T>(schemaModel);
    }

    getAll(callback: (error: any, result: any) => void) {
        this.repository.getAll(callback);
    }

    getById(_id: string, callback: (error: any, result: T) => void) {
        this.repository.getById(_id, callback);
    }

    getOne(conditions: any, callback: (error: any, result: T) => void) {
        this.repository.getOne(conditions, callback);
    };

    create(item: T, callback: (error: any, result: T) => void) {
        this.repository.create(item, callback);
    }

    update(_id: string, item: T, callback: (error: any, result: T) => void) {
        this.repository.getById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else
                this.repository.update(res._id, item, callback);
        });
    }

    delete(_id: string, callback: (error: any, result: T) => void) {
        this.repository.delete(_id, callback);
    }
}