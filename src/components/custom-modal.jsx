import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ButtonPrimary } from './button'

class CustomModal extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         modal: false
    //     }

    //     this.toggle = this.toggle.bind(this)
    // }

    // toggle() {
    //     this.setState(prevState => ({
    //         modal: !prevState.modal
    //     }))
    // }
    toggle(e){
        e.preventDefault()
        this.props.toggle()
    }

    render() {
        // const children = React.Children.map(this.props.children, child => 
        //     React.cloneElement(child,{
        //         modalToggle : () => this.toggle()
        // }))
        return (
            <div>
                <ButtonPrimary color="" onClick={(e) => this.toggle(e)}>{this.props.buttonLabel}</ButtonPrimary>
                <Modal isOpen={this.props.open} toggle={this.props.toggle} className={this.props.className}>
                    {/* <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter> */}
                    {this.props.children}
                </Modal>
            </div>
        );
    }
}

export default CustomModal