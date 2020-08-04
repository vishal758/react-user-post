import * as actionTypes from './actionTypes'
import axios from '../../Axios/axios-userAuth'

export const submitSignUpSuccess = (signUpData) => {
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
        signUpCred: signUpData
    }
}

export const submitSignUpFail = (error) => {
    return {
        type: actionTypes.SIGN_UP_FAIL,
        error: error
    }
}

export const submitSignUpStart = () => {
    return {
        type: actionTypes.SIGN_UP_START
    }
}

export const submitSignUp = (signUpData) => {
    return dispatch => {
        dispatch(submitSignUpStart())
        axios.post('/signup', signUpData)
        .then(response => {
            dispatch(submitSignUpSuccess(response.data))
            // this.setState({loading: false})
            // this.props.history.push({pathname: 'allPosts'})
        })
        .catch(error => {
            dispatch(submitSignUpFail(error))
            // this.setState({loading: false})
        })

    }
}

export const signInStart = () => {
    return {
        type: actionTypes.SIGN_IN_START
    }
}

export const signInFail = (error) => {
    return {
        type: actionTypes.SIGN_IN_FAIL,
        error: error
    }
}

export const signInSuccess = (signInData) => {
    return {
        type: actionTypes.SIGN_IN_SUCCESS,
        signInData: signInData
    }
}

export const signIn = (signInData) => {
    return dispatch => {
        signInStart()
        axios.post('/signin', signInData)
        .then(response => {
            dispatch(signInSuccess(response.data))
            dispatch(checkAuthTimeout(360000))
            // console.log(response.data)
            // this.setState({loading: false})
            // this.props.history.push({pathname: 'allPosts'})
        })
        .catch(error => {
            dispatch(signInFail(error))
            // this.setState({loading: false})
            // console.log(error)
        })
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime);
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}