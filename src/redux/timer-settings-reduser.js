export const SET_DURATIONS_POMODORO = "SET_DURATIONS_POMODORO";
export const SET_DURATION_SHORT_BREAK = "SET_DURATION_SHORT_BREAK";
export const SET_DURATIONS_LONG_BREAK = "SET_DURATIONS_LONG_BREAK";
export const SET_TIMER_LANGUAGE = "SET_TIMER_LANGUAGE";

const initState = {
	pomodoroDurations: null,
	shortBreakDurations: null,
	longBreakDurations: null,
	language: "en",
	theme: "pomodoro",
	
};

export const timerSettingReducers = (state = initState, action) => {
	switch (action.type) {
		case SET_DURATIONS_POMODORO:
			return { ...state, pomodoroDurations: action.payload };
		case SET_DURATION_SHORT_BREAK:
			return { ...state, pomodoroDurations: action.payload };
		case SET_DURATIONS_LONG_BREAK:
			return { ...state, pomodoroDurations: action.payload };
		case SET_TIMER_LANGUAGE
		:
			return { ...state, pomodoroDurations: action.payload };
		default:
			return state;
	}
};

export const setPomodoroDurations = (seconds) => async dispatch => {
	dispatch({ type: SET_DURATIONS_POMODORO, payload: seconds });
};

export const setShortBreackDurations = (seconds) => async dispatch => {
	dispatch({ type: SET_DURATION_SHORT_BREAK, payload: seconds });
};

export const setLongBrackDurations = (seconds) => async dispatch => {
	dispatch({ type: SET_DURATIONS_LONG_BREAK, payload: seconds });
};

export const setTimerLanguage = (language) => async dispatch => {
	dispatch({ type: SET_TIMER_LANGUAGE, payload: language });
};