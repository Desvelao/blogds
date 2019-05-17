import React, { Component } from 'react'

import withStore from '../hocs/with-store'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { DashboardCard, DashboardCardTitle } from '../components/dashboard-card'
import locale from '../config/locale'

export default compose(withRouter,withStore)(class DashboardRoot extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <>
                <div className='th-title'>{locale.Summary}</div>
                <div className='row'>
                    <div className='col-6 col-md-4 mb-1'>
                        <DashboardCard ribbon='red'>
                            <DashboardCardTitle>{locale.Posts}</DashboardCardTitle>
                            {this.props.posts.filter(post => post.publish).length}/{this.props.posts.length}
                        </DashboardCard>
                    </div>
                    <div className='col-6 col-md-4 mb-1'>
                        <DashboardCard ribbon='red'>
                            <DashboardCardTitle>{locale.Users}</DashboardCardTitle>
                            {this.props.authors.length}
                        </DashboardCard>
                    </div>
                </div>
            </>
        )
    }
    
})