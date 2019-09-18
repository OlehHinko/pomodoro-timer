import React from 'react';
import './App.css';
import Timer from "./components/timer"
import Settings from "./components/settings"
import Translation from './components/translations';

function App() {
  return (
    <>
      <Settings/>
      <Timer/>
      <Translation />
   </>
  );
}

export default App;

