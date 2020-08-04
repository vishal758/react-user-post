import React, { Component } from "react";
import Post from '../../components/Post/Post'
import classes from "./Posts.module.css";
import Aux from '../../hoc/Aux/Aux'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import { connect } from "react-redux";

class Posts extends Component {
    state = {
        // posts: [],
        selectedPostId: null,
        // loading: true
    }

    componentDidMount () {
        console.log("posts")
        this.props.onFetchPosts()
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
        if(this.props.isAuth) {
            this.props.history.push({pathname: '/allPosts/' + id})
        } else {
            this.props.onSetAuthRedirectPath('/allPosts/' + id)
            this.props.history.push("/signin")
        }
        
        // this.props.history.push('/allPosts' + id)
    }

    render() {
        // console.log("selected id: " + this.state.selectedPostId)
        let posts = <p>Something went wrong</p>
        console.log(this.props.loading)
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
                            desc = {post.description}
                            lastModifiedDate = {post.lastModifiedDate}
                            clicked = {() => this.postSelectedHandler(post.id)}
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
        posts: state.post.posts,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: () => dispatch(actions.fetchPosts()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)