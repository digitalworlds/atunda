
import React from "react";

export default function VideoInput(props) {
    const {user, success, status, setStatus} = props;

    const handleUpload = (event) => {    
        setStatus('upload');
    }

    const handleProfile = (event) => {    
        setStatus('profile');
    }

    return (
        <div className="Header">
            <h1>Project ATUNDA</h1>
            <div className="Success" >{success}</div>
            {status != 'upload' && <button onClick={handleUpload}>Upload</button>}
            {status != 'profile' && <button onClick={handleProfile}>Profile</button>}
            <h1>{user.first_name + " " +  user.last_name}</h1>
            <img className="Profile" src={user.profile_pic}></img>
        </div>
    )
}


