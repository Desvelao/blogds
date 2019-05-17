import React from 'react';
import md from '../util/markdownit'
import { timeToRead } from '../util/post'
import { postDate } from '../util/date'
import { AuthorAvatarName } from './author'
import { Container } from 'reactstrap'
import FooterOtherPosts from './footer-other-posts'

const RenderPost = ({ id, title, desc, content, image, publish, author }) => {
    const timeRead = timeToRead(content)
    const date = publish ? postDate(publish) : ''
    console.log(author)
    return (
        <div className=''>
            {image && (<div className='mb-2' style={{
                width: '100%',
                height: '40vh',
                // position: 'relative',
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center center',
                // backgroundRepeat: 'no-repeat'
            }} />)}
            {/* <div className='w-100'><img src={image} alt={`${title}'s image`}/></div> */}
            <Container className='content mb-2'>
                <div className='mb-4'>
                    <div className='th-post-title'>{title}</div>
                    {desc && <div className='text-center th-color-muted'><h4>{desc}</h4></div>}
                    <div className='justify-content-between'>
                        {author && (<AuthorAvatarName {...author} link/>)}
                        <span className='th-color-muted'> · {timeRead}</span>
                        <span className='th-color-muted'> · {date}</span>
                    </div>
                    {/* <div className="post-title">{{ title }}</div>
                    {subtitle && (<div className="post-subtitle">{{ subtitle }}</div>)}
                    <div className="post-content">{{ content }}</div>
                    <div className="post-date">{{ date }}</div>
                    <div className="post-author">{{ author }}</div> */}
                    <hr/>
                    <div className="th-post-content" dangerouslySetInnerHTML={{ __html : md.render(content)}}/>
                </div>
                <FooterOtherPosts currentPost={id}/>
            </Container>
        </div>
    )
}

export default RenderPost