import GoogleLogin from "./components/GoogleLogin";
import VideoInput from "./components/VideoInput";
import TagsInput from "./components/TagsInput";
import SubmitUpload from "./components/SubmitUpload";
import VideoDisplay from "./components/VideoDisplay";
import Header from "./components/Header";
import Profile from "./components/Profile";
import { useState, React } from "react";
import "./styles.css";


function App() {
  const [user, setUser] = useState({});
  const [source, setSource] = useState();
  const [file, setFile] = useState();
  const [tags, setTags] = useState([]);
  const [success, setSuccess] = useState('');
  const [status, setStatus] = useState('login');
 

  if (status === 'profile') {
    return (
      <div>
        <div className="App">
          <Header success={success} user={user} status={status} setStatus={setStatus}></Header>
          {/* <VideoDisplay user={user} /> */}
        </div>
      </div>
    )
  } else if (status === 'upload') {
    return (
      <div>
        <div className="App">
          
          <Header success={success} user={user} status={status} setStatus={setStatus}></Header>
          <VideoInput setSuccess={setSuccess} file={file} setFile={setFile} source={source} setSource={setSource} user={user} width={400} height={300} />
          <TagsInput setSuccess={setSuccess} tags={tags} setTags={setTags} user={user} width={400} height={300} />
          <SubmitUpload setSuccess={setSuccess} file={file} setFile={setFile} source={source} setSource={setSource} tags={tags} setTags={setTags} user={user} width={400} height={300} />
          
        </div>
      </div>
    )
  } else if (status === 'login') {
    return (
      <div>
        <GoogleLogin setStatus={setStatus} setUser={setUser} />
      </div>
    )
  }
}

export default App;