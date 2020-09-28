import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';

export class Main {

    static start(): void {

        createConnection().then(async () => {

            const app = express();
            app.use(cors());
            app.use(express.json({ limit: '10mb' }));

            app.use(function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Origin');
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');

                next();
            });

            app.listen(3000);
            console.log('Express application is up and running on port 3000');

        }).catch(error => { throw error; });
    }
}

Main.start();
