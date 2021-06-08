import React, { Component } from 'react'
import classes from './css/public.module.css'
import {Link, NavLink} from 'react-router-dom'

import home from '../Image/home.svg'
import group from '../Image/group.svg'
import video from '../Image/video.svg'
import friend from '../Image/friend.svg'
import message from '../Image/message.svg'
import logo from '../Image/logo.png'
import jwt_decode from 'jwt-decode'
import profile from '../Image/profile.jpg'

export default class MyNavigation extends Component {


    constructor(){
        super()
        this.state={
            search:"",
            userId:""
        }
    }

    componentDidMount=()=>{
        let decoded=jwt_decode(localStorage.getItem("token"))
        this.setState({
            userId:decoded.id
        })
    }


    changeHandeler=(event)=>{
        this.setState({
            search:event.target.value
        })
    }

   


    render() {
      return (
                
            <div className={classes.navContainer}>
                <div className={classes.navLeft}>
                    <div className={classes.navLeftBody}>
                         <div className={classes.logo}><img src={logo}></img></div>   
                         <div className={classes.search}><input type="text" onChange={this.changeHandeler} value={this.state.search}/></div>   
              
                    </div>
                 </div>
                    <div className={classes.navCenter}>
                                <div> <NavLink  to='/'><i style={{color:"#fff"}} class="fas fa-home fa-2x"></i> </NavLink></div>   
                                <div><NavLink to='/friend'><i style={{color:"#fff"}} class="fas fa-users  fa-2x"></i></NavLink></div>   
                                <div><NavLink to='/video'><i style={{color:"#fff"}} class="fab fa-youtube  fa-2x"></i></NavLink></div>   
                                <div><NavLink to={`/profile/${this.state.userId}`}><i style={{color:"#fff"}} class="fas fa-user  fa-2x"></i></NavLink></div>   
                                <div><NavLink to='/message'><i style={{color:"#fff"}} class="fas fa-comments  fa-2x"></i></NavLink></div> 
                    </div>
                 <div className={classes.navRight}>
                     <Link to={`/profile/${this.state.userId}`}>  <img src={profile}/></Link> 
                </div>
               
            </div>
             
           
        )
    }
}
