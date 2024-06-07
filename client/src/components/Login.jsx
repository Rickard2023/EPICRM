import React from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { useNavigate  } from 'react-router-dom';
import Home from './Home';
import { context } from '../App';

function handleUserInfo() 
{
    const email = document.getElementById('login-email').value;
    const pwd = document.getElementById('login-pwd').value;
    const body = {
      email: email,
      password: pwd
    }

    async function verifyLogin() {
        try {       
          await fetch("http://localhost:3000/users/login", {
            method: "POST",    
            headers: {  
              "Content-type": "application/json; charset=UTF-8" 
            },        
            body: JSON.stringify(body)
            })
            .then(resp => {
                return resp.json()
            })
            .then(data => {                   
                localStorage.setItem("token", data.token);
                localStorage.setItem("id", data.user._id);

                window.location.reload();
            })


        }
        catch (err) {
            console.log(err.toString());
        }
    }
    verifyLogin();
}


function Login() {

  const navigate = useNavigate();
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBInput wrapperClass='mb-4' label='Email address' id='login-email' type='email'/>
      <MDBInput wrapperClass='mb-4' label='Password' id='login-pwd' type='password'/>

      <MDBBtn className="mb-4" onClick={handleUserInfo}>Sign in</MDBBtn>

      <div className="d-flex justify-content-between mx-3 mb-4">
        <a href="!#">Forgot password?</a>
      </div>

      
    </MDBContainer>
  );
}

export default Login;