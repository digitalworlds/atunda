import { useEffect, useState } from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";
import VideoDisplay from "./VideoDisplay";


export default function Profile (props) {
    const {user, videoData} = props;

    const [videosArray, setVideosArray] = useState([]);

    const[filteredVideosArray, setFilteredVideosArray] = useState([]);
  
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
    }, [user])

    const handleChange = (e) => {
      e.preventDefault();
      console.log('hi');
      console.log(videosArray);
      console.log(videosArray.filter(video => video.title.includes(e.target.value)));
      setFilteredVideosArray(videosArray.filter(video => video.title.includes(e.target.value)));
      
    }


    return (
      <div>
          <div class='profile-input'> 
            <input class="profile-videos-searchbar" onChange={handleChange} placeholder="Search">
            </input>
          </div>
          
          <VideoDisplay id='videoDisplay' unfiltered={videosArray} videosArray={filteredVideosArray} user={user} />
      </div>
        
    )
}


