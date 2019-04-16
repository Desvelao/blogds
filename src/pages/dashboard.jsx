import React, { Component } from 'react'
import {
    Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, NavItem, Nav
} from 'reactstrap'

import withStore from '../hocs/with-store'
import withAuthorization from '../hocs/with-authorization'
import { AuthorAvatar } from '../components/author'
import Alert from '../components/alert'
import Button from '../components/button'


import { db } from '../backend'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import routes from '../config/routes'

import { Link, NavLink } from 'react-router-dom'

import { withRouter } from 'react-router'
import { compose } from 'redux'

import DashboardRoot from '../components/dashboard-root'
import DashboardPosts from '../components/dashboard-posts'
import DashboardAuthors from '../components/dashboard-authors'
import DashboardMe from '../components/dashboard-me'
import DashboardImages from '../components/dashboard-images'
import locale from '../config/locale'

const dashlinks = [
    {
        text: locale.Summary,
        route: routes.dashboard + '/'
    },
    {
        text: locale.Posts,
        route: routes.dashboard + routes.dashboard_posts
    },
    {
        text: locale.Users,
        route: routes.dashboard + routes.dashboard_users
    },
    {
        text: locale.Me,
        route: routes.dashboard + routes.dashboard_me
    },
    {
        text: locale.Images,
        route: routes.dashboard + routes.dashboard_images
    }
]
export default compose(withRouter,withAuthorization)(class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {alert : null}
    }
    render(){
        return (
            <Container fluid>
                <Row className="py-3">
                    <Col md='2' style={{ height: '100vh', width: '10%', minWidth: '80px', /*background: 'red'*/ }}>
                        <Nav vertical>
                            {dashlinks.map(link => (<NavItem><NavLink key={link.route} to={link.route} activeClassName="th-selected" exact>{link.text}</NavLink></NavItem>))}
                        </Nav>
                    </Col>
                    <Col>
                        {/* <Container> */}
                            <Switch>
                                <Route exact path={routes.dashboard + routes.dashboard_root} component={DashboardRoot} />
                                <Route exact path={routes.dashboard + routes.dashboard_posts} component={DashboardPosts} />
                                <Route exact path={routes.dashboard + routes.dashboard_users} component={DashboardAuthors} />
                                <Route exact path={routes.dashboard + routes.dashboard_me} component={DashboardMe} />
                                <Route exact path={routes.dashboard + routes.dashboard_images} component={DashboardImages} />
                            </Switch>
                        {/* </Container> */}
                    </Col>
                </Row>
            </Container>
        )
    }
})