import GoogleLogin from "./components/GoogleLogin";
import VideoInput from "./components/VideoInput";
import TagsInput from "./components/TagsInput";
import SubmitUpload from "./components/SubmitUpload";
import VideoDisplay from "./components/VideoDisplay";
import { useState, React } from "react";
import "./styles.css";


function App() {
  const [user, setUser] = useState({});
  const [source, setSource] = useState();
  const [file, setFile] = useState();
  const [tags, setTags] = useState([]);
  const [success, setSuccess] = useState('');
 
  if (user.first_name) {
    if (success == 'File Upload Successful') {
      return (
        <div>
          <div className="App">
            <div className="Header">
            <h1>Video upload</h1>
              <div className="Success" >{success}</div>
              <h1>{"Hello " + user.first_name + " " +  user.last_name}</h1>
              <img className="Profile" src={user.profile_pic}></img>
            </div>
            
            <VideoInput setSuccess={setSuccess} file={file} setFile={setFile} source={source} setSource={setSource} user={user} width={400} height={300} />
            <TagsInput setSuccess={setSuccess} tags={tags} setTags={setTags} user={user} width={400} height={300} />
            <SubmitUpload setSuccess={setSuccess} file={file} setFile={setFile} source={source} setSource={setSource} tags={tags} setTags={setTags} user={user} width={400} height={300} />
          </div>
        </div>
        
      )
    } else {
      return (
        <div>
          <div className="App">
            <div className="Header">
              <h1>Video upload</h1>
              <div className="Unsuccess" >{success}</div>
              <h1>{"Hello " + user.first_name + " " +  user.last_name}</h1>
              <img className="Profile" src={user.profile_pic}></img>
            </div>
            
            <VideoInput file={file} setFile={setFile} source={source} setSource={setSource} user={user} width={400} height={300} />
            <TagsInput tags={tags} setTags={setTags} user={user} width={400} height={300} />
            <SubmitUpload setSuccess={setSuccess} file={file} setFile={setFile} source={source} setSource={setSource} tags={tags} setTags={setTags} user={user} width={400} height={300} />
          <VideoDisplay user={user} />
          </div>
        </div>
        
      )
    }
    
  } else {
    return (
      <div>
        <GoogleLogin setUser={setUser} />
      </div>
    )
  }

}

export default App;