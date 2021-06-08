import React,{Component} from 'react'
import classes from './css/friend.module.css'
import{url} from '../Server'
import Axios from 'axios'
import profile from '../Image/profile.jpg'
export default class SingleFriendItem extends Component {


    constructor(){
        super()

        this.state={
            userData:[]
          }


    }
componentDidMount(){
    let hitUrl = `${url}post/us/${this.props.friend.friendsId}`
    Axios.get(hitUrl)
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

                 <div onClick={this.moveOthers} className={classes.friendItem}>
                     <img className={classes.fndProfileImage} src={this.state.userData.profileImage!="none"?this.state.userData.profileImage:profile}/>
                <h4 className={classes.fndUserName}>{`${this.state.userData.firstName} ${this.state.userData.lastName}`}</h4>
             </div>
        )
    }
}
