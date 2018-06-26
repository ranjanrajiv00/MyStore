import * as passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Constants } from '../index';
import { UserService } from '../../admin/index';

class PassportJWTStrategy {
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public initialize = () => {
        passport.use("jwt", this.strategy());
        return passport.initialize();
    }

    private strategy = (): Strategy => {
        const params = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Constants.SECRET,
            passReqToCallback: true
        };

        return new Strategy(params, (req, payload: any, done) => {
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
    }
}

export const passportJWTStrategy = new PassportJWTStrategy();