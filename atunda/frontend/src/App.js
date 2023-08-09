import GoogleLogin from "./components/GoogleLogin";
import VideoInput from "./VideoInput";
import { useState } from "react";
import "./styles.css";


function App() {
  const [user, setUser] = useState({})

  if (user.first_name) {
    return (
      <div>
        <div>Hello {user.first_name}!</div>
        <div className="App">
          <h1>Video upload</h1>
          <VideoInput user={user} width={400} height={300} />
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