import React, { Component } from 'react'
import { Link ,Redirect} from 'react-router-dom'
import classes from './css/user.module.css'
import Axios from 'axios'

export default class Register extends Component {

    constructor(){
        super()
        this.state={
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            gender:"",
            phone:""
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
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            gender:this.state.gender,
            phone:this.state.phone,
            password:this.state.password
        }
         Axios.post("http://localhost:4000/api/users/register",newUser)
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
            <div className={classes.registerContainer}>
                    <div className={classes.registerHeader}>
                        <h1>Register</h1>
                    </div>
                    <div className={classes.registerBody}>
                        <form>
                            <input
                            type="text"
                            onChange={this.changeHandeler}   
                            value={this.state.firstName} 
                            placeholder="Write Your First Name"
                            name="firstName"
                            /><br/>
                            <input
                            type="text"
                            onChange={this.changeHandeler}   
                            value={this.state.lastName} 
                            placeholder="Write Your Last Name"
                            name="lastName"
                            /><br/>
                            <input
                            type="email"
                            onChange={this.changeHandeler}   
                            value={this.state.email} 
                            placeholder="Write Your Email"
                            name="email"
                            /><br/>
                            <h4>Gender</h4>
                            <div className={classes.genderDiv}>
                                <div className={classes.radioDiv}>
                                        <input
                                        type="radio"
                                        onChange={this.changeHandeler}   
                                        value="Male" 
                                        name="gender"
                                        />Male
                                </div>
                                <div className={classes.radioDiv}>
                                        <input
                                        type="radio"
                                        onChange={this.changeHandeler}   
                                        value="Female" 
                                        name="gender"
                                        />Female
                                </div>
                                <div className={classes.radioDiv}>
                                        <input
                                        type="radio"
                                        onChange={this.changeHandeler}   
                                        value="Others" 
                                        name="gender"
                                        />Others
                                </div>
                            </div>
                         
                            <input
                            type="text"
                            onChange={this.changeHandeler}   
                            value={this.state.phone} 
                            placeholder="Write Your Phone"
                            name="phone"
                            /><br/>
                         
                            <input
                            type="password"
                            onChange={this.changeHandeler}   
                            value={this.state.password} 
                            placeholder="Write Your Password"
                            name="password"
                            /><br/>

                            <Link className={classes.link} to="/login">Already have an account?Login</Link>

                            <div className={classes.registerSubmit}>
                                <input
                                type="submit"
                                onClick={this.submitHandeler.bind(this)} 
                                value="Register"
                                />
                             </div>
                           
                            
                        </form>
                    </div>
                    <div className={classes.registerFooter}>



                    </div>
            </div>
        )
        }
    }
}
