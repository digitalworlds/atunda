import VideoTile from "./VideoTile"

export default function VideoDisplay({unfiltered, videosArray, setEditVideo, tags, setTags, status}) {
    if (videosArray.length > 0) {
        return (
            <div className="profile-videos-container">
                {unfiltered.map((video) => {
                    if (videosArray.includes(video)) {
                        return <VideoTile videoData={video} hidden={'false'} setEditVideo={setEditVideo} tags={tags} setTags={setTags}/>
                    }
                    return <VideoTile videoData={video} hidden={'true'} setEditVideo={setEditVideo}  tags={tags} setTags={setTags}/>
                })}
            </div>
        )
    }

    if (status !== 'upload'){
        return (
            <div className="noVideo">
                <h1>No videos found</h1>
            </div>
        )
    }

    return (
        <></>
    )
}