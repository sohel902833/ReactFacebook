import React, { Component } from 'react'
import classes from './main.module.css'
import { BrowserRouter, Redirect } from 'react-router-dom';

import MyNavigation from './Public/MyNavigation'
import MyRouting from './Public/MyRouting'
import {NavLink} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import UserFriendList from './Friends/UserFriendList';


export default class MainComponent extends Component {


    logout=()=>{
        localStorage.removeItem("token")
        this.props.history.push("/login")
    }

    render() {
        let decoded=jwt_decode(localStorage.getItem("token"))
        if(!localStorage.getItem("token")){
           return <Redirect to="/login"/>    
        }else{
            return (
            
                <BrowserRouter>
                <div className={classes.mainContainer}>
                    <div className={classes.mainTop}>
                  
                    <MyNavigation/>
                    </div>
    
                     <div className={classes.mainBottom}>
                            <div className={classes.mainLeft}>
                                    <NavLink activeStyle={{color:"#fff",textDecoration:"none"}} exact to="/">
                                        <div className={classes.item1}>
                                            <h4>Home</h4>
                                        </div>
                                    </NavLink>
                                    <NavLink activeStyle={{color:"#fff",textDecoration:"none"}} exact to="/friend">
                                        <div className={classes.item2}>
                                            <h4>Friends</h4>
                                        </div>
                                    </NavLink>
                                    <NavLink activeStyle={{color:"#fff",textDecoration:"none"}} exact to="/video">
                                        <div className={classes.item3}>
                                            <h4>Video</h4>
                                        </div>
                                    </NavLink>
                                    <NavLink activeStyle={{color:"#fff",textDecoration:"none"}} exact to="/message">
                                        <div className={classes.item3}>
                                            <h4>Message</h4>
                                        </div>
                                    </NavLink>
                                    <NavLink activeStyle={{color:"#fff",textDecoration:"none"}} exact to={`/profile/${decoded.id}`}>
                                        <div className={classes.item4}>
                                             <h4>Profile</h4>
                                        </div>
                                    </NavLink>
                                    <div className={classes.item4}>
                                        <button onClick={this.logout}>Logout</button>
                                    </div>
                                    
                            </div>
                            <div className={classes.mainCenter}>
                              <MyRouting/>
                            </div>
                            <div className={classes.mainRight}>
                                    <UserFriendList/>
                            </div>
                    </div>
    
                </div>
                </BrowserRouter>
            )
        }
      
    }
}
