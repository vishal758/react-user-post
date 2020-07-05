import React, { Component } from "react";
import axios from '../../axios-post'
import Post from '../../components/Post/Post'
import classes from "./Posts.module.css";
class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        console.log("posts")
        axios.get("/allPosts")
        .then(response => {
            console.log(response.data)
            const posts = response.data
            const updatedPosts = posts.map(
                post => {
                    return {
                        ...post
                    }
                }
            )
            this.setState({posts: updatedPosts})
        })
        .catch(error => {
            console.log(error)
        })
    }



    render() {
        let posts = <p>Something went wrong</p>
        if(this.state.posts) {
            posts = this.state.posts.map(
                post => {
                    return <Post 
                            key = {post.id}
                            title = {post.title}
                            author = {post.author}
                            desc = {post.desc}
                        />
                }
            )
        }
        return (
            <section className={classes.Posts}>
                {posts}
            </section>
        )
    }
}

export default Posts