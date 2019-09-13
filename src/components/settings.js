import React, {Component} from "react";
import styled from 'styled-components';

const SettingsContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  text-align: right;
  padding: 20px 10px; 
  .btn-setting {
    background: none;
    border: 2px solid white;
    padding: 5px 20px;
    font-size: 15px;
    font-weight: bold; 
    color: white;
    border-radius: 5px;
    outline: none;
  }

`;

const Modal = styled.div`
  padding: 20px;
  width: 350px;
  height: 400px;
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
    h3 {
      margin: 0;
    }
  }
  .settings-timer, .setting-language, .settings-theme {
    margin: 20px 0;
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

`;

class Settings extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        visible: false
       };
    }

    handleShowModal = () => {
        this.setState({ visible: true })
    }

    handleHideModal = () => {
        this.setState({ visible: false })
    }

    render() {
      return (
        <SettingsContainer>
            <button className="btn-setting" onClick={() => this.handleShowModal()}>Setting</button>
            {this.state.visible && 
                <Modal>
                  <div className="header-modal">
                    <h3>Timer setting</h3>
                    <button onClick={() => this.handleHideModal()}>X</button>
                  </div>
                  <hr/>
                  <div className="modal-content">
                    <div className="settings-timer">
                      <div>
                        <label>Pomodoro</label>
                        <input type="number" min="0" step="1" value="4" />
                      </div>
                      <div>
                        <label>Short Break</label>
                        <input type="number" min="0" step="1" value="4" />
                      </div>
                      <div>
                        <label>Long Break</label>
                        <input type="number" min="0" step="1" value="4" />
                      </div>
                    </div>
                    <hr/>
                    <div className="setting-language">
                      <h4>Language</h4>
                      <div>
                        <label for="en">EN</label>
                        <input type="radio" id="en" name="language" />
                      </div>
                      <div>
                        <label for="ru">RU</label>
                        <input type="radio" id="ru" name="language" />
                      </div>
                      <div>
                        <label for="uk">UK</label>
                        <input type="radio" id="uk" name="language"/>
                      </div>
                    </div> 
                    <hr/> 
                    <div className="settings-theme">
                      <h4>Theme</h4>  
                      <div>
                        <span>Dark</span>
                        <input type="radio" id="themeDark" name="theme" />
                      </div>
                    </div>
                  </div>
                  <hr/> 
                </Modal>
            }
        </SettingsContainer>
      );
    }
  }
  
export default Settings;