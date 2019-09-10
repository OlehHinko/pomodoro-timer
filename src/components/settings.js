import React, {Component} from "react";
import styled from 'styled-components';


const Modal = styled.div`
  width: 500px;
  height: 300px;
  position: fixed;
  top: 150px;
  left: calc(50% - 250px);
  text-align: center;
  background-color: darksalmon;
  z-index: 1;
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
        console.log(this.state.visible)
      return (
        <>
            <button onClick={() => this.handleShowModal()}>Settings</button>
            {this.state.visible && 
                <Modal>
                    <button onClick={() => this.handleHideModal()}>X</button>
                    <h1>Settings</h1>
                </Modal>
            }
        </>
      );
    }
  }
  
export default Settings;