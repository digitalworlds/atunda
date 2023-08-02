import axios from 'axios';
import { useState } from 'react';
import { APPURL } from '../DjangoUrl';

// Function used to log in a user with an inputted username and password
async function apiLogin(formInput) {
  // Sends post request to root app url and api-token/ route containing username and password data
  const config = {
    method: "post",
    url: APPURL + "api-token/",
    data: formInput
  }
  // If valid user, returns token data
  try{
    const { data } = await axios(config);
    console.log(data);
    return data;
  } 
  // If invalid user axios returns 401 error
  // Returns invalid user string in this case
  catch(err) {
    return "InvalidUser";
  }
}


export default function Login({setUser}) {
  const [formInput, setFormInput] = useState({
    'username': '',
    'password': '',
  })
  const [invalidUser, setInvalidUser] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();
    // Attempts to retrieve user's tokens
    const response = await apiLogin(formInput);
    // Sets user state if login response is valid
    if (response !== "InvalidUser") {
      setUser({
        username: formInput.username,
        accessToken: response.access,
        refreshToken: response.refresh,
      });
    } else {
      setInvalidUser(true);
    }
  }
  return(
    <>
    <form onSubmit={handleSumbit}>
      <label htmlFor='username-input'>Username</label>
      <input type='text' id='username-input' onChange={(e) => {
        setFormInput({...formInput, 'username': e.target.value})
      }}></input>

      <label htmlFor='password-input'>Password</label>
      <input type='password' id='password-input' onChange={(e) => {
        setFormInput({...formInput, 'password': e.target.value})
      }}></input>

      <button type='submit'>Submit</button>
    </form>
    {invalidUser && <div>Invalid Username or Password</div>}
    </>
  )
}