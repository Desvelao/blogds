import React, { Component } from 'react'
import { Alert, Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link } from 'react-router-dom'

import { withRouter } from 'react-router'
import WithStore from '../hocs/with-store'

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
                <Form className='mb-2'>
                    <Row className='justify-content-center'>
                        <Col md='4'>
                            <div className='text-center'>{locale.Login}</div>
                            <FormGroup row>
                                <Col xs='12'>
                                    <InputForm labelid='email' labeltitle={locale.Email} value={this.state.email} onChange={(e) => this.handleState('email', e)} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col xs='12'>
                                    <InputForm type='password' labelid='password' labeltitle={locale.Password} value={this.state.password} onChange={(e) => this.handleState('password', e)} />
                                </Col>
                            </FormGroup>
                            <Button className='btn-primary' onClick={(e) => this.send(e)}>{locale.Login}</Button>
                        </Col>
                    </Row>
                </Form>
                <Link to={routes.resetpassword}>{locale.RememberPassword}</Link>
            </div>
        )
    }
})