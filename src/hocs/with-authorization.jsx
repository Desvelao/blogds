import React from 'react'
import withStore from './with-store'
import { Redirect } from 'react-router'
import routes from '../config/routes'

export default (Component) => {
    class WithAuthorization extends React.Component {
        // constructor(props){
        //     super(props)
        // }
        render() {
            return this.props.authUser ? <Component {...this.props} /> : <Redirect to={routes.login}/>
        }
    }
    return withStore(WithAuthorization)
}