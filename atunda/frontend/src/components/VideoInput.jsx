import React from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";

export default function VideoInput(props) {
  const { width, height, user, onQuery} = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();


  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const handleChange = (event) => {

    const file = event.target.files[0];
    console.log(file.name);
    onQuery(file);
    const url = URL.createObjectURL(file);
    setSource(url);
      
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleChange}
        accept=".mov,.mp4"
      />
      {/* {!source && <button onClick={handleChoose}>Choose</button>} */}
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height={height}
          src={source}
        />
      )}
      
    </div>
  );
}

