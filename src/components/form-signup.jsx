import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'

import { withRouter } from 'react-router'
import withStore from '../hocs/with-store'
import withNotifications from '../hocs/with-notifications'

import InputForm from './input-form'
import Alert from './alert'
import { ButtonPrimary } from './button'
import routes from '../config/routes'
import { auth, firebase } from '../backend'
import locale from '../config/locale'
import configBlog from '../config/blog'
import { compose } from 'redux'

const initialConfig = { email: '', displayName: '', password: '', confirmPassword: '', keypass : '', error: ''}

export default compose(withStore, withNotifications, withRouter)(class FormNewPost extends Component {
    constructor() {
        super()
        this.state = {...initialConfig}
    }
    errorMessage(message){
        this.setState({error: message})
    }
    onErrorValidate(){
        this.setState({ error: '' })
    }
    handleState(prop, e) {
        this.setState({ [prop]: e.target.value })
    }
    reset(){
        this.setState({...initialConfig})
    }
    async signUp(email, password, displayName){
        const authUser = await auth.signUp(email, password)
        await this.props.addAuthor({ id: authUser.user.uid, name: displayName})
        this.props.history.push(routes.dashboard + routes.dashboard_me)
    }
    async send(e) {
        e.preventDefault()
        const { email, displayName, password, confirmPassword, keypass } = this.state
        if (!email) { return }
        if (!displayName) { return }
        if (!password) { return }
        if (!confirmPassword) { return }
        if (password !== confirmPassword) { return }
        try{
            if(configBlog.requiredKeypass){
                if(configBlog.requiredKeypass === keypass ){
                    await this.signUp(email, password, displayName)
                }else{
                    if(keypass === ''){
                        this.errorMessage(locale.errorKeypassRequired)
                    }else{
                        this.errorMessage(locale.errorKeypassNotValid)
                    }
                }
            }else{
                await this.signUp(email, password, displayName)
            }
        }catch(err){

        }
    }
    validateEmail(email){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    validatePassword(password){
        return password.length > 5
    }
    validateDisplayName(displayName){
        return displayName.length > 2
    }
    validateFields(){
        const { email, displayName, password, confirmPassword } = this.state
        return this.validateEmail(email) && this.validateDisplayName(displayName) && this.validatePassword(password) && password === confirmPassword
    }
    render() {
        return (
            <div>
                <form className='row justify-content-center'>
                    <div className='col-md-4'>
                        <div className='text-center th-category-title'>{locale.SignUp}</div>
                        <FormGroup row>
                            <div className='col-xs-12'>
                                <InputForm labelid='email' labeltitle={locale.Email} value={this.state.email} onChange={(e) => this.handleState('email', e)} />
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className='col-xs-12'>
                                <InputForm labelid='display-name' labeltitle={locale.DisplayName} value={this.state.displayName} onChange={(e) => this.handleState('displayName', e)} />
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className='col-xs-12'>
                                <InputForm type='password' labelid='password' labeltitle={locale.Password} value={this.state.password} onChange={(e) => this.handleState('password', e)} />
                            </div>
                        </FormGroup>
                        <FormGroup row>
                                <InputForm type='password' labelid='confirm-password' labeltitle={locale.ConfirmPassword} value={this.state.confirmPassword} onChange={(e) => this.handleState('confirmPassword', e)} />
                            {/* <div className='col-xs-12'>
                            </div> */}
                        </FormGroup>
                        {configBlog.requiredKeypass && (
                            <FormGroup row>
                                <div className='col-xs-12'>
                                    <InputForm labelid='keypass' labeltitle={locale.Keypass} value={this.state.keypass} onChange={(e) => this.handleState('keypass', e)} />
                                </div>
                            </FormGroup>
                        )}
                        <ButtonPrimary className={`mb-2 ${!this.validateFields() && 'disabled'}`} onClick={(e) => this.send(e)}>{locale.SignUp}</ButtonPrimary>
                        {this.state.error && <Alert onRemove={() => this.onErrorValidate()} color='danger'>{this.state.error}</Alert>}
                    </div>
                </form>
            </div>
        )
    }
})