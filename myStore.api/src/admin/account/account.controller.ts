import * as express from 'express';
import * as jwt from 'jsonwebtoken';

import { UserModel, UserService } from '../index';
import { Constants, ResponseModel, BaseController } from '../../core/index';

export class AccountController implements BaseController {
    constructor() {
    }
    signUp(req: express.Request, res: express.Response): void {
        let response: ResponseModel = {};
        try {
            var userService = new UserService();
            var user: UserModel = <UserModel>req.body;
            userService.create(user, (error, result) => {
                if (error) {
                    response.status = 500;
                    response.errors = "Not able to create."
                    res.status(500).send(response);
                }
                else {
                    response.status = 200;
                    res.send(response);
                }
            });
        }
        catch (e) {
            response.status = 500;
            response.errors = e;
            res.status(500).send(response);
        }
    }

    signIn(req: express.Request, res: express.Response): void {
        let response: ResponseModel = {};
        try {
            var userService = new UserService();
            var user: UserModel = <UserModel>req.body;
            userService.getOne({ userName: user.userName }, (error, user) => {
                if (error) {
                    response.status = 500;
                    response.errors = "Not able sign-in."
                    res.status(500).send(response);
                    return;
                }
                else if (user == null) {
                    response.status = 500;
                    response.errors = "User not found."
                    res.status(500).send(response);
                    return;
                }

                let validatePassword = user.comparePassword(req.body.password);
                validatePassword.then((isValid) => {
                    if (isValid) {
                        let expires = 60;
                        let token = jwt.sign({
                            expiresIn: expires,
                            username: user.userName
                        }, Constants.SECRET);

                        res.status(200).json({
                            token: "bearer " + token,
                            expires: expires,
                            user: user._id,
                            type: 0
                        });
                    }
                    else {
                        response.status = 500;
                        response.errors = "Password didn't mathed."
                        res.status(500).send(response);
                    }
                });
            });
        }
        catch (e) {
            response.status = 500;
            response.errors = "Unable to process request"
            res.status(500).send(response);
        }
    }
}