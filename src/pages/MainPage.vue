<template>
	<main>
		<div class="weather-container" :style="setStyle()">
			<div class="weather-today-container">
				<header>
					<div class="weather-today-header">
						<div class="header-elems-container">
							<div class="day-date">Погода по часам на 5 дней</div>
						</div>
					</div>
				</header>
				<div class="times-container">
					<HourData v-for="(item, index) in hoursNow" :key="index" :oneHour="item" :colorText="setColorForText()" />
				</div>
			</div>
		</div>
		<h2 class="week-weather">Погода на 5 дней</h2>
		<div class="week-days-container">
			<DayTable v-for="(item, index) in weatherNow" :key="index" :day="item" />
		</div>
	</main>
</template>
	
<script>
	import DayTable from '@/components/Table.vue';
	import HourData from '@/components/Hour.vue';

	export default {
		name: 'MainPage',
		watch: {
			$route: {
				immediate: true,
				handler(to) {
					document.title = to.meta.title || 'MeteoView: главная страница';
				}
			}
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
			setStyle() {
				if(this.hoursNow[0] != undefined) {
					let bgStyle = {
						background: 'url(' + require('@/assets/' + this.hoursNow[0].backgroundUrl + 'd.jpg') + ') no-repeat center center',
						backgroundAttachment: 'fixed',
						backgroundSize: 'cover'
					};

					return bgStyle;
				}
			},
			setColorForText() {
				if(this.hoursNow[0] != undefined) {
					let color = true;

					if(this.hoursNow[0].backgroundUrl == '02' || this.hoursNow[0].backgroundUrl == '03' || this.hoursNow[0].backgroundUrl == '50') {
						color = false;
					}

					return color;
				}
			}
		}
	}
</script>
	
<style lang="scss">
	@import '@/scss/main.scss';
</style>