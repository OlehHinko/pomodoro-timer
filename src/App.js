import React from 'react';
import './App.css';
import Timer from "./components/timer"
import Settings from "./components/settings"
import { withTranslation } from 'react-i18next';


function App() {
  return (
    <>
      <Settings/>
      <Timer/>
    </>
  );
}

export default withTranslation('common')(App);

