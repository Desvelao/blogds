import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import withStore from "../hocs/with-store";
import PostCard from '../components/post-card'
import Button from '../components/button'
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
                <SignUpForm/>
                {configBlog.blogDescription && <div className='font-italic text-muted text-center mb-4'>{configBlog.blogDescription}</div>}
                <Row className='justify-content-center mb-4'>
                    {this.props.posts.map(post => (<Col className='mb-2' md='4' key={post.id}>
                        <PostCard {...post} authors={this.props.authors}/>
                    </Col>))}
                </Row>
                <div className='text-center'>
                    {this.state.loading ? <Loading className='text-center' /> : <Button className='' onClick={(e) => this.paginationPosts(e)}>{locale.MorePosts}</Button>}
                </div>
                <FooterHome/>
            </div>
        )
    }
})