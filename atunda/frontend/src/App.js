import GoogleLogin from "./components/GoogleLogin";
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
 

  if (status === 'profile' || status ==='upload') {
    return (
      <div>
        <div className="App">
          
          <Profile user={user} tags={tags} setTags={setTags} status={status} setStatus={setStatus}  file={file} setFile={setFile} source={source} success={success} setSource={setSource} setSuccess={setSuccess} />
        </div>
      </div>
    )
  } 
    return (
      <div>
        <GoogleLogin setStatus={setStatus} setUser={setUser} />
      </div>
    )
}

export default App;