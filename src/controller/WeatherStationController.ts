import express = require('express');
import { BaseRequest } from './BaseRequest';
import { JSONSchema } from '../utility/decorators/JSONSchema';

import { WeatherStation } from '../entity/WeatherStation';

export default class WeatherStationController {

    static route(app: express.Application): void {
        app.route('/weatherstations')
            .get(async (req, res) => {
                res.status(200).send(await WeatherStation.find());
            })
            .post(async (req, res) => {
                const data = WeatherPost.fromJSON(req.body);

                const weatherStation = new WeatherStation();
                weatherStation.name = data.name;
                weatherStation.coordinates = data.coordinates;
                weatherStation.manufacturingDate = new Date();

                res.status(200).send([await weatherStation.save()]);
            })
    }
}

@JSONSchema()
export class WeatherPost extends BaseRequest {
    coordinates!: string;
    name!: string;
}
