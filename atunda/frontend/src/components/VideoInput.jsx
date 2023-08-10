import React from "react";

export default function VideoInput(props) {
  const { width, height, user, file, setFile, source, setSource, setSuccess} = props;

  const inputRef = React.useRef();

  const handleChange = (event) => {
    if(event.target.value != "") {
      setFile(event.target.files[0]);
    
      const url = URL.createObjectURL(event.target.files[0]);
      setSource(url);
    }
    
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
        onChange={handleChange}
        accept=".mov,.mp4"
              />
      {!source &&  <button className='filebutton' onClick={handleChoose}>Choose File</button>}
      {source && 
          <div class="file">
            <h2>Current File:</h2>
            <div>{file.name}</div>
            <button onClick={handleChoose}>Change File</button>
        
        </div>}
      
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

