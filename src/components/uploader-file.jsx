import React, { Component } from 'react'
import { FormGroup, Col } from 'reactstrap'
import InputForm from './input-form'
import UploadFile, { ProgressBar } from './upload-file'
import Button, { ButtonPrimary } from './button'
import path from 'path'
import locale from '../config/locale'
import { Image } from '../backend/structures'

const initialState = {sending : false, file : null, fileimage : null}

export default class extends Component{
    constructor(props){
        super(props)
        this.state = {...initialState}
        this.onFinish = this.props.onFinish || function(d){}
        this.onError = this.props.onError || function(d){}
        this.manageFilename = this.props.manageFilename || Image.generateDataFromFile
    }
    handleImage(e){
        if (e.target.files && e.target.files[0]) {
            this.setState({ fileimage: window.URL.createObjectURL(e.target.files[0]), file: e.target.files[0] })
            // this.setState({ file: e.target.files[0] })
        }
    }
    reset(){
        this.setState({ ...initialState })
    }
    send(){
        if(!this.state.file){return}
        this.setState({ sending : true })
    }
    createData(){
        const { file } = this.state
        console.log('FILE',file)
        const { name, ext } = this.manageFilename(file)
        return { where: `${name}${ext}`, file, name, ext }
    }
    onFinishUpload(uploaded){
        this.reset()
        this.onFinish(uploaded)
    }
    onErrorUpload(err){
        this.reset()
        this.onError(err)
    }
    render(){
        return (
            <>
                <FormGroup row>
                    <Col xs='6'>
                        <InputForm type='file' accept={this.props.accept} labelid={this.props.labelid} labeltitle={this.props.labeltitle} onChange={(e) => this.handleImage(e)} />
                    </Col>
                    {this.state.file && (
                        <Col xs='6'>
                            <div>{this.state.file.name}</div>
                            <img src={this.state.fileimage} className='w-100' alt=''/>
                        </Col>)
                    }
                </FormGroup>
                <ButtonPrimary onClick={(e) => { e.preventDefault(); this.send() }}>{locale.Send}</ButtonPrimary>
                {this.state.sending && <UploadFile onFinish={(uploaded) => this.onFinishUpload(uploaded)} onError={(err) => this.onErrorUpload(err)} data={this.createData()} />}
            </>
        )
    }
}

// 'image/png,image/jpeg'