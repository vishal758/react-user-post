import React, { Component } from 'react' 
import axios from '../../Axios/axios-post'
import User from '../../components/User/User'
import Aux from '../../hoc/Aux/Aux'
import classes from './Users.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
class Users extends Component {
    state = {
        users: [],
        selecteduserId: null,
        loading: true
    }
    componentDidMount() {
        axios.get('/users')
        .then(response => {
            const users = response.data
            console.log(users)
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
            this.setState({users: updatedUsers, loading: false})
        })
        .catch(error => {
            console.log(error)
        })
    }   

    render() {
        let users = <p>Something went wrong</p>
        if(this.state.users) {
            users = this.state.users.map(
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

            if(this.state.loading) {
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

export default Users