import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { timerSettingReducers } from "./timer-settings-reduser"
import { timerReducers } from "./timer-reduser"

export default history =>
	combineReducers({
		router: connectRouter(history),
		timer: timerReducers,
	    timerSetting: timerSettingReducers,
	});
