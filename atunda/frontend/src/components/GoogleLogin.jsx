import { useEffect } from "react";
import axios from "axios";
import { APPURL } from "../DjangoUrl";

export default function GoogleLogin({setUser, setStatus}) {
  async function handleCallbackResponse(response) {
    const config = {
      method: "post",
      url: APPURL + "google-auth/",
      data: {
        "id_token": response.credential
      },
    };
    const res = await axios(config);
    console.log(res);
    if (res.data.access) {
      setStatus('profile');
      console.log('login successful');
    }

    setUser(res.data);
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
  return(
    <div id="signInDiv"></div>
  )
}