import React, { Component } from 'react'
import classes from './css/profile.module.css'
import profile from '../Image/profile.jpg'
import {url} from '../Server'
import Axios from 'axios'
import jwt_decode from 'jwt-decode'
import Post from '../Home/Post'


export default class Profile extends Component {
    constructor({match}){
        super()
        this.state={
            userId:match.params.userId,
            user:"",
            same:false,
            posts:[],
            buttonText:"Send Request",
            friendsState:"not_Friends",
           declineButton:false
        }
    }

    componentDidMount=()=>{
        //get user id from token
        let decoded=jwt_decode(localStorage.getItem("token"))
        if(decoded.id==this.state.userId){
            this.setState({
               same:true 
            })
        }
        //get user details
        let hitURl=`${url}users/${this.state.userId}`
        Axios.get(hitURl)
            .then(res=>{
                this.setState({
                    user:res.data.result
                })
            }).catch(error=>{
                console.log(error)
            })
        //get usr posts
        let postUrl=`${url}post/${this.state.userId}`
        console.log(postUrl)
        Axios.get(postUrl)
        .then(res=>{
            this.setState({
                posts:res.data.result.reverse()
            })
        }).catch(error=>{
            console.log(error)
        })
        if(this.state.same!=true){
            //check Friend State
            let decoded=jwt_decode(localStorage.getItem("token"))
            let hitUrl=`${url}friends/${decoded.id}`
             Axios.get(hitUrl)
                .then(res=>{
                    res.data.result!=null?res.data.result.friends.map(f=>{  
                        if(f.friendsId==this.state.userId){
                             this.setState({
                                           buttonText:"Remove Friends",
                                           friendsState:"friend"
                                       }) 
                        }
                           
                    }):console.log("null")
                })
            
            let hitUrl2=`${url}friends/req/${decoded.id}`
              Axios.get(hitUrl2)
                .then(res=>{
                   res.data.result!=null?res.data.result.reqIds.map(f=>{
                    
                        if(f.reqUserId==this.state.userId){
                            let reqType=f.reqType
                            if(reqType=="sent")
                                {
                                    this.setState({
                                        buttonText:"Cancel Friend Request",
                                        friendsState:"req_Sent"
                                    })  
                                }else if(reqType=="received"){
                                    this.setState({
                                        buttonText:"Accept Friend Request",
                                        friendsState:"req_Received",
                                        declineButton:true
                                    })  
                                }
                          
                        }
                           
                    }):console.log("null")
                }) 
        }

    }
    sendFriendRequest=()=>{
        let {friendsState}=this.state
         if(friendsState=="not_Friends"){
              const hitUrl=`${url}friends/req/`
              let reqData={
                  token:localStorage.getItem("token"),
                  receiverUserId:this.state.userId
              }
  
              Axios.post(hitUrl,reqData)
                  .then(res=>{
                      if(res){
                          this.setState({
                              buttonText:"Cancel Friend Request",
                              friendsState:"req_Sent"
                          })
                      }
                  }).catch(error=>{
                      console.log(error)
                      alert(error.message)
                  })
          }else if(friendsState=="req_Received"){
              const hitUrl=`${url}friends/`
              var today = new Date();
              var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
              
              let reqData={
                  token:localStorage.getItem("token"),
                  receiverUserId:this.state.userId,
                  currentDate:date
              }
  
              Axios.post(hitUrl,reqData)
                  .then(res=>{
                      if(res){
                          this.setState({
                              buttonText:"Remove Friends",
                              friendsState:"friend",
                              declineButton:false
                          })
                      }
                  }).catch(error=>{
                      console.log(error)
                      alert(error.message)
                  })     
           }else if(friendsState=="req_Sent"){
              const hitUrl=`${url}friends/reqC`
           
              let reqData={
                  token:localStorage.getItem("token"),
                  receiverUserId:this.state.userId
              }
  
              Axios.post(hitUrl,reqData)
                  .then(res=>{
                      if(res){
                          this.setState({
                              buttonText:"Send Request",
                              friendsState:"not_Friends",
                              declineButton:false
                          })
                      }
                  }).catch(error=>{
                      console.log(error)
                      alert(error.message)
                  }) 
           }
           else if(friendsState=="friend"){
              const hitUrl=`${url}friends/rem`
           
              let reqData={
                  token:localStorage.getItem("token"),
                  receiverUserId:this.state.userId
              }
  
              Axios.post(hitUrl,reqData)
                  .then(res=>{
                      if(res){
                          this.setState({
                              buttonText:"Send Request",
                              friendsState:"not_Friends",
                              declineButton:false
                          })
                      }
                  }).catch(error=>{
                      console.log(error)
                      alert(error.message)
                  }) 
           }
  
    }
  
  declineFriends=()=>{
     
      const hitUrl=`${url}friends/reqC`
           
              let reqData={
                  token:localStorage.getItem("token"),
                  receiverUserId:this.props.user._id
              }
  
              Axios.post(hitUrl,reqData)
                  .then(res=>{
                      if(res){
                          this.setState({
                              buttonText:"Send Request",
                              friendsState:"not_Friends",
                              declineButton:false
                          })
                      }
                  }).catch(error=>{
                      console.log(error)
                      alert(error.message)
                  }) 
  }


    render() {
        let{user}=this.state
        return (
            <div className={classes.profileContainer}>
                    <div className={classes.profileTop}>
                        <img className={classes.profile_ProfileImage} src={user.profileImage!="none"?user.profileImage:profile}/>
                        <h2 className={classes.profile_ProfileName}>{`${user.firstName} ${user.lastName}`}</h2>
                        <p className={classes.profile_Email}>{`Email:${user.email}`}</p>
                        <p className={classes.profile_Phone}>{`Phone:${user.phone}`}</p>
                        {
                            this.state.same!=true? 
                             <div className={classes.profileButtons}>
                                <button>Message</button>
                                <button onClick={this.sendFriendRequest}>{this.state.buttonText}</button>
                                {this.state.declineButton? <button onClick={this.declineFriends} style={{background:'red'}}>Decline Request</button>:""}
                            </div>:""
                        }
                      
                    </div>
                    <div className={classes.profilePosts}>
                         {
                            this.state.posts.map(post=>{
                            return  <Post post={post}/>
                            })
                        }
                    </div>
            </div>
        )
    }
}
