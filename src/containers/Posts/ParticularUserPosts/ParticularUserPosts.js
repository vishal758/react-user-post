import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Post from '../../../components/Post/Post'
import classes from './ParticularUserPosts.module.css'
import Aux from '../../../hoc/Aux/Aux'

class ParticularUserPosts extends Component {

    componentDidMount() {
        // console.log("[ParticularUserPosts]", this.props.token)
        this.props.onFetchParticularUserPosts(this.props.match.params.username, this.props.token)
    }
    postSelectedHandler = (id, username) => {
        if(this.props.isAuth) {
            this.props.history.push({pathname: '/users/' + username + '/posts/' + id})
        } else {
            this.props.onSetAuthRedirectPath('/users/' + username + '/posts/' + id)
            this.props.history.push("/signin")
        }
    }
    render() {
        let posts = <p>Something went wrong</p>
        if(this.props.loading)
            posts = <Spinner />
        if(this.props.posts) {
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
        return (
            <Aux>
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
        token: state.auth.token,
        posts: state.post.userPosts,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchParticularUserPosts: (username, token) => dispatch(actions.fetchParticularUserPosts(username, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticularUserPosts)