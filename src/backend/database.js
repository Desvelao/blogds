import PostModel from '../backend/structures/post'
import AuthorModel from '../backend/structures/author'
import ImageModel from '../backend/structures/image'

export default class Database{
    constructor(firebase){
        this.firebase = firebase
        this.db = firebase.firestore()

        // DB references
        this.posts = this.db.collection('posts')
        this.authors = this.db.collection('authors')
        this.images = this.db.collection('images')
    }
    async loadLastPosts(posts){
        return await this.posts.get()
    }
    async loadAuthors(){
        return await this.authors.get()
    }
    async loadImages(){
        return await this.images.get()
    }
    async addPost(data){
        if (!data.content) {
            throw new Error('Missing post content')
        }
        try{
            const post = new PostModel(data)
            await this.posts.doc(post.id).set(post.data)
            return { ...post.data, id : post.id }
        }catch(err){
            throw err
        }
    }
    async editPost(id, data){
        try {
            const post = new PostModel(data)
            await this.posts.doc(id).update(post.data)
            return { ...post.data, id: post.id }
        } catch (err) {
            throw err
        }
    }
    async deletePost(id) {
        try{
            return await this.posts.doc(id).delete()
        }catch(err){
            throw err
        }
    }
    async getPost(id){
        try {
            return await this.posts.doc(id).get()
        } catch (err) {
            throw err
        }
    }
    async addImage(data){
        try{
            const image = new ImageModel(data)
            await this.images.doc(image.id).set(image.data)
            return { id : image.id, url: image.data.url}
        }catch (err) {
            throw err
        }
    }
    async deleteImage(id){
        try{
            return await this.images.doc(id).delete()
        }catch (err){
            throw err
        }
    }
}

