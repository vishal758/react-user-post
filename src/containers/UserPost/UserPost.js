import React, { Component } from 'react'
import NewPost from '../NewPost/NewPost'
import Posts from '../Posts/Posts'
import { Route, Switch, withRouter } from 'react-router-dom'
import FullPost from '../FullPost/FullPost'
import Users from '../Users/Users'
import SignUp from '../Administration/SignUp/SignUp'
import SignIn from '../Administration/SignIn/SignIn'
import Logout from '../Administration/Logout/Logout'
import EditPost from '../NewPost/EditPost/EditPost'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class UserPost extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp()
    }
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
                    <Route path="/allPosts/:id/edit" component = {EditPost} />
                    <Route path="/allPosts/:id" component = {FullPost} />
                    <Route path="/users" component = {Users} />
                </Switch>                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
  }

export default withRouter(connect(null, mapDispatchToProps)(UserPost))