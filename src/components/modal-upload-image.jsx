import React, { Component } from 'react'
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import UploaderFile from './uploader-file'
import CustomModal from './custom-modal'
import Button, { ButtonDanger } from './button'
import locale from '../config/locale'
import withStore from '../hocs/with-store'

export default withStore(class extends Component{
    constructor(props){
        super(props)
        this.state = {open : false}
    }
    async onFinishUploadFile(uploaded) {
        this.closeModal()
        if(this.props.onFinishUploadFile){
            if (this.props.onFinishUploadFile) {
                this.props.onFinishUploadFile(uploaded)
            }
        }
        // console.log('UPLOADED FILEDDDDDD', uploaded)
        // const { name, url, ext } = uploaded
        // // const id = path.basename(uploaded.where, path.extname(uploaded.where))
        // await this.props.addImage({ id: name, url, ext })
    }
    onAccept(){
        if(this.props.onAccept){
            this.props.onAccept()
        }
    }
    onCancel() {
        this.closeModal()
        if(this.props.onCancel){
            this.props.onCancel()
        }
    }
    closeModal(){
        this.setState({ open: false })
    }
    toggle(){
        this.setState({open : !this.state.open})
    }
    render(){
        return (
            <div className={this.props.className}>
                <CustomModal open={this.state.open} toggle={() => this.toggle()} buttonLabel={this.props.titleOpenButton}>
                    <ModalHeader>{this.props.titleOpenButton}</ModalHeader>
                    <ModalBody>
                        <UploaderFile accept='image/png,image/jpeg' saveOn={this.props.saveOn} labelid='upload-post-image' labeltitle={this.props.labeltitle} onFinish={(uploaded) => this.onFinishUploadFile(uploaded)} onError={(err) => console.error(err)} />
                    </ModalBody>
                    <ModalFooter>
                        {this.props.children}
                        <ButtonDanger className='mx-2' onClick={() => this.onCancel()}>Cancel</ButtonDanger>
                        {/* <Button className='mx-2' onClick={() => this.onAccept()}>Accept</Button> */}
                    </ModalFooter>
                </CustomModal>
            </div>
        )
    }
})