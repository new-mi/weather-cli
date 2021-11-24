#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printError, printHelp, printSuccess } from "./services/log.js";
import { saveKeyValue } from "./services/storage.js";

const saveToken = async (token) => {
	try {
		await saveKeyValue('token', token)
		printSuccess('Токен сохранен')
	} catch (e) {
		printError(e.message)
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
	// Вывести погоду
}

initCLI()