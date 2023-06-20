export default {
	state: {
		weekdaysList: [],
		hoursList: [],
		clothesList: [],
		region: ''
	},
	mutations: {
		weatherList(state, payload) {
			state.weekdaysList = payload;
		},
		hoursList(state, payload) {
			state.hoursList = payload;
		},
		clothesList(state, payload) {
			state.clothesList = payload;
		},
		regionSet(state, payload) {
			state.region = payload;
		}
	},
	actions: {
		weatherList({commit}, payload) {
			commit('weatherList', payload);
		},
		hoursList({commit}, payload) {
			commit('hoursList', payload);
		},
		clothesList({commit}, payload) {
			commit('clothesList', payload);
		},
		regionSave({commit}, payload) {
			commit('regionSet', payload);
		}
	},
	getters: {
		nowWeather(state) {
			return state.weekdaysList;
		},
		nowHours(state) {
			return state.hoursList;
		},
		nowClothes(state) {
			return state.clothesList;
		},
		regionGet(state) {
			return state.region;
		}
	}
}