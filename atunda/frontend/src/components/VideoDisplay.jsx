import VideoTile from "./VideoTile"

export default function VideoDisplay({unfiltered, videosArray, user}) {
    if (videosArray.length > 0) {
        return (
            <div className="profile-videos-container">
                {unfiltered.map((video) => {
                    if (videosArray.includes(video)) {
                        return <VideoTile videoData={video} user={user} hidden={'false'} />
                    }
                    return <VideoTile videoData={video} user={user} hidden={'true'}/>
                })}
            </div>
        )
    }

    return (
        <div className="noVideo">
            <h1>No videos found</h1>
        </div>
    )
    
}