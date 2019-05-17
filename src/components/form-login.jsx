import React, { Component } from 'react'
import Link from './link'

import { withRouter } from 'react-router'
import InputForm from './input-form'
import Button from './button'
import routes from '../config/routes'
import { auth } from '../backend'
import locale from '../config/locale'

export default withRouter(class FormNewPost extends Component {
    constructor() {
        super()
        this.state = { email: '', password: '' }
    }
    handleState(prop, e) {
        this.setState({ [prop]: e.target.value })
    }
    async send(e) {
        e.preventDefault()
        const { email, password } = this.state
        if (!email) { return }
        if (!password) { return }
        try{
            await auth.login(email, password)
            this.props.history.push(routes.home)
        }catch(err){

        }
    }
    render() {
        return (
            <div>
                <form className='mb-2'>
                    <div className='row justify-content-center'>
                        <div className='col-md-4'>
                            <div className='text-center'>{locale.Login}</div>
                            <div className='for-group row'>
                                <div className='col-12'>
                                    <InputForm labelid='email' labeltitle={locale.Email} value={this.state.email} onChange={(e) => this.handleState('email', e)} />
                                </div>
                            </div>
                            <div className='for-group row'>
                                <div className='col-12'>
                                    <InputForm type='password' labelid='password' labeltitle={locale.Password} value={this.state.password} onChange={(e) => this.handleState('password', e)} />
                                </div>
                            </div>
                            <Button className='btn-primary' onClick={(e) => this.send(e)}>{locale.Login}</Button>
                        </div>
                    </div>
                </form>
                <Link to={routes.resetpassword}>{locale.RememberPassword}</Link>
            </div>
        )
    }
})