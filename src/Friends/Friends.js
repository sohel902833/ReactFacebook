import React, { Component } from 'react'
import classes from './css/friend.module.css'
import UserItem from './UserItem'
import profile from '../Image/profile.jpg'
import {url} from '../Server.js'
import Axios from 'axios'

export default class Friends extends Component {
    constructor(){
        super()
        this.state={
            searchText:"",
            users:[]
        }
    }

    onSearchTextChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
        if(event.target.value==""){
            let hitUrl=url+"users"
            Axios.get(hitUrl)
                .then(res=>{
                    this.setState({
                        users:res.data.result
                    })
                }).catch(error=>{
                    console.log(error)
                })
        }else{
            const filterFriends=this.state.users.filter(user=>{
                let str=`${user.firstName} ${user.lastName}`
                return str.toLowerCase().includes(this.state.searchText.toLocaleLowerCase())?user:null
            }) 
            this.setState({
                users:filterFriends
            })   
        }
        
    }

   componentDidMount=()=>{
      let hitUrl=url+"users"
        Axios.get(hitUrl)
            .then(res=>{
                this.setState({
                    users:res.data.result
                })
            }).catch(error=>{
                console.log(error)
            })
   }


   searchFriends=()=>{

        const filterFriends=this.state.users.filter(user=>{
            let str=`${user.firstName} ${user.lastName}`
            
            return str.toLowerCase().includes(this.state.searchText.toLocaleLowerCase())?user:null
        }) 
        this.setState({
            users:filterFriends
        })    
   }




    render() {
        return (
            <div className={classes.friendContainer}>
                <div className={classes.friendSearchBar}>
                    <input
                        type="text"
                        onChange={this.onSearchTextChange}
                        value={this.state.searchText}
                        placeholder="Search Friend"
                        name="searchText"
                        />
                        <button onClick={this.searchFriends}>Search</button>
                </div>
              <div>
                {
                    this.state.users.map(user=>{
                        return <UserItem user={user}/>
                    })
                }
              </div>
            </div>
        )
    }
}
