#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.js";
import { printError, printHelp, printSuccess } from "./services/log.js";
import { saveKeyValue } from "./services/storage.js";

const saveToken = async (token) => {
	if (!token.length) {
		printError('Нет токена')
		return;
	}
	try {
		await saveKeyValue('token', token)
		printSuccess('Токен сохранен')
	} catch (e) {
		printError(e.message)
	}
}

const getForcast = async () => {
	try {
		const weather = await getWeather(process.env.CITY)
		console.log(weather);
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
		printHelp()
	}
	if (args.s) {
		// Сохранить город
	}
	if (args.t) {
		return saveToken(args.t)
	}
	getForcast()
}

initCLI()