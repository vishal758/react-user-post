import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
    signUpCred: null,
    username: '',
    email: null,
    token: null,
    id: null,
    loading: false,
    error: null,
    roles: [],
    signUpSuccess: false,
    signInSuccess: false,
    authRedirectPath: "/"
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGN_UP_START:
            return updateObject(state, {loading: true})
        case actionTypes.SIGN_UP_FAIL:
            return updateObject(state, {error: action.error, loading: false})
        case actionTypes.SIGN_UP_SUCCESS:
            return updateObject(state, {
                loading: false,
                signUpSuccess: true,
                signUpCred: action.signUpCred
            })
        case actionTypes.SIGN_IN_START:
            return updateObject(state, {loading: true, error: null})
        case actionTypes.SIGN_IN_FAIL:
            return updateObject(state, {error: action.error, loading: false, signInSuccess: false})
        case actionTypes.SIGN_IN_SUCCESS:
            return updateObject(state, {
                signInSuccess: true,
                loading: true,
                error: null,
                token: action.signInData.token,
                username: action.signInData.username,
                userId: action.signInData.id,
                email: action.signInData.email,
                roles: action.signInData.roles
            })
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                token: null, 
                userId: null,
                username: null,
                loading: false,
                signInSuccess: false, 
                email: null,
                roles: [],
                authRedirectPath: '/'
            })
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateObject(state, {
                authRedirectPath: action.path
            })
        default:
            return state
    }
}

export default reducer