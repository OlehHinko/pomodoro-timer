import React from "react";
import Indicator from "./indicator.component";
import {ButtonContainer, Time, TimeContainer, Card, Title} from "./timer.styled"

const Timer = (props) => { 

  const {seconds, title, t, theme, timerStart, indicatorWidth} = props;

    return (
      <Card style={{backgroundColor: theme}}>
        <Indicator indicatorWidth={indicatorWidth}/>
        <TimeContainer>
          <Title>{t(title)}</Title>
          <Time>
            {Math.floor(seconds / 60) + ': ' + seconds % 60}
          </Time>
          <ButtonContainer>
          { !timerStart && <button onClick={() => props.handleTimerStart()}>{t('start')}</button>}
          { timerStart && <button onClick={() => props.handleTimerPause()}>{t('pause')}</button>}
          <button onClick={() => props.handleTimerReset()}>{t('reset')}</button>
          { timerStart && <button onClick={() => props.handleTimerSkip()}>{t('skip')}</button>}
          </ButtonContainer>
        </TimeContainer>
      </Card>
    );
}

export default Timer;

