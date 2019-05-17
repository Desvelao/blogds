import React, { Component } from 'react'

import { Switch, Route } from 'react-router-dom'
import routes from '../config/routes'

import { NavLink } from 'react-router-dom'

import withAuthorization from '../hocs/with-authorization'
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
            <div className='container-fluid'>
                <div className="row py-3">
                    <div className='col-md-2' style={{ height: '100vh', width: '10%', minWidth: '80px', /*background: 'red'*/ }}>
                        <div className='nav flex-column'>
                            {dashlinks.map(link => (<div className='nav-link' key={link.route} ><NavLink to={link.route} activeClassName="th-selected" exact>{link.text}</NavLink></div>))}
                        </div>
                    </div>
                    <div className='col'>
                        {/* <Container> */}
                            <Switch>
                                <Route exact path={routes.dashboard + routes.dashboard_root} component={DashboardRoot} />
                                <Route exact path={routes.dashboard + routes.dashboard_posts} component={DashboardPosts} />
                                <Route exact path={routes.dashboard + routes.dashboard_users} component={DashboardAuthors} />
                                <Route exact path={routes.dashboard + routes.dashboard_me} component={DashboardMe} />
                                <Route exact path={routes.dashboard + routes.dashboard_images} component={DashboardImages} />
                            </Switch>
                        {/* </Container> */}
                    </div>
                </div>
            </div>
        )
    }
})