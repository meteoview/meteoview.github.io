<template>
	<div class="day-table-container">
		<div class="div-table ">
			<div class="div-table-row row-header">
				<div class="div-table-col div-table-col-three">
					<div class="day-weekday">{{day.dayData.weekDay}}</div>
					<div class="day-date-month">
						<div class="table-day-date">{{day.dayData.dateDay}}</div>
						<div class="table-day-month">{{day.dayData.dateMonth}}</div>
					</div>
				</div>
				<div class="div-table-col for-little">
					<div class="last-cols">
						Давление, <br>мм рт. ст.
					</div>
				</div>
				<div class="div-table-col for-little">
					<div class="last-cols">
						Влажность
					</div>
				</div>
				<div class="div-table-col for-little last-col">
					<div class="last-cols">
						Ветер, <br>м/с
					</div>
				</div>
			</div>
			<div class="div-table-cols-container">
				<TableString v-for="(item, index) in day.dayTimes" :key="index" :dayWeatherData="item"/>
			</div>
		</div>
	</div>
</template>

<script>
	import TableString from '@/components/String.vue';

    export default {
		name: 'DayTable',
		components: {
			TableString
		},
		props: {
			day: {}
		}
	}
</script>

<style lang="scss">
	@import '@/scss/table.scss';
</style>