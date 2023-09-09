import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";
import VideoDisplay from "./VideoDisplay";
import TagsInput from "./TagsInput";
import VideoInput from "./VideoInput";
import SubmitUpload from "./SubmitUpload";
import BackButton from "./BackButton";
import SaveButton from "./SaveButton";

export default function Profile (props) {
    const {user, videoData, tags, setTags, status, setStatus, file, setFile, source, setSource, success, setSuccess} = props;

    const [videosArray, setVideosArray] = useState([]);

    const[filteredVideosArray, setFilteredVideosArray] = useState([]);

    const[editVideo, setEditVideo] = useState([false,'']);
  
    useEffect(() => {
      const config = {
        url: APPURL + "api/video/",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + user.access
        }
      }
  
      axios(config).then((res) => {
        console.log(res.data);
        setVideosArray(res.data);
        setFilteredVideosArray(res.data);
      })
    }, [user, status])

    const handleChange = (e) => {
      e.preventDefault();
      console.log('hi');
      console.log(videosArray);
      console.log(videosArray.filter(video => video.title.includes(e.target.value)));
      setFilteredVideosArray(videosArray.filter(video => video.title.includes(e.target.value)));
      
    };

    

    if (status === 'upload') {
      return(
        <div>
          
          <VideoInput setSuccess={setSuccess} file={file} setFile={setFile} source={source} setSource={setSource} user={user} width={400} height={300} />
          <TagsInput setSuccess={setSuccess} tags={tags} setTags={setTags} user={user} width={400} height={300} />
          <SubmitUpload setSuccess={setSuccess} file={file} setFile={setFile} source={source} setSource={setSource} tags={tags} setTags={setTags} user={user} width={400} height={300} />
        </div>
      )};
    if (!editVideo[0]) {
      return (
        <div>
            <div class='profile-input'> 
              <input class="profile-videos-searchbar" onChange={handleChange} placeholder="Search">
              </input>
            </div>
            <VideoDisplay id='videoDisplay' unfiltered={videosArray} videosArray={filteredVideosArray} setEditVideo={setEditVideo} tags={tags} setTags={setTags}/>
        </div>
      )
    }

    return (
      <div>
        <div class={"edit-video-container"}>   
          <div class={"edit-video-content"}>
            <h2>Edit Video</h2>
            <h2>Title: {editVideo[1].title}</h2>
            <h2>Tags: </h2>
            <TagsInput  tags={tags} setTags={setTags}></TagsInput>
          </div>
          <video class={'edit-video'} autoplay controls>
            <source src={editVideo[1].path}></source>
          </video>
        </div>
        <div class="edit-video-footer">
          <BackButton setEditVideo={setEditVideo} setTags={setTags} ></BackButton>
          <SaveButton></SaveButton>
        </div>
      </div>
    )
}


