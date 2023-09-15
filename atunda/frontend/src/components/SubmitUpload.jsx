import React from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";
import "../styles.css";

export default function SubmitUpload(props) {
  const {user, file, setFile, setSource, tags, setTags, setSuccess, setFadeProp, videoRefresh, setVideoRefresh} = props;
  async function handleSubmit (event) {
    let formData = new FormData();
    formData.append('title', file.name.substring(0, file.name.length - 4));
    formData.append('path', file);
    formData.append('pose_path', file);
    formData.append('tags', tags);
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

    const pose_config = {
      method: "post",
      url: APPURL + `api/pose/${res.data.id}/`,
      headers: {
        "Authorization": "Bearer " + user.access
      },
    }
    console.log(res);
    axios(pose_config).then((res) => {console.log(res)})

    if (res.status == 201) {
        setTags([]);
        setFile('');
        setSource('');
        setSuccess('File Upload Successful');
        setFadeProp('success-visible');
        setTimeout (() => {
          setFadeProp('success-fade');
        }, 5000);
        setTimeout (() => {
          setFadeProp('success-hidden');
        }, 6000);
        setVideoRefresh(videoRefresh + 1);
    } else {
        setSuccess('File Upload Unsuccessful');
        setFadeProp('unsuccess-visible');
        setTimeout (() => {
          setFadeProp('unsuccess-fade');
        }, 5000);
        setTimeout (() => {
          setFadeProp('unsuccess-hidden');
        }, 6000);
    }

    


  };

  return (
    <div className="SubmitUpload">
      {file && tags != "" && <button onClick={handleSubmit}>Upload File</button>}
    </div>
  );
}
