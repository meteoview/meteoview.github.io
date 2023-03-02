<template>
	<div class="today-clothes-container">
		<div class="today-clothes-description-container">
			<h2 class="today-clothes-day">{{ dayClothes.descriptionTime }}</h2>
			<p class="today-clothes-description">
				{{ dayClothes.tempDescription }}
			</p>
			<p class="today-clothes-description">
				{{ dayClothes.descriptionOne }}
			</p>
			<p class="today-clothes-description">
				{{ dayClothes.descriptionTwo }}
			</p>
		</div>
		<div class="clothes-images-cntainer">
			<img :src="require('@/assets/' + item)" alt="" class="one-clothes-item" v-for="(item, index) in dayClothes.imageUrl" :key="index">
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