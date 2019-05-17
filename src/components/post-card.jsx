import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AuthorAvatarName } from './author'
import { timeToRead } from '../util/post'
import Author from '../backend/structures/author'

export default withRouter(
    ({title, id, desc, image, author, content, authors}) => {
        author = Author.findByID(author, authors)
        const timeRead = timeToRead(content)
        return (
            <Link to={`/post/${id}`} className='text-decoration-none'>
                <div className="card">
                    {image && <img className='card-img-top' width='100%' src={image} alt={`${title}`} onError={(e) => { e.target.onError = null; e.target.src = "" }} style={{ height: '8em' }} />}
                    <div className='card-body p-2'>
                        <div className='card-title text-primary mb-0 text-center'>{title}</div>
                        {/* <div className='text-muted text-center'>{desc}</div> */}
                        <hr className='my-1' />
                        <AuthorAvatarName {...author} link />
                        <span className='text-muted'> · {timeRead}</span>
                    </div>
                </div>
            </Link>
    )}
)