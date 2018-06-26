"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class BaseService {
    constructor(schemaModel) {
        this.repository = new index_1.BaseRepository(schemaModel);
    }
    getAll(callback) {
        this.repository.getAll(callback);
    }
    getById(_id, callback) {
        this.repository.getById(_id, callback);
    }
    getOne(conditions, callback) {
        this.repository.getOne(conditions, callback);
    }
    ;
    create(item, callback) {
        this.repository.create(item, callback);
    }
    update(_id, item, callback) {
        this.repository.getById(_id, (err, res) => {
            if (err)
                callback(err, res);
            else
                this.repository.update(res._id, item, callback);
        });
    }
    delete(_id, callback) {
        this.repository.delete(_id, callback);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map