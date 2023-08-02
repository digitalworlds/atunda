import { useState, useEffect } from "react";
import Login from "./components/Login";

function App() {

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  useEffect (() => {
    /* global google */
    google.accounts.id.initialize({client_id: "89980881327-61v1jnjbsfdd8rhaoc57shdp77ga2n0f.apps.googleusercontent.com", 
    callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size:"large"}
    );

  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
    </div>
  )

}

  // const [user, setUser] = useState({});
  
  // if (user.username) {
  //   return (
  //     <div>Hello {user.username}</div>
  //   )
  // }
  // else {
  //   return (
  //     <Login setUser={setUser} />
  //   )
  // }
// }
export default App;