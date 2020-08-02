import * as actionTypes from './actionTypes'
import axios from '../../Axios/axios-post'

export const fetchUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    }
}

export const fetchUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    }
}

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    }
}

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUsersStart())
        axios.get('/users')
        .then(response => {
            const users = response.data
            const updatedUsers = users.map(
                user => {
                    return  {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        userProfileData: user.userProfileData
                    }
                }
            )
            dispatch(fetchUsersSuccess(updatedUsers))
        })
        .catch(error => {
            dispatch(fetchUsersFail(error))
        })
    }
}
