import * as actionTypes from './actionTypes'
import axios from '../../Axios/axios-userAuth'

export const submitSignUpSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    }
}

export const submitSignUpFail = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    }
}

export const submitSignUpStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    }
}

export const 