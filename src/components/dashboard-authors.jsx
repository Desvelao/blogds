import React, { Component } from 'react'
import {
    Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, NavItem
} from 'reactstrap'
import AuthorModel from '../models/author'
import withStore from '../hocs/with-store'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import routes from '../config/routes'
import { compose } from 'redux'
import Button from '../components/button'
import { AuthorAvatarNameSpan } from '../components/author'

export default compose(withRouter,withStore)(class DashboardAuthors extends Component{
    render(){
        return (
            <div>
                <h3>Authors</h3>
                <Row>
                    {this.props.authors.map(a => {
                        const author = AuthorModel.getPosts(a, this.props.posts)
                        return (
                            <Col md='4' key={author.id}>
                                <Card key={author.id} className='my-1'>
                                    <CardBody className='d-flex p-2 justify-content-between align-items-center'>
                                        <div>
                                            <AuthorAvatarNameSpan {...author} hovername className='mr-2'/>
                                        </div>
                                        <div>
                                            {author.posts.filter(post => post.publish).length}/{author.posts.length}
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