export default {
	state: {
		daysList: [],
		hoursList: [],
		clothesList: []
	},
	mutations: {
		weatherList(state, payload) {
			state.daysList.push(payload);
		},
		hoursList(state, payload) {
			state.hoursList.push(payload);
		},
		clothesList(state, payload) {
			state.clothesList.push(payload);
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
		}
	}
}