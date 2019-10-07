import React from 'react'
import Link from './link'
import { withRouter } from 'react-router'
import { AuthorAvatarName } from './author'
import { timeToRead } from '../util/post'
import Author from '../backend/structures/author'

export default withRouter(
    ({title, id, desc, image, author, content, authors}) => {
        author = Author.findByID(author, authors)
        const timeRead = timeToRead(content)
        return (
            <div className="th-card card">
                {image && <Link to={`/post/${id}`} className='text-decoration-none'>
                    <img className='th-card-image img-fluid' src={image} alt={`${title}`} onError={(e) => { e.target.onError = null; e.target.src = "" }}/>
                </Link>}
                <div className='th-card-body'>
                    <Link to={`/post/${id}`} className='th-card-title'>{title}</Link>
                    {/* <div className='text-muted text-center'>{desc}</div> */}
                    <hr className='my-1' />
                    <AuthorAvatarName {...author} link />
                    <span className='th-color-muted'> · {timeRead}</span>
                </div>
            </div>
            
    )}
)