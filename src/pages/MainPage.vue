<template>
	<main class="main-content-container">
		<div class="main-content-block">
			<div class="weather-container" :style="setStyle()">
				<div class="weather-today-container">
					<h5 class="region-opened">{{ hoursNow.regionName }}</h5>
					<p class="time-now">Сейчас {{ getNowTime() }}</p>
					<div class="temp-data-container">
						<p class="temp-now">{{ getTemp() }}° C</p>
						<img class="weather-now-img" :src="setNowWeatherImg()" alt="">
						<div>
							<p class="weather-now-text">{{ getWeather() }}</p>
							<p class="feels-now-text">Ощущается как {{ getLike() }}° C</p>
						</div>
					</div>
					<div class="other-data-container">
						<div class="other-data">
							<img class="windy-img" src="@/assets/windy.svg" alt="">
							<p class="other-data-text">{{ getWind() }} м/с, {{ getWindDir() }}</p>
						</div>
						<div class="other-data">
							<img class="humidity-img" src="@/assets/humidity.svg" alt="">
							<p class="other-data-text">{{ getHumidity() }}%</p>
						</div>
						<div class="other-data">
							<img class="pressure-img" src="@/assets/pressure.svg" alt="">
							<p class="other-data-text">{{ getPressure() }} мм рт. ст.</p>
						</div>
					</div>
					<div class="weather-today-container-dark">
						<div class="times-container">
							<HourData v-for="(item, index) in hoursNow.times" :key="index" :oneHour="item" />
						</div>
					</div>
				</div>
			</div>
			<div class="week-days-container">
				<DayTable v-for="(item, index) in weatherNow" :key="index" :day="item" />
			</div>
		</div>
	</main>
</template>
	
<script>
	import dayjs from 'dayjs';
	import HourData from '@/components/Hour.vue';
	import DayTable from '@/components/Table.vue';

	export default {
		name: 'MainPage',
		watch: {
			$route: {
				immediate: true,
				handler(to) {
					document.title = to.meta.title || 'MeteoView: главная страница';
				}
			},
		},
		components: {
			DayTable,
			HourData
		},
		computed: {
			weatherNow () {
				return this.$store.getters.nowWeather;
			},
			hoursNow () {
				return this.$store.getters.nowHours;
			}
		},
		methods: {
			getNowTime() {
				return dayjs().format('HH:mm');
			},
			getPressure() {
				if(this.hoursNow.times != undefined) {
					return this.hoursNow.times[0].pressure;
				}
			},
			getHumidity() {
				if(this.hoursNow.times != undefined) {
					return this.hoursNow.times[0].humidity;
				}
			},
			getWindDir() {
				if(this.hoursNow.times != undefined) {
					return this.hoursNow.times[0].windDirection;
				}
			},
			getWind() {
				if(this.hoursNow.times != undefined) {
					return this.hoursNow.times[0].wind;
				}
			},
			getWeather() {
				if(this.hoursNow.times != undefined) {
					return this.hoursNow.times[0].weather;
				}
			},
			getLike() {
				if(this.hoursNow.times != undefined) {
					return this.hoursNow.times[0].like;
				}
			},
			getTemp() {
				if(this.hoursNow.times != undefined) {
					return this.hoursNow.times[0].temp;
				}
			},
			setStyle() {
				if(this.hoursNow.times != undefined) {
					let bgStyle = {
						background: 'url(' + require('@/assets/' + this.hoursNow.times[0].weatherImg + 'd.jpg') + ') no-repeat center center',
						backgroundSize: 'cover'
					};

					return bgStyle;
				}
			},
			setNowWeatherImg() {
				if(this.hoursNow.times != undefined) {
					let src = this.hoursNow.times[0].weatherIcon;

					return src;
				}
			}
		}
	}
</script>
	
<style lang="scss">
	@import '@/scss/main.scss';
</style>