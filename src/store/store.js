import { createStore } from 'vuex';
import storeData from '@/store/storeData.js';

const store = createStore({
	modules: {
		storeData
	}
})

export default store;