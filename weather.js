#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp } from "./services/log.js";
import { saveKeyValue } from "./services/storage.js";

const initCLI = () => {
	const args = getArgs(process.argv)
	if (args.h) {
		printHelp()
	}
	if (args.s) {
		// Сохранить город
	}
	if (args.t) {
		saveKeyValue('token', args.t)
	}
	// Вывести погоду
}

initCLI()