import React from "react";
import {SettingsContainer, Modal} from "./setting.styled";

const Setting = (props) => {
 
      const {
        pomodoroDurations,
        longBreakDurations,
        shortBreakDurations,
        theme,
        t,
        visible,
        language,
       } = props;

      return (
        <SettingsContainer>
            <button className="btn-setting" onClick={() => props.handleShowModal()}>{t('setting')}</button>
            { visible &&
                <Modal>
                  <div className="header-modal">
                    <h3>{t('timer_setting')}</h3>
                    <button onClick={() => props.handleHideModal()}>X</button>
                  </div>
                  <hr/>
                  <form onSubmit={props.handleSubmit}>
                    <div className="modal-content">
                      <div className="settings-timer">
                        <div className="settings-timer-item">
                          <label>{t('pomodoro')}</label>
                          <input 
                            type="number" 
                            name="pomodoro"
                            min="0" step="1" 
                            onChange={props.handleChange} 
                            defaultValue={pomodoroDurations/60} />
                        </div>
                        <div className="settings-timer-item">
                          <label>{t('short_break')}</label>
                          <input 
                            type="number" 
                            name="shortBreak" 
                            min="0" 
                            step="1" 
                            onChange={props.handleChange} 
                            defaultValue={shortBreakDurations/60} />
                        </div>
                        <div className="settings-timer-item">
                          <label>{t('long_break')}</label>
                          <input 
                            type="number" 
                            name="longBreak" 
                            min="0" 
                            step="1" 
                            onChange={props.handleChange} 
                            defaultValue={longBreakDurations/60} />
                        </div>
                      </div>
                      <hr/>
                      <div className="setting-language">
                        <h4>{t('language')}</h4>
                        <select name="language" onChange={props.handleChange}>
                          <option selected={language==="en"} defaultValue="en">en</option>
                          <option selected={language==="ua"} defaultValue="uk">ua</option>
                          <option selected={language==="ru"} defaultValue="ru">ru</option>
                        </select>
                      </div> 
                      <hr/> 
                      <div className="settings-theme">
                        <h4>{t('dark_theme')}</h4>  
                        <div>
                          <input 
                            type="checkbox" 
                            onChange={props.handleChange} 
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
  
  export default Setting;