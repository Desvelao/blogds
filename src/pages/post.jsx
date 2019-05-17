import React, {Component } from 'react';

import RenderPost from '../components/renderpost.jsx'
import withStore from '../hocs/with-store.jsx';
import { Author } from '../backend/structures'
import Loading from '../components/loading'
import locale from '../config/locale'

export default withStore(class Post extends Component{
    constructor(){
        super()
        this.state = {loading: false}
        window.scrollTo(0, 0)
    }
    componentDidMount(){
        const postID = this.props.match.params.post_id
        const post = this.props.posts.find(post => post.id === postID)
        if(!post){
            this.setState({loading :true})
            this.props.fetchPost(postID,
                (fetchedPost) => this.setState({ loading: false }),
                () => this.setState({ loading: false })
            )
        }
    }
    componentWillReceiveProps(){
        window.scrollTo(0, 0)
    }
    getAuthor(post){
        return this.props.authors.find(author => post.author === author.id) || Author.default()
    }
    render(){
        const postID = this.props.match.params.post_id
        const post = this.props.posts.find(post => post.id === postID)
        let author
        if(post){
            author = this.getAuthor(post)
        }
        const { loading } = this.state
        return (
            <div>
                {post ? <RenderPost {...post} author={author} /> : (loading ? <Loading className='text-center'/> : <div>{locale.PostNotFound}</div>)}
            </div>
        )
    }
})