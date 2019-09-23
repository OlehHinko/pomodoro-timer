export const SET_DURATIONS_POMODORO = "SET_DURATIONS_POMODORO";
export const SET_DURATION_SHORT_BREAK = "SET_DURATION_SHORT_BREAK";
export const SET_DURATIONS_LONG_BREAK = "SET_DURATIONS_LONG_BREAK";
export const SET_TIMER_LANGUAGE = "SET_TIMER_LANGUAGE";
export const SET_TIMER_THEME = "SET_TIMER_THEME";

const initState = {
	pomodoroDurations: localStorage.getItem("pomodoroDuration") || 1500,
	shortBreakDurations: localStorage.getItem("shortBreakDurations") || 300,
	longBreakDurations: localStorage.getItem("longBreakDurations") || 1200,
	language: localStorage.getItem("language") || "en",
	theme: localStorage.getItem("timerTheme") || "red",
	
};

export const timerSettingReducers = (state = initState, action) => {
	switch (action.type) {
		case SET_DURATIONS_POMODORO:
			localStorage.setItem("pomodoroDuration", action.payload);
			return { ...state, pomodoroDurations: action.payload };
		case SET_DURATION_SHORT_BREAK:
			localStorage.setItem("shortBreakDurations", action.payload);
			return { ...state, shortBreakDurations: action.payload };
		case SET_DURATIONS_LONG_BREAK:
			localStorage.setItem("longBreakDurations", action.payload);
			return { ...state, longBreakDurations: action.payload };
		case SET_TIMER_LANGUAGE:
			localStorage.setItem("language", action.payload);
			return { ...state, language: action.payload };
    	case SET_TIMER_THEME:
			localStorage.setItem("timerTheme", action.payload);
      		return { ...state, theme: action.payload };
		default:
			return state;
	}
};

export const setPomodoroDurations = (seconds) => async dispatch => {
	dispatch({ type: SET_DURATIONS_POMODORO, payload: seconds });
};

export const setShortBreakDurations = (seconds) => async dispatch => {
	dispatch({ type: SET_DURATION_SHORT_BREAK, payload: seconds });
};

export const setLongBreakDurations = (seconds) => async dispatch => {
	dispatch({ type: SET_DURATIONS_LONG_BREAK, payload: seconds });
};

export const setTimerLanguage = (language) => async dispatch => {
	dispatch({ type: SET_TIMER_LANGUAGE, payload: language });
};

export const setThemeTimer = (theme) => async dispatch => {
  dispatch({ type: SET_TIMER_THEME, payload: theme });
};