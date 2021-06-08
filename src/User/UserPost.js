import React,{Component} from 'react'
import classes from './css/user.module.css'
import Axios from 'axios'
import add_post from '../Image/add_post.png'
import video from '../Image/video.png'

class  UserPost extends Component{
   constructor(){
       super();
       this.state={
           post:"",
           image:"",
           video:"",
           statusText:"",
           selectedImage:[],
           error:"",
           postError:"",
           imageError:""
       }
   }


    changeHandeler=(event)=>{
        this.setState({
            post:event.target.value
        })    
    }

    imageHandeler = (event) => {

        if(this.state.video == ""){
            let sImages=[]
            if(event.target.files.length>6){
                this.setState({
                    imageError:"Maximum 6 Files You  Can Choose"
                })
            }else{
                for(var i=0; i<event.target.files.length; i++){
                    sImages.push(URL.createObjectURL(event.target.files[i]))      
                }
                this.setState(
                    {
                        image:event.target.files,
                        imageError: "",
                        statusText:`${event.target.files.length} Image Selected`,
                        selectedImage:sImages
                    })
            
                
                  
            }
        }else{
            this.setState({
                error:"A Video Already Selected"
            })
        }

 
    }
    videoHandeler=(event)=>{
        if(this.state.selectedImage.length>0){
            this.setState({
                error:`You Can\'t Upload Image And Video At Once.${this.state.selectedImage.length} Images Already Selected`
            })
        }else{
            this.setState({
                video:event.target.files[0],
                statusText:`1 Video Selected`,
                       
            })
        }
        
    }
   submitHandeler=(event)=>{
            var today = new Date();
            var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let url=""
        let form_data = new FormData()
        console.log(this.state.image)
        if(this.state.post==""){
            this.setState({error:`Write Some Post Title And ${this.state.error} `})
        }else{
            if(this.state.image.length>0 && this.state.post!=""){
                url = 'http://localhost:4000/api/post/'
   
               for (const key of Object.keys(this.state.image)) {
                   form_data.append('postImage', this.state.image[key])
               }
               form_data.append('date', date)
               form_data.append('time', time)
               form_data.append('postType',"image")
               form_data.append('description', this.state.post)
               form_data.append('token', localStorage.getItem("token"))
       
           }else if(this.state.image.length==0 && this.state.post!="" && this.state.video==""){
               url = 'http://localhost:4000/api/post/'
               form_data.append('date', date)
               form_data.append('time', time)
               form_data.append('postType',"text")
               form_data.append('description', this.state.post)
               form_data.append('token', localStorage.getItem("token"))
           }else if(this.state.video!=""&&this.state.post!=""){
               url = 'http://localhost:4000/api/post/video'
               form_data.append('date', date)
               form_data.append('time', time)
               form_data.append('postType',"video")
               form_data.append('postVideos',this.state.video)
               form_data.append('description', this.state.post)
               form_data.append('token', localStorage.getItem("token")) 
           }
        }
        Axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            alert(res.data.message)
            this.setState({
                image: null,
                img: "",
                post:""
            })
        }).catch(err => {
            console.log(err)
        })
    }  
    render(){
      
    return (
        
        <div className={classes.userPostContainer}>
              
                      <input
                            type="text"
                            onChange={this.changeHandeler}   
                            value={this.state.post} 
                            placeholder="Whats on your mind"
                            name="post"
                            />
                        <label className={classes.imageLabel} htmlFor="image"><img src={add_post}/></label><br /> 
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                style={{visibility:"hidden"}}
                                onChange={this.imageHandeler}
                                multiple
                            />
                        <label className={classes.videoLabel} htmlFor="video"><img src={video}/></label><br /> 
                            <input
                                type="file"
                                id="video"
                                name="video"
                                accept="video/*"
                                style={{visibility:"hidden"}}
                                onChange={this.videoHandeler}
                            />
                            <h3 className={classes.statusText}>{this.state.statusText}</h3>
                            <div className={classes.userInputDetails}>
                               
                                {
                                    this.state.selectedImage.length>0?
                                        this.state.selectedImage.map(img=>{
                                           return <img src={img}/>
                                        }) :""   
                                         
                                }
                            </div>
                                 {
                                    this.state.error?<p>{this.state.error}</p>:""
                                }

                             <input
                                type="submit"
                                onClick={this.submitHandeler} 
                                value="Post"
                                />

        </div>
    )
    }
}

export default UserPost
