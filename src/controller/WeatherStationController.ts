import express = require('express');
import { BaseRequest } from './BaseRequest';
import { JSONSchema } from '../utility/decorators/JSONSchema';

import { WeatherStation } from '../entity/WeatherStation';

export class WeatherStationController {

    static route(app: express.Application): void {
        app.route('/weatherstations')
            .get(async (req, res) => {
                res.status(200).send(await WeatherStation.find());
            })
            .post(async (req, res) => {
                const data = WeatherStationPost.fromJSON(req.body);

                const weatherStation = new WeatherStation();
                weatherStation.name = data.name;
                weatherStation.altitude = data.altitude;
                weatherStation.coordinates = data.coordinates;
                weatherStation.manufacturingDate = new Date();

                res.status(201).send([await weatherStation.save()]);
            })
        app.route('/weatherstations/:ID')
            .get(async (req, res) => {
                const params = req.params;
                res.status(200).send(await WeatherStation.find({ where: { ID: params['ID'] } }));
            })
    }
}

@JSONSchema()
export class WeatherStationPost extends BaseRequest {
    coordinates!: string;
    name!: string;
    altitude?: number;
}
