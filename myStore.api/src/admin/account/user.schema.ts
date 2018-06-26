import { Schema, model } from 'mongoose';
import * as bcrypt from "bcrypt-nodejs";
import { UserModel } from '../index';

class UserSchema {
    static get schema() {
        return new Schema({
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

schema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};

export const userSchema = model<UserModel>("Users", schema);