import { createStore } from 'vuex';
import weatherData from '@/store/weatherData.js';

const store = createStore({
	modules: {
		weatherData
	}
})

export default store;