import { useEffect, useState } from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";

export default function VideoTile({videoData}) {
  const [tags, setTags] = useState(videoData.tags.split(","));
  const [title, setTitle] = useState(videoData.title);
  
  return(
    <li id={videoData.id}>
      <div>{videoData.title}</div>
      <video controls>
        <source src={videoData.path}></source>
      </video>
      <div>Tags: {tags}</div>
    </li>
  )
}