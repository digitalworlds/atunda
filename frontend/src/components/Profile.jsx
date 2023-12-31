import { useEffect, useState} from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";
import VideoDisplay from "./VideoDisplay";
import TagsInput from "./TagsInput";
import VideoInput from "./VideoInput";
import SubmitUpload from "./SubmitUpload";
import BackButton from "./BackButton";
import SaveButton from "./SaveButton";
import Header from "./Header"
import DeleteButton from "./DeleteButton";

export default function Profile (props) {
    const {user, tags, setTags, status, setStatus, file, setFile, source, setSource, success, setSuccess} = props;

    const [videosArray, setVideosArray] = useState([]);

    const[filteredVideosArray, setFilteredVideosArray] = useState([]);

    const[editVideo, setEditVideo] = useState([false,'']);
  
    const[fadeProp, setFadeProp] = useState('success-hidden');

    const[videoRefresh, setVideoRefresh] = useState(0);
    function convertToHttps(videosArray) {
      for (let video of videosArray) {
        video.pose_path = video.pose_path.slice(0, 4) + "s" + video.pose_path.slice(4, 27) + "/projects/atunda/" + video.pose_path.slice(27);
        video.path = video.path.slice(0, 4) + "s" + video.path.slice(4, 27) + "/projects/atunda/" + video.path.slice(27);
      }
    }
    useEffect(() => {
      const config = {
        url: APPURL + "api/video/",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + user.access
        }
      }
  
      axios(config).then((res) => {
        let data = res.data;
        convertToHttps(data);
        setVideosArray(data);
        console.log(data);
        setFilteredVideosArray(data);
      })
    }, [user, videoRefresh])

    const handleChange = (e) => {
      e.preventDefault();
      setFilteredVideosArray(videosArray.filter(video => video.title.includes(e.target.value)));
      
    };

    

    if (status === 'upload') {
      return(
        <div>
          <Header fadeProp={fadeProp} success={success} user={user} status={status} setStatus={setStatus} setTags={setTags} ></Header>
          <VideoInput file={file} setFile={setFile} source={source} setSource={setSource}/>
          <TagsInput  tags={tags} setTags={setTags} />
          <SubmitUpload setFadeProp={setFadeProp} setSuccess={setSuccess} file={file} setFile={setFile} setSource={setSource} tags={tags} setTags={setTags} user={user} setVideoRefresh={setVideoRefresh} videoRefresh={videoRefresh}/>
          <VideoDisplay id='videoDisplay' unfiltered={videosArray} videosArray={[]} status={status} setEditVideo={setEditVideo} tags={tags} setTags={setTags}/>
        </div>
      )};
    if (!editVideo[0]) {
      return (
        
        <div>
          <Header fadeProp={fadeProp} success={success} user={user} status={status} setStatus={setStatus} setTags={setTags} ></Header>
            <div class='profile-input'> 
              <input class="profile-videos-searchbar" onChange={handleChange} placeholder="Search">
              </input>
            </div>
            <VideoDisplay id='videoDisplay' unfiltered={videosArray} videosArray={filteredVideosArray} status={status} setEditVideo={setEditVideo} tags={tags} setTags={setTags}/>
        </div>
      )
    }

    return (
      <div>
        <Header fadeProp={fadeProp} success={success} user={user} status={'edit'} setStatus={setStatus} setTags={setTags} ></Header>
        <div class={"edit-video-container"}>   
          <div class={"edit-video-content"}>
            <h2>Edit Video</h2>
            <h2>Title: {editVideo[1].title}</h2>
            <h2>Tags: </h2>
            <TagsInput  tags={tags} setTags={setTags}></TagsInput>
          </div>
          <video class={'edit-video'} autoPlay muted controls>
            <source src={editVideo[1].pose_path}></source>
          </video>
          <DeleteButton videoId={editVideo[1].id} setVideoRefresh={setVideoRefresh} videoRefresh={videoRefresh} user={user} setEditVideo={setEditVideo}></DeleteButton>
        </div>
        <div class="edit-video-footer">
          <BackButton setEditVideo={setEditVideo} setTags={setTags} ></BackButton>
          <SaveButton title={editVideo[1].title} tags={tags} user={user} videoId={editVideo[1].id} setEditVideo={setEditVideo} setTags={setTags} setVideoRefresh={setVideoRefresh} videoRefresh={videoRefresh}></SaveButton>
        </div>
      </div>
    )
}


