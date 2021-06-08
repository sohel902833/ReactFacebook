import React, { Component } from 'react'
import classes from './css/user.module.css'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'


export default class Login extends Component {
    constructor(){
        super()
        this.state={
            email:"",
            password:""
        }


    }

 changeHandeler=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }


    submitHandeler=(event)=>{
        event.preventDefault()
        let newUser={
            email:this.state.email,
            password:this.state.password
        }

        Axios.post("http://localhost:4000/api/users/login",newUser)
        .then(res=>{
            let token=res.data.token
            if(token){
                localStorage.setItem("token",token)
                this.props.history.push('/')
            }else{
                alert(res.data.message)
            }
        
        }).catch(error=>{
            console.log(error)
            alert(error.message)
        })
    }


    render() {
        if(localStorage.getItem("token")){
            return(
                <Redirect to="/"/>
            )
        }else{
            return (
                <div className={classes.loginContainer}>
                    <div className={classes.loginHeader}>
                        <h1>
                            Login
                        </h1>
                    </div>
             
    
    
                    <form>
                      <input
                            type="email"
                            onChange={this.changeHandeler}   
                            value={this.state.email} 
                            placeholder="Write Your Email"
                            name="email"
                            /><br/>
                      <input
                            type="password"
                            onChange={this.changeHandeler}   
                            value={this.state.password} 
                            placeholder="Write Your Password"
                            name="password"
                            />
                         <Link className={classes.link} to="/register">Don't have an account?Register</Link>
                            <div className={classes.submit}>
                                <input
                                type="submit"
                                onClick={this.submitHandeler.bind(this)} 
                                value="Login"
                                />
                            </div>
                     
                    </form>
                </div>
            )
        }
      
    }
}
