import GoogleLogin from "./components/GoogleLogin";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({})

  if (user.first_name) {
    return (
      <div>Hello {user.first_name}</div>
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