import factoryStructure from './base'
const Base = factoryStructure('posts')

export default class Post extends Base{
    constructor(id, { title, desc = '', content, author = '', image = '', publish = null }){
        super(id)
        if (!title) { throw new Error('Title is missing') }
        if (!content) { throw new Error('Content is missing') }
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
    static generateID(text) {
        return text.replace(/[ ]/g, "-").replace(/[']/g, "").toLowerCase()
    }
    static dateFormat(date){
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    static fromDBToApp(post){
        console.log('edit',post.data())
        return { id: post.id, ...post.data(),
            edit: post.data().edit && Post.dateFormat(post.data().edit.seconds*1000),
            publish: post.data().publish && Post.dateFormat(post.data().publish.seconds*1000),
        }
    }
}