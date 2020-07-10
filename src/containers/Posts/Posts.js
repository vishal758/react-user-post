import React, { Component } from "react";
import axios from '../../axios-post'
import Post from '../../components/Post/Post'
import classes from "./Posts.module.css";
import FullPost from "../FullPost/FullPost";
import Aux from '../../hoc/Aux/Aux'
class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null
    }

    componentDidMount () {
        console.log("posts")
        axios.get("/allPosts")
        // axios.get("https://burger-react-app-50038.firebaseio.com/post.json")
        .then(response => {
            console.log(response.data)
            const posts = response.data
            const updatedPosts = posts.map(
                // console.log("obj.keys: " + Object.keys(posts))
            // const updatedPosts = Object.keys(posts).map(
                post => {
                    return {         
                        id: post.id,               
                        title: post.title,
                        description: post.desc,
                        author: post.author,
                        lastModifiedDate: post.lastModifiedDate,
                        userId: post.userId
                        // id: post,
                        // title: posts[post].title,
                        // description: posts[post].description,
                        // author: 'vishal758'
                    }
                }
            )
            console.log("updatedposts: " + updatedPosts)
            this.setState({posts: updatedPosts})
        })
        .catch(error => {
            console.log(error)
        })
    }

    postSelectedHandler = (id) => {
        console.log("called: " + id)
        this.setState({selectedPostId: id})
    }

    render() {
        // console.log("type: " + typeof(this.state.posts))
        console.log("selected id: " + this.state.selectedPostId)
        let posts = <p>Something went wrong</p>
        if(this.state.posts) {
            posts = this.state.posts.map(
                post => {
                    console.log(post.id + "  " + post.title)
                    // console.log(post.title)
                    return <Post 
                            key = {post.id}
                            title = {post.title}
                            author = {post.author}
                            desc = {post.description}
                            lastModifiedDate = {post.lastModifiedDate}
                            clicked = {() => this.postSelectedHandler(post.id)}
                        />
                }
            )
        }
        return (
            <Aux>
                <section className={classes.Posts}>
                    {posts}
                </section>

                <section>
                    <FullPost id = {this.state.selectedPostId}/>
                </section>
            </Aux>
        )
    }
}

export default Posts