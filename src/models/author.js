import config from '../config/blog'
const { defaultAuthor } = config

export default class Author{
    constructor({name, avatar, url}){
        this.name = name
        this.avatar = avatar
        this.url = url
    }
    static default(){
        return {
            name: defaultAuthor.name,
            id: 'default',
            avatar: defaultAuthor.avatar || '',
            url: defaultAuthor.url || ''
        }
    }
    static findByID(id, authors){
        return authors.find(author => author.id === id) || Author.default()
    }
    static getPosts(author, posts){
        const { ...authorInfo } = author
        authorInfo.posts = posts.filter(post => post.author === authorInfo.id)
    return { ...authorInfo }
}
}