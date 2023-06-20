<template>
	<div class="today-clothes-container">
		<div class="today-clothes-description-container">
			<div class="description-time-container">
				<h2 class="today-clothes-day-part">
					{{ dayClothes.descriptionTitle }}
				</h2>
				<p class="today-clothes-time">
					{{ dayClothes.descriptionTime }}
				</p>
			</div>
			<p class="today-clothes-description">
				{{ dayClothes.temp }}
			</p>
			<p class="today-clothes-description">
				{{ dayClothes.descriptionTemp }}
			</p>
			<p class="today-clothes-description">
				{{ dayClothes.descriptionWeather }}
			</p>
		</div>
		<div class="clothes-images-cntainer">
			<img
				class="clothes-img"
				v-for="(item, index) in dayClothes.imageUrls"
				:key="index"
				:src="require('@/assets/' + item)"
			>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TodayClothes',
		props: {
			dayClothes: {}
		}
	}
</script>

<style lang="scss">
	@import '@/scss/todayClothes.scss';
</style>