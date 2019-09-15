export const GET_ASSETS_LIST_REQUEST = "GET_ASSETS_LIST_REQUEST";

const initState = {
	pomodoro: null,
	shortBreak: null,
	longBreak: null,
};

export const timerSettingReducers = (state = initState, action) => {
	switch (action.type) {
		case GET_ASSETS_LIST_REQUEST:
			return { ...state, loadingAssetsList: true };
		default:
			return state;
	}
};

export const getAssetsList = (result) => async dispatch => {

};

export const getExchangeRates = (rates) => async dispatch => {
};
