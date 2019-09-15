export const SET_DEFAULT_SETTINGS_VALUE = "SET_DEFAULT_SETTINGS_VALUE";
export const TIMER_TICK = "TIMER_TICK";

const initState = {
	language: "en",
	theme: "pomodoro",
	duration: "pomodoro",
	counterSkip: 0,
	seconds: 1500,
};

export const timerReducers = (state = initState, action) => {
	switch (action.type) {
		case SET_DEFAULT_SETTINGS_VALUE:
			return { ...state };
		case TIMER_TICK: 
			console.log(state.seconds);
			return { ...state, seconds: state.seconds - 1};
		default:
			return state;
	}
};

export const setDefaultSetting = (result) => async dispatch => {
	dispatch({ type: SET_DEFAULT_SETTINGS_VALUE, playload: result });
};

export const tick = () => async dispatch => {
	dispatch({ type: TIMER_TICK });
}

export const setSeconds = (seconds) => async dispatch => {
	dispatch({ type: TIMER_TICK, playload: seconds});
}

