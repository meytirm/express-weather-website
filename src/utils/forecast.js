const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=eb45132417689cebd9e5c7adf8c25789&query=${latitude},${longitude}&units=m`;

	request({url, json: true}, (error, response) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (response.body.error) {
			callback('Unable to find location', undefined);
		} else {
			const {temperature, weather_descriptions, precip} = response.body.current;
			callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out.There is a ${precip}% chance of rain.`);
		}
	})
}

module.exports = forecast
