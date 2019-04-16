import React from 'react'
import WithStore from './with-store'
import { Redirect } from 'react-router'
import routes from '../config/routes'

export default (Component) => {
    class WithLoggedAlready extends React.Component{
        render(){
            return this.props.authUser ? <Redirect to={routes.home} /> : <Component {...this.props} />
        }
    }
    return WithStore(WithLoggedAlready)
}