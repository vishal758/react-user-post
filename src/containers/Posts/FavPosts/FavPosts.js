import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Post from '../../../components/Post/Post'
import classes from './FavPosts.module.css'
import Aux from '../../../hoc/Aux/Aux'
import ModalAction from '../../NewPost/ModalAction/ModalAction'
import Modal from '../../../components/UI/Modal/Modal'

class FavPosts extends Component {

    componentDidMount() {
        this.props.onFetchFavPosts(this.props.loggedInUser, this.props.token)
    }
    postSelectedHandler = (id, username) => {
        if(this.props.isAuth) {
            this.props.history.push({pathname: '/users/' + username + '/posts/' + id})
        } else {
            this.props.onSetAuthRedirectPath('/users/' + username + '/posts/' + id)
            this.props.history.push("/signin")
        }
    }
    cancelHandler = () => {
        this.props.history.push('/allPosts')
    }
    render() {
        let posts = <p style={{textAlign: 'center'}}>No Favourite Posts from this user.</p>
        if(this.props.loading)
            posts = <Spinner />
        if(Array.isArray(this.props.posts) && this.props.posts) {
            posts = this.props.posts.map(
                post => {
                    return (
                        // <Link to = {'/allPosts/' + post.id} key = {post.id}>
                            <Post 
                            key = {post.id}
                            title = {post.title}
                            author = {post.author}
                            desc = {post.desc}
                            lastModifiedDate = {post.lastModifiedDate}
                            clicked = {() => this.postSelectedHandler(post.id, post.author)}
                            />
                        // </Link>
                        )
                }
            )
        }
        let showModal = null, show = false
        if(!Array.isArray(this.props.posts)) {
                show = true
                showModal = <ModalAction 
                    message = "No Favourite Post from this user."
                    actionCancelled={this.cancelHandler}
                    mess = "CONTINUE"
                    actionConfirmed={this.cancelHandler} />
        }
        return (
            <Aux>
                <Modal show = {show} modalClosed={this.cancelHandler}>
                        {showModal}
                </Modal>
            <section className={classes.Posts}>
                {posts}
            </section>
        </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.post.loading,
        loggedInUser: state.auth.username,
        token: state.auth.token,
        posts: state.post.userPosts,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFavPosts: (username, token) => dispatch(actions.fetchFavPosts(username, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavPosts)