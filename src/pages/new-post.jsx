import React , { Component }from 'react';
import NewPostForm from '../components/form-new-post'

export default class NewPost extends Component{
    constructor(){
        super()
        this.state = {}
    }
    render(){
        return (
            <div>
                <NewPostForm/>
            </div>
        )
    }
}