import React, { Component } from 'react'
import Post from './Post'
import UserPost from '../User/UserPost'
import Axios from 'axios'
import {url} from '../Server'

export default class Home extends Component {

    constructor(){
        super();

        this.state={
            posts:[]
        }
    }

    componentDidMount=()=>{
      let hitUrl = `${url}post/`
        Axios.get(hitUrl)
            .then(res=>{
                this.setState({
                    posts:res.data.result.reverse()
                })
            }).catch(error=>{
                console.log(error)
            })
    }


    render() {
        return (
            <>
                <UserPost/>
                {
                    this.state.posts.map(post=>{
                      return  <Post post={post}/>
                    })
                }
               
            </>
        )
    }
}
