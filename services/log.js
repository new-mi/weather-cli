import chalk from 'chalk'
import dedent from 'dedent-js'

const { bgCyan, bgRed, bgGreen, bgYellow, black } = chalk

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

export const printWeather = (res, icon) => console.log(
	dedent`${bgYellow(black(' WEATHER '))} Погода в городе ${res.name}
	${icon}  ${res.weather[0].description}
	Температура ${res.main.temp} (ощущается как ${res.main.feels_like})
	Влажность: ${res.main.humidity}%
	Скорость ветра: ${res.wind.speed}м/с
	`
);