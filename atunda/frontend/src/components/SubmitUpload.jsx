import React from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";
import TagsInput from "./TagsInput";

export default function SubmitUpload(props) {
  const { width, height, user, file, setFile, source, setSource, tags, setTags} = props;

  async function handleSubmit (event) {
    let formData = new FormData();
    formData.append('title', file.name);
    formData.append('path', file);
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
    console.log(res);

    if (res.status == 201) {
        setTags([]);
        setFile('');
        setSource('');
    }

  };

  return (
    <div className="SubmitUpload">
      {file && tags != "" && <button onClick={handleSubmit}>Upload</button>}
    </div>
  );
}
