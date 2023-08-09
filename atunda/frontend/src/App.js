import GoogleLogin from "./components/GoogleLogin";
import VideoInput from "./components/VideoInput";
import TagsInput from "./components/TagsInput";
import SubmitUpload from "./components/SubmitUpload";
import { useState } from "react";
import "./styles.css";


function App() {
  const [user, setUser] = useState({});
  const [queryVideo, setQueryVideo] = useState("");
  const [queryTags, setQueryTags] = useState("");

  if (user.first_name) {
    return (
      <div>
        <div>Hello {user.first_name}!</div>
        <div className="App">
          <h1>Video upload</h1>
          <VideoInput onQuery={setQueryVideo} user={user} width={400} height={300} />
          <TagsInput onQuery={setQueryTags} user={user} width={400} height={300} />
          <SubmitUpload queryTags={queryTags} queryVideo={queryVideo} user={user} width={400} height={300} />
        </div>
      </div>
      
    )
  } else {
    return (
      <div>
        <GoogleLogin setUser={setUser} />
      </div>
    )
  }

}

export default App;