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
            console.log('submit response: ', response.data)
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
            console.log(response.data)
            const posts = response.data
            const updatedPosts = posts.map(                
                post => {
                    return {         
                        id: post.id,               
                        title: post.title,
                        description: post.desc,
                        author: post.author,
                        lastModifiedDate: post.lastModifiedDate,
                        userId: post.userId
                    }
                }
            )
            dispatch(fetchPostsSuccess(updatedPosts))
            // console.log("updatedposts: " + updatedPosts)
            // this.setState({posts: updatedPosts, loading: false})
        })
        .catch(error => {
            // console.log(error)
            dispatch(fetchPostsFail(error))
            // this.setState({loading: false})
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

export const fetchFullPost = (id, token) => {
    return dispatch => {
        dispatch(fetchFullPostStart())
        
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.get('/allPosts/' + id, {headers})
            .then(response => {
                dispatch(fetchFullPostSuccess(response.data))
                // this.setState({loadedPost: response.data, loading: false})
            })
            .catch(error => {
                dispatch(fetchFullPostFail(error))
                // console.log(error)
                // this.setState({loading: false})
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
                // console.log("successful edit")
                // console.log(response.data)
            })
            .catch(err => {
                dispatch(editPostFail(err))
                // console.log(err)
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
        console.log("delete post action", headers)
        axios.delete("/users/" + username + "/posts/" + postId, {headers})
            .then(response => {
                dispatch(deletePostSuccess())
            })
            .catch(err => {
                dispatch(deletePostFail(err))
            })
    }
}