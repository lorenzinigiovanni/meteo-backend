import express = require('express');
import { BaseRequest } from './BaseRequest';
import { JSONSchema } from '../utility/decorators/JSONSchema';

import { WeatherData } from '../entity/WeatherData';

export class WeatherDataController {

    static route(app: express.Application): void {
        app.route('/weatherdata')
            .get(async (req, res) => {
                res.status(200).send(await WeatherData.find());
            })
            .post(async (req, res) => {
                const data = WeatherDataPost.fromJSON(req.body);

                const weatherData = new WeatherData();
                weatherData.weatherStationID = data.weatherStationID;
                weatherData.time = data.time;
                weatherData.temperature = data.temperature;
                weatherData.humidity = data.humidity;
                weatherData.pressure = data.pressure;
                weatherData.rain = data.rain;

                res.status(201).send([await weatherData.save()]);
            })
    }
}

@JSONSchema()
export class WeatherDataPost extends BaseRequest {
    weatherStationID!: string;
    time!: Date;
    temperature?: number;
    humidity?: number;
    pressure?: number;
    rain?: number;
}
