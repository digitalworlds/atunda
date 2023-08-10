import GoogleLogin from "./components/GoogleLogin";
import VideoInput from "./components/VideoInput";
import TagsInput from "./components/TagsInput";
import SubmitUpload from "./components/SubmitUpload";
import { useState, React } from "react";
import "./styles.css";


function App() {
  const [user, setUser] = useState({});
  const [source, setSource] = useState();
  const [file, setFile] = useState();
  const [tags, setTags] = useState([]);

  if (user.first_name) {
    return (
      <div>
        <div>Hello {user.first_name}!</div>
        <div className="App">
          <h1>Video upload</h1>
          <VideoInput file={file} setFile={setFile} source={source} setSource={setSource} user={user} width={400} height={300} />
          <TagsInput tags={tags} setTags={setTags} user={user} width={400} height={300} />
          <SubmitUpload file={file} setFile={setFile} source={source} setSource={setSource} tags={tags} setTags={setTags} user={user} width={400} height={300} />
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