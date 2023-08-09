import React from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";

export default function SubmitUpload(props) {
  const { width, height, user, queryVideo, queryTags } = props;

  async function handleSubmit (event) {
    let formData = new FormData();
    formData.append('title', queryVideo.name);
    formData.append('path', queryVideo);
    formData.append('tags', queryTags);
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

  return (
    <div className="SubmitUpload">
      {queryVideo && queryTags && <button onClick={handleSubmit}>Upload</button>}
    </div>
  );
}
