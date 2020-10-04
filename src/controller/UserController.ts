import express = require('express');
import { BaseRequest } from './BaseRequest';
import { JSONSchema } from '../utility/decorators/JSONSchema';

import { User } from '../entity/User';

export class UserController {

    static route(app: express.Application): void {
        app.route('/users')
            .get(async (req, res) => {
                res.status(200).send(await User.find());
            })
            .post(async (req, res) => {
                const data = UserPost.fromJSON(req.body);

                const user = new User();
                user.name = data.name;
                user.surname = data.surname;
                user.email = data.email;
                user.password = data.password;

                res.status(201).send([await user.save()]);
            })
    }
}

@JSONSchema()
export class UserPost extends BaseRequest {
    surname!: string;
    name!: string;
    email!: string;
    password!: string;
}
