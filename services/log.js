import chalk from 'chalk'
import dedent from 'dedent-js'

const { bgCyan, bgRed, bgGreen } = chalk

export const printError = (errorText) => console.log(`${bgRed(' ERROR ')} ${errorText}`);

export const printSuccess = (successText) => console.log(`${bgGreen(' SUCCESS ')} ${successText}`);

export const printHelp = () => console.log(
	dedent`${bgCyan(' HELP ')}
	Без параметров	вывод погоды
	-s [CITY]	установка города
	-h		вывод помощи
	-t [API_KEY]	сохранение токена
	`
);