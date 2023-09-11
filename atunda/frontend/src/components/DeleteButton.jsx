import axios from "axios";
import { APPURL } from "../DjangoUrl";

export default function DeleteButton ({videoId, setVideoRefresh, videoRefresh, user, setEditVideo}) {

    async function handleClick (e) {
        e.preventDefault();
        const config = {
        url: APPURL + `api/video/delete/${videoId}/`,
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + user.access
        },
        };
        const res = await axios(config);
        console.log(res);
        setEditVideo([false, '']);
        setVideoRefresh(videoRefresh + 1);
        
    }

    return (<div class="delete-button" onClick={handleClick}>Delete Video</div>)
}