import {
  setDefaultSetting,
  resetTimer,
  setTimerTitle,
} from "./timer-reduser";
import {
  setPomodoroDurations,
  setShortBreakDurations,
  setLongBreakDurations,
  setTimerLanguage,
  setThemeTimer,
} from "./timer-settings-reduser"

export default {
  timer: {
    setDefaultSetting,
    resetTimer,
    setTimerTitle,
  },
  timerSetting: {
    setPomodoroDurations,
    setShortBreakDurations,
    setLongBreakDurations,
    setTimerLanguage,
    setThemeTimer,
  }
}