#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp } from "./services/log.js";

const initCLI = () => {
	const args = getArgs(process.argv)
	if (args.h) {
		printHelp()
	}
	if (args.s) {
		// Сохранить город
	}
	if (args.t) {
		// Сохранить token
	}
	// Вывести погоду
}

initCLI()