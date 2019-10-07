export const SET_DEFAULT_SETTINGS_VALUE = "SET_DEFAULT_SETTINGS_VALUE";
export const SET_TIMER_SECONDS = "SET_TIMER_SECONDS";
export const RESET_TIMER = "RESET_TIMER";
export const SET_TIMER_TITLE = "SET_TIMER_TITLE";

const initState = {
	title: "pomodoro",
};

export const timerReducers = (state = initState, action) => {
	switch (action.type) {
		case SET_DEFAULT_SETTINGS_VALUE:
			return { ...state };
		case RESET_TIMER: 
			return { ...state, title: "pomodoro" };
		case SET_TIMER_TITLE: 
			return { ...state, title: action.payload };
		default:
			return state;
	}
};

export const setDefaultSetting = () => async dispatch => {
	dispatch({ type: SET_DEFAULT_SETTINGS_VALUE });
};

export const resetTimer = () => async dispatch => {
	dispatch({ type: RESET_TIMER });
}

export const setTimerTitle = (title) => async dispatch => {
	dispatch({ type: SET_TIMER_TITLE, payload: title });
}