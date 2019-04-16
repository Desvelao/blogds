import React, { Component } from 'react'
import {
    Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, NavItem
} from 'reactstrap'
import withStore from '../hocs/with-store'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import Button from '../components/button'
import { DashboardCard, DashboardCardTitle } from '../components/dashboard-card'
import { AuthorAvatar } from '../components/author'

export default compose(withRouter,withStore)(class DashboardRoot extends Component{
    constructor(props){
        super(props)
        console.log('PROPS',this.props);
    }
    render(){
        return (
            <>
                <h3>Summary</h3>
                <Row>
                    <Col md='4' xs='6' className='mb-1'>
                        <DashboardCard ribbon='red'>
                            <DashboardCardTitle>Posts</DashboardCardTitle>
                            {this.props.posts.filter(post => post.publish).length}/{this.props.posts.length}
                        </DashboardCard>
                    </Col>
                    <Col md='4' xs='6' className='mb-1'>
                        <DashboardCard ribbon='red'>
                            <DashboardCardTitle>Users</DashboardCardTitle>
                            {this.props.authors.length}
                        </DashboardCard>
                    </Col>
                </Row>
            </>
        )
    }
    
})