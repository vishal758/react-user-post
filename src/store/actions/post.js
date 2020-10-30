import * as actionTypes from './actionTypes'
import axios from '../../Axios/axios-post'

export const submitPostSuccess = (id, postData) => {
    return {
        type: actionTypes.SUBMIT_POST_SUCCESS,
        postId: id,
        postData: postData
    }
}

export const submitPostFail = (error) => {
    return {
        type: actionTypes.SUBMIT_POST_FAIL,
        error: error
    }
}

export const submitPostStart = () => {
    return {
        type: actionTypes.SUBMIT_POST_START
    }
}

export const submitPost = (username, postData, token) => {
    return dispatch => {
        dispatch(submitPostStart())
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        console.log(headers)
        axios.post('/users/' + username + '/posts', postData, {headers})
        // axios.post('https://burger-react-app-50038.firebaseio.com/post.json', post)
        .then(response => {
            dispatch(submitPostSuccess(response.data.resourceId, postData))
        })
        .catch(error => {
            dispatch(submitPostFail(error))
            // this.setState({loading: false})
        })
    }
}

export const fetchPostsSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: posts
    }
}

export const fetchPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error: error
    }
}

export const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START
    }
}

export const fetchPosts = () => {
    return dispatch => {
        dispatch(fetchPostsStart())
        axios.get("/allPosts")
        // axios.get("https://burger-react-app-50038.firebaseio.com/post.json")
        .then(response => {
            // console.log(response.data)
            const posts = response.data
            const updatedPosts = posts.map(                
                post => {
                    return {         
                        id: post.id,               
                        title: post.title,
                        description: post.desc,
                        author: post.author,
                        lastModifiedDate: post.lastModifiedDate,
                        userId: post.userId,
                        imageUrl: post.imageUrl
                    }
                }
            )
            dispatch(fetchPostsSuccess(updatedPosts))           
        })
        .catch(error => {
            dispatch(fetchPostsFail(error))
        })
    }
}

export const fetchFullPostSuccess = (fullPost) => {
    return {
        type: actionTypes.FETCH_FULLPOST_SUCCESS,
        fullPost: fullPost
    }
}

export const fetchFullPostFail = (error) => {
    return {
        type: actionTypes.FETCH_FULLPOST_FAIL,
        error: error
    }
}

export const fetchFullPostStart = () => {
    return {
        type: actionTypes.FETCH_FULLPOST_START
    }
}

export const fetchFullPost = (id, username, token) => {
    return dispatch => {
        dispatch(fetchFullPostStart())
        
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.get('/users/' + username + '/posts/' + id, {headers})
            .then(response => {
                dispatch(fetchFullPostSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchFullPostFail(error))
            })
    }
}

export const fetchParticularUserPostsSucess = (posts) => {
    return {
        type: actionTypes.FETCH_PARTICULAR_USERS_POSTSSUCCESS,
        userPosts: posts
    }
}

export const fetchParticularUserPostsFail = (err) => {
    return {
        type: actionTypes.FETCH_PARTICULAR_USERS_POSTS_FAIL,
        error: err
    }
}

export const fetchParticularUserPostsStart = () => {
    return {
        type: actionTypes.FETCH_PARTICULAR_USERS_POSTS_START
    }
}

export const fetchParticularUserPosts = (username, token) => {
    return dispatch => {
        dispatch(fetchParticularUserPostsStart())
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.get('/users/' + username + '/posts', {headers})
            .then(response => {
                dispatch(fetchParticularUserPostsSucess(response.data))
            })
            .catch(error => {
                dispatch(fetchParticularUserPostsFail(error))                
            })
    }
}

export const editPostSuccess = () => {
    return {
        type: actionTypes.EDIT_POST_SUCCESS,
        // editPostData: data
    }
}

export const editPostFail = (err) => {
    return {
        type: actionTypes.EDIT_POST_FAIL,
        error: err
    }
}

export const editPostStart = () => {
    return  {
        type: actionTypes.EDIT_POST_START
    }
}

export const editPost = (username, postId, editData, token) => {
    return dispatch => {
        dispatch(editPostStart())
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.put('/users/' + username + '/posts/' + postId, editData, {headers})
            .then(response => {
                dispatch(editPostSuccess())
            })
            .catch(err => {
                dispatch(editPostFail(err))
            })
    }
}

export const deletePostSuccess = () => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS
    }
}

export const deletePostFail = (err) => {
    return {
        type: actionTypes.DELETE_POST_FAIL,
        error: err
    }
}

export const deletePostStart = () => {
    return {
        type: actionTypes.DELETE_POST_START
    }
}

export const deletePost = (postId, username, token) => {
    return dispatch => {
        dispatch(deletePostStart())
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.delete("/users/" + username + "/posts/" + postId, {headers})
            .then(response => {
                dispatch(deletePostSuccess())
            })
            .catch(err => {
                dispatch(deletePostFail(err))
            })
    }
}

export const favPostFail = (err) => {
    return {
        type: actionTypes.FAV_POSTS_FAIL,
        err: err
    }
}

export const favPostStart = () => {
    return {
        type: actionTypes.FAV_POSTS_START
    }
}

export const favPostsSuccess = (isFavFlag) => {
    return {
        type: actionTypes.FAV_POSTS_SUCCESS,
        fav: isFavFlag 
    }
}

export const favPosts = (token, username, postId, isFav) => {
    return dispatch => {
        dispatch(favPostStart())
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        const params = new URLSearchParams({
            action: isFav ? 'remove' : 'add'
          }).toString();
        axios.post('/users/' + username + '/favPosts/' + postId + '?' + params, {}, {headers})
        .then(response => {
            dispatch(favPostsSuccess(!isFav))
        })
        .catch(err => {
            dispatch(favPostFail(err))
        })
    }
}

export const isFavPostFail = (err) => {
    return {
        type: actionTypes.IS_FAV_POST_FAIL,
        err: err
    }
}

export const isFavPostStart = () => {
    return {
        type: actionTypes.IS_FAV_POST_START
    }
}

export const isFavPostSuccess = (isFavFlag) => {
    return {
        type: actionTypes.IS_FAV_POST_SUCCESS, 
        isFav: isFavFlag
    }
}

export const isFavPost = (token, username, postId) => {
    return dispatch => {
        dispatch(isFavPostStart())
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        const params = new URLSearchParams({
            postId: postId
          }).toString();
        axios.get('/users/' + username + '/isFavPost?' + params, {headers})
        .then(response => {
            dispatch(isFavPostSuccess(response.data.isFavPost))
        })
        .catch(err => {
            dispatch(isFavPostFail(err))
        })
    }
}


export const fetchFavPostsFail = (err) => {
    return {
        type: actionTypes.FETCH_FAV_POSTS_FAIL,
        err: err
    }
}

export const fetchFavPostsStart = () => {
    return {
        type: actionTypes.FETCH_FAV_POSTS_START
    }
}

export const fetchFavPostsSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_FAV_POSTS_SUCCESS, 
        userPosts: posts
    }
}

export const fetchFavPosts = (username, token) => {
    return dispatch => {
        dispatch(fetchFavPostsStart())
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.get('/users/' + username + '/favPosts', {headers})
            .then(response => {
                dispatch(fetchFavPostsSuccess(response.data))
            })
            .catch(error => {
                dispatch(fetchFavPostsFail(error))                
            })
    }
}