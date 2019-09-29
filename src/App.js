import React from 'react';
import './App.css';
import TimerContainer from "./components/timer/timer.container"
import SettingContainer from "./components/settings/setting.container"
import { withTranslation } from 'react-i18next';


function App() {
  return (
    <>
      <SettingContainer/>
      <TimerContainer/>
    </>
  );
}

export default withTranslation('common')(App);

