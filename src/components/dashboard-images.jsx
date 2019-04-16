import React, { Component } from 'react'
import { Container, Col, Row } from 'reactstrap'
import withStore from '../hocs/with-store'
import Button, { ButtonRemove } from './button'
import locale from '../config/locale'
import ModalUploadImage from './modal-upload-image'
import { compose } from 'redux'
import withNotifications from '../hocs/with-notifications';

export default compose(withStore, withNotifications)(class extends Component{
    deleteImage(image){
        //Delete image from db
        this.props.deleteImage(image)
    }
    uploadImage(){
        
    }
    async onFinishUploadFile(uploaded) {
        const { name, url, ext } = uploaded
        // const id = path.basename(uploaded.where, path.extname(uploaded.where))
        await this.props.addImage({ id: name, url, ext })
        this.props.notiManager.add(locale.FileUploaded + ': ' + name + ext, 'success')
    }
    render(){
        return (
            <Container fluid>
                <div className='mb-4'>
                    <ModalUploadImage titleOpenButton={locale.UploadImage} saveOn='images' labeltitle={locale.UpdatePostImage} onFinishUploadFile={(uploaded) => this.onFinishUploadFile(uploaded)} />
                </div>
                <hr/>
                <Row>
                    {this.props.images && this.props.images.map(image => {
                        return (
                        <Col md='4' className='mb-2' key={image.id}>
                            <div>
                                <img src={image.url} alt={image.id} className='w-100'/>
                                <ButtonRemove className='position-absolute button-delete-pos-image' onClick={() => this.deleteImage(image)}/>
                            </div>
                        </Col>
                    )})}
                </Row>
            </Container>
        )
    }
})