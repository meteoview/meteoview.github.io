<template>
	<div class="hour-data-container">
		<img :src="oneHour.hoursWeather" alt="" class="hour-weather-icon">
		<div class="hour-temperature" :class="{'other-color': colorText}">
			{{ oneHour.hoursTemp }}°C
		</div>
		<div class="hour-time-container">
			<div class="hour-time" :class="{'other-color': colorText}">
				{{ oneHour.hoursTime }}
			</div>
		</div>
	</div>
</template>
	
<script>
	export default {
		name: 'OneHour',
		props: {
			oneHour: {},
			colorText: {}
		}
	}
</script>
	
<style lang="scss">
	@import '@/scss/hour.scss';
</style>