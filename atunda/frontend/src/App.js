import { useState, useEffect } from "react";
import Login from "./components/Login";
import axios from "axios";
import { APPURL } from "./DjangoUrl";

function App() {

  async function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const config = {
      method: "post",
      url: APPURL + "google-auth/",
      data: {
        "id_token": response.credential
      },
    };
    const res = await axios(config);
    console.log(res);

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