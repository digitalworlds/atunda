import { useEffect, useState } from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";
import VideoTile from "./VideoTile";

export default function VideoDisplay({user}) {
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
    <ul>
      {videosArray.map((video) => {
        console.log(video);
        return(
          <VideoTile videoData={video} user={user} />
        )
      })}
    </ul>
  )
}