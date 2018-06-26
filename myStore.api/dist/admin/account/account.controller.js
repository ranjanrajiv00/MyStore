"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const index_1 = require("../index");
const index_2 = require("../../core/index");
class AccountController {
    constructor() {
    }
    signUp(req, res) {
        let response = {};
        try {
            var userService = new index_1.UserService();
            var user = req.body;
            userService.create(user, (error, result) => {
                if (error) {
                    response.status = 500;
                    response.errors = "Not able to create.";
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
    signIn(req, res) {
        let response = {};
        try {
            var userService = new index_1.UserService();
            var user = req.body;
            userService.getOne({ userName: user.userName }, (error, user) => {
                if (error) {
                    response.status = 500;
                    response.errors = "Not able sign-in.";
                    res.status(500).send(response);
                    return;
                }
                else if (user == null) {
                    response.status = 500;
                    response.errors = "User not found.";
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
                        }, index_2.Constants.SECRET);
                        res.status(200).json({
                            token: "bearer " + token,
                            expires: expires,
                            user: user._id,
                            type: 0
                        });
                    }
                    else {
                        response.status = 500;
                        response.errors = "Password didn't mathed.";
                        res.status(500).send(response);
                    }
                });
            });
        }
        catch (e) {
            response.status = 500;
            response.errors = "Unable to process request";
            res.status(500).send(response);
        }
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map