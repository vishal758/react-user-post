import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    posts: [],
    submitted: false,
    loading: false,
    error: null,
    fullPost: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SUBMIT_POST_START:
            return updateObject(state, {loading: true})
        case actionTypes.SUBMIT_POST_FAIL:
            return updateObject(state, {loading: false, error: action.error})
        case actionTypes.SUBMIT_POST_SUCCESS:
            const newPost = updateObject(action.postData, {id: action.postId})
            return updateObject(state, {
                loading: false, 
                submitted: true,
                posts: state.posts.concat(newPost)
            })
        case actionTypes.FETCH_POSTS_START:
            return updateObject(state, {loading: true})
        case actionTypes.FETCH_POSTS_FAIL:
            return updateObject(state, {loading: false, error: action.error})
        case actionTypes.FETCH_POSTS_SUCCESS:
            return updateObject(state, {
                posts: action.posts,
                loading: false
            })
        case actionTypes.FETCH_FULLPOST_START:
            return updateObject(state, {loading: true})
        case actionTypes.FETCH_FULLPOST_FAIL:
            return updateObject(state, {loading: false, error: action.error})
        case actionTypes.FETCH_FULLPOST_SUCCESS:
            return updateObject(state, {
                loading: false, 
                fullPost: action.fullPost
            })
        default:
            return state
    }
}

export default reducer