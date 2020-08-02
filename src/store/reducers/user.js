import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    users: [],
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_USERS_FAIL:
            return updateObject(state, {error: action.error, loading: false})
        case actionTypes.FETCH_USERS_START:
            return updateObject(state, {loading: true})
        case actionTypes.FETCH_USERS_SUCCESS:
            return updateObject(state, {
                loading: false,
                users: action.users
            })
        default:
            return state
    }
}

export default reducer