<template>
	<header class="real-header">
		<div class="page-header">
			<div class="links-container big-gap">
				<h1 class="page-title">
					<router-link to="/">
						<span class="title-capitals">M</span>eteo<span class="title-capitals">V</span>iew
					</router-link>
				</h1>
				<div class="region-search-container">
					<div class="region-container"
						@click="openList">
						<p class="region-name">{{nowRegionName}}</p>
						<img src="@/assets/open-arrow.png" alt="" class="open-arrow">
					</div>
					<div :class="{'regions-search-container': true, 'none': isOpen}">
						<header>
							<div class="region-search-header">
								<input type="text" class="region-search" placeholder="поиск" @input="searchRegions">
							</div>
						</header>
						<div class="regions-container">
							<ul class="regions-list">
								<li class="list-one"
									v-for="(region, index) in filteredRegions"
									:key="index"
									@click="saveRegion(region.regionName, region.name)"
								>
									{{region.name}}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="links-container">
				<router-link to="/">
					<div class="page-link-container one for-bg" :class="{'active': getActiveStateMain }">Главная</div>
				</router-link>
				<router-link to="/clothes">
					<div class="page-link-container one for-bg" :class="{'active': getActiveState }">Рекомендации на сегодня</div>
				</router-link>
				<div class="bg-open-icon"
				@click="openBg">
					<div class="bg-icon-line" v-for="i in 3" :key="i"></div>
				</div>
			</div>
		</div>
		<div :class="{'content-container-bg': true, 'none': bgIsOpen}">
			<div class="region-search-container-bg">
				<div class="region-container-bg"
				@click="openListBg">
					<p class="region-name-bg">{{nowRegionName}}</p>
					<img src="@/assets/open-arrow.png" alt="" class="open-arrow-bg">
				</div>
				<div :class="{'regions-search-container-bg': true, 'none': isOpenBg}">
					<header>
						<div class="region-search-header-bg">
							<input type="text" class="region-search-bg" placeholder="поиск" @input="searchRegions">
						</div>
					</header>
					<div class="regions-container-bg">
						<ul class="regions-list-bg">
							<li class="list-one"
								v-for="(region, index) in filteredRegions"
								:key="index"
								@click="saveRegion(region.regionName, region.name)"
							>
								{{region.name}}
							</li>
						</ul>
					</div>
				</div>
			</div>
			<router-link to="/">
				<div class="page-link-container-bg" :class="{'active': getActiveStateMain }">Главная</div>
			</router-link>
			<router-link to="/clothes">
				<div class="page-link-container-bg" :class="{'active': getActiveState }">Рекомендации на сегодня</div>
			</router-link>
		</div>
	</header>
</template>
<script>
	export default {
		name: 'PageHeader',
		data() {
			return {
				isOpen: true,
				bgIsOpen: true,
				isOpenBg: true,
				nowRegionName: localStorage.getItem(`cityName`),
				regions: [
					{
						name: `Московская обл.`,
						regionName: `Moscow Oblast`
					},
					{
						name: `Самарская обл.`,
						regionName: `Samarskaya Oblast`
					},
					{
						name: `Иркутская обл.`,
						regionName: `Irkutskaya Oblast`
					},
					{
						name: `Пермский край`,
						regionName: `Perm Krai`
					},
					{
						name: `Ленинградская обл.`,
						regionName: `Leningradskaya Oblast`
					},
					{
						name: `Воронежская обл.`,
						regionName: `Voronezhskaya Oblast`
					},
					{
						name: `Нижегородская обл.`,
						regionName: `Nizhegorodskaya Oblast`
					},
					{
						name: `Мурманская обл.`,
						regionName: `Murmanskaya Oblast`
					},
					{
						name: `Ульяновская обл.`,
						regionName: `Ulyanovsk Oblast`
					},
					{
						name: `Тульская обл.`,
						regionName: `Tul’skaya Oblast’`
					},
					{
						name: `Ростовская обл.`,
						regionName: `Rostovskaya Oblast`
					},
					{
						name: `Новгородская обл.`,
						regionName: `Novgorodskaya Oblast`
					},
					{
						name: `Саратовская обл.`,
						regionName: `Saratovskaya Oblast`
					},
					{
						name: `Оренбургская обл.`,
						regionName: `Orenburgskaya Oblast’`
					},
					{
						name: `Пензенская обл.`,
						regionName: `Penzenskaya Oblast’`
					}
				],
				textSearch: ``
			};
		},
		computed: {
			getActiveState() {
				return this.$route.name === 'clothes';
			},
			getActiveStateMain() {
				return this.$route.name === 'main';
			},
			filteredRegions() {
				return this.textSearch !== `` ? this.regions.filter(item => item.name.toLowerCase().includes(this.textSearch) || item.regionName.toLowerCase().includes(this.textSearch)) : this.regions;
			}
		},
		methods: {
			openList() {
				this.isOpen = !this.isOpen;
			},
			openBg() {
				this.bgIsOpen = !this.bgIsOpen;
			},
			openListBg() {
				this.isOpenBg = !this.isOpenBg;
			},
			saveRegion(regionTextId, regionName) {
				localStorage.setItem(`setCity`, regionTextId);
				localStorage.setItem(`cityName`, regionName);
				this.nowRegionName = regionName;
				this.openList();
				this.openListBg();
				this.$store.dispatch(`regionSave`, regionTextId);
			},
			searchRegions(event) {
				this.textSearch = event.target.value.toLowerCase();
			}
		}
	}
</script>

<style lang="scss">
	@import '@/scss/header.scss';
</style>