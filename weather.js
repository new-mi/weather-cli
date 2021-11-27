#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { DICTIONARY } from "./helpers/constants.js";
import { getIcon, getWeather } from "./services/api.js";
import { printError, printHelp, printSuccess, printWeather } from "./services/log.js";
import { getKeyValue, saveKeyValue } from "./services/storage.js";

const saveToken = async (token) => {
	if (!token.length) {
		printError('Нет токена')
		return;
	}
	try {
		await saveKeyValue(DICTIONARY.token, token)
		printSuccess('Токен сохранен')
	} catch (e) {
		printError(e.message)
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError('Не передан город')
		return;
	}
	try {
		await saveKeyValue(DICTIONARY.city, city)
		printSuccess('Город сохранен')
	} catch (e) {
		printError(e.message)
	}
}

const getForcast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(DICTIONARY.city)
		const weather = await getWeather(city)
		printWeather(weather, getIcon(weather.weather[0].icon))
	} catch (e) {
		if (e?.response?.status === 400 || Number(e?.cod) === 400) {
			printError('Неверно указан город')
		} else if (e?.response?.status === 401 || Number(e?.cod) === 401) {
			printError('Неверно указан токен')
		} else {
			printError(e.message)
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv)
	if (args.h) {
		return printHelp()
	}
	if (args.s) {
		return saveCity(args.s)
	}
	if (args.t) {
		return saveToken(args.t)
	}
	return getForcast()
}

initCLI()