import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import classes from './SignUp.module.css'
import { Link } from 'react-router-dom'
import axios from '../../../Axios/axios-userAuth'
import Input from '../../../components/UI/Input/Input'
import Spinner from '../../../components/UI/Spinner/Spinner'
class SignUp extends Component {

    state = {
        signUpCred: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                value: '',
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false
            },
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Username'
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
                    placeholder: 'Enter Password'
                },
                value: '',
                validation: {
                    required: true,                    
                },
                valid: false,
                touched: false
            },
            roles: {
                validation: {
                    required: false,                    
                },
                valid: true
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

        return isValid
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedSignUpForm = {
            ...this.state.signUpCred
        }

        const updatedSignUpElement = {
            ...updatedSignUpForm[inputIdentifier]
        }

        updatedSignUpElement.value = event.target.value
        updatedSignUpElement.valid = this.checkValidity(updatedSignUpElement.value, updatedSignUpElement.validation)
        updatedSignUpElement.touched = true
        updatedSignUpForm[inputIdentifier] = updatedSignUpElement

        let formIsValid = true
        for(let inputIdentifier in updatedSignUpForm) {
            formIsValid = updatedSignUpForm[inputIdentifier].valid && formIsValid
        }

        this.setState({signUpCred: updatedSignUpForm, formIsValid: formIsValid})
    }

    submitClicked = (event) => {
        
        event.preventDefault()
        this.setState({loading: true})

        const formData = {}
        
        for(let formElementIdentifier in this.state.signUpCred) {
            formData[formElementIdentifier] = this.state.signUpCred[formElementIdentifier].value
        }
        
        const signUpInfo = formData
        axios.post('/signup', signUpInfo)
        .then(response => {
            this.setState({loading: false})
            this.props.history.push({pathname: 'allPosts'})
        })
        .catch(error => {
            this.setState({loading: false})
        })
    }

    render() {
        const formElementsArray = []
        for (let key in this.state.signUpCred) {
            if(key === 'roles') continue
            formElementsArray.push({
                id: key,
                config: this.state.signUpCred[key],
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
                <button className={classes.Animated} onClick={this.submitClicked} disabled={!this.state.formIsValid}>Register</button>
                <div className = {classes.Forgot}>Already have an account?<Link to='/signin'> Login</Link></div>
            </Aux>
                
        )

        if(this.state.loading) {
            form = <Spinner />
        }

        return (
            <Aux>
                <div className={classes.Cont}>
                    <div className={classes.Login}>
                        <h2>
                            Sign Up
                        </h2>
                        {form}
                    </div>
                </div>                
            </Aux>
        )
    }
}

export default SignUp