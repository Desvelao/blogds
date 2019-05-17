import React, { Component } from 'react'
import Link from './link'
import { withRouter } from 'react-router'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { compose } from 'redux'

import withStore from '../hocs/with-store'
import NavigationUserLogged from './navigation-user-logged'
import routes from '../config/routes'
import blogConfig from '../config/blog'
import locale from '../config/locale'

export default compose(withStore, withRouter)(
    class Navigation extends Component {
        constructor(props) {
            super(props)
            this.state = { collapsed: false }
        }
        handleToggleNavbar() {
            this.setState({ collapsed: !this.state.collapsed })
        }
        render() {
            return (
                <Navbar color="" fixed='' light expand="md">
                    {/* <img height={30} width={30} className='dv-border-circle d-inline-block align-top' src={Roshan} />  */}
                    <Link className='th-blog-title' to={routes.home}>{blogConfig.blogName}</Link>
                    {/* <NavbarToggler onClick={() => this.handleToggleNavbar()} className="" /> */}
                    <span className='ml-auto'>
                        <NavigationUserLogged />
                        {this.props.authUser ? null : (<NavItem className=''>
                            <Link className='align-middle' to={routes.login}>{locale.Login}</Link>
                        </NavItem>)}
                    </span>
                </Navbar>
            )
        }
    }
)

    // < Collapse isOpen = { this.state.collapsed } navbar >
    //     <Nav className='ml-auto text-center' navbar>
    //         <NavigationUserLogged />
    //         {this.props.authUser ? null : (<NavItem className='mx-2'>
    //             <Link className='align-middle' to={routes.login}>Login</Link>
    //         </NavItem>)}
    //     </Nav>
    // </Collapse >