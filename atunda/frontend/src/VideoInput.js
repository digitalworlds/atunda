import React from "react";
import axios from "axios";
import { APPURL } from "./DjangoUrl";

export default function VideoInput(props) {
  const { width, height, user } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

   async function handleFileChange (event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('title', event.target.files[0].name);
    formData.append('tags', 'tag,tag2');
    formData.append('path', event.target.files[0]);
    console.log(event.target.files[0]);
    const config = {
        method: "post",
        url: APPURL + "api/video/",
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + user.access
          },
        data: formData,
      };
    const res = await axios(config);
    console.log(res);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {!source && <button onClick={handleChoose}>Choose</button>}
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height={height}
          controls
          src={source}
        />
      )}
      <div className="VideoInput_footer">{source || "Nothing selectd"}</div>
    </div>
  );
}
