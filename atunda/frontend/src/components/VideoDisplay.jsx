import { useEffect, useState } from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";

export default function VideoDisplay({user}) {
  const [videosArray, setVideosArray] = useState();
  
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
    <div></div>
  )
}