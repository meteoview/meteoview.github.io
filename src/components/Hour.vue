<template>
	<div class="hour-data-container">
		<img :src="oneHour.weatherIcon" alt="" class="hour-weather-icon">
		<p class="hour-temperature">
			{{ oneHour.temp }}°C
		</p>
		<p class="hour-time">
			{{ oneHour.time }}
		</p>
	</div>
</template>
	
<script>
	export default {
		name: 'OneHour',
		props: {
			oneHour: {}
		}
	}
</script>
	
<style lang="scss">
	@import '@/scss/hour.scss';
</style>