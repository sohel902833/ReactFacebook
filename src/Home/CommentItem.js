import React, { Component } from 'react'
import profile from '../Image/profile.jpg'
import classes from './css/home.module.css'
import Axios from 'axios'
import {Link} from 'react-router-dom'
export default class CommentItem extends Component {


    constructor(){
        super()


        this.state={
            userData:[]
        }


    }



    componentDidMount=()=>{
        let url = `http://localhost:4000/api/post/us/${this.props.comment.userId}`
          Axios.get(url)
              .then(res=>{   
                  this.setState({
                      userData:res.data.result
                  })
              }).catch(error=>{
                  console.log(error)
              })
      }




    render() {
        return (
            <Link to={`/profile/${this.state.userData._id}`}>
            <div className={classes.commentItemContainer}>
                <div className={classes.commentItemTop}>
                    <img src={this.state.userData.profileImage!="none"?this.state.userData.profileImage:profile} alt="Image Not Found"/>
                    <h1>{`${this.state.userData.firstName} ${this.state.userData.lastName}`}</h1>
                </div><br/>
                <div className={classes.commentItemBottom}>
                    <p>{this.props.comment.comment}</p>
                </div>
               
                
            </div>
            </Link>
        )
    }
}
