import axios from 'axios';
import https from 'https'
import { DICTIONARY, TYPE_REQUEST } from '../helpers/constants.js'
import { getKeyValue } from './storage.js'

export const getWeather = async (city, type = TYPE_REQUEST.axios) => {
	const token = await getKeyValue(DICTIONARY.token);
	let data = null
	if (!token) {
		throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
	}

	if (type === TYPE_REQUEST.axios) {
		data = await adapterAxios(city, token)
	} else {
		data = await adapterHttps(city, token)
	}

	console.log(data)
}


export const adapterAxios = async (city, token) => {
	const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metrics'
		}
	})

	return data;
}

export const adapterHttps = async (city, token) => {
	return new Promise((resolve, reject) => {
		const url = new URL('https://api.openweathermap.org/data/2.5/weather')
		url.searchParams.append('q', city)
		url.searchParams.append('appid', token)
		url.searchParams.append('lang', 'ru')
		url.searchParams.append('units', 'metrics')

		https.get(url, (response) => {
			let res = '';

			response.on('data', (chunk) => {
				res += chunk;
			})

			response.on('end', () => {
				resolve(JSON.parse(res))
			})
		})
	})
}