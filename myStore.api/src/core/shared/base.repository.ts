import * as mongoose from 'mongoose';

export class BaseRepository<T extends mongoose.Document> {

    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }

    getAll(callback: (error: any, result: any) => void) {
        this._model.find({}, callback)
    }

    getById(_id: string, callback: (error: any, result: T) => void) {
        this._model.findById(_id, callback);
    }

    getOne(conditions: any, callback: (error: any, result: T) => void) {
        this._model.findOne(conditions, callback);
    }

    create(item: T, callback: (error: any, result: any) => void) {
        this._model.create(item, callback);
    }

    update(_id: mongoose.Types.ObjectId, item: T, callback: (error: any, result: any) => void) {
        this._model.update({ _id: _id }, item, callback);
    }

    delete(_id: string, callback: (error: any, result: any) => void) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }
}