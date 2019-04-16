import React , { Component }from 'react';
import SignUpForm from '../components/form-signup'
import withLoggedAlready from '../hocs/with-logged-already'

export default withLoggedAlready(class Login extends Component{
    constructor(){
        super()
    }
    render(){
        return (
            <div>
                <SignUpForm/>
            </div>
        )
    }
})