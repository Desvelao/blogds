import React , { Component }from 'react';
import LoginForm from '../components/form-login'
import withLoggedAlready from '../hocs/with-logged-already'

export default withLoggedAlready(class Login extends Component{
    render(){
        return (
            <div>
                <LoginForm/>
            </div>
        )
    }
})