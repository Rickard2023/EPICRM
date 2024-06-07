import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';

async function handleUserCreation()
{
    const firstname = document.getElementById("form-firstname").value;
    const lastname = document.getElementById("form-lastname").value;
    const email = document.getElementById("form-email").value;
    const pwd = document.getElementById("form-pwd").value;
    
    const body = {
        email : email,
        password: pwd,
        firstname: firstname,
        lastname: lastname,
        usertype: "client"
    }

    try {       
        await fetch("http://localhost:3000/users/create", {
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
             console.log(data);
          })
    }
    catch (err) {
          console.log(err.toString());
    }
}


export default function UserCreate() {
    return (
        <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
    
          <MDBRow>
    
            <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
    
              <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
                The best offer <br />
                <span style={{color: 'hsl(218, 81%, 75%)'}}>for your business</span>
              </h1>
    
              <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>
    
            </MDBCol>
    
            <MDBCol md='6' className='position-relative'>
    
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
    
              <MDBCard className='my-5 bg-glass'>
                <MDBCardBody className='p-5'>
    
                  <MDBRow>
                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' label='First name' id='form-firstname' type='text'/>
                    </MDBCol>
    
                    <MDBCol col='6'>
                      <MDBInput wrapperClass='mb-4' label='Last name' id='form-lastname' type='text'/>
                    </MDBCol>
                  </MDBRow>
    
                  <MDBInput wrapperClass='mb-4' label='Email' id='form-email' type='email'/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='form-pwd' type='password'/>
    
                  <MDBBtn className='w-100 mb-4' size='md' onClick={handleUserCreation}>Create user</MDBBtn>
     
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
    
          </MDBRow>
    
        </MDBContainer>
      );
}
