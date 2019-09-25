import React, {Component} from "react";
import {connect} from "react-redux";
import Actions from "../redux/actions";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {withTranslation} from "react-i18next";
import {Theme} from "../api/constants"
import {getTranslations} from "../api/translations"

const SettingsContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  text-align: right;
  padding: 20px 10px; 
  position: fixed;
  left: 35%;
  width: 30%;
  z-index: 2;
  `;

const Modal = styled.div`
  padding: 10px;
  width: 350px;
  height: 350px;
  position: fixed;
  top: 100px;
  left: calc(50% - 175px);
  text-align: center;
  background-color: white;
  z-index: 1;
  border-radius: 20px;
  h4 {
    font-size: 17px;
    font-weight: 700;
    margin: 0;
  }
  .header-modal {
    display: flex;
    justify-content: space-between;
    background-color: gray;
    padding: 10px;
    h3 {
      margin: 0;
      line-height: 31px;
    }
  }
  .settings-timer, .setting-language, .settings-theme {
    margin: 15px 0;
  }
  .settings-timer{
    display: flex;
    justify-content: space-between;
    > * {
      width: 30%;
      label {
        font-size: 17px;
        font-weight: 700;
      }
      input {
        width: 70%;
        padding: 5px 10px;
        font-size: 17px;
        background-color: gray;
        outline: none;
      }
    }
  }
  .setting-language {
    display: flex;
    justify-content: space-between;
    > * {
      width: 50%;
      select {
        outline: none;
        width: 100%;
      }
    }
    h4 {
      line-height: 30px;
      text-align: left;
      padding-left: 20px;
    }
  }
  .settings-theme {
    display: flex;
    > * {
      width: 50%;
    }
    h4 {
      text-align: left;
      line-height: 24px;
      padding-left: 20px;
    }
    span {
      font-size: 15px;
      font-weight: 700;
      padding-left: 10px;
    }
    input[type=checkbox] {
      position: relative;
      cursor: pointer;
    }
    input[type=checkbox]:before {
      content: "";
      display: block;
      position: absolute;
      width: 15px;
      height: 15px;
      top: 0;
      left: 0;
      border: 2px solid #555555;
      border-radius: 3px;
      background-color: white;
    }
    input[type=checkbox]:checked:after {
      content: "";
      display: block;
      width: 5px;
      height: 10px;
      border: solid black;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      top: 2px;
      left: 6px;
    }
  }
  .modal-footer {
    height: 50px;
    background-color: gray;
    button {
      margin: 10px;
      float: right;
    }
  }
`;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      prevTheme: "",
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUpdate(prevProps) {
    const { theme, title } = this.props;

    if(title !== prevProps.title && theme === "black"){
      if(prevProps.title === "Pomodoro") {
        this.setState({prevTheme: Theme.pomodoro})
      } else if( prevProps.title === "Short break") {
        this.setState({prevTheme: Theme.shoptBreak})
      } else if( prevProps.title === "Long break") {
        this.setState({prevTheme: Theme.longBreak})
      }
      
    }
  }


  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this);

    if ((!domNode || !domNode.contains(event.target))) {
      this.setState({visible: false});
    }
  }

  handleShowModal = () => {
    this.setState({visible: true})
  }

  handleHideModal = () => {
    this.setState({visible: false})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({visible: false})
  }

  handleChange = (e) => {
    const {
      setPomodoroDurations,
      setShortBreakDurations,
      setLongBreakDurations,
      setThemeTimer,
      setTimerLanguage,
      theme,
    } = this.props;
    
    if(e.target.name === "pomodoro"){
      setPomodoroDurations(e.target.value * 60);
    } else if (e.target.name === "shortBreak"){
      setShortBreakDurations(e.target.value * 60);
    } else if (e.target.name === "longBreak") {
      setLongBreakDurations(e.target.value * 60);
    } else if (e.target.checked && e.target.name === "theme") {
      this.setState({prevTheme: theme});
      setThemeTimer(Theme.themeDark);
    } else if (!e.target.checked && e.target.name === "theme" ) {
      setThemeTimer(this.state.prevTheme);
    } else if ( e.target.name === "language" ) {
      setTimerLanguage(e.target.value);
      getTranslations();
    } 
  }

  render() {
      const {visible} = this.state;
      const {
        pomodoroDurations,
        longBreakDurations,
        shortBreakDurations,
        theme,
        t,
       } = this.props;

      return (
        <SettingsContainer>
            <button className="btn-setting" onClick={() => this.handleShowModal()}>{t('Setting')}</button>
            { visible &&
                <Modal>
                  <div className="header-modal">
                    <h3>{t('Timer setting')}</h3>
                    <button onClick={() => this.handleHideModal()}>X</button>
                  </div>
                  <hr/>
                  <form onSubmit={this.handleSubmit}>
                    <div className="modal-content">
                      <div className="settings-timer">
                        <div>
                          <label>{t('Pomodoro')}</label>
                          <input 
                            type="number" 
                            name="pomodoro"
                            min="0" step="1" 
                            onChange={this.handleChange} 
                            defaultValue={pomodoroDurations/60} />
                        </div>
                        <div>
                          <label>{t('Short break')}</label>
                          <input 
                            type="number" 
                            name="shortBreak" 
                            min="0" 
                            step="1" 
                            onChange={this.handleChange} 
                            defaultValue={shortBreakDurations/60} />
                        </div>
                        <div>
                          <label>{t('Long break')}</label>
                          <input 
                            type="number" 
                            name="longBreak" 
                            min="0" 
                            step="1" 
                            onChange={this.handleChange} 
                            defaultValue={longBreakDurations/60} />
                        </div>
                      </div>
                      <hr/>
                      <div className="setting-language">
                        <h4>{t('Language')}</h4>
                        <select name="language" onChange={this.handleChange}>
                          <option defaultValue="en">en</option>
                          <option defaultValue="uk">uk</option>
                          <option defaultValue="ru">ru</option>
                        </select>
                      </div> 
                      <hr/> 
                      <div className="settings-theme">
                        <h4>{t('Darck theme')}</h4>  
                        <div>
                          <input 
                            type="checkbox" 
                            onChange={this.handleChange} 
                            id="themeDark" 
                            name="theme"
                            checked={theme === "black"}
                            />
                        </div>
                      </div>
                      <hr/> 
                    </div>
                    <div className="modal-footer">
                      <button type="submit">OK</button>
                    </div>
                  </form>
                </Modal>
            }
        </SettingsContainer>
      );
    }
  }
  
  export default connect(
    state => {
      return {
        pomodoroDurations: state.timerSetting.pomodoroDurations,
        shortBreakDurations: state.timerSetting.shortBreakDurations,
        longBreakDurations: state.timerSetting.longBreakDurations,
        theme: state.timerSetting.theme,
        title: state.timer.title,
      };
    },
    {
      setPomodoroDurations: Actions.timerSetting.setPomodoroDurations,
      setShortBreakDurations: Actions.timerSetting.setShortBreakDurations,
      setLongBreakDurations: Actions.timerSetting.setLongBreakDurations,
      setTimerLanguage: Actions.timerSetting.setTimerLanguage,
      setThemeTimer: Actions.timerSetting.setThemeTimer,
    }
)(withTranslation()(Settings));