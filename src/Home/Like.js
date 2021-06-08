import React, { Component } from 'react'
import classes from './css/home.module.css'
import Axios from 'axios'
import banner from '../Image/banner.png'
import like from '../Image/like.png'
import dislike from '../Image/dislike.png'
import jwt_decode from 'jwt-decode'



let liked={
    color:"red"
}
let notLiked={
    color:"white"
}



export default class Like extends Component {

    constructor(){
        super()
        this.state={
            isLike:false
        }
    }
 
    componentDidMount=()=>{
    const url=`http://localhost:4000/api/post/like/${this.props.postId}`
    var decoded = jwt_decode(localStorage.getItem("token"));
    
    Axios.get(url)
        .then(res=>{
            let myLike=res.data.likes.likes.filter((like)=>{
               return like.userId==decoded.id
            })
            if(myLike.length>0){
                this.setState({
                    isLike:true
                }) 
            }


        }).catch(error=>{
            console.log(error)
            alert(error.message)
        })


    }



  likeClick=()=>{
    if(this.state.isLike){
       let url=`http://localhost:4000/api/post/likeC/${this.props.postId}`
        Axios.post(url,{token:localStorage.getItem("token")})
        .then(res=>{
            if(res.data.result.n){
                this.props.likeIncrease(0)
                this.setState({
                    isLike:false
                })
            }
          
        }).catch(error=>{
            alert(error.message)
        })
     }else{
        let url=`http://localhost:4000/api/post/like/${this.props.postId}`
       Axios.post(url,{token:localStorage.getItem("token")})
        .then(res=>{
            if(res.data.result.n){
                this.props.likeIncrease(1)
                this.setState({
                    isLike:true
                })
            }
          
        }).catch(error=>{
            alert(error.message)
            console.log(error)
        })
       }
 }      

    render() {
        return (
            <div className={classes.likeContainer}>
                <div onClick={this.likeClick} className={classes.like}>
                    <img src={this.state.isLike?like:dislike} alt="Image Not Found"/>
                </div>
                <div className={classes.comment}>
                    <h1 onClick={()=>this.props.showComment()}>Comment</h1>
                 </div>
                 <div className={classes.share}>
                    <h1>Share</h1>
                </div>
           
            </div>
        )
        
    }
}
