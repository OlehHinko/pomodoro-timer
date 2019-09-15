import React, {Component} from "react";
import styled from 'styled-components';
import { connect } from "react-redux";
import Actions from "../redux/actions";

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
        seconds: 60,
        timerStart: false,
        counterSkip: 0,
       };
    }
  
    /*tick() {
      this.setState(state => ({
        seconds: state.seconds - 1, 
      }));
    }*/
  
    componentDidMount() {
      //this.interval = setInterval(() => this.tick(), 1000);
      const { setDefaultSetting } = this.props;
      setDefaultSetting();
    }
  
    componentWillUpdate() {
      const { seconds } = this.props;
      if(seconds === 1) {
        clearInterval(this.interval);
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
        this.setState({seconds: 60})
    }

    handleTimerPause = () => {
      clearInterval(this.interval);
    }

    handleTimerSkip = () => {
      this.setState({counterSkip: this.state.counterSkip + 1})
      this.handleCheckCounterSkip();
    }

    handleCheckCounterSkip = () => {
      const {counterSkip} = this.state;
      if ( counterSkip % 2 === 0 ) {
        this.setState({seconds: 300})
      } else if (counterSkip === 9) {
        this.setState({seconds: 1200})
      } else {
        this.setState({seconds: 1500})
      }
    }

    render() {
      console.log(this.state);
      const { seconds } = this.props;
      return (
        <Card>
            <Title>Pomodoro</Title>
            <Time>
                {Math.floor(seconds / 60) + ': ' + seconds % 60}
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
        title: state.timer.stitle,
      };
    },
    {
      setDefaultSetting: Actions.timer.setDefaultSetting,
      tick: Actions.tick.tick,
    }
  )(Timer);