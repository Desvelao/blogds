import { combineReducers } from 'redux'
import actiontypes from './actiontypes'

import { sortPosts } from '../util/post'

const authUser = (state = null /* null */, action) => {
    console.log('REDUCER AUTHUSER',action)
    switch (action.type) {
        case (actiontypes.onSetAuthUser):
            return action.authUser
        default:
            return state;
    }
}

const posts = (state = [], action) => {
    switch (action.type) {
        case (actiontypes.addPost):{
            const data = [...state.filter(post => post.id !== action.post.id), action.post]
            return action.sort ? data.sort(sortPosts) : data
        }
        case (actiontypes.editPost):{
            const data = [...state.filter(post => post.id !== action.post.id), action.post]
            return action.sort ? data.sort(sortPosts) : data
        }
        case (actiontypes.deletePost):{
            const data = [...state.filter(post => post.id !== action.post.id)]
            return action.sort ? data.sort(sortPosts) : data
        }
        default:
            return state;
    }
}

const authors = (state = [], action) => {
    switch (action.type) {
        case (actiontypes.addAuthor):
            return [...state.filter(author => author.id !== action.author.id), action.author]
        case (actiontypes.editAuthor):
            return [...state.filter(author => author.id !== action.author.id), action.author]
        case (actiontypes.deleteAuthor):
            return [...state.filter(author => author.id !== action.author.id)]
        default:
            return state;
    }
}

const newPost = (state = {title: '', desc: '', content: '', image: ''}, action) => {
    switch (action.type) {
        case (actiontypes.updateNewPost):
            const {title, desc, content, image } = action.post
            return { title, desc, content, image}
        default:
            return state;
    }
}

const images = (state = [], action) => {
    console.log("Images",action)
    switch (action.type) {
        case (actiontypes.addImage):
            return [...state, action.image]
        case (actiontypes.deleteImage):
            return [...state.filter(image => image.id !== action.image.id)]
        default:
            return state;
    }
}

const refPost = (state = null, action) => {
    switch (action.type) {
        case (actiontypes.refPost):
            return action.ref || null
        default:
            return state;
    }
}

export default combineReducers({ authUser, posts, authors, newPost, images, refPost })