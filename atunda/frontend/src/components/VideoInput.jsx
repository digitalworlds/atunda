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

  const handleRemove = (event) => {
    setFile();
    setSource();
    document.getElementById('input_file_form').reset();
  }

  return (
    <div className="VideoInput">
      <form id="input_file_form"> 
        <input
          ref={inputRef}
          className="VideoInput_input"
          type="file"
          onChange={handleChange}
          accept=".mov,.mp4"
                />
      </form>
      {!source &&  <button className='filebutton' onClick={handleChoose}>Choose File</button>}
      {source && 
      <div class='file'>
          <div class="current_file">
            <h2>Current File:</h2>
            <button onClick={handleRemove}>{file.name} x</button>
        
        </div>
      </div>
        }
      
      {source && (
        <video
          className="VideoInput_video"
          width="100%"
          height={height}
          src={source}
          autoplay="autoplay"
          muted="muted"
          controls="controls"
        />
      )}
      
    </div>
  );
}

