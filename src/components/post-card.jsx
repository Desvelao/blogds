import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
    Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle
} from 'reactstrap'
import { AuthorAvatarName } from './author'
import { timeToRead } from '../util/post'
import Author from '../models/author'

export default withRouter(
    ({title, id, desc, image, author, content, authors}) => {
        author = Author.findByID(author, authors)
        const timeRead = timeToRead(content)
        return (
            <Link to={`/post/${id}`} className='text-decoration-none'>
                <Card className='hover-shadow'>
                    <CardImg top width='100%' src={image} alt={`${title}'s image`} onError={(e) => { e.target.onError = null; e.target.src = "" }} style={{ height: '8em' }} />
                    <CardBody className='p-2'>
                        <CardTitle className='text-primary mb-0 text-center'>{title}</CardTitle>
                        <div className='text-muted text-center'>{desc}</div>
                        <hr className='my-1'/>
                        <AuthorAvatarName {...author} link/>
                        <span className='text-muted'> · {timeRead}</span>
                    </CardBody>
                </Card>
            </Link>
    )}
)