import axios from 'axios';
import { useState } from 'react';
import { APPURL } from '../DjangoUrl';


async function apiLogin(formInput) {
  const config = {
    method: "post",
    url: APPURL + "api-token/",
    data: formInput
  }
  try{
    const { data } = await axios(config);
    console.log(data);
    return data;
  } catch(err) {
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
    console.log(formInput.username);
    console.log(formInput.password);
    const response = await apiLogin(formInput);
    console.log(response);
    if (response !== "InvalidUser") {
      setUser({
        username: formInput.username,
        password: formInput.password,
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