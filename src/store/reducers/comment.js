import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    error: null,
    loading: false,
    commentSubmitted: false,
    commentDeleted: false
}   

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SUBMIT_COMMENT_START: 
            return updateObject(state, {loading: true, commentSubmitted: false})
        case actionTypes.SUBMIT_COMMENT_FAIL:
            return updateObject(state, {loading: false, error: action.error, commentSubmitted: false})
        case actionTypes.SUBMIT_COMMENT_SUCCESS:
            return updateObject(state, {loading: false, commentSubmitted: true})
        case actionTypes.DELETE_COMMENT_START: 
            return updateObject(state, {loading: true, commentDeleted: false})
        case actionTypes.DELETE_COMMENT_FAIL:
            return updateObject(state, {loading: false, error: action.error, commentDeleted: false})
        case actionTypes.DELETE_COMMENT_SUCCESS:
            return updateObject(state, {loading: false, commentDeleted: true})
        default:
            return state
    }
}

export default reducer