import React, { Component } from 'react'
import Axios from 'axios'
import Post from '../Home/Post'
import classes from './css/video.module.css'
import {url} from '../Server'



export default class Video extends Component {

    constructor(){
        super();

        this.state={
            videoPosts:[]
        }
    }

    componentDidMount=()=>{
      let hitUrl = `${url}post/video/all`
      console.log("video")
      console.log(hitUrl)
        Axios.get(hitUrl)
            .then(res=>{
                
                this.setState({
                    videoPosts:res.data.result.reverse()
                })

            }).catch(error=>{
                console.log(error)
            })
    }

    render() {
        return (
            <div className={classes.videoContainer}>
                 {
                    this.state.videoPosts.map(post=>{
                      return  <Post post={post}/>
                    })
                }
            </div>
        )
    }
}
