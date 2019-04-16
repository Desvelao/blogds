import { db } from '../backend'
import * as actioncreators from './actioncreators'
import { Author, Image, Post } from '../backend/structures'
import { postDate } from '../util/date'
import configBlog from '../config/blog'

// export const loadLastPosts = () => async (dispatch) => {
//     const posts = await Post.find((query) => query.orderBy('publish', 'desc').limit(configBlog.initialLoadPosts)) //db.loadLastPosts()
//     posts.forEach(post => {
//         console.log(post.id, post.data())
//         dispatch(actioncreators.addPost(Post.fromDBToApp(post)))
//     })
//     if(posts.length){
//         dispatch(actioncreators.refPost(posts[-1]))
//     }
// }

export const loadAllAuthors = () => async (dispatch) => {
    const authors = await Author.find() //db.loadAuthors()
    authors.forEach(author => {
        console.log(author.id, author.data())
        dispatch(actioncreators.addAuthor({ id: author.id, ...author.data()}))
    })
}

export const loadImages = () => async (dispatch) => {
    const images = await Image.find() //db.loadImages()
    images.forEach(image => {
        dispatch(actioncreators.addImage({ id: image.id, ...image.data()}))
    })
}

export const paginationPosts = (refPost, res, rej) => async (dispatch) => {
    try{
        const posts = await Post.find((query) => refPost ? query.orderBy('publish', 'desc').startAfter(refPost).limit(configBlog.paginationPosts)
            : query.orderBy('publish', 'desc').limit(configBlog.paginationPosts)
        )
        posts.forEach(post => {
            console.log(post.id, post.data())
            dispatch(actioncreators.addPost(Post.fromDBToApp(post), refPost ? false : true))
        })
        if (posts.size) {
            dispatch(actioncreators.refPost(posts.docs[posts.size-1]))
        }
        if(res){ res(posts) }
    }catch(err){
        if(rej){ rej(err)}
    }
    
}

// Posts
export const addPost = (post, res, rej) => async (dispatch) => {
    try {
        const curPost = new Post(post.id, post)
        await curPost.save()
        console.log('AfterSave', curPost.toData())
        dispatch(actioncreators.addPost(curPost.toData(), true))
        if(res){res(curPost)}
    }catch(err){
        if(rej){rej(err)}
    }
}

export const editPost = (post, res, rej) => async (dispatch) => {
    try {
        const curPost = await db.editPost(post)
        dispatch(actioncreators.addPost(curPost.toData()))
        if (res) { res(curPost) }
    } catch (err) {
        if (rej) { rej(err) }
    }
}

export const deletePost = (post, res, rej) => async (dispatch) => {
    try {
        await Post.delete(post.id)
        dispatch(actioncreators.deletePost(post))
        if (res) { res() }
    } catch (err) {
        if (rej) { rej(err) }
    }
}

export const fetchPost = (postID, res, rej) => async (dispatch) => {
    try {
        const curPost = await Post.find((query) => query.doc(postID))
        if(curPost){
            dispatch(actioncreators.addPost(Post.fromDBToApp(curPost), true))
            if (res) { res(Post.fromDBToApp(curPost)) }
        }else{
            if (rej) { rej('Post doesn\'t exist') }
        }
    } catch (err) {
        if (rej) { rej(err) }
    }
}

export const updateNewPost = (post) => (dispatch) => {
    dispatch(actioncreators.updateNewPost(post))
}

export const onSetAuthUser = (authUser) =>
    (dispatch) => dispatch(actioncreators.onSetAuthUser(authUser))

export const addAuthor = (author, res, rej) => async (dispatch) => {
    try {
        const curAuthor = new Author(author.id, author)
        await curAuthor.save()
        dispatch(actioncreators.addAuthor(curAuthor.toData()))
        if (res) { res(curAuthor) }
    } catch (err) {
        if (rej) { rej(err) }
    }
}

export const addImage = (image, res, rej) => async (dispatch) => {
    try {
        const curImage = new Image(image.id, image)
        await curImage.save()
        dispatch(actioncreators.addImage(curImage.toData()))
        if (res) { res(curImage) }
    } catch (err) {
        if (rej) { rej(err) }
    }
}

export const deleteImage = (image, res, rej) => async (dispatch) => {
    try {
        await Image.delete(image)
        // await storage.deleteFile(`images/${image.id}.${image.ext}`)
        dispatch(actioncreators.deleteImage(image))
        if (res) { res() }
    } catch (err) {
        if (rej) { rej(err) }
    }
}
