<template>
	<div class="container">
		<PageHeader v-if="isShow"/>
		<router-view/>
	</div>
</template>

<script>
	import axios from 'axios';
	import PageHeader from '@/components/Header.vue';
	import SnowImage from '@/assets/snow.png';

	export default {
		name: "App",
		components: {
			PageHeader
		},
		computed: {
			isShow() {
				return this.$route.name === 'clothes' || this.$route.name === 'main';
			}
		},
		mounted() {
			this.getWeather();
		},
		methods: {
			async getWeather() {
				let apiKey = `d7ec45e86dfa9106e508bf8492569f9e`;
				let city = this.setCity();
				let url = `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}&q=${city}`;
				await axios.get(url).then(res => {
					let lastPush;

					let oneDayPart = false;
					let twoDayPart = false;

					let oneDayPartTimeTempSumOne = 0;
					let oneDayPartTimeTempOnOne = 0;
					let oneDayPartTimeTempSumTwo = 0;
					let oneDayPartTimeTempOnTwo = 0;

					for(let i = 0; i < res.data.list.length; i++) {
						let weekDayName = String(new Date(res.data.list[i].dt_txt.slice(0, 10)).getDay());

						weekDayName = weekDayName.replaceAll("0", "Воскресенье");
						weekDayName = weekDayName.replaceAll("1", "Понедельник");
						weekDayName = weekDayName.replaceAll("2", "Вторник");
						weekDayName = weekDayName.replaceAll("3", "Среда");
						weekDayName = weekDayName.replaceAll("4", "Четверг");
						weekDayName = weekDayName.replaceAll("5", "Пятница");
						weekDayName = weekDayName.replaceAll("6", "Суббота");

						let monthName = res.data.list[i].dt_txt.slice(5, 7);

						monthName = monthName.replaceAll("01", "января");
						monthName = monthName.replaceAll("02", "февраля");
						monthName = monthName.replaceAll("03", "марта");
						monthName = monthName.replaceAll("04", "апреля");
						monthName = monthName.replaceAll("05", "мая");
						monthName = monthName.replaceAll("06", "июня");
						monthName = monthName.replaceAll("07", "июля");
						monthName = monthName.replaceAll("08", "августа");
						monthName = monthName.replaceAll("09", "сентября");
						monthName = monthName.replaceAll("10", "октября");
						monthName = monthName.replaceAll("11", "ноября");
						monthName = monthName.replaceAll("12", "декабря");
						
						let oneDay = {
							dayData: {
								weekDay: weekDayName,
								dateDay: res.data.list[i].dt_txt.slice(8, 10),
								dateMonth: monthName,
							},
							dayTimes: []
						};

						if(res.data.list[i].dt_txt.slice(0, 10) != lastPush) {
							let morning = false;
							let day = false;
							let noon = false;
							let night = false;

							if(!morning || !day || !noon || !night) {
								for(let j = 0; j < res.data.list.length; j++) {
									if(res.data.list[j].dt_txt.slice(0, 10) == res.data.list[i].dt_txt.slice(0, 10)) {
										let weatherText = res.data.list[j].weather[0].icon.slice(0, 2);

										weatherText = weatherText.replaceAll(`01`, `Ясное небо`);
										weatherText = weatherText.replaceAll(`02`, `Малооблачно`);
										weatherText = weatherText.replaceAll(`03`, `Облачно`);
										weatherText = weatherText.replaceAll(`04`, `Пасмурно`);
										weatherText = weatherText.replaceAll(`09`, `Морось`);
										weatherText = weatherText.replaceAll(`10`, `Дождь`);
										weatherText = weatherText.replaceAll(`11`, `Гроза`);
										weatherText = weatherText.replaceAll(`13`, `Снег`);
										weatherText = weatherText.replaceAll(`50`, `Туман`);

										let correctWeatherIcon = 'https://openweathermap.org/img/wn/' + res.data.list[j].weather[0].icon.slice(0, 2) + 'd@4x.png';

										let nowTime = res.data.list[j].dt_txt.slice(11, 16);
										let correctTime;

										if(nowTime == "00:00" || nowTime == "03:00") {
											if(!night) {
												correctTime = "Ночь";

												let oneDayTime = {
													dayTime: correctTime,
													weather: weatherText,
													weatherIcon: correctWeatherIcon,
													temp: Math.floor(res.data.list[j].main.temp - 273.15),
													pressure: Math.floor(res.data.list[j].main.pressure * 0.750064),
													humidity: res.data.list[j].main.humidity,
													wind: Math.round(res.data.list[j].wind.speed)
												}

												oneDay.dayTimes.push(oneDayTime);

												night = true;
											}
										} else if(nowTime == "06:00" || nowTime == "09:00") {
											if(!night) {
												correctTime = "Ночь";

												let oneDayTime = {
													dayTime: correctTime,
													weather: weatherText,
													weatherIcon: correctWeatherIcon,
													temp: Math.floor(res.data.list[j].main.temp - 273.15),
													pressure: Math.floor(res.data.list[j].main.pressure * 0.750064),
													humidity: res.data.list[j].main.humidity,
													wind: Math.round(res.data.list[j].wind.speed)
												}

												oneDay.dayTimes.push(oneDayTime);

												night = true;
											}

											if(!morning) {
												correctTime = "Утро";

												let oneDayTime = {
													dayTime: correctTime,
													weather: weatherText,
													weatherIcon: correctWeatherIcon,
													temp: Math.floor(res.data.list[j].main.temp - 273.15),
													pressure: Math.floor(res.data.list[j].main.pressure * 0.750064),
													humidity: res.data.list[j].main.humidity,
													wind: Math.round(res.data.list[j].wind.speed)
												}

												oneDay.dayTimes.push(oneDayTime);

												morning = true;
											}
										} else if(nowTime == "12:00" || nowTime == "15:00") {
											if(!night) {
												correctTime = "Ночь";

												let oneDayTime = {
													dayTime: correctTime,
													weather: weatherText,
													weatherIcon: correctWeatherIcon,
													temp: Math.floor(res.data.list[j].main.temp - 273.15),
													pressure: Math.floor(res.data.list[j].main.pressure * 0.750064),
													humidity: res.data.list[j].main.humidity,
													wind: Math.round(res.data.list[j].wind.speed)
												}

												oneDay.dayTimes.push(oneDayTime);

												night = true;
											}

											if(!morning) {
												correctTime = "Утро";

												let oneDayTime = {
													dayTime: correctTime,
													weather: weatherText,
													weatherIcon: correctWeatherIcon,
													temp: Math.floor(res.data.list[j].main.temp - 273.15),
													pressure: Math.floor(res.data.list[j].main.pressure * 0.750064),
													humidity: res.data.list[j].main.humidity,
													wind: Math.round(res.data.list[j].wind.speed)
												}

												oneDay.dayTimes.push(oneDayTime);

												morning = true;
											}

											if(!day) {
												correctTime = "День";

												let oneDayTime = {
													dayTime: correctTime,
													weather: weatherText,
													weatherIcon: correctWeatherIcon,
													temp: Math.floor(res.data.list[j].main.temp - 273.15),
													pressure: Math.floor(res.data.list[j].main.pressure * 0.750064),
													humidity: res.data.list[j].main.humidity,
													wind: Math.round(res.data.list[j].wind.speed)
												}

												oneDay.dayTimes.push(oneDayTime);

												day = true;
											}
										} else if(nowTime == "18:00" || nowTime == "21:00") {
											if(!night) {
												correctTime = "Ночь";

												let oneDayTime = {
													dayTime: correctTime,
													weather: weatherText,
													weatherIcon: correctWeatherIcon,
													temp: Math.floor(res.data.list[j].main.temp - 273.15),
													pressure: Math.floor(res.data.list[j].main.pressure * 0.750064),
													humidity: res.data.list[j].main.humidity,
													wind: Math.round(res.data.list[j].wind.speed)
												}

												oneDay.dayTimes.push(oneDayTime);

												night = true;
											}

											if(!morning) {
												correctTime = "Утро";

												let oneDayTime = {
													dayTime: correctTime,
													weather: weatherText,
													weatherIcon: correctWeatherIcon,
													temp: Math.floor(res.data.list[j].main.temp - 273.15),
													pressure: Math.floor(res.data.list[j].main.pressure * 0.750064),
													humidity: res.data.list[j].main.humidity,
													wind: Math.round(res.data.list[j].wind.speed)
												}

												oneDay.dayTimes.push(oneDayTime);

												morning = true;
											}

											if(!day) {
												correctTime = "День";

												let oneDayTime = {
													dayTime: correctTime,
													weather: weatherText,
													weatherIcon: correctWeatherIcon,
													temp: Math.floor(res.data.list[j].main.temp - 273.15),
													pressure: Math.floor(res.data.list[j].main.pressure * 0.750064),
													humidity: res.data.list[j].main.humidity,
													wind: Math.round(res.data.list[j].wind.speed)
												}

												oneDay.dayTimes.push(oneDayTime);

												day = true;
											}

											if(!noon) {
												correctTime = "Вечер";

												let oneDayTime = {
													dayTime: correctTime,
													weather: weatherText,
													weatherIcon: correctWeatherIcon,
													temp: Math.floor(res.data.list[j].main.temp - 273.15),
													pressure: Math.floor(res.data.list[j].main.pressure * 0.750064),
													humidity: res.data.list[j].main.humidity,
													wind: Math.round(res.data.list[j].wind.speed)
												}

												oneDay.dayTimes.push(oneDayTime);

												noon = true;
											}
										}
									}
								}
							}

							this.$store.dispatch(`weatherList`, oneDay);
						}

						lastPush = res.data.list[i].dt_txt.slice(0, 10);

						let correctWeatherIcon = 'https://openweathermap.org/img/wn/' + res.data.list[i].weather[0].icon.slice(0, 2) + 'd@4x.png';

						correctWeatherIcon = correctWeatherIcon.replaceAll(`https://openweathermap.org/img/wn/13d@4x.png`, SnowImage);

						let iconNumber = res.data.list[i].weather[0].icon.slice(0, 2);

						let oneHour = {
							backgroundUrl: iconNumber,
							hoursWeather: correctWeatherIcon,
							hoursTemp: Math.floor(res.data.list[i].main.temp - 273.15),
							hoursTime: res.data.list[i].dt_txt.slice(11, 16),
							dayDate: res.data.list[i].dt_txt.slice(0, 10)
						};

						this.$store.dispatch(`hoursList`, oneHour);

						if(!oneDayPart) {
							let weatherText = res.data.list[i].weather[0].icon.slice(0, 2);

							weatherText = weatherText.replaceAll(`01`, `Ясное небо`);
							weatherText = weatherText.replaceAll(`02`, `Малооблачно`);
							weatherText = weatherText.replaceAll(`03`, `Облачно`);
							weatherText = weatherText.replaceAll(`04`, `Пасмурно`);
							weatherText = weatherText.replaceAll(`09`, `Морось`);
							weatherText = weatherText.replaceAll(`10`, `Дождь`);
							weatherText = weatherText.replaceAll(`11`, `Гроза`);
							weatherText = weatherText.replaceAll(`13`, `Снег`);
							weatherText = weatherText.replaceAll(`50`, `Туман`);

							let nowTime = res.data.list[i].dt_txt.slice(11, 16);

							let endTempOne;
							let lastWeatherTextOne;
							
							let descriptionTemplate = {
								descriptionTime: ``,
								tempDescription: ``,
								descriptionOne: ``,
								descriptionTwo: ``,
								imageUrl: []
							};

							if(nowTime == "6:00" || nowTime == "9:00" || nowTime == "12:00" || nowTime == "15:00") {
								oneDayPartTimeTempSumOne += Number(Math.floor(res.data.list[i].main.temp - 273.15));
								oneDayPartTimeTempOnOne++;

								if(
									weatherText == `Ясное небо` ||
									weatherText == `Малооблачно` ||
									weatherText == `Облачно` ||
									weatherText == `Пасмурно` &&
									lastWeatherTextOne != `Морось` &&
									lastWeatherTextOne != `Дождь` &&
									lastWeatherTextOne != `Гроза` &&
									lastWeatherTextOne != `Снег` &&
									lastWeatherTextOne != `Туман`
								) {
									descriptionTemplate.descriptionTwo = `Осадков не будет.`;
								} else if (
									weatherText == `Морось` || weatherText == `Дождь` &&
									lastWeatherTextOne != `Гроза`
								) {
									descriptionTemplate.descriptionTwo = `Будет дождь, поэтому следует взять зонт или дождевик.`;
									descriptionTemplate.imageUrl.push(`rain-clothes.png`);
									descriptionTemplate.imageUrl.push(`umbrella.png`);
								} else if (weatherText == `Гроза`) {
									lastWeatherTextOne = `Будет гроза, поэтому с собой следует взять дождевик, зонт лучше не брать.`;
									descriptionTemplate.imageUrl.push(`rain-clothes.png`);
								}  else if (weatherText == `Снег` &&
									lastWeatherTextOne != `Гроза` &&
									lastWeatherTextOne != `Дождь` &&
									lastWeatherTextOne != `Морось`
								) {
									descriptionTemplate.descriptionTwo = `Следует одеться потеплее, потому что пойдет снег.`;
								} else if (
									weatherText == `Туман` &&
									lastWeatherTextOne != `Гроза` &&
									lastWeatherTextOne != `Снег` &&
									lastWeatherTextOne != `Дождь` &&
									lastWeatherTextOne != `Морось`
								) {
									descriptionTemplate.descriptionTwo = `Будет туман. Если вы за рулём, то будте осторожны.`;
								}

								if(nowTime == "15:00") {
									endTempOne = Math.floor(oneDayPartTimeTempSumOne / oneDayPartTimeTempOnOne);

									descriptionTemplate.descriptionTime = `Одежда на первую половину дня`;

									descriptionTemplate.tempDescription = `Температура воздуха будет ${endTempOne}°C.`;

									if(endTempOne > 25) {
										descriptionTemplate.descriptionOne = `Стоит надеть лёгкую однослойную одежду (футболку и шорты или юбку).`;
										descriptionTemplate.imageUrl.push(`t-shirt.png`);
										descriptionTemplate.imageUrl.push(`shorts.png`);
										descriptionTemplate.imageUrl.push(`showes.png`);
									} else if(endTempOne <= 25 && endTempOne > 15) {
										descriptionTemplate.descriptionOne = `Можно надеть однослойную одежду (штаны или шорты, футболку и кофту).`;
										descriptionTemplate.imageUrl.push(`tolstovka.png`);
										descriptionTemplate.imageUrl.push(`t-shirt.png`);
										descriptionTemplate.imageUrl.push(`jeance.png`);
										descriptionTemplate.imageUrl.push(`showes.png`);
									} else if(endTempOne <= 15 && endTempOne > 5) {
										descriptionTemplate.descriptionOne = `Следует надеть двухслойную одежду (штаны и демисезонную куртку поверх водолазки). Можно обуться потеплее.`;
										descriptionTemplate.imageUrl.push(`shapka.png`);
										descriptionTemplate.imageUrl.push(`kurtka.png`);
										descriptionTemplate.imageUrl.push(`vodolazka.png`);
										descriptionTemplate.imageUrl.push(`jeance.png`);
										descriptionTemplate.imageUrl.push(`winter-showes.png`);
									} else if(endTempOne <= 5 && endTempOne > -15) {
										descriptionTemplate.descriptionOne = `Следует надеть трёхслойную одежду (термобельё, тёплые штаны, зимнюю куртку и обувь). Под куртку нужно надеть толстовку. Не забудьте шапку!`;
										descriptionTemplate.imageUrl.push(`shapka.png`);
										descriptionTemplate.imageUrl.push(`kurtka.png`);
										descriptionTemplate.imageUrl.push(`tolstovka.png`);
										descriptionTemplate.imageUrl.push(`vodolazka.png`);
										descriptionTemplate.imageUrl.push(`jeance.png`);
										descriptionTemplate.imageUrl.push(`podjeance.png`);
										descriptionTemplate.imageUrl.push(`winter-showes.png`);
									} else if(endTempOne <= -15) {
										descriptionTemplate.descriptionOne = `Обязательно наденьте четырёхслойную одежду (термобельё, тёплые штаны, зимнюю куртку, свитер и кофту). Варежки и шапка тоже нужны.`;
										descriptionTemplate.imageUrl.push(`shapka.png`);
										descriptionTemplate.imageUrl.push(`kurtka.png`);
										descriptionTemplate.imageUrl.push(`tolstovka.png`);
										descriptionTemplate.imageUrl.push(`sviter.png`);
										descriptionTemplate.imageUrl.push(`vodolazka.png`);
										descriptionTemplate.imageUrl.push(`jeance.png`);
										descriptionTemplate.imageUrl.push(`podjeance.png`);
										descriptionTemplate.imageUrl.push(`winter-showes.png`);
									}

									this.$store.dispatch(`clothesList`, descriptionTemplate);

									oneDayPart = true;
								}
							}
						}

						if(!twoDayPart) {
							let weatherText = res.data.list[i].weather[0].icon.slice(0, 2);

							weatherText = weatherText.replaceAll(`01`, `Ясное небо`);
							weatherText = weatherText.replaceAll(`02`, `Малооблачно`);
							weatherText = weatherText.replaceAll(`03`, `Облачно`);
							weatherText = weatherText.replaceAll(`04`, `Пасмурно`);
							weatherText = weatherText.replaceAll(`09`, `Морось`);
							weatherText = weatherText.replaceAll(`10`, `Дождь`);
							weatherText = weatherText.replaceAll(`11`, `Гроза`);
							weatherText = weatherText.replaceAll(`13`, `Снег`);
							weatherText = weatherText.replaceAll(`50`, `Туман`);

							let nowTime = res.data.list[i].dt_txt.slice(11, 16);

							let endTempOne;
							let lastWeatherTextOne;
							
							let descriptionTemplate = {
								descriptionTime: ``,
								tempDescription: ``,
								descriptionOne: ``,
								descriptionTwo: ``,
								imageUrl: []
							};

							if(nowTime == "18:00" || nowTime == "21:00" || nowTime == "00:00" || nowTime == "03:00") {
								oneDayPartTimeTempSumTwo += Number(Math.floor(res.data.list[i].main.temp - 273.15));
								oneDayPartTimeTempOnTwo++;

								if(
									weatherText == `Ясное небо` ||
									weatherText == `Малооблачно` ||
									weatherText == `Облачно` ||
									weatherText == `Пасмурно` &&
									lastWeatherTextOne != `Морось` &&
									lastWeatherTextOne != `Дождь` &&
									lastWeatherTextOne != `Гроза` &&
									lastWeatherTextOne != `Снег` &&
									lastWeatherTextOne != `Туман`
								) {
									descriptionTemplate.descriptionTwo = `Осадков не будет.`;
								} else if (
									weatherText == `Морось` || weatherText == `Дождь` &&
									lastWeatherTextOne != `Гроза`
								) {
									descriptionTemplate.descriptionTwo = `Будет дождь, поэтому следует взять зонт или дождевик.`;
									descriptionTemplate.imageUrl.push(`rain-clothes.png`);
									descriptionTemplate.imageUrl.push(`umbrella.png`);
								} else if (weatherText == `Гроза`) {
									lastWeatherTextOne = `Будет гроза, поэтому с собой следует взять дождевик, зонт лучше не брать.`;
									descriptionTemplate.imageUrl.push(`rain-clothes.png`);
								}  else if (weatherText == `Снег` &&
									lastWeatherTextOne != `Гроза` &&
									lastWeatherTextOne != `Дождь` &&
									lastWeatherTextOne != `Морось`
								) {
									descriptionTemplate.descriptionTwo = `Следует одеться потеплее, потому что пойдет снег.`;
								} else if (
									weatherText == `Туман` &&
									lastWeatherTextOne != `Гроза` &&
									lastWeatherTextOne != `Снег` &&
									lastWeatherTextOne != `Дождь` &&
									lastWeatherTextOne != `Морось`
								) {
									descriptionTemplate.descriptionTwo = `Будет туман. Если вы за рулём, то будте осторожны.`;
								}

								if(nowTime == "03:00") {
									endTempOne = Math.floor(oneDayPartTimeTempSumTwo / oneDayPartTimeTempOnTwo);

									descriptionTemplate.descriptionTime = `Одежда на вторую половину дня`;

									descriptionTemplate.tempDescription = `Температура воздуха будет ${endTempOne}°C.`;

									if(endTempOne > 25) {
										descriptionTemplate.descriptionOne = `Стоит надеть лёгкую однослойную одежду (футболку и шорты или юбку).`;
										descriptionTemplate.imageUrl.push(`t-shirt.png`);
										descriptionTemplate.imageUrl.push(`shorts.png`);
										descriptionTemplate.imageUrl.push(`showes.png`);
									} else if(endTempOne <= 25 && endTempOne > 15) {
										descriptionTemplate.descriptionOne = `Можно надеть однослойную одежду (штаны или шорты, футболку и кофту).`;
										descriptionTemplate.imageUrl.push(`tolstovka.png`);
										descriptionTemplate.imageUrl.push(`t-shirt.png`);
										descriptionTemplate.imageUrl.push(`jeance.png`);
										descriptionTemplate.imageUrl.push(`showes.png`);
									} else if(endTempOne <= 15 && endTempOne > 5) {
										descriptionTemplate.descriptionOne = `Следует надеть двухслойную одежду (штаны и демисезонную куртку поверх водолазки). Можно обуться потеплее.`;
										descriptionTemplate.imageUrl.push(`shapka.png`);
										descriptionTemplate.imageUrl.push(`kurtka.png`);
										descriptionTemplate.imageUrl.push(`vodolazka.png`);
										descriptionTemplate.imageUrl.push(`jeance.png`);
										descriptionTemplate.imageUrl.push(`winter-showes.png`);
									} else if(endTempOne <= 5 && endTempOne > -15) {
										descriptionTemplate.descriptionOne = `Следует надеть трёхслойную одежду (термобельё, тёплые штаны, зимнюю куртку и обувь). Под куртку нужно надеть толстовку. Не забудьте шапку!`;
										descriptionTemplate.imageUrl.push(`shapka.png`);
										descriptionTemplate.imageUrl.push(`kurtka.png`);
										descriptionTemplate.imageUrl.push(`tolstovka.png`);
										descriptionTemplate.imageUrl.push(`vodolazka.png`);
										descriptionTemplate.imageUrl.push(`jeance.png`);
										descriptionTemplate.imageUrl.push(`podjeance.png`);
										descriptionTemplate.imageUrl.push(`winter-showes.png`);
									} else if(endTempOne <= -15) {
										descriptionTemplate.descriptionOne = `Обязательно наденьте четырёхслойную одежду (термобельё, тёплые штаны, зимнюю куртку, свитер и кофту). Варежки и шапка тоже нужны.`;
										descriptionTemplate.imageUrl.push(`shapka.png`);
										descriptionTemplate.imageUrl.push(`kurtka.png`);
										descriptionTemplate.imageUrl.push(`tolstovka.png`);
										descriptionTemplate.imageUrl.push(`sviter.png`);
										descriptionTemplate.imageUrl.push(`vodolazka.png`);
										descriptionTemplate.imageUrl.push(`jeance.png`);
										descriptionTemplate.imageUrl.push(`podjeance.png`);
										descriptionTemplate.imageUrl.push(`winter-showes.png`);
									}

									this.$store.dispatch(`clothesList`, descriptionTemplate);

									twoDayPart = true;
								}
							}
						}
					}
				})
			},
			setCity() {
				if(localStorage.getItem(`setCity`) == null) {
					localStorage.setItem(`setCity`, `Samarskaya Oblast`);
					localStorage.setItem(`cityName`, `Самарская обл.`);
				}

				return localStorage.getItem(`setCity`);
			}
		}
	}
</script>

<style>
	body, a, p, h1, h2, h3, h4, h5, h6 {
		margin: 0;
		padding: 0;
		text-decoration: none;
	}
</style>
