<template>
	<header class="header">
		<div class="content-container">
			<div class="content-blocks">
				<h1
					class="page-title"
					@click="goMain"
				>
					<span class="page-title-capitals">M</span>eteo<span class="page-title-capitals">V</span>iew
				</h1>
				<div class="region-search-container">
					<div class="region-container" @click="openSearch" v-if="!isOpen">
						<p class="region-name">{{ nowRegionName }}</p>
						<img src="@/assets/pen.svg" alt="" class="pen-icon">
					</div>
					<div class="region-input-container" v-if="isOpen">
						<input type="text" class="input-search-region" placeholder="поиск региона" v-model="regionName" @keyup.enter="onEnter">
						<button class="button-search-region" @click="saveRegion">
							<img src="@/assets/search.svg" alt="" class="search-img">
						</button>
					</div>
				</div>
			</div>
			<div class="buttons-container">
				<button
					class="button-link"
					:class="{
						'active': $route.name == 'main'
					}"
					@click="goMain"
				>
					Главная
				</button>
				<button
					class="button-link"
					:class="{
						'active': $route.name == 'clothes',
						'darkThemeText': theme
					}"
					@click="goClothes"
				>
					Рекомендации по одежде
				</button>
			</div>
		</div>
		<div class="content-container-m">
			<div class="weather-container-m" :style="setStyle()">
				<div class="weather-today-container-m">
					<div class="region-container-m" @click="openSearch" v-if="!isOpen">
						<h5 class="region-opened-m">{{ nowRegionNameM }}</h5>
						<img src="@/assets/pen-m.svg" alt="" class="pen-icon">
					</div>
					<div class="region-input-container" v-if="isOpen">
						<input type="text" class="input-search-region" placeholder="поиск региона" v-model="regionName" @keyup.enter="onEnter">
						<button class="button-search-region" @click="saveRegion">
							<img src="@/assets/search.svg" alt="" class="search-img">
						</button>
					</div>
					<p class="time-now-m">Сейчас {{ getNowTime() }}</p>
					<button class="link-button-m" @click="goClothes" v-if="$route.name == 'main'">
						<img class="link-img-m" src="@/assets/clothes-button.svg" alt="">
					</button>
					<button class="link-button-m link-main-button" @click="goMain" v-if="$route.name == 'clothes'">
						<img class="link-img-m link-main" src="@/assets/main-icon.png" alt="">
					</button>
					<div class="temp-data-container-m">
						<div class="temp-weather-container-m">
							<p class="temp-now-m">{{ getTemp() }}° C</p>
							<img class="weather-now-img-m" :src="setNowWeatherImg()" alt="">
						</div>
						<p class="weather-now-text-m">{{ getWeather() }}</p>
						<p class="feels-now-text-m">Ощущается как {{ getLike() }}° C</p>
						<div class="other-data-container-m">
							<div class="other-data-m">
								<img class="windy-img-m" src="@/assets/windy.svg" alt="">
								<p class="other-data-text-m">{{ getWind() }} м/с, {{ getWindDir() }}</p>
							</div>
							<div class="other-data">
								<img class="humidity-img-m" src="@/assets/humidity.svg" alt="">
								<p class="other-data-text-m">{{ getHumidity() }}%</p>
							</div>
							<div class="other-data-m">
								<img class="pressure-img-m" src="@/assets/pressure.svg" alt="">
								<p class="other-data-text-m">{{ getPressure() }} мм рт. ст.</p>
							</div>
						</div>
					</div>
					<div class="weather-today-container-dark-m">
						<div class="times-container-m">
							<HourData v-for="(item, index) in hoursNow.times" :key="index" :oneHour="item" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>
<script>
	import dayjs from 'dayjs';
	import HourData from '@/components/Hour.vue';

	export default {
		name: 'PageHeader',
		data() {
			return {
				isOpen: false,
				bgIsOpen: true,
				isOpenBg: true,
				nowRegionName: '',
				nowRegionNameM: '',
				regionName: '',
				theme: this.$store.getters.getTheme
			};
		},
		components: {
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
		mounted() {
			this.getRegion();
		},
		methods: {
			getRegion() {
				if(localStorage.getItem('setCity')) {
					this.nowRegionName = String(localStorage.getItem('setCity')).substring(0, 14);
					this.nowRegionNameM = String(localStorage.getItem('setCity')).substring(0, 16);
				} else {
					localStorage.setItem('setCity', 'Самара');
					
					this.nowRegionName = String(localStorage.getItem('setCity')).substring(0, 14);
					this.nowRegionNameM = String(localStorage.getItem('setCity')).substring(0, 16);
				}
			},
			goMain() {
				this.$router.push({
					name: 'main'
				});
			},
			goClothes() {
				this.$router.push({
					name: 'clothes'
				});
			},
			openSearch() {
				this.isOpen = !this.isOpen;
			},
			onEnter() {
				this.saveRegion();
			},
			saveRegion() {
				localStorage.setItem('setCity', this.regionName);
				this.nowRegionName = this.regionName.substring(0, 14);
				this.nowRegionNameM = this.regionName.substring(0, 16);
				this.openSearch();
				this.$store.dispatch('regionSave', this.regionName);
				this.regionName = '';
			},
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
	@import '@/scss/header.scss';
</style>