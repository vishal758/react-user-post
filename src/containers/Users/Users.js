import React, { Component } from 'react' 
import axios from '../../Axios/axios-post'
import User from '../../components/User/User'
import Aux from '../../hoc/Aux/Aux'
import classes from './Users.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

class Users extends Component {
    state = {
        selecteduserId: null,
    }
    componentDidMount() {
        this.props.onFetchUsers()
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
        return (
            <Aux>
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
        users: state.user.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(actions.fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)