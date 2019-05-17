import React, { Component } from 'react'
import withStore from '../hocs/with-store'
import { ButtonRemove } from './button'
import locale from '../config/locale'
import ModalUploadImage from './modal-upload-image'
import { compose } from 'redux'
import withNotifications from '../hocs/with-notifications';

export default compose(withStore, withNotifications)(class extends Component{
    deleteImage(image){
        this.props.deleteImage(image)
    }
    async onFinishUploadFile(uploaded) {
        const { name, url, ext } = uploaded
        // const id = path.basename(uploaded.where, path.extname(uploaded.where))
        await this.props.addImage({ id: name, url, ext })
        this.props.notiManager.add(locale.FileUploaded + ': ' + name + ext, 'success')
    }
    render(){
        return (
            <>
                <div className='mb-4'>
                    <span className="th-category-title mr-2">{locale.Images}</span>
                    <ModalUploadImage classname='d-inline' titleOpenButton={locale.UploadImage} saveOn='images' labeltitle={locale.UpdatePostImage} onFinishUploadFile={(uploaded) => this.onFinishUploadFile(uploaded)} />
                </div>
                <hr/>
                <div className='row'>
                    {this.props.images && this.props.images.map(image => {
                        return (
                        <div className='col-md-4 mb-2' key={image.id}>
                            <div>
                                <img src={image.url} alt={image.id} className='w-100'/>
                                <ButtonRemove className='position-absolute button-delete-pos-image' onClick={() => this.deleteImage(image)}/>
                            </div>
                        </div>
                    )})}
                </div>
            </>
        )
    }
})