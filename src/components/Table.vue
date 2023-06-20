<template>
	<div class="div-day-table">
		<div class="div-table-row-header">
			<div class="div-table-col-data-day not-m">
				<p class="table-day-month">
					{{day.dayData.dateDay}}
				</p>
				<div class="day-date-month-container">
					<p class="day-date-month">
						{{day.dayData.dateMonth}}, <br />
						{{day.dayData.weekDay}}
					</p>
				</div>
			</div>
			<div class="div-table-col-data-day on-m">
				<p class="table-weekday">
					{{day.dayData.weekDay}}
					<span class="day-date-month">
						{{day.dayData.dateDay}} {{day.dayData.dateMonth}}
					</span>
				</p>
			</div>
			<div class="div-table-col not-m">
				<p class="col-text">
					давление, <br>мм рт. ст.
				</p>
			</div>
			<div class="div-table-col not-m">
				<p class="col-text">
					влажность
				</p>
			</div>
			<div class="div-table-col not-m col-wind">
				<p class="col-text">
					ветер, <br>м/с
				</p>
			</div>
			<div class="div-table-col not-n">
				<p class="col-text">
					ощущается как
				</p>
			</div>
		</div>
		<div class="div-table-cols-container">
			<TableString v-for="(item, index) in day.dayTimes" :key="index" :dayWeatherData="item"/>
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