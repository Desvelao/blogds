import config from '../config/blog'
import { postDate } from './date'
import locale from '../config/locale'

export const timeToRead = (text) => {
    const words = text.match(/[^ ]+/g)
    const minutes = Math.round( words.length / config.wpm )
    console.log('W/M',words,minutes)
    return minutes > 0 ? `${minutes} ${locale.minRead}` : locale.aFewSeconds
}

export const sortPosts = (a, b) => new Date(a.publish) - new Date(b.publish)

// export const getPostWithAuthor = (post, authors) => {
//     const { ...postWithAuthor } = post
//     const author = authors.find( author => author.id === post.author)
//     postWithAuthor.publish = postWithAuthor.publish ? postDate(postWithAuthor.publish) : postWithAuthor.publish
//     postWithAuthor.edited = postWithAuthor.edited ? postDate(postWithAuthor.edited) : postWithAuthor.edited
//     return { ...postWithAuthor, author }
// }

// export const getAuthorPosts = (author, posts) => {
//     const { ...authorInfo } = author
//     authorInfo.posts = posts.filter(post => post.author === authorInfo.id)
//     return { ...authorInfo}
// }