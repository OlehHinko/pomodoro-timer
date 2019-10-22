import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import Actions from "../../redux/actions";
import {Theme} from "../../api/constants";
import Setting from "./setting.component";
import {usePrevious} from "../../utils"

const SettingContainer = (props) =>  {

  const [visible, setVisible] = useState(false);
  const [prevTheme, setPrevTheme] = useState("");
  const { theme, title, i18n } = props;

  const prevTitle = usePrevious(title);

  useEffect(() => {
    if((title === prevTitle || title !== prevTitle) && theme === "black"){
      if(prevTitle === "pomodoro") {
        setPrevTheme(Theme.pomodoro);
      } else if( prevTitle === "short_break") {
        setPrevTheme(Theme.shortBreak);
      } else if( prevTitle === "long_break") {
        setPrevTheme(Theme.longBreak);
      }
    }

    i18n.changeLanguage(localStorage.getItem("language"));
   
  }, [prevTitle, theme, title, i18n, visible]);

  const handleShowModal = () => {
    setVisible(true);
  }

  const handleHideModal = () => {
    setVisible(false);
  }

  const handleChange = (e) => {
    const {
      setPomodoroDurations,
      setShortBreakDurations,
      setLongBreakDurations,
      setThemeTimer,
      setTimerLanguage,
      theme,
      i18n,
    } = props;
    
    if(e.target.name === "pomodoro"){
      setPomodoroDurations(e.target.value * 60);
    } else if (e.target.name === "shortBreak"){
      setShortBreakDurations(e.target.value * 60);
    } else if (e.target.name === "longBreak") {
      setLongBreakDurations(e.target.value * 60);
    } else if (e.target.checked && e.target.name === "theme") {
      setPrevTheme(theme);
      setThemeTimer(Theme.themeDark);
    } else if (!e.target.checked && e.target.name === "theme" ) {
      setThemeTimer(prevTheme);
    } else if ( e.target.name === "language" ) {
      i18n.changeLanguage(e.target.value);
      setTimerLanguage(e.target.value);
    } 
  }

  const checkDefaultValue = () => {
    const {language} = props;
    if(language === "en") {
      return "en"
    } else  if (language === "ua") {
      return "ua"
    } else if (language === "ru") {
      return "ru"
    } 
  }

  const {
      pomodoroDurations,
      longBreakDurations,
      shortBreakDurations,
       t,
    } = props;

  return (
        <Setting 
          visible={visible}
          pomodoroDurations={pomodoroDurations}
          longBreakDurations={longBreakDurations}
          shortBreakDurations={shortBreakDurations}
          theme={theme}
          handleShowModal={handleShowModal}
          handleHideModal={handleHideModal}
          handleChange={handleChange}
          t={t}
          checkDefaultValue={checkDefaultValue}
        />
      );
  }
  
  export default connect(
    state => {
      return {
        pomodoroDurations: state.timerSetting.pomodoroDurations,
        shortBreakDurations: state.timerSetting.shortBreakDurations,
        longBreakDurations: state.timerSetting.longBreakDurations,
        theme: state.timerSetting.theme,
        title: state.timer.title,
        language: state.timerSetting.language,
      };
    },
    {
      setPomodoroDurations: Actions.timerSetting.setPomodoroDurations,
      setShortBreakDurations: Actions.timerSetting.setShortBreakDurations,
      setLongBreakDurations: Actions.timerSetting.setLongBreakDurations,
      setTimerLanguage: Actions.timerSetting.setTimerLanguage,
      setThemeTimer: Actions.timerSetting.setThemeTimer,
    }
)(SettingContainer);
