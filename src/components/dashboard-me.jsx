import React, { Component } from 'react'
import {
    Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, NavItem
} from 'reactstrap'
import PostModel from '../models/post'
import withStore from '../hocs/with-store'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import routes from '../config/routes'
import { compose } from 'redux'
import Button, { ButtonEdit, ButtonPrimary } from '../components/button'
import { AuthorAvatar } from '../components/author'
import InputForm from './input-form'
import AuthorModel from '../models/author'
import locale from '../config/locale'
import { auth } from '../backend'
import withNotifications from '../hocs/with-notifications';

export default compose(withRouter, withStore, withNotifications)(class DashboardMe extends Component {
    constructor(props){
        super(props)
        const author = AuthorModel.findByID(props.authUser.uid, this.props.authors)
        console.log('author', this.props)
        this.state = { editProfile: true, user: { name: author.name, id: author.id, password: this.props.authUser.password, url : author.url, avatar : author.avatar, email : this.props.authUser.email }/*this.props.authUser*/}
        // this.state.user.url = this.props.authors.find(author => author.id === this.state.user.uid).url
    }
    toggleEditProfile(e){
        this.setState({editProfile : !this.state.editProfile})
    }
    inputChange(prop,e){
        this.setState({user: {[prop] : e.target.value}})
    }
    updateProfile(e){

    }
    async resetPassword(e){
        e.preventDefault()
        console.log('RESET PASSWORD', this.state.user.email)
        try{
            await auth.resetPassword(this.state.user.email)
            this.props.notiManager.add(locale.ResetPasswordMail, 'success')
        }catch(err){
            console.error(err)
        }
    }
    render() {
        const { user, editProfile } = this.state
        return (
            <div>
                <h3>Me</h3>
                <div>Me info
                </div>
                <hr/>
                <div>
                    <div>
                        <strong>{locale.Account}</strong>
                        <ButtonEdit className='' disabled={!editProfile} onClick={(e) => this.toggleEditProfile(e)}/>
                    </div>
                    <Form className='mb-2'>
                        <Row>
                            <Col md='4' className='mb-2'>
                                <InputForm labelid='profile-name' labeltitle={locale.DisplayName} disabled={editProfile} type='text' placeholder={this.props.authUser.displayName} value={user.name} onChange={(e) => this.inputChange('displayName',e)}/>
                                {/* <InputForm labelid='profile-password' labeltitle={locale.Password} disabled={editProfile} type='password' placeholder={this.props.authUser.password} value={user.password} onChange={(e) => this.inputChange('password',e)}/> */}
                            </Col>
                            <Col md='8' className='mb-2'>
                                <InputForm labelid='profile-url' labeltitle={locale.ProfileUrl} disabled={editProfile} type='text' placeholder={user.url} value={user.url} onChange={(e) => this.inputChange('url',e)}/>
                            </Col>
                        </Row>
                        <ButtonPrimary className='btn-primary' disabled={editProfile} onClick={(e) => this.updateProfile(e)}>Update profile</ButtonPrimary>
                    </Form>
                    <ButtonPrimary onClick={(e) => this.resetPassword(e)}>{locale.ResetPassword} {user.email}</ButtonPrimary>
                </div>
            </div>
        )
    }
})