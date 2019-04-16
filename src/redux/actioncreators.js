import actiontypes from './actiontypes'
import { db } from '../backend'

export const addPost = (post, sort) => ({ type: actiontypes.addPost, post, sort})
export const editPost = (post, sort) => ({ type: actiontypes.editPost, post, sort})
export const deletePost = (post, sort) => ({ type: actiontypes.deletePost, post, sort})
export const refPost = (ref) => ({ type: actiontypes.refPost, ref })
export const addAuthor = (author) => ({ type: actiontypes.addAuthor, author})
export const updateNewPost = (post) => ({ type: actiontypes.updateNewPost, post})

// Auth user
export const onSetAuthUser = (authUser) => ({ type: actiontypes.onSetAuthUser, authUser})

// Images
export const addImage = (image) => ({ type: actiontypes.addImage, image})
export const deleteImage = (image) => ({ type: actiontypes.deleteImage, image})

// export const addPostDB = (post, resolve, reject) =>
//     (dispatch) => backend.db.addPost(post)
//         .then(() => {dispatch({type : actiontypes.addPost, post});resolve()})
//         .catch((err) => {console.error(err);reject(err)})

// export const editPost = (post, resolve, reject) =>
//     (dispatch) => backend.db.editPost(post)
//         .then(() => { dispatch({ type: actiontypes.editPost, post }); resolve() })
//         .catch((err) => { console.error(err); reject(err) })

// export const deletePost = (post, resolve, reject) =>
//     (dispatch) => backend.db.deletePost(post)
//         .then(() => { dispatch({ type: actiontypes.deletePost, post }); resolve() })
//         .catch((err) => { console.error(err); reject(err) })

// export const getPost = (post, resolve, reject) =>
//     (dispatch) => backend.db.getPost(post)
//         .then(() => { dispatch({ type: actiontypes.addPost, post }); resolve() })
//         .catch((err) => { console.error(err); reject(err) })
