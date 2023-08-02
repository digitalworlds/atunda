import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState({});
  
  if (user.username) {
    return (
      <div>Hello {user.username}</div>
    )
  }
  else {
    return (
      <Login setUser={setUser} />
    )
  }
}

export default App;
