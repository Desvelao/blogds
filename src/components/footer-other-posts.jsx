import React, { Component } from 'react'
import withStore from '../hocs/with-store'
import blogConfig from '../config/blog'
import locale from '../config/locale'
import PostCard from '../components/post-card'
import { Row, Col } from 'reactstrap'

export default withStore((props) => {
    const posts = props.posts.filter(post => post.id !== props.currentPost).sort((a, b) => Math.random() < 0.5).slice(0, blogConfig.numPostsShow)
    return posts.length ? (
        <div className='justify-content-between'>
            <hr />
            <div className='mb-2 text-center th-category-title'>{locale.ReadMorePosts}</div>
            <div className='row'>
                {posts.map(post => (<div className='col-md-4 mb-2' key={post.id}>
                    <PostCard {...post} authors={props.authors} />
                </div>))}
            </div>
        </div>
    ) : null
})