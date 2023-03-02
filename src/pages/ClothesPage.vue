<template>
	<main>
		<TodayClothes  v-for="(item, index) in clothesNow" :key="index" :dayClothes="item" class="clothes-container" />
	</main>
</template>
	
<script>
	import TodayClothes from '@/components/TodayClothes.vue';

	export default {
		name: 'ClothesPage',
		watch: {
			$route: {
				immediate: true,
				handler(to) {
					document.title = to.meta.title || 'MeteoView: одежда на сегодня';
				}
			}
		},
		components: {
			TodayClothes
		},
		computed: {
			clothesNow () {
				return this.$store.getters.nowClothes;
			}
		}
	}
</script>
	
<style lang="scss">
	@import '@/scss/clothes.scss';
</style>