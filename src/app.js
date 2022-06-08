const path = require('path');
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath, function (err) {
})

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Mehdi Rahmani',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Mehdi Rahmani',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'You can search your location in the search bar and get the weather forecast',
		title: 'Help',
		name: 'Mehdi Rahmani',
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address.'
		})
	}

	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error })
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error })
			}

			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})

		})
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Mehdi Rahmani',
		errorMessage: 'Help article not found.'
	})
})

app.get('/about/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Mehdi Rahmani',
		errorMessage: 'About article not found.'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Mehdi Rahmani',
		errorMessage: 'Page not found.'
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})