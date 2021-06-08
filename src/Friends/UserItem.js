import React, { Component } from 'react'
import classes from './css/friend.module.css'
import profile from '../Image/profile.jpg'
import {url} from '../Server'
import jwt_decode from 'jwt-decode'
import Axios from 'axios'
import {Link} from 'react-router-dom'
export default class  extends Component {
        constructor(){
            super()
            this.state={
                buttonText:"Send Request",
                friendsState:"not_Friends",
                declineButton:false
            }
        }
  componentDidMount=()=>{
    let decoded=jwt_decode(localStorage.getItem("token"))
    let hitUrl=`${url}friends/${decoded.id}`
     Axios.get(hitUrl)
        .then(res=>{
            res.data.result!=null?res.data.result.friends.map(f=>{  
                if(f.friendsId==this.props.user._id){
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
            
                if(f.reqUserId==this.props.user._id){
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

  sendFriendRequest=()=>{
      let {friendsState}=this.state
       if(friendsState=="not_Friends"){
            const hitUrl=`${url}friends/req/`
            let reqData={
                token:localStorage.getItem("token"),
                receiverUserId:this.props.user._id
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
                receiverUserId:this.props.user._id,
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
         else if(friendsState=="friend"){
            const hitUrl=`${url}friends/rem`
         
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
    let decoded=jwt_decode(localStorage.getItem("token"))

        return (
           <div className={classes.friendList}>
                      <div  className={classes.friendItemLeft}>
                      <Link to={`/profile/${this.props.user._id}`}>
                             <img  src={this.props.user.profileImage!="none"?this.props.user.profileImage:profile} alt="img not found"/>
                      </Link>
                        </div>
                        <div className={classes.friendItemRight}>
                            <h2>{`${this.props.user.firstName} ${this.props.user.lastName}`}</h2>
                            <p>Hellow guys i am using social media app</p>
                            <div className={classes.friendButtonContainer}>
                            {decoded.id!=this.props.user._id?  <button onClick={this.sendFriendRequest}>{this.state.buttonText}</button>:""}
                                {this.state.declineButton? <button onClick={this.declineFriends} style={{background:'red'}}>Decline Request</button>:""}
                               
                            </div>
                        </div>
                       
                </div>
              
        )
    }
}
