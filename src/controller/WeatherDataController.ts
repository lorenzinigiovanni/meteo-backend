import express = require('express');
import { BaseRequest } from './BaseRequest';
import { JSONSchema } from '../utility/decorators/JSONSchema';

import { WeatherData } from '../entity/WeatherData';
import { WeatherStation } from '../entity/WeatherStation';

export class WeatherDataController {

    static route(app: express.Application): void {
        app.route('/weatherdata')
            .get(async (req, res) => {
                res.status(200).send(await WeatherData.find());
            })
            .post(async (req, res) => {
                const data = WeatherDataPost.fromJSON(req.body);

                const weatherData = new WeatherData();
                weatherData.time = data.time;
                weatherData.temperature = data.temperature;
                weatherData.humidity = data.humidity;
                weatherData.pressure = data.pressure;
                weatherData.rain = data.rain;
                weatherData.weatherstationID = await WeatherStation.findOneOrFail(data.weatherstationID);

                res.status(201).send([await weatherData.save()]);
            })
        app.route('/weatherstations/:ID/weatherdata')
            .get(async (req, res) => {
                const params = req.params;
                const weatherStation = await WeatherStation.findOne(params['ID']);
                res.status(200).send(await WeatherData.find({ where: { weatherstationID: weatherStation } }));
            })
    }
}

@JSONSchema()
export class WeatherDataPost extends BaseRequest {
    weatherstationID!: string;
    time!: Date;
    temperature?: number;
    humidity?: number;
    pressure?: number;
    rain?: number;
}
