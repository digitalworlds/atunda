import { useEffect, useState } from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";
import "../styles.css";

export default function VideoTile({videoData, user}) {
  const [tags, setTags] = useState(videoData.tags.split(","));
  const [title, setTitle] = useState(videoData.title);
  const [editMode, setEditMode] = useState(false);

  async function handleSubmit(e) {
    console.log(title, tags);
    e.preventDefault();
    const config = {
      url: APPURL + `/api/video/update/${videoData.id}/`,
      method: "PATCH",
      headers: {
        "Authorization": "Bearer " + user.access
      },
      data: {
        "title": title,
        "tags": tags,
      }
    };
    const res = await axios(config);
    console.log(res);
    setEditMode(false);
  }

  return(
    <div class='profile-videos' id={videoData.id}>
      <video>
        <source src={videoData.path}></source>
      </video>
    </div>
  )

  // if (!editMode) {
  //   return(
  //     <li id={videoData.id}>
  //       <div>{videoData.title}</div>
  //       <video class='profile-videos' controls>
  //         <source src={videoData.path}></source>
  //       </video>
  //       <div>Tags: {tags}</div>
  //       <button onClick={() => setEditMode(true)}>Edit</button>
  //     </li>
  //   )
  // } else {
  //   return (
  //     <li id={videoData.id}>
  //       <label>New Title</label>
  //       <input type="text" onChange={(e) => {setTitle(e.target.value)}}></input>
  //       <video controls>
  //         <source src={videoData.path}></source>
  //       </video>
  //       <label>New Tags</label>
  //       <input type="text" onChange={(e) => {setTags(e.target.value)}}></input>
  //       <button onClick={handleSubmit}>Submit Edit</button>
  //     </li>
  //   )
  // }
  
}