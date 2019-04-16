import { connect } from 'react-redux'
import * as actions from '../redux/actions'

export default (component) => {
    const mapStateToProps = (state) => ({
        authUser : state.authUser,
        posts : state.posts,
        authors : state.authors,
        newPost : state.newPost,
        images : state.images,
        refPost: state.refPost
    })

    const mapDispatchToProps = (dispatch) => ({
        addPost : (post, res, rej) => dispatch(actions.addPost(post, res, rej)),
        // editPost : (post,rv,rj) => dispatch(actions.editPost(post,rv,rj)),
        deletePost : (post, res, rej) => dispatch(actions.deletePost(post, res, rej)),
        // refPost : (post, res, rej) => dispatch(actions.refPost(post, res, rej)),
        onSetAuthUser: (authUser) => dispatch(actions.onSetAuthUser(authUser)),
        updateNewPost: (post) => dispatch(actions.updateNewPost(post)),
        addImage: (image, res, rej) => dispatch(actions.addImage(image, res, rej)),
        deleteImage: (image, res, rej) => dispatch(actions.deleteImage(image, res, rej)),
        paginationPosts: (ref, res, rej) => dispatch(actions.paginationPosts(ref, res, rej)),
        fetchPost: (postID, res, rej) => dispatch(actions.fetchPost(postID, res, rej)),
        addAuthor: (author, res, rej) => dispatch(actions.addAuthor(author, res, rej)),
    })
    return connect(mapStateToProps, mapDispatchToProps)(component)
}