"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const index_1 = require("../index");
const index_2 = require("../../admin/index");
class PassportJWTStrategy {
    constructor() {
        this.initialize = () => {
            passport.use("jwt", this.strategy());
            return passport.initialize();
        };
        this.strategy = () => {
            const params = {
                jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: index_1.Constants.SECRET,
                passReqToCallback: true
            };
            return new passport_jwt_1.Strategy(params, (req, payload, done) => {
                this.userService.getOne({ "userName": payload.username }, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (user === null) {
                        return done(null, false, { message: "The user in the token was not found" });
                    }
                    return done(null, { _id: user._id, username: user.userName });
                });
            });
        };
        this.userService = new index_2.UserService();
    }
}
exports.passportJWTStrategy = new PassportJWTStrategy();
//# sourceMappingURL=passport.js.map