import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import classes from './SignIn.module.css'
import axios from '../../../Axios/axios-userAuth'
import { Link } from 'react-router-dom'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class SignIn extends Component {

    // state = {
    //     signInInfo: {
    //         username: '',
    //         password: ''            
    //     }   
    // }    

    state = {
        signInCred: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Username'
                },
                value: '',
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        let isValid = true

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        // if(rules.minLength) {
        //     isValid = value.length >= rules.minLength && isValid;
        // }

        // if(rules.maxLength) {
        //     isValid = value.length <= rules.maxLength && isValid;
        // }

        return isValid

    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedSignInForm = {
            ...this.state.signInCred
        }

        const updatedSignInElement = {
            ...updatedSignInForm[inputIdentifier]
        }

        updatedSignInElement.value = event.target.value
        updatedSignInElement.valid = this.checkValidity(updatedSignInElement.value, updatedSignInElement.validation)
        updatedSignInElement.touched = true
        updatedSignInForm[inputIdentifier] = updatedSignInElement

        let formIsValid = true
        for(let inputIdentifier in updatedSignInForm) {
            formIsValid = updatedSignInForm[inputIdentifier].valid && formIsValid
        }

        this.setState({signInCred: updatedSignInForm, formIsValid: formIsValid})
    }

    // changeHandler = (event) => {
    //     const signInInfo = {...this.state.signInInfo}        
    //     const name = event.target.name
    //     const val = event.target.value

    //     if(name === 'username')
    //     signInInfo.username = val
        
    //     if(name === 'password')
    //     signInInfo.password = val

    //     this.setState({signInInfo: signInInfo})
    // }

    submitClicked = (event) => {

        event.preventDefault()
        this.setState({loading: true})

        const formData = {}
        
        for(let formElementIdentifier in this.state.signInCred) {
            formData[formElementIdentifier] = this.state.signInCred[formElementIdentifier].value
        }


        const signInInfo = formData
        axios.post('/signin', signInInfo)
        .then(response => {
            console.log(response.data)
            this.setState({loading: false})
            this.props.history.push({pathname: 'allPosts'})
        })
        .catch(error => {
            this.setState({loading: false})
            console.log(error)
        })
        // alert("Post submitted")
    }

    render() {

        const formElementsArray = []
        for (let key in this.state.signInCred) {
            formElementsArray.push({
                id: key,
                config: this.state.signInCred[key],
            })
        }

        let form = (
                    <Aux>
                        {
                            formElementsArray.map(formElement => (
                                <Input 
                                    key = {formElement.id} 
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value} 
                                    shouldValidate = {formElement.config.validation}
                                    touched={formElement.config.touched}
                                    inValid={!formElement.config.valid} 
                                    changed={(event) => this.inputChangeHandler(event, formElement.id)} />
                            ))
                        }
                        {/* <input 
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
                            onChange={this.changeHandler}/> */}

                        <button className={classes.Animated} onClick={this.submitClicked}>SignIn</button>
                        <div className = {classes.Forgot}>Don't have an account?<Link to='/signup'> SignUp</Link></div>
                    </Aux>
                        
        )

        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <Aux>
                <div className={classes.Cont}>
                    <div className={classes.Login}>
                        <h2>Sign In</h2>
                        {form}
                    </div>                    
                </div>
                {/* <div className={classes.Cont}>
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
                </div> */}
            </Aux>
        )
    }
}

export default SignIn