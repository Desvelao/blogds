import React, { Component } from 'react'
import InputForm from '../components/input-form'
import { auth } from '../backend'
import locale from '../config/locale'
import withNotifications from '../hocs/with-notifications';
import { ButtonPrimary } from '../components/button'

export default withNotifications(class extends Component{
    constructor(props){
        super(props)
        this.state = {email : ''}
    }
    inputChange(prop, e) {
        this.setState({ [prop]: e.target.value } )
    }
    async resetPassword(e){
        e.preventDefault()
        if(!this.validateEmail(this.state.email)){return}
        try{
            await auth.resetPassword(this.state.email)
            this.props.notiManager.add(locale.ResetPasswordMail, 'success')
        }catch(err){

        }
    }
    validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    render(){
        return (
            <div className='row justify-content-center'>
                <div className='cold-md-4'>
                    <div className='mb-2 text-center'>{locale.ResetPassword}</div>
                    <form>
                        <div className='form-group'>
                            <InputForm className='mb-2' labelid='reset-password' labeltitle={locale.Email} type='text' placeholder={''} value={this.state.email} onChange={(e) => this.inputChange('email', e)} />
                        </div>
                        <ButtonPrimary onClick={(e) => this.resetPassword(e)} disabled={!this.validateEmail(this.state.email)}>{locale.ResetPassword}</ButtonPrimary>
                    </form>
                </div>
            </div>
        )
    }
})