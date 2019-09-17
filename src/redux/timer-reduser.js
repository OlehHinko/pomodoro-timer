export const SET_DEFAULT_SETTINGS_VALUE = "SET_DEFAULT_SETTINGS_VALUE";
export const TIMER_TICK = "TIMER_TICK";
export const SET_TIMER_SECONDS = "SET_TIMER_SECONDS";
export const SET_TIMER_COUNTER_SKIP = "SET_TIMER_COUNTER_SKIP";
export const RESET_TIMER = "RESET_TIMER";
export const SET_TIMER_TITLE = "SET_TIMER_TITLE";

const initState = {
	theme: "pomodoro",
	title: "pomodoro",
	counterSkip: 0,
	seconds: 1500,
};

export const timerReducers = (state = initState, action) => {
	switch (action.type) {
		case SET_DEFAULT_SETTINGS_VALUE:
			return { ...state };
		case TIMER_TICK: 
			return { ...state, seconds: state.seconds - 1};
		case SET_TIMER_SECONDS: 
			return { ...state, seconds: action.payload};
		case SET_TIMER_COUNTER_SKIP: 
			return { ...state, counterSkip: state.counterSkip + 1 };
		case RESET_TIMER: 
			return { ...state, counterSkip: 0, seconds: 1500, title: "pomodoro" };
		case SET_TIMER_TITLE: 
			return { ...state, title: action.payload };
		default:
			return state;
	}
};

export const setDefaultSetting = () => async dispatch => {
	dispatch({ type: SET_DEFAULT_SETTINGS_VALUE });
};

export const tick = () => async dispatch => {
	dispatch({ type: TIMER_TICK });
}

export const setSeconds = (seconds) => async dispatch => {
	dispatch({ type: SET_TIMER_SECONDS, payload: seconds});
}

export const setCounterSkip = () => async dispatch => {
	dispatch({ type: SET_TIMER_COUNTER_SKIP });
}

export const resetTimer = () => async dispatch => {
	dispatch({ type: RESET_TIMER });
}

export const setTimerTitle = (title) => async dispatch => {
	dispatch({ type: SET_TIMER_TITLE, payload: title });
}

