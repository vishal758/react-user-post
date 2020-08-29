import * as actionTypes from './actionTypes'
import axios from '../../Axios/axios-post'

export const submitCommentSuccess = () => {
    return {
        type: actionTypes.SUBMIT_COMMENT_SUCCESS,
    }
}

export const submitCommentFail = (error) => {
    return {
        type: actionTypes.SUBMIT_COMMENT_FAIL,
        error: error
    }
}

export const submitCommentStart = () => {
    return {
        type: actionTypes.SUBMIT_COMMENT_START
    }
}

export const submitComment = (username, postId, commentData, token) => {
    return dispatch => {
        dispatch(submitCommentStart)
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        // console.log('comments req. body, ', commentData)
        axios.post('/users/' + username + '/posts/' + postId + '/comments', commentData, {headers})
        .then(response => {
            dispatch(submitCommentSuccess())
        })
        .catch(err => {
            dispatch(submitCommentFail(err))
        })
    }
}


export const deleteCommentStart = () => {
    return {
        type: actionTypes.DELETE_COMMENT_START
    }
}

export const deleteCommentFail = (err) => {
    return {
        type: actionTypes.DELETE_COMMENT_FAIL,
        error: err
    }
}

export const deleteCommentSuccess = () => {
    return {
        type: actionTypes.DELETE_COMMENT_SUCCESS
    }
}

export const deleteComment = (username, postId, commentId, token) => {
    return dispatch => {
        dispatch(deleteCommentStart)
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.delete('/users/' + username + '/posts/' + postId + '/comments/' + commentId, {headers})
            .then(response => {
                dispatch(deleteCommentSuccess())
            })
            .catch(err => {
                dispatch(deleteCommentFail(err))
            })
    }
}