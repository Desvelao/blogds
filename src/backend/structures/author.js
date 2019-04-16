import factoryStructure from './base'
import config from '../../config/blog'
const { defaultAuthor } = config
const Base = factoryStructure('authors')

export default class Author extends Base {
    constructor(id, { name, avatar = '', url = ''}) {
        super(id)
        this.data = {name, avatar, url}
    }
    static default() {
        return {
            name: defaultAuthor.name,
            id: 'default',
            avatar: defaultAuthor.avatar || '',
            url: defaultAuthor.url || ''
        }
    }
    static findByID(id, authors) {
        return authors.find(author => author.id === id) || Author.default()
    }
    static getPosts(author, posts) {
        const { ...authorInfo } = author
        authorInfo.posts = posts.filter(post => post.author === authorInfo.id)
        return { ...authorInfo }
    }
}