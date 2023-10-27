
import React from "react";

export default function Header (props) {
    const {user, success, status, setStatus, setTags, fadeProp} = props;


    const handleUpload = (event) => {    
        setStatus('upload');
        setTags([]);
    }

    const handleProfile = (event) => {    
        setStatus('profile');
    }

    return (
        <div className="Header">
            <h1 >Project ATUNDA</h1>
               <div className={fadeProp}>{success}</div>
            {status === 'profile' && 
                <h1 class='page-button' onClick={handleUpload}>Upload</h1>
            }
            {status === 'upload' && 
                <h1 class='page-button' onClick={handleProfile}>Profile</h1>
            }
            {status === 'edit' && 
                <h1 class='page-button'></h1>
            }

            <img className="Profile" src={user.profile_pic} draggable='false'></img>
        </div>
    )
}


