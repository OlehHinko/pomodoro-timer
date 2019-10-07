import React, {Component} from "react";
import {connect} from "react-redux";
import Actions from "../../redux/actions";
import ReactDOM from 'react-dom';
import {withTranslation} from "react-i18next";
import {Theme} from "../../api/constants";
import Setting from "./setting.component";

class SettingContainer extends Component {
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

  UNSAFE_componentWillMount() {
    document.addEventListener('click', this.handleClickOutside, false);
  }

  UNSAFE_componentWillUpdate(prevProps) {
    const { theme, title } = this.props;

    if(title !== prevProps.title && theme === "black"){
      if(prevProps.title === "pomodoro") {
        this.setState({prevTheme: Theme.pomodoro})
      } else if( prevProps.title === "short_break") {
        this.setState({prevTheme: Theme.shoptBreak})
      } else if( prevProps.title === "long_break") {
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
      const { i18n } = this.props;
      i18n.changeLanguage(e.target.value);
      setTimerLanguage(e.target.value);
    } 
  }

  render() {
      const {visible} = this.state;
      const {
        pomodoroDurations,
        longBreakDurations,
        shortBreakDurations,
        theme,
        language,
       } = this.props;

      return (
        <Setting 
          visible={visible}
          pomodoroDurations={pomodoroDurations}
          longBreakDurations={longBreakDurations}
          shortBreakDurations={shortBreakDurations}
          theme={theme}
          language={language}
          handleShowModal={this.handleShowModal}
          handleHideModal={this.handleHideModal}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
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
)(withTranslation()(SettingContainer));
