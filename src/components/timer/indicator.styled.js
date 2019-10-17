import styled from 'styled-components';

export const TimerIndicator = styled.div`
width: 600px;
margin: 0 auto;
position: fixed;
top: 100px;
left: calc(50% - 300px);
@media(max-width: 600px) {
    width: 92%;
    left: 4%;
}
.layout {
    height: 12px;
    border: 1px solid white;
    .indicator {
        margin: 2px 0;
        height: 8px;
        background-color: gray;
    }
}
.work-session {
        margin-top: 10px;
        color: white;
        font-size: 20px;
    }
`;