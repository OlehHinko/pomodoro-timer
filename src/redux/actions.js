import { setDefaultSetting, setSeconds, setCounterSkip, resetTimer } from "./timer-reduser";
import { tick } from "./timer-reduser";
import { setPomodoroDurations, setShortBreackDurations, setLongBrackDurations, setTimerLanguage} from "./timer-settings-reduser"

export default {
    timer: { setDefaultSetting, setSeconds, setCounterSkip, resetTimer },
    tick: { tick },
    timerSetting: {setPomodoroDurations, setShortBreackDurations, setLongBrackDurations, setTimerLanguage}
}