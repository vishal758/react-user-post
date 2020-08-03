import React, { Component } from 'react'
import NewPost from '../NewPost/NewPost'
import Posts from '../Posts/Posts'
import { Route, Switch } from 'react-router-dom'
import FullPost from '../FullPost/FullPost'
import Users from '../Users/Users'
import SignUp from '../Administration/SignUp/SignUp'
import SignIn from '../Administration/SignIn/SignIn'
import Logout from '../Administration/Logout/Logout'
class UserPost extends Component {
    
    render() {
        return(
            <div>
                <Route path="/" exact component={SignIn} />           
                <Switch>
                    <Route path="/signup" component = {SignUp} />
                    <Route path="/signin" component = {SignIn} />
                    <Route path="/logout" component = {Logout} />
                    <Route path="/allPosts" exact component={Posts} />
                    <Route path="/newPost" component = {NewPost}/>
                    <Route path="/allPosts/:id" component = {FullPost} />
                    <Route path="/users" component = {Users} />
                </Switch>                
            </div>
        )
    }
}

export default UserPost