import React from 'react'
import WithStore from './with-store'
import { auth } from '../backend'
console.log(auth)
export default (Component) => {
    class WithAuth extends React.Component{
        // constructor(props){
        //     super(props)
        // }
        componentDidMount() {
            const { onSetAuthUser } = this.props
            auth.onAuthStateChanged(authUser => {
                authUser
                    ? onSetAuthUser(authUser)
                    : onSetAuthUser(null)
            })
        }
        render(){
            return this.props.authUser ? <Component {...this.props}/> : null
        }
    }
    return WithStore(WithAuth)
}