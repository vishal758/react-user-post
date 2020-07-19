import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import classes from './SignIn.module.css'
import axios from '../../../Axios/axios-userAuth'
import { Link } from 'react-router-dom'
class SignIn extends Component {

    state = {
        signInInfo: {
            username: '',
            password: ''            
        }   
    }    

    changeHandler = (event) => {
        const signInInfo = {...this.state.signInInfo}        
        const name = event.target.name
        const val = event.target.value

        if(name === 'username')
        signInInfo.username = val
        
        if(name === 'password')
        signInInfo.password = val

        this.setState({signInInfo: signInInfo})
    }

    submitClicked = () => {
        const signInInfo = this.state.signInInfo
        axios.post('/signin', signInInfo)
        .then(response => {
            console.log(response.data)
            this.props.history.push({pathname: 'allPosts'})
        })
        .catch(error => {
            console.log(error)
        })
        // alert("Post submitted")
    }

    render() {
        return (
            <Aux>
                <div className={classes.Cont}>
                    <div className={classes.Login}>
                        <h2>
                            Sign In 
                        </h2>
                        <input 
                            name="username" 
                            placeholder="Username" 
                            type="text"
                            value={this.state.signInInfo.username}
                            onChange={this.changeHandler}/>

                        <input 
                            id='pw' 
                            name='password' 
                            placeholder='Password' 
                            type='password' 
                            onChange={this.changeHandler}/>

                        <button className={classes.Animated} onClick={this.submitClicked}>SignIn</button>
                        <div className = {classes.Forgot}>Don't have an account?<Link to='/signup'> SignUp</Link></div>

                    </div>
                </div>
            </Aux>
        )
    }
}

export default SignIn