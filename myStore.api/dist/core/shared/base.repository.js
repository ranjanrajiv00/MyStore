"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class BaseRepository {
    constructor(schemaModel) {
        this._model = schemaModel;
    }
    getAll(callback) {
        this._model.find({}, callback);
    }
    getById(_id, callback) {
        this._model.findById(_id, callback);
    }
    getOne(conditions, callback) {
        this._model.findOne(conditions, callback);
    }
    create(item, callback) {
        this._model.create(item, callback);
    }
    update(_id, item, callback) {
        this._model.update({ _id: _id }, item, callback);
    }
    delete(_id, callback) {
        this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
    }
    toObjectId(_id) {
        return mongoose.Types.ObjectId.createFromHexString(_id);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map