import { postDate } from '../util/date'

export default class Post {
    constructor({ title, desc = '', content, author = '', image = '', publish = null }) {
        if(!title){ throw new Error('Title is missing')}
        if(!content){ throw new Error('Content is missing')}
        this.id = Post.generateID(title)
        const now = new Date()
        this.data = {
            title,
            author,
            desc,
            image,
            content,
            publish: publish ? now : publish,
            edit: now
        }
    }
    static generateID(text){
        return text.replace(/[ ]/g, "-").replace(/[']/g, "").toLowerCase()
    }
    static getWithAuthor = (post, authors) => {
        const { ...postWithAuthor } = post
        const author = authors.find(author => author.id === post.author)
        postWithAuthor.publish = postWithAuthor.publish ? postDate(postWithAuthor.publish) : postWithAuthor.publish
        postWithAuthor.edit = postWithAuthor.edit ? postDate(postWithAuthor.edit) : postWithAuthor.edit
        return { ...postWithAuthor, author }
    }
}