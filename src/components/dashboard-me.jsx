import React, { Component } from 'react'
import withStore from '../hocs/with-store'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { ButtonEdit, ButtonPrimary, ButtonWarning } from '../components/button'
import InputForm from './input-form'
import AuthorModel from '../backend/structures/author'
import locale from '../config/locale'
import { auth } from '../backend'
import withNotifications from '../hocs/with-notifications';
import ModalUploadImage from './modal-upload-image'
import { Author } from '../backend/structures'
export default compose(withRouter, withStore, withNotifications)(class DashboardMe extends Component {
    constructor(props){
        super(props)
        const author = AuthorModel.findByID(this.props.authUser.uid, this.props.authors)
        this.state = { editProfile: true, user: { id: this.props.authUser.uid, name: author.name, url : author.url, avatar : author.avatar, email : this.props.authUser.email }/*this.props.authUser*/}
        // this.state.user.url = this.props.authors.find(author => author.id === this.state.user.uid).url
    }
    toggleEditProfile(e){
        this.setState({editProfile : !this.state.editProfile})
    }
    inputChange(prop,e){
        this.setState({user: {...this.state.user, [prop] : e.target.value}})
    }
    async updateProfile(e){
        e.preventDefault()
        const { id, name, avatar, url } = this.state.user
        await this.props.addAuthor({id, name, avatar, url})
        this.toggleEditProfile()
        this.props.notiManager.add(locale.ProfileInfoUpdated,'success')
    }
    async resetPassword(e){
        e.preventDefault()
        try{
            await auth.resetPassword(this.state.user.email)
            this.props.notiManager.add(locale.ResetPasswordEmail, 'success')
        }catch(err){
            console.error(err)
        }
    }
    async onFinishUploadFile(uploaded) {
        const { name, url, ext } = uploaded
        // const id = path.basename(uploaded.where, path.extname(uploaded.where))
        this.setState({ user: { ...this.state.user, avatar: url}})
        try{
            await this.props.addAuthor({...this.state.user, avatar : url})
            this.props.notiManager.add(locale.FileUploaded + ': ' + name + ext, 'success')
        }catch(err){
            console.error(err)
            this.props.notiManager.add('Error setting author avatar', 'danger')
        }
    }
    manageFilename(data){
        return Author.generateDataFromFile(data, this.props.authUser.uid)
    }
    render() {
        const { user, editProfile } = this.state
        return (
            <div>
                <div className='th-category-title'>Me</div>
                <div>Me info</div>
                <hr/>
                <div>
                    <div>
                        <span className="th-category-title">{locale.Account}</span>
                        <ButtonEdit className='mx-2 p-1' disabled={!editProfile} onClick={(e) => this.toggleEditProfile(e)}/>
                    </div>
                    <form className='mb-2'>
                        <div className='row'>
                            <div className='col-md-4 mb-2'>
                                <InputForm labelid='profile-name' labeltitle={locale.DisplayName} disabled={editProfile} type='text' placeholder={this.props.authUser.displayName} value={user.name} onChange={(e) => this.inputChange('name',e)}/>
                                {/* <InputForm labelid='profile-password' labeltitle={locale.Password} disabled={editProfile} type='password' placeholder={this.props.authUser.password} value={user.password} onChange={(e) => this.inputChange('password',e)}/> */}
                            </div>
                            <div className='col-md-8 mb-2'>
                                <InputForm labelid='profile-url' labeltitle={locale.ProfileUrl} disabled={editProfile} type='text' placeholder={user.url} value={user.url} onChange={(e) => this.inputChange('url',e)}/>
                                {!editProfile && <ModalUploadImage className='my-2' titleOpenButton={locale.UploadImage} saveOn='avatars' labeltitle={locale.UpdatePostImage} manageFilename={(data) => this.manageFilename(data)} onFinishUploadFile={(uploaded) => this.onFinishUploadFile(uploaded)} />}
                                {/* <InputForm labelid='profile-avatar' labeltitle={locale.ProfileAvatar} disabled={editProfile} type='text' placeholder={user.avatar} value={user.avatar} onChange={(e) => this.inputChange('avatar',e)}/> */}
                            </div>
                        </div>
                        {!editProfile && <ButtonPrimary onClick={(e) => this.updateProfile(e)}>{locale.Accept}</ButtonPrimary>}
                    </form>
                    <hr className='mb-2'/>
                    <div className=''>
                        <div className="th-category-title mb-2">{locale.ResetPassword}</div>
                        <ButtonWarning onClick={(e) => this.resetPassword(e)}>{locale.ResetPassword} {user.email}</ButtonWarning>
                    </div>
                </div>
            </div>
        )
    }
})