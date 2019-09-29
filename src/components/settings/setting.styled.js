import styled from 'styled-components';


export const SettingsContainer = styled.div`
  margin: 0 auto;
  text-align: right;
  padding: 20px 10px; 
  position: fixed;
  left: 35%;
  width: 30%;
  z-index: 2;
  @media(max-width: 600px) {
    width: 90%;
    left: 5%;
  }
  `;

export const Modal = styled.div`
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
  @media(max-width: 600px) {
    width: 300px;
    left: calc(50% - 150px);
  }
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
      width: 50%;
      select {
        outline: none;
        width: 100%;
      }
    }
    h4 {
      line-height: 30px;
      text-align: left;
      padding-left: 20px;
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
      padding-left: 20px;
    }
    span {
      font-size: 15px;
      font-weight: 700;
      padding-left: 10px;
    }
    input[type=checkbox] {
      position: relative;
      cursor: pointer;
    }
    input[type=checkbox]:before {
      content: "";
      display: block;
      position: absolute;
      width: 15px;
      height: 15px;
      top: 0;
      left: 0;
      border: 2px solid #555555;
      border-radius: 3px;
      background-color: white;
    }
    input[type=checkbox]:checked:after {
      content: "";
      display: block;
      width: 5px;
      height: 10px;
      border: solid black;
      border-width: 0 2px 2px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      top: 2px;
      left: 6px;
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