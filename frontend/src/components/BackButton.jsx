

export default function BackButton ({setEditVideo, setTags}) {
    const handleClick = (e) => {
        setEditVideo([false, '']);
        setTags([]);
      }

    return (<div class="back-button" onClick={handleClick}>Back</div>)
}