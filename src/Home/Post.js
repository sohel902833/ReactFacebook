import React, { Component } from 'react'
import profile from '../Image/profile.jpg'
import classes from './css/home.module.css'
import banner from '../Image/banner.png'
import CommentBox from './CommentBox'
import CommentItem from './CommentItem'
import Like from './Like'
import Axios from 'axios'
import FbImageLibrary from 'react-fb-image-grid'
import ReactPlayer from 'react-player'
import {Link} from 'react-router-dom'




export default class Post extends Component {

    constructor(){
        super()


        this.state={
            userData:[],
            showComment:true,
            totalLikes:0,
            totalComments:0,
            comments:[],
            postImages:[]
       }


    }



    componentDidMount=()=>{
        let images=[]
      
        this.props.post.postImage.map(img=>{
            images.push(img.image)
        })
    
        //set data into state like comment
        this.setState({
            totalLikes:this.props.post.likes.length,
            totalComments:this.props.post.comments.length,
            comments:this.props.post.comments.reverse(),
            postImages:images,
            
        })
      
        //get user data
        let url = `http://localhost:4000/api/post/us/${this.props.post.userId}`
          Axios.get(url)
              .then(res=>{
                  
                  this.setState({
                      userData:res.data.result
                  })
              }).catch(error=>{
                  console.log(error)
              })
      }

    showComment=()=>{
        this.setState({
            showComment:!this.state.showComment
        })
    }
  
    likeIncrease=(s)=>{
        if(s==1){
            this.setState({
                totalLikes:this.state.totalLikes+1
            })
        }else if(s==0){
            this.setState({
                totalLikes:this.state.totalLikes-1
            })  
        }
      
        // let decoded=jwt_decode(localStorage.getItem("token"))
        // let newLike={
        //     _id:"customlike",
        //     userId:decoded.id,
        //     like:"like"
        // }
        // this.state.likes.push(newLike)
    }
  

    render() {
        console.log(this.state.postImages)
       return (
            
            <div className={classes.postContainer}>
                <Link to={`/profile/${this.props.post.userId}`}>
                <div  className={classes.postHeader}>
                     <img src={this.state.userData.profileImage!="none"?this.state.userData.profileImage:profile}/>
                     <div className={classes.postHeaderTop}>
                        <h1>{`${this.state.userData.firstName} ${this.state.userData.lastName}`}</h1>
                        <p>{`${this.props.post.date} at ${this.props.post.time}`}</p>
                     </div>
                    
                </div>
                </Link>
                <div className={classes.postBody}>
                    <p>{this.props.post.description}</p>
                             {
                            this.props.post.postType=="image"?
                                    <FbImageLibrary
                                     width={40} 
                                    countFrom={3} 
                                    images={this.state.postImages}    
                                    />:""
                             }

                             {
                                 this.props.post.postType=="video"?
                                 <div className={classes.videoController}>
                                 <ReactPlayer
                                       
                                         url={this.props.post.postVideos} 
                                        controls={true}
                                        loop={true}

                                 /></div>
                                   :""
                             }
                   
                  
                </div>
                <div className={classes.postFooter}>
                    <p>{`Total Like: ${this.state.totalLikes} , Total Comment: ${this.state.totalComments}`}</p>


                </div>
                <div className={classes.postComment}>
                    <Like 
                        like={this.props.post.likes} 
                        postId={this.props.post._id} 
                        showComment={this.showComment}
                        likeIncrease={this.likeIncrease}/>
                    <CommentBox 
                     postId={this.props.post._id}/>
                    {
                        this.state.showComment?
                        this.state.comments.map(comment=>{
                             return    <CommentItem comment={comment}/>
                             
                        }):null
                    }


                </div>
             

            </div>
        )
    }
}
