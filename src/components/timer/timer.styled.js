import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  color: white;
`;

export const Card = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  z-index: 1;
`;
export const TimeContainer = styled.div`
  position: fixed;
  top: 150px;
  left: calc(50% - 250px);
  width: 500px;
  height: 300px;
  color: white;
  font-size: 100px;
  font-weight: bold;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  > * {
    width: 100%
  }
  @media(max-width: 600px) {
    width: 90%;
    left: 5%;
  }
`;

export const Time = styled.div`
  color: white;
  font-size: 100px;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
font-size: initial;
button {
    margin: 0 5px;
  }
`;