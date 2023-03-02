<template>
	<div class="div-table-row">
		<div class="div-table-col-string div-table-col-string-one">
			<div class="col-text">{{ dayWeatherData.dayTime }}</div>
		</div>
		<div class="div-table-col-string weather-col">
			<div class="col-text for-big-string">
				<img :src="dayWeatherData.weatherIcon" alt="" class="table-weather-img">
				{{ dayWeatherData.weather }}
			</div>
			<img :src="dayWeatherData.weatherIcon" alt="" class="table-weather-img for-little-string">
		</div>
		<div class="div-table-col-string temp-col">
			<div class="col-text">{{ dayWeatherData.temp }}°C</div>
		</div>
		<div class="div-table-col-string">
			<div class="col-text">{{ dayWeatherData.pressure }}</div>
		</div>
		<div class="div-table-col-string">
			<div class="col-text">{{ dayWeatherData.humidity }}%</div>
		</div>
		<div class="div-table-col-string last-col-string last-col">
			<div class="col-text">{{ dayWeatherData.wind }}</div>
		</div>
	</div>
</template>

<script>
    export default {
		name: 'TableString',
		props: {
			dayWeatherData: {}
		}
	}
</script>

<style lang="scss">
	@import '@/scss/string.scss';
</style>