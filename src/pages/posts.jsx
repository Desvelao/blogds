import React, { Component } from 'react'
import withStore from "../hocs/with-store";
import PostCard from '../components/post-card'
import { ButtonPrimary } from '../components/button'
import FooterHome from '../components/footer-home';
import configBlog from '../config/blog'
import locale from '../config/locale'
import Loading from '../components/loading'
import SignUpForm from '../components/form-signup'

export default withStore(class Posts extends Component{
    constructor(props){
        super(props)
        this.state = {loading : false}
    }
    paginationPosts(e){
        e.preventDefault()
        console.log('pagination', this.props.refPost)
        this.setState({loading: true})
        this.props.paginationPosts(this.props.refPost,
            () => this.setState({ loading: false }),
            () => this.setState({ loading: false }),
        )
    }
    render(){
        return (
            <div className='mb-4'>
                {configBlog.blogDescription && <div className='th-blog-description mb-4'>{configBlog.blogDescription}</div>}
                <div className='row justify-content-center mb-4'>
                    {this.props.posts.map(post => (<div className='col-6 col-md-4 mb-2' key={post.id}>
                        <PostCard {...post} authors={this.props.authors}/>
                    </div>))}
                </div>
                <div className='text-center'>
                    {this.state.loading ? <Loading className='text-center' /> : <ButtonPrimary className='' onClick={(e) => this.paginationPosts(e)}>{locale.MorePosts}</ButtonPrimary>}
                </div>
                <FooterHome/>
            </div>
        )
    }
})