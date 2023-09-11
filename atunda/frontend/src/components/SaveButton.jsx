import axios from "axios";
import { APPURL } from "../DjangoUrl";

export default function SaveButton ({title, tags, user, videoId, setEditVideo, setTags, setVideoRefresh, videoRefresh}) {
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

    async function handleClick (e) {
        console.log(title, tags);
        e.preventDefault();
        const copyTags = tags.toString();
        console.log(title, copyTags);
        const config = {
        url: APPURL + `api/video/update/${videoId}/`,
        method: "PATCH",
        headers: {
            "Authorization": "Bearer " + user.access
        },
        data: {
            "title": title,
            "tags": copyTags,
        }
        };
        const res = await axios(config);
        console.log(res);
        setEditVideo([false, '']);
        setTags([]);
        setVideoRefresh(videoRefresh + 1);
    }

    return (<div class="save-button" onClick={handleClick}>Save</div>)
}