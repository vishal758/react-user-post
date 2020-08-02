import * as actionTypes from '../actions/actionTypes'

const initialState = {
    signUpCred: null,
    signInCred: null
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