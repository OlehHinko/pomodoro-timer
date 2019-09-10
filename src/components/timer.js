import React, {Component} from "react";
import styled from 'styled-components';

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
  background-color: darksalmon;
`;


class Timer extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        seconds: 1500,
        timerStart: false,
       };
    }
  
    tick() {
      this.setState(state => ({
        seconds: state.seconds - 1, 
      }));
    }
  
    componentDidMount() {
      //this.interval = setInterval(() => this.tick(), 1000);
    }
  
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    handleTimerStart = () => {
        this.interval = setInterval(() => this.tick(), 1000);
        this.setState({timerStart: true})
    }

    handleTimerReset = () => {
        this.setState({seconds: 1500})
    }

    handleTimerPause = () => {
      clearInterval(this.interval);
    }

    handleTimerSkip = () => {
        this.setState({seconds: 300})
    }
  
    render() {
      return (
        <Card>
            <Title>
                Пройшло секунд: {Math.floor(this.state.seconds / 60) + ': ' + this.state.seconds % 60}
            </Title>
            <button onClick={() => this.handleTimerStart()}>start</button>
            {this.state.timerStart && <button onClick={() => this.handleTimerPause()}>pause</button>}
            <button onClick={() => this.handleTimerReset()}>reset</button>
            {this.state.timerStart && <button onClick={() => this.handleTimerSkip()}>skip</button>}
        </Card>
      );
    }
  }
  
export default Timer;