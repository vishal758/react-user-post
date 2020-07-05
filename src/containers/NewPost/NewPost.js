import React from 'react'
import Aux from '../../hoc/Aux/Aux'
import classes from './NewPost.module.css'

const NewPost = (props) => {
    return (
        <Aux>
            <div className={classes.Print}>
                <h3 className={classes.Center}>CREATE A POST</h3>
                Title: {props.post.title}
                <br />

                Description : {props.post.description}
            </div>
            <br />
            <div className = {classes.Container}>
                <label>
                    Title:                     
                </label>
                <input 
                        type="text" 
                        name="title" 
                        value={props.post.title}
                        onChange={props.changed}
                        required/>
                <br />
                <label>
                    Description:
                </label>
                <textarea 
                        type = "text" 
                        name="description" 
                        value={props.post.description} 
                        onChange={props.changed}
                        required/> 
                <button 
                    disabled={props.submit}
                    onClick={props.clicked}>Submit</button>
            </div>
        </Aux>

    )
}

export default NewPost