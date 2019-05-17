import React, { Component } from 'react'
import {
    Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, NavItem
} from 'reactstrap'
import PostModel from '../backend/structures/post'
import withStore from '../hocs/with-store'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import routes from '../config/routes'
import { compose } from 'redux'
import Button, { ButtonEdit, ButtonRemove, ButtonPrimary } from '../components/button'
import { AuthorAvatar } from '../components/author'
import locale from '../config/locale'
import withNotifications from '../hocs/with-notifications'

export default compose(withRouter, withStore, withNotifications)(class DashboardPosts extends Component{
    newPost() {

    }
    async publishPost(post) {
        post.publish = true
        post.author = post.author.id
        await this.props.addPost(post)
        this.props.notiManager.add(post.title + ' ' + locale.notificationPostPublish, 'primary')
    }
    editPost(post) {
        this.props.updateNewPost(post)
        this.props.history.push(routes.newpost)
    }
    async deletePost(post) {
        await this.props.deletePost(post)
        this.props.notiManager.add(post.title + ' ' + locale.notificationPostDelete, 'danger')
    }
    render(){
        return (
            <div>
                <div className='mb-2'>
                    <span className='th-category-title mr-2'>{locale.Posts}</span>
                    <ButtonPrimary onClick={(e) => this.props.history.push(routes.newpost)}>{locale.NewPost}</ButtonPrimary>
                </div>
                <hr/>
                <Row>
                    {this.props.posts.map(p => {
                        const post = PostModel.getWithAuthor(p, this.props.authors)
                        return (
                            <Col key={post.id} md='4'>
                                <Card key={post.id} className='mb-1'>
                                    <CardBody className='p-2'>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <AuthorAvatar {...post.author} hovername className='mr-2'/>
                                                <Link to={`${routes.post}/${post.id}`}><strong>{post.title}</strong></Link>
                                            </div>
                                            <div>
                                                {this.props.authUser && post.author.id === this.props.authUser.uid && (
                                                    <div>
                                                        {post.publish ? null : <Button onClick={() => this.publishPost(post)} className='p-1 mr-1'><i className='fas fa-upload text-success'/></Button>}
                                                        <ButtonEdit onClick={() => this.editPost(post)} className='mr-1'/>
                                                        <ButtonRemove onClick={() => this.deletePost(post)} className='mr-1' disabled={false}/>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='text-xs d-flex justify-content-between text-muted'>
                                            <div className=''>{post.author.name}</div>
                                            <div className=''>{post.publish || locale.NotPublished}</div>
                                        </div>
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        )
    }
    
})