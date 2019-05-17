import React, { Component } from 'react'
import { Alert, Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText} from 'reactstrap'

import InputForm from './input-form' 
import { ButtonWarning, ButtonPrimary } from './button'
import md from '../util/markdownit'
import withAuthorization from '../hocs/with-authorization'
import { compose } from 'redux'
import ImageSelector from './image-selector'

import locale from '../config/locale'
import withNotifications from '../hocs/with-notifications'
import ModalUploadImage from './modal-upload-image'

export default compose(withAuthorization, withNotifications)(class FormNewPost extends Component{
    constructor(props){
        super(props)
        this.initialConfig = {title : '', desc : '', content : '', image: '', file : '', sending: false}
        const { title, desc, content, image } = this.props.newPost
        this.state = { title, desc, content, image, file : '', sending: false}
    }
    componentWillUnmount(){
        this.props.updateNewPost(this.state)
    }
    handleState(prop,e){
        this.setState({[prop] : e.target.value})
    }
    handleImage(e){
        if(e.target.files && e.target.files[0]){
            this.setState({ image: window.URL.createObjectURL(e.target.files[0]), file: e.target.files[0]})
        }
        // this.setState({image : e.files[0]})
    }
    resetForm(){
        this.props.updateNewPost(this.initialConfig)
        this.setState({...this.initialConfig})
        window.scrollTo(0, 0)
    }
    clearPostImage(e){
        e.preventDefault()
        this.setState({image : ''})
    }
    async onFinishUpload(downloadURL){
        
    }
    onErrorUpload(err){
        this.setState({sending : false})
    }
    async send(e, publish){
        e.preventDefault()
        const { title, desc, content, image } = this.state
        const author = this.props.authUser.uid
        try{
            await this.props.addPost({ title, desc, content, image, author, publish })
            const message = publish ? locale.notificationPostPubilish : locale.notificationPostDraft
            const style = publish ? 'primary' : 'warning'
            this.props.notiManager.add(title + ' ' + message, style)
            this.resetForm()
        }catch(err){
            console.error('ERROR publishing post',err)
            this.props.notiManager.add('ERROR publishing post', 'danger')
        }
    }
    selectedPostHeader(image){
        if(image){
            this.setState({image})
        }
    }
    insertImageInPostContent(image){
        if(!image){return}
        const start = this.refPostContent.selectionStart
        const end = this.refPostContent.selectionEnd
        const content = this.state.content.substring(0, start) + '![](' + image + ')' + this.state.content.substring(end)
        this.setState({ content })
    }
    async onFinishUploadFile(uploaded){
        const {name, url, ext} = uploaded
        try{
            await this.props.addImage({ id: name, url, ext})
            this.props.notiManager.add(locale.FileUploaded + ': ' + name + ext, 'success')
        }catch(err){
            console.error(err)
        }
    }
    render(){
        return (
            <div className='position-relative'>
                <div className='text-center'>Add a Post</div>
                {this.state.image && (<div style={{
                    width:'100%',
                    height: '20vh',
                    // position: 'relative',
                    backgroundImage: `url(${this.state.image})`,
                    backgroundPosition: 'center center',
                    // backgroundRepeat: 'no-repeat'
                }} />)}
                <Form>
                    <Row>
                        <Col md='6'>
                            <FormGroup row>
                                <Col xs='12'>
                                    <InputForm labelid='post-title' labeltitle={locale.PostTitle} value={this.state.title} onChange={(e) => this.handleState('title', e)}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col xs='12'>
                                    <InputForm labelid='post-subtitle' labeltitle={locale.PostDescription} value={this.state.desc} onChange={(e) => this.handleState('desc', e)} />
                                </Col>
                            </FormGroup>
                            <ModalUploadImage className='mb-2' titleOpenButton={locale.UploadImage} saveOn='images' labeltitle={locale.UpdatePostImage} onFinishUploadFile={(uploaded) => this.onFinishUploadFile(uploaded)}/>
                            {/* <UploaderFile accept='image/png,image/jpeg' saveOn='images' labelid='upload-post-image' labeltitle={locale.UpdatePostImage} onFinish={(uploaded) => this.onFinishUploadFile(uploaded)} onError={(err) => console.error(err)}/> */}
                            <FormGroup>
                                <ImageSelector titleOpenButton={locale.PostSelectImage} onCancel={(data) => console.log(data)} onAccept={(data) => this.selectedPostHeader(data[0])}>
                                    {this.state.image && <ButtonWarning className='mt-2 mr-2' onClick={(e) => this.clearPostImage(e)}>{locale.Clear}</ButtonWarning>}
                                </ImageSelector>
                                <Col xs='6'>
                                    {this.state.image && (
                                        <>
                                            <div>{locale.PostHeaderImage}</div>
                                            <img src={this.state.image} className='w-100' alt='Post header' />
                                        </>
                                    )}
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <ImageSelector titleOpenButton={locale.InsertAImage} onCancel={(data) => console.log(data)} onAccept={(data) => this.insertImageInPostContent(data[0])}/>
                            </FormGroup>
                            <FormGroup row>
                                <Col xs='12'>
                                    <InputForm innerRef={(input) => {this.refPostContent = input}} type="textarea" labelid='post-content' labeltitle={locale.PostContent} value={this.state.content} onChange={(e) => this.handleState('content', e)} />
                                </Col>
                            </FormGroup>
                            <ButtonWarning className='mr-2' onClick={(e) => this.send(e,false)}>Draft</ButtonWarning>
                            <ButtonPrimary className='' onClick={(e) => this.send(e, true)}>Publish</ButtonPrimary>
                        </Col>
                        <Col md='6'>
                            <div dangerouslySetInnerHTML={{ __html: md.render(this.state.content) }} />
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
})