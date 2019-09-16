import React, {Component} from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import Actions from "../redux/actions";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

/*i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      uk: {
        translation: {
          "Setting": "Settings"
        }
      }
    },
    lng: "uk",
    fallbackLng: "uk",

    interpolation: {
      escapeValue: false
    }
  });*/

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Card = styled.div`
  width: 500px;
  height: 300px;
  position: fixed;
  top: 150px;
  left: calc(50% - 250px);
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
`;

const Time = styled.div`
  color: white;
  font-size: 100px;
  font-weight: bold;
`;

class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        timerStart: false,
       };
    }
  
    componentDidMount() {
      const { setDefaultSetting } = this.props;
      setDefaultSetting();
      
    }
  
    componentWillUpdate() {
      const { seconds, setCounterSkip } = this.props;

      if(seconds === 1) {
        clearInterval(this.interval);
        setCounterSkip();
        this.handleCheckCounterSkip();
        this.setState({ timerStart: false });
      }
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    handleTimerStart = () => {
      const {tick } = this.props;
        this.interval = setInterval(() => tick(), 1000);
        this.setState({timerStart: true})
    }

    handleTimerReset = () => {
      const {resetTimer} = this.props;
      resetTimer()
    }

    handleTimerPause = () => {
      clearInterval(this.interval);
    }

    handleTimerSkip = () => {
      const { setCounterSkip } = this.props; 
      setCounterSkip();
      this.handleCheckCounterSkip();
    }

    handleCheckCounterSkip = () => {
      const {counterSkip, setSeconds} = this.props;

      if ( counterSkip === 8 ) {
        setSeconds(1200);
      } else if (counterSkip % 2 === 0 ) {
        setSeconds(300);
      } else {
        setSeconds(1500);
      }
    }

    render() {
      const { seconds, title } = this.props;

      return (
        <Card>
            <Title>{title}</Title>
            <Time>
                {Math.floor(seconds / 60)  + ': ' + seconds % 60}
            </Time>
            { !this.state.timerStart && <button onClick={() => this.handleTimerStart()}>start</button> }
            { this.state.timerStart && <button onClick={() => this.handleTimerPause()}>pause</button> }
            <button onClick={() => this.handleTimerReset()}>reset</button>
            { this.state.timerStart && <button onClick={() => this.handleTimerSkip()}>skip</button> }
        </Card>
      );
    }
  }
  
  export default connect(
    state => {
      return {
        seconds: state.timer.seconds,
        title: state.timer.title,
        counterSkip: state.timer.counterSkip,
      };
    },
    {
      setDefaultSetting: Actions.timer.setDefaultSetting,
      tick: Actions.tick.tick,
      setSeconds: Actions.timer.setSeconds,
      setCounterSkip: Actions.timer.setCounterSkip,
      resetTimer: Actions.timer.resetTimer,
    }
  )(Timer);