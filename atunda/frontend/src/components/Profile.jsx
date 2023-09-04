import { useEffect, useState } from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";
import VideoTile from "./VideoTile";



export default function Profile (props) {
    const {user, videoData} = props;

    const [searchInput, setSearchInput] = useState('');

    const [videosArray, setVideosArray] = useState([]);
  
    useEffect(() => {
      const config = {
        url: APPURL + "/api/video/",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + user.access
        }
      }
  
      axios(config).then((res) => {
        console.log(res.data);
        setVideosArray(res.data);
      })
    }, [user])


    return (
      <div>
          <div class='profile-input'> 
            <input class="profile-videos-searchbar" value={searchInput} placeholder="Search">
            </input>
          </div>
          <div class='profile-videos-container'>
              {videosArray.filter(video => video.includes(searchInput)).map((video) => {
                  console.log(video);
                  return(
                  <VideoTile videoData={video} user={user} />
                  )
              })}
          </div>
      </div>
        
    )
}


