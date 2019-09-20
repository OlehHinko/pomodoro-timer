import React, {Component} from "react";
import {connect} from "react-redux";
import Actions from "../redux/actions";
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {withTranslation} from "react-i18next";

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
      width: 25%;
      label {
        font-size: 15px;
        font-weight: 700;
        padding-left: 10px;
      }
      input {
        width: 100%;
      }
    }
    h4 {
      line-height: 44px;
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
    }
    span {
      font-size: 15px;
      font-weight: 700;
      padding-left: 10px;
    }
    input {
      margin: 5px 10px 0;
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
    } = this.props;
    console.log(e.target.value);
    if(e.target.name === "pomodoro"){
      setPomodoroDurations(e.target.value * 60);
    } else if (e.target.name === "shortBreak"){
      setShortBreakDurations(e.target.value * 60);
    } else if (e.target.name === "longBreak") {
      setLongBreakDurations(e.target.value * 60);
    } else if (e.target.name === "theme") {
      setThemeTimer("black");
    }
  }

  render() {
      const {visible} = this.state;
      const {pomodoroDurations, longBreakDurations, shortBreakDurations } = this.props;

      return (
        <SettingsContainer>
            <button className="btn-setting" onClick={() => this.handleShowModal()}>Setting</button>
            { visible &&
                <Modal>
                  <div className="header-modal">
                    <h3>Timer setting</h3>
                    <button onClick={() => this.handleHideModal()}>X</button>
                  </div>
                  <hr/>
                  <form onSubmit={this.handleSubmit}>
                    <div className="modal-content">
                      <div className="settings-timer">
                        <div>
                          <label>Pomodoro</label>
                          <input type="number" name="pomodoro" min="0" step="1" onChange={this.handleChange} defaultValue={pomodoroDurations/60} />
                        </div>
                        <div>
                          <label>Short Break</label>
                          <input type="number" name="shortBreak" min="0" step="1" onChange={this.handleChange} defaultValue={shortBreakDurations/60} />
                        </div>
                        <div>
                          <label>Long Break</label>
                          <input type="number" name="longBreak" min="0" step="1" onChange={this.handleChange} defaultValue={longBreakDurations/60} />
                        </div>
                      </div>
                      <hr/>
                      <div className="setting-language">
                        <h4>Language</h4>
                        <div>
                          <label>EN</label>
                          <input type="radio" id="en" name="en" />
                        </div>
                        <div>
                          <label>RU</label>
                          <input type="radio" id="ru" name="ru" />
                        </div>
                        <div>
                          <label>UK</label>
                          <input type="radio" id="uk" name="uk"/>
                        </div>
                      </div> 
                      <hr/> 
                      <div className="settings-theme">
                        <h4>Theme</h4>  
                        <div>
                          <span>Dark</span>
                          <input type="radio" onChange={this.handleChange} id="themeDark" name="theme" />
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