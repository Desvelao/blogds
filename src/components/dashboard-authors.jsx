import React, { Component } from 'react'
import AuthorModel from '../backend/structures/author'
import withStore from '../hocs/with-store'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { AuthorAvatarNameSpan } from '../components/author'
import locale from '../config/locale'

export default compose(withRouter,withStore)(class DashboardAuthors extends Component{
    render(){
        return (
            <div>
                <div className="th-category-title">{locale.Authors}</div>
                <div className='row'>
                    {this.props.authors.map(a => {
                        const author = AuthorModel.getPosts(a, this.props.posts)
                        return (
                            <div className='col-md-4' md='4' key={author.id}>
                                <div className='card my-1' key={author.id} >
                                    <div className='card-body d-flex p-2 justify-content-between align-items-center'>
                                        <div>
                                            <AuthorAvatarNameSpan {...author} hovername className='mr-2'/>
                                        </div>
                                        <div>
                                            {author.posts.filter(post => post.publish).length}/{author.posts.length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
    
})