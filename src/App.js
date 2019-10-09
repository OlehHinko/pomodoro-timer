import React from 'react';
import './App.css';
import TimerContainer from "./components/timer/timer.container"
import SettingContainer from "./components/settings/setting.container"
import { withTranslation } from 'react-i18next';


function App({t, i18n}) {
  
  return (
    <>
      <SettingContainer t={t} i18n={i18n} />
      <TimerContainer t={t} i18n={i18n}/>
    </>
  );
}

export default withTranslation()(App);

