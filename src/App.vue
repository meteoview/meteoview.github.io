<template>
	<div class="container">
		<PageHeader/>
		<router-view v-if="!isError"/>
		<main class="main-content-container" v-if="isError">
			<div class="main-content-block">
				<p :style="{
					fontSize: '18px',
					color: '#12263A',
					marginTop: '26px'
				}">
					Ошибка! Регион не найден
				</p>
			</div>
		</main>
		<footer></footer>
	</div>
</template>

<script>
	import axios from 'axios';
	import dayjs from 'dayjs';
	import 'dayjs/locale/ru';
	import PageHeader from '@/components/Header.vue';
	import SnowImage from '@/assets/snow.png';

	dayjs.locale('ru');

	export default {
		name: "App",
		data() {
			return {
				weatherHours: {},
				weatherWeekdays: [],
				weatherClothes: [],
				isError: false
			}
		},
		components: {
			PageHeader
		},
		watch: {
			async region() {
				await this.getWeather();
			}
		},
		computed: {
			region() {
				return this.$store.getters.regionGet;
			}
		},
		mounted() {
			this.setCity();
		},
		methods: {
			getDescriptionTemp(minTemp) {
				let returnTemplate = {
					tempDescriptionTemplate: '',
					tempImages: []
				}

				if(minTemp > 25) {
					returnTemplate.tempDescriptionTemplate = 'Стоит надеть лёгкую однослойную одежду (футболку и шорты или юбку).';
					returnTemplate.tempImages.push('t-shirt.png');
					returnTemplate.tempImages.push('shorts.png');
					returnTemplate.tempImages.push('showes.png');
				} else if(minTemp <= 25 && minTemp > 15) {
					returnTemplate.tempDescriptionTemplate = 'Можно надеть однослойную одежду (штаны или шорты, футболку и лёгкую кофту).';
					returnTemplate.tempImages.push('tolstovka.png');
					returnTemplate.tempImages.push('t-shirt.png');
					returnTemplate.tempImages.push('jeance.png');
					returnTemplate.tempImages.push('showes.png');
				} else if(minTemp <= 15 && minTemp > 0) {
					returnTemplate.tempDescriptionTemplate = 'Следует надеть двухслойную одежду (штаны и демисезонную куртку поверх водолазки, по желанию можно надеть кофту). Можно обуться потеплее.';
					returnTemplate.tempImages.push('shapka.png');
					returnTemplate.tempImages.push('kurtka.png');
					returnTemplate.tempImages.push('vodolazka.png');
					returnTemplate.tempImages.push('jeance.png');
					returnTemplate.tempImages.push('winter-showes.png');
				} else if(minTemp <= 0 && minTemp > -15) {
					returnTemplate.tempDescriptionTemplate = 'Следует надеть трёхслойную одежду (термобельё, тёплые штаны, зимнюю куртку и обувь). Под куртку нужно надеть толстовку. Не забудьте шапку!';
					returnTemplate.tempImages.push('shapka.png');
					returnTemplate.tempImages.push('kurtka.png');
					returnTemplate.tempImages.push('tolstovka.png');
					returnTemplate.tempImages.push('vodolazka.png');
					returnTemplate.tempImages.push('jeance.png');
					returnTemplate.tempImages.push('podjeance.png');
					returnTemplate.tempImages.push('winter-showes.png');
				} else if(minTemp <= -15) {
					returnTemplate.tempDescriptionTemplate = 'Обязательно наденьте четырёхслойную одежду (термобельё, тёплые штаны, зимнюю куртку, свитер и кофту). Варежки и шапка тоже нужны.';
					returnTemplate.tempImages.push('shapka.png');
					returnTemplate.tempImages.push('kurtka.png');
					returnTemplate.tempImages.push('tolstovka.png');
					returnTemplate.tempImages.push('sviter.png');
					returnTemplate.tempImages.push('vodolazka.png');
					returnTemplate.tempImages.push('jeance.png');
					returnTemplate.tempImages.push('podjeance.png');
					returnTemplate.tempImages.push('winter-showes.png');
				}

				return returnTemplate;
			},
			getDescriptionWeather(weatherText, lastWeatherText, lastWeatherDescriptionTemplate, lastWeatherImages) {
				let returnTemplate = {
					weatherTextTemplate: lastWeatherDescriptionTemplate,
					lastWeatherTextTemplate: lastWeatherText,
					weatherImages: lastWeatherImages,
				};

				if(
					weatherText == 'Ясное небо' ||
					weatherText == 'Малооблачно' ||
					weatherText == 'Облачно' ||
					weatherText == 'Пасмурно' &&
					lastWeatherText != 'Морось' &&
					lastWeatherText != 'Дождь' &&
					lastWeatherText != 'Гроза' &&
					lastWeatherText != 'Снег' &&
					lastWeatherText != 'Туман'
				) {
					returnTemplate.weatherTextTemplate = 'Осадков не будет.';
					returnTemplate.lastWeatherTextTemplate = weatherText;
				} else if (
					weatherText == 'Морось' ||
					weatherText == 'Дождь' &&
					lastWeatherText != 'Гроза'
				) {
					returnTemplate.weatherTextTemplate =  'Будет дождь, поэтому следует взять зонт или дождевик.';
					returnTemplate.lastWeatherTextTemplate = weatherText;
					returnTemplate.weatherImages = [];
					returnTemplate.weatherImages.push('rain-clothes.png');
					returnTemplate.weatherImages.push('umbrella.png');
				} else if (weatherText == 'Гроза') {
					returnTemplate.weatherTextTemplate =  'Будет гроза, поэтому с собой следует взять дождевик, зонт лучше не брать.';
					returnTemplate.lastWeatherTextTemplate = weatherText;
					returnTemplate.weatherImages = [];
					returnTemplate.weatherImages.push('rain-clothes.png');
				}  else if (weatherText == 'Снег' &&
					lastWeatherText != 'Гроза' &&
					lastWeatherText != 'Дождь' &&
					lastWeatherText != 'Морось'
				) {
					returnTemplate.weatherTextTemplate =  'Следует одеться потеплее, потому что пойдет снег.';
					returnTemplate.lastWeatherTextTemplate = weatherText;
				} else if (
					weatherText == 'Туман' &&
					lastWeatherText != 'Гроза' &&
					lastWeatherText != 'Снег' &&
					lastWeatherText != 'Дождь' &&
					lastWeatherText != 'Морось'
				) {
					returnTemplate.weatherTextTemplate =  'Будет туман. Если вы за рулём, то будте осторожны.';
					returnTemplate.lastWeatherTextTemplate = weatherText;
				}

				return returnTemplate;
			},
			getDayParts() {
				const data = this.weatherHours;

				const weather = {
					'01': 'Ясное небо',
					'02': 'Малооблачно',
					'03': 'Облачно',
					'04': 'Пасмурно',
					'09': 'Морось',
					'10': 'Дождь',
					'11': 'Гроза',
					'13': 'Снег',
					'50': 'Туман',
				};

				let oneDayPart = false;
				let twoDayPart = false;

				let minTempOne;
				let minTempTwo;

				let lastWeatherTextOne;
				let lastWeatherTextTwo;

				let lastWeatherDescriptionOne = '';
				let lastWeatherDescriptionTwo = '';

				let lastWeatherImagesOne = [];
				let lastWeatherImagesTwo = [];

				for(let i = 0; i < data.times.length; i++) {
					const weatherText = weather[data.times[i].weatherImg];
					const nowTime = data.times[i].time;
					const nowTemp = Number(data.times[i].temp);

					let descriptionTemplate = {
						descriptionTitle: '',
						descriptionTime: '',
						temp: '',
						descriptionTemp: '',
						descriptionWeather: '',
						imageUrls: []
					};

					if(!oneDayPart) {
						if(nowTime == '06:00' || nowTime == '09:00' || nowTime == '12:00' || nowTime == '15:00') {
							if(!minTempOne)
								minTempOne = nowTemp;
							else if(nowTemp < minTempOne)
								minTempOne = nowTemp

							let gotResponse = this.getDescriptionWeather(weatherText, lastWeatherTextOne, lastWeatherDescriptionOne, lastWeatherImagesOne);

							lastWeatherTextOne = gotResponse.lastWeatherTextTemplate;
							lastWeatherDescriptionOne = gotResponse.weatherTextTemplate;
							lastWeatherImagesOne = gotResponse.weatherImages;

							if(nowTime == '15:00') {
								descriptionTemplate.descriptionTitle = !twoDayPart ? 'Одежда на сейчас' : 'Одежда на следующую половину дня'
								
								descriptionTemplate.descriptionTime = '6:00 - 15:00';

								descriptionTemplate.temp = `Температура воздуха будет ${minTempOne}° C.`;

								let gotResponseTemp = this.getDescriptionTemp(minTempOne);

								descriptionTemplate.descriptionTemp = gotResponseTemp.tempDescriptionTemplate;

								if(gotResponseTemp.tempImages.length > 0) {
									for(let j = 0; j < gotResponseTemp.tempImages.length; j++) {
										descriptionTemplate.imageUrls.push(gotResponseTemp.tempImages[j]);
									}
								}

								descriptionTemplate.descriptionWeather = gotResponse.weatherTextTemplate;

								if(gotResponse.weatherImages.length > 0) {
									for(let j = 0; j < gotResponse.weatherImages.length; j++) {
										descriptionTemplate.imageUrls.push(gotResponse.weatherImages[j]);
									}
								}

								oneDayPart = true;
								
								this.weatherClothes.push(descriptionTemplate);
							}
						}
					}

					if(!twoDayPart) {
						if(nowTime == '18:00' || nowTime == '21:00' || nowTime == '00:00' || nowTime == '03:00') {
							if(!minTempTwo)
								minTempTwo = nowTemp;
							else if(nowTemp < minTempTwo)
								minTempTwo = nowTemp

							let gotResponse = this.getDescriptionWeather(weatherText, lastWeatherTextTwo, lastWeatherDescriptionTwo, lastWeatherImagesTwo);

							lastWeatherTextTwo = gotResponse.lastWeatherTextTemplate;
							lastWeatherDescriptionTwo = gotResponse.weatherTextTemplate;
							lastWeatherImagesTwo = gotResponse.weatherImages;

							if(nowTime == '03:00') {
								descriptionTemplate.descriptionTitle = !oneDayPart ? 'Одежда на сейчас' : 'Одежда на следующую половину дня'
								
								descriptionTemplate.descriptionTime = '18:00 - 3:00';

								descriptionTemplate.temp = `Температура воздуха будет ${minTempTwo}° C.`;

								let gotResponseTemp = this.getDescriptionTemp(minTempTwo);

								descriptionTemplate.descriptionTemp = gotResponseTemp.tempDescriptionTemplate;

								if(gotResponseTemp.tempImages.length > 0) {
									for(let j = 0; j < gotResponseTemp.tempImages.length; j++) {
										descriptionTemplate.imageUrls.push(gotResponseTemp.tempImages[j]);
									}
								}

								descriptionTemplate.descriptionWeather = gotResponse.weatherTextTemplate;

								if(gotResponse.weatherImages.length > 0) {
									for(let j = 0; j < gotResponse.weatherImages.length; j++) {
										descriptionTemplate.imageUrls.push(gotResponse.weatherImages[j]);
									}
								}

								twoDayPart = true;
								
								this.weatherClothes.push(descriptionTemplate);
							}
						}
					}
				}
				
				this.$store.dispatch('clothesList', this.weatherClothes);
			},
			getWeatherWeekdays() {
				let lastPush;
				const data = this.weatherHours.times;

				for(let i = 0; i < data.length; i++) {
					const oneWeekday = {
						dayData: {
							dateDay: data[i].dateDay,
							weekDay: data[i].weekDay,
							dateMonth: data[i].month,
						},
						dayTimes: []
					};

					const nowPush = data[i].dateDay + '.' + data[i].month;

					if(nowPush != lastPush) {
						let night = false;
						let morning = false;
						let day = false;
						let noon = false;

						for(let j = 0; j < data.length; j++) {
							if(data[j].dateDay + '.' + data[j].month == data[i].dateDay + '.' + data[i].month) {
								let oneWeekdayTime = {
									dayTime: '',
									weather: data[j].weather,
									weatherIcon: data[j].weatherIcon,
									temp: data[j].temp,
									pressure: data[j].pressure,
									humidity: data[j].humidity,
									wind: data[j].wind,
									like: data[j].like
								}

								let nowTime = data[j].time;

								if(nowTime == '00:00' || nowTime == '03:00' && !night) {
									oneWeekdayTime.dayTime = 'Ночь';

									night = true;

									oneWeekday.dayTimes.push(oneWeekdayTime);
								} else if(nowTime == '06:00' || nowTime == '09:00' && !morning) {
									oneWeekdayTime.dayTime = 'Утро';

									morning = true;

									oneWeekday.dayTimes.push(oneWeekdayTime);
								} else if(nowTime == '12:00' || nowTime == '15:00' && !day) {
									oneWeekdayTime.dayTime = 'День';

									day = true;

									oneWeekday.dayTimes.push(oneWeekdayTime);
								} else if (nowTime == '18:00' || nowTime == '21:00' && !noon) {
									oneWeekdayTime.dayTime = 'Вечер';

									noon = true;

									oneWeekday.dayTimes.push(oneWeekdayTime);
								}
							}
						}

						this.weatherWeekdays.push(oneWeekday);
					}

					lastPush = nowPush;
				}

				this.$store.dispatch('weatherList', this.weatherWeekdays);
			},
			async getWeather() {
				let apiKey = 'd7ec45e86dfa9106e508bf8492569f9e';
				let city = this.$store.getters.regionGet;
				let url = `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}&q=${city}&lang=ru`;
				await axios.get(url).then(res => {
					this.isError = false;

					const response = res.data;

					const sortedTimes = [];

					for(let i = 0; i < response.list.length; i++) {
						const directionDeg = response.list[i].wind.deg;

						let currentDirection;

						if (directionDeg > 337 && directionDeg <= 22)
							currentDirection = 'С'
						else if (directionDeg > 22 && directionDeg <= 67)
							currentDirection = 'СВ'
						else if (directionDeg > 67 && directionDeg <= 112)
							currentDirection = 'В'
						else if (directionDeg > 112 && directionDeg <= 157)
							currentDirection = 'ЮВ'
						else if (directionDeg > 157 && directionDeg <= 202)
							currentDirection = 'Ю'
						else if (directionDeg > 202 && directionDeg <= 247)
							currentDirection = 'ЮЗ'
						else if (directionDeg > 247 && directionDeg <= 292)
							currentDirection = 'З'
						else
							currentDirection = 'СЗ'

						let correctWeatherIcon = 'https://openweathermap.org/img/wn/' + response.list[i].weather[0].icon.slice(0, 2) + 'd@4x.png';

						correctWeatherIcon = correctWeatherIcon.replaceAll('https://openweathermap.org/img/wn/13d@4x.png', SnowImage);

						const oneTime = {
							time: dayjs(response.list[i].dt_txt).format('HH:mm'),
							dateDay: dayjs(response.list[i].dt_txt).format('DD'),
							weekDay: dayjs(response.list[i].dt_txt).format('dddd'),
							month: dayjs(response.list[i].dt_txt).format('MMMM'),
							weather: response.list[i].weather[0].description[0].toUpperCase() + response.list[i].weather[0].description.substring(1),
							weatherIcon: correctWeatherIcon,
							temp: Math.floor(response.list[i].main.temp - 273.15),
							like: Math.floor(response.list[i].main.feels_like - 273.15),
							pressure: Math.floor(response.list[i].main.pressure * 0.750064),
							humidity: response.list[i].main.humidity,
							wind: Math.round(response.list[i].wind.speed),
							windDirection: currentDirection,
							weatherImg: response.list[i].weather[0].icon.slice(0, 2)
						};

						sortedTimes.push(oneTime);
					}

					const sortedResponse = {
						regionName: response.city.name,
						times: sortedTimes
					};

					this.weatherHours = sortedResponse;

					this.$store.dispatch('hoursList', this.weatherHours);

					this.weatherWeekdays = [];
					this.weatherClothes = [];

					this.getWeatherWeekdays();
					this.getDayParts();
				}).catch(res => {
					res.data;

					this.isError = true;
				})
			},
			setCity() {
				if(localStorage.getItem('setCity') == null) {
					localStorage.setItem('setCity', 'Самара');
					this.$store.dispatch('regionSave', localStorage.getItem('setCity'));
				} else
					this.$store.dispatch('regionSave', localStorage.getItem('setCity'));
			}
		}
	}
</script>

<style>
	body, a, p, h1, h2, h3, h4, h5, h6, img, button {
		margin: 0;
		padding: 0;
		text-decoration: none;
		user-select: none;
	}

	body {
		background-color: #F9F9F9;
	}

	* {
		scrollbar-width: thin;
		scrollbar-color: #D8E8EB unset;
	}

	*::-webkit-scrollbar {
		height: 8px;
		width: 8px;
	}

	*::-webkit-scrollbar-track {
		background: unset;
	}

	*::-webkit-scrollbar-thumb {
		background-color: #D8E8EB;
		border-radius: 7px;
	}

	footer {
		position: relative;
		width: 100%;
		height: 60px;
		margin-top: 58px;
		background-color: #12263A;
	}

	.darkThemeText {
		color: white
	}

	@media (max-width: 768px) {
		.not-m {
			display: none;
		}
	}
</style>
