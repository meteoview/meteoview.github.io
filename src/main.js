import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import store from '@/store/store.js';
import App from '@/App.vue';
import MainPage from '@/pages/MainPage.vue';
import ClothesPage from '@/pages/ClothesPage.vue';

const routes = [
	{
		path: '/',
		name: 'main',
		component: MainPage
	},
	{
		path: '/?/clothes',
		name: 'clothes',
		component: ClothesPage
	},
	{
		path: '/?/:pathMatch(.*)*',
		redirect: '/'
	}
];

const app = createApp(App);

const router = createRouter({
	history: createWebHistory(),
	routes,
	store
});

app.use(store);

app.use(router).mount('#app')