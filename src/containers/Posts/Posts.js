import React, { Component } from "react";
import axios from '../../Axios/axios-post'
import Post from '../../components/Post/Post'
import classes from "./Posts.module.css";
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
                post => {
                    return {         
                        id: post.id,               
                        title: post.title,
                        description: post.desc,
                        author: post.author,
                        lastModifiedDate: post.lastModifiedDate,
                        userId: post.userId
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
        // console.log("called: " + id)
        this.props.history.push({pathname: '/allPosts/' + id})
        // this.props.history.push('/allPosts' + id)

        this.setState({selectedPostId: id})
    }

    render() {
        // console.log("type: " + typeof(this.state.posts))
        console.log("selected id: " + this.state.selectedPostId)
        let posts = <p>Something went wrong</p>
        if(this.state.posts) {
            posts = this.state.posts.map(
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

export default Posts