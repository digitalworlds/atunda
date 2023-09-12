import axios from "axios";
import { APPURL } from "../DjangoUrl";
import Popup from 'reactjs-popup';


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

    // Credit popup from https://github.com/yjose/reactjs-popup
    return (
    <div>
        <Popup trigger={<div class="delete-button" >Delete Video</div>} modal>
        {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Do You Wish To Delete This Video? </div>
        <div className="content">
          {' '}
          This is irreversible!
        </div>
        <div className="actions">
        <button className="button" onClick={handleClick}> Yes, Delete Video </button>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            No, Go Back
            
          </button>
        </div>
      </div>
    )}
        </Popup>

    </div>
    
    
    )
}