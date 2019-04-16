import React , { Component }from 'react'
import { Alert } from 'reactstrap'

export default class extends Component{
    constructor(props){
        super(props)
        // this.timer = null
        this.timer = setTimeout(() => this.props.onRemove(), (this.props.time || 2)* 1000)
    }
    componentWillUnmount(){
        clearTimeout(this.timer)
    }
    render(){
        return (
            <React.Fragment>
                <Alert {...this.props}>{this.props.children}</Alert>
            </React.Fragment>
        )
    }

}