export default {
	state: {
		daysList: [],
		hoursList: [],
		clothesList: [],
		regionNow: ``
	},
	mutations: {
		weatherList(state, payload) {
			state.daysList = payload;
		},
		hoursList(state, payload) {
			state.hoursList = payload;
		},
		clothesList(state, payload) {
			state.clothesList = payload;
		},
		regionNow(state, payload) {
			state.regionNow = payload;
		}
	},
	actions: {
		weatherList ({commit}, payload) {
			commit('weatherList', payload);
		},
		hoursList ({commit}, payload) {
			commit('hoursList', payload);
		},
		clothesList ({commit}, payload) {
			commit('clothesList', payload);
		},
		regionSave ({commit}, payload) {
			commit('regionNow', payload);
		}
	},
	getters: {
		nowWeather(state) {
			return state.daysList;
		},
		nowHours(state) {
			return state.hoursList;
		},
		nowClothes(state) {
			return state.clothesList;
		},
		regionNow(state) {
			return state.regionNow;
		}
	}
}