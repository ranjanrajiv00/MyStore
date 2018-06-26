"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
class UserSchema {
    static get schema() {
        return new mongoose_1.Schema({
            userName: {
                type: String,
                unique: true,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            createdOn: Date,
            modifiedOn: Date
        });
    }
}
var schema = UserSchema.schema;
schema.pre('save', function (next) {
    var user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
schema.pre("update", function (next) {
    bcrypt.hash(this.password, '10', (err, hash) => {
        this.password = hash;
        next();
    });
});
schema.methods.comparePassword = function (candidatePassword) {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err)
                return reject(err);
            return resolve(success);
        });
    });
};
exports.userSchema = mongoose_1.model("Users", schema);
//# sourceMappingURL=user.schema.js.map