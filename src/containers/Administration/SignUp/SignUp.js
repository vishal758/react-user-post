import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import classes from './SignUp.module.css'
// import axios from '../../../Axios/axios-signUpInfo'
import { Link } from 'react-router-dom'
import axios from '../../../Axios/axios-userAuth'
class SignUp extends Component {

    state = {
        signUpInfo: {
            email: '',
            password: '',
            username: '',
            roles: []
        }
    }    

    changeHandler = (event) => {
        const signUpInfo = {...this.state.signUpInfo}        
        const name = event.target.name
        const val = event.target.value

        if(name === 'username')
        signUpInfo.username = val
        
        if(name === 'password')
        signUpInfo.password = val

        if(name == "email")
        signUpInfo.email = val

        this.setState({signUpInfo: signUpInfo})

    }

    submitClicked = () => {
        const signUpInfo = this.state.signUpInfo
        axios.post('/signup', signUpInfo)
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
                            Sign Up Form
                        </h2>
                        <input 
                            name="username" 
                            placeholder="Username" 
                            type="text"
                            value={this.state.signUpInfo.username}
                            onChange={this.changeHandler}/>

                        <input 
                            id='pw' 
                            name='password' 
                            placeholder='Password' 
                            type='password' 
                        // value={this.state.signUpInfo.password}
                            onChange={this.changeHandler}/>

                        <input 
                            name='email' 
                            placeholder='E-Mail Address' 
                            type='text'
                            value={this.state.signUpInfo.email}
                            onChange={this.changeHandler}/>

                        {/* <div className={classes.Agree} class='agree'>
                            <input id='agree' name='agree' type='checkbox' />
                            <label for='agree'></label>Accept rules and conditions
                        </div> */}
                        <button className={classes.Animated} onClick={this.submitClicked}>Register</button>
                        {/* <input className={classes.Animated} type='submit' value='Register' /> */}
                        <div className = {classes.Forgot}>Already have an account?<Link to='/signin'> Login</Link></div>
                    </div>
                </div>
            </Aux>
        )
    }
}

export default SignUp