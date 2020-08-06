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
        })
        .catch(error => {
            dispatch(submitSignUpFail(error))
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

export const SignInSucessToken = (token, userId, email, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS_TOKEN,
        token: token,
        userId: userId,
        username: username,
        email: email
    }
}

export const signIn = (signInData) => {
    return dispatch => {
        signInStart()
        axios.post('/signin', signInData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + 3600*1000)
            localStorage.setItem('token', response.data.accessToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('username', response.data.username)
            dispatch(signInSuccess(response.data))
            dispatch(checkAuthTimeout(3600))
        })
        .catch(error => {
            dispatch(signInFail(error))
        })
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime*1000);
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
       const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem('userId')
                const email = localStorage.getItem('email')
                const username = localStorage.getItem('username')
                dispatch(SignInSucessToken(token, userId, email, username))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000 ))
            } else {
                dispatch(logout())
            }
        }
    }
}