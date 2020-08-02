import * as actionTypes from './actions'

const initialState = {
    signUpCred: {
        email: '',
        username: '',
        password: ''
    },
    signInCred: { 
        username: '',
        password: ''
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SIGN_IN_CRED:
            return {

            }
        case actionTypes.SIGN_UP_CRED:
            return {

            }
        default:
            return state
    }
}

export default reducer