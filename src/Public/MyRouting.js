import React, { Component } from 'react'
import {BrowserRouter, Route,Switch} from 'react-router-dom'
import Home from '../Home/Home'
import Profile from '../Profile/Profile'
import Friends from '../Friends/Friends'
import Message from '../Message/Message'
import Video from '../Video/Video'
import Post from '../Home/Post'
import MainComponent from '../MainComponent'

export default class MyRouting extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/profile/:userId" component={Profile}/>
                    <Route exact path="/friend" component={Friends}/>
                    <Route exact path="/video" component={Video}/>
                    <Route exact path="/message" component={Message}/> 
                    <Route exact path="/post" component={Post}/>
                </Switch>
            </div>
       
        )
    }
}
