import React,{useState} from 'react'

import classes from './css/home.module.css'
import Axios from 'axios'


export default function CommentBox(props) {
    
    const [state,setState]=useState({
        commentText:""
    })

    const changeHandeler=(event)=>{
        setState({
            commentText:event.target.value
        })
    }
    const submitComment=()=>{
        let url=`http://localhost:4000/api/post/comment/${props.postId}`
        console.log(url)
        Axios.post(url,{token:localStorage.getItem("token"),comment:state.commentText})
        .then(res=>{
            if(res){
                setState({commentText:""})
                alert("Comment Submitted");
            }
          
        }).catch(error=>{
            alert(error.message)
        })
    }

    return (
        <div>
             <input type="text"
             className={classes.commentBoxInput}
              value={state.commentText}
              placeholder="Write a comment"
              onChange={changeHandeler}
             />
             <input type="button"
                value="Comment"
                className={classes.commentBoxSubmit}
                onClick={submitComment}
             />

        </div>
    )
}
