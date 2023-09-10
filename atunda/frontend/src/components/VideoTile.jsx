import { useEffect, useRef } from "react";
import "../styles.css";

export default function VideoTile({videoData, hidden, setEditVideo, setTags}) {

  // async function handleSubmit(e) {
  //   console.log(title, tags);
  //   e.preventDefault();
  //   const config = {
  //     url: APPURL + `/api/video/update/${videoData.id}/`,
  //     method: "PATCH",
  //     headers: {
  //       "Authorization": "Bearer " + user.access
  //     },
  //     data: {
  //       "title": title,
  //       "tags": tags,
  //     }
  //   };
  //   const res = await axios(config);
  //   console.log(res);
  //   setEditMode(false);
  // }

  const handleClick = (e) => {
    setEditVideo([true, videoData]);
    const tagsCopy = [videoData.tags];
    setTags(tagsCopy);
  };

  const videoRef = useRef();
  useEffect(() => {    
    videoRef.current?.load();
  }, [videoData.path]);

  if (hidden === 'false') {
    return(
      <div className='profile-videos' id={videoData.id} onClick={handleClick}>
        <video ref={videoRef}>
          <source src={videoData.path}></source>
        </video>
        <div className="overlayText">
            <h2 id="topText">{videoData.title}</h2>
        </div>
      </div>
    )
  }
  return(
    <div className='profile-videos' id={videoData.id} hidden onClick={handleClick}>
      <video ref={videoRef} controls>
        <source src={videoData.path}></source>
      </video>
      <div className="overlayText">
          <p id="topText">{videoData.title}</p>
      </div>
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