import { setDefaultSetting, setSeconds, setCounterSkip, resetTimer, setTimerTitle } from "./timer-reduser";
import { tick } from "./timer-reduser";
import { setPomodoroDurations, setShortBreakDurations, setLongBreakDurations, setTimerLanguage} from "./timer-settings-reduser"

export default {
    timer: { setDefaultSetting, setSeconds, setCounterSkip, resetTimer, setTimerTitle },
    tick: { tick },
    timerSetting: {setPomodoroDurations, setShortBreakDurations, setLongBreakDurations, setTimerLanguage}
}