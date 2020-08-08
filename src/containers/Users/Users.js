import React, { Component } from 'react' 
import User from '../../components/User/User'
import Aux from '../../hoc/Aux/Aux'
import classes from './Users.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class Users extends Component {
    state = {
        selecteduserId: null,
    }
    componentDidMount() {
        this.props.onFetchUsers(this.props.token)
    }   

    particularUserPostsHandler = (username) => {
        if(this.props.isAuth)
            this.props.history.push('/users/' + username + '/posts')
    }
    render() {
        let users = <p>Something went wrong</p>
        if(this.props.users) {
            users = this.props.users.map(
                user => {
                    return (
                        // <Link to = {'/allPosts/' + post.id} key = {post.id}>
                            <User 
                                key = {user.id}
                                username = {user.username}
                                email = {user.email}
                                role = {user.role}
                                userProfileData = {user.userProfileData}
                                clicked={() => this.particularUserPostsHandler(user.username)}
                            // clicked = {() => this.userSelectedHandler(user.id)}
                            />
                        // </Link>
                        )
                }
            )

            if(this.props.loading) {
                users = <Spinner />
            }            
        }
        let redirectUrl = null
            if(!this.props.isAuth) {
                redirectUrl = <Redirect to="/signin" />
            }
        return (
            <Aux>
                {redirectUrl}
                <section className={classes.Users}>
                    {users}
                </section>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        users: state.user.users,
        token: state.auth.token,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: (token) => dispatch(actions.fetchUsers(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)