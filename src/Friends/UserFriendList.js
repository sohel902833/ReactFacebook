import React,{Component} from 'react'
import classes from './css/friend.module.css'
import profile from '../Image/profile.jpg'
import jwt_decode from 'jwt-decode'
import{url} from '../Server'
import Axios from 'axios'
import SingleFriendItem from './SingleFriendItem'
import {Link} from 'react-router-dom'

 class UserFriendList extends Component {
    constructor(){
        super()
        this.state={
            friends:[],
            userData:[]
        }
    }
componentDidMount=()=>{


    //get user Friends
    let decoded=jwt_decode(localStorage.getItem("token"))
    let hitUrl=`${url}friends/${decoded.id}`
     Axios.get(hitUrl)
        .then(res=>{
            console.log(res.data.result)
            if(res.data.result != null){
                this.setState({
                    friends:res.data.result.friends
                })
            }
    
        })
    //get user data
    let userUrl = `${url}post/us/${decoded.id}`
    Axios.get(userUrl)
        .then(res=>{
            
            this.setState({
                userData:res.data.result
            })
        }).catch(error=>{
            console.log(error)
        })




}


    render(){
        return (
            <div className={classes.friendListContainer}>  

                   <div  className={classes.friendListTop}>
                           <img  src={this.state.userData.profileImage!="none"?this.state.userData.profileImage:profile}/>
                             <h5>{`${this.state.userData.firstName} ${this.state.userData.lastName}`}</h5>

                        <h3>Friend List</h3>
                   </div>
                   <div className={classes.friendListBottom}>
                        {
                            this.state.friends.length>0?
                            this.state.friends.map(fnd=>{
                                console.log(fnd)
                                return(
                                  <SingleFriendItem friend={fnd}/>
                                )
                            }):""
                        }
                   </div>
            </div>
        )
    }

}
export default UserFriendList