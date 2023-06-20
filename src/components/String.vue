<template>
	<div class="div-table-row">
		<div class="div-table-col-row first col-m">
			<p class="col-text">
				{{ dayWeatherData.dayTime }}
			</p>
		</div>
		<div class="div-table-col-row col-temp not-m">
			<p class="col-text">
				{{ dayWeatherData.temp }}°C
			</p>
		</div>
		<div class="div-table-col-row third col-m">
			<img :src="dayWeatherData.weatherIcon" alt="" class="table-weather-img">
			<p class="col-text not-m">
				{{ dayWeatherData.weather }}
			</p>
		</div>
		<div class="div-table-col-row col-m temp-m">
			<p class="col-text">
				{{ dayWeatherData.temp }}°C
			</p>
		</div>
		<div class="div-table-col-row not-m">
			<p class="col-text">
				{{ dayWeatherData.pressure }}
			</p>
		</div>
		<div class="div-table-col-row not-m">
			<p class="col-text">
				{{ dayWeatherData.humidity }}%
			</p>
		</div>
		<div class="div-table-col-row col-m cell-wind">
			<p class="col-text">
				{{ dayWeatherData.wind }} 
				<span class="wind-m">м/с</span>
			</p>
		</div>
		<div class="div-table-col-row not-m not-n">
			<p class="col-text">
				{{ dayWeatherData.like }}°C
			</p>
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