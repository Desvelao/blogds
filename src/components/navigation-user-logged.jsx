import React, { Component } from 'react'
import withAuth from "../hocs/with-auth"
import withAuthorization from '../hocs/with-authorization'
import { AuthorAvatar } from './author'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { NavItem, NavLink, UncontrolledDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { compose } from 'redux'
import routes from '../config/routes'
import Button from './button'
import { auth } from '../backend'
import AuthorModel from '../backend/structures/author'
import locale from '../config/locale'

export default compose(withRouter, withAuth, withAuthorization)(class extends Component{
    async logout(){
        await auth.logout()
        // this.props.history.push(routes.home)
    }
    render(){
        const user = AuthorModel.findByID(this.props.authUser.uid, this.props.authors)
        return (
            <span className=''>
                <span className='mr-2'>
                    <Link className='align-middle' to={routes.dashboard}>{locale.Dashboard}</Link>
                </span>
                <span className=''>
                    <UncontrolledDropdown nav className='d-inline'>
                        <DropdownToggle caret color='white'>
                            <AuthorAvatar {...user} />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem className='' onClick={(e) => this.props.history.push(routes.newpost)}>{locale.NewPost}</DropdownItem>
                            <DropdownItem className='' onClick={(e) => this.props.history.push(routes.dashboard + routes.dashboard_me)}>{locale.Account}</DropdownItem>
                            <DropdownItem className='text-danger' onClick={(e) => this.logout()}>{locale.Logout}</DropdownItem>
                            {/* <DropdownItem disabled>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem> */}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </span>

            </span>
        )
    }
})