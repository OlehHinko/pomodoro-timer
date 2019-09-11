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
  .header-modal {
    display: flex;
    justify-content: space-between;
    h3 {
      margin: 0;
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
                </Modal>
            }
        </SettingsContainer>
      );
    }
  }
  
export default Settings;