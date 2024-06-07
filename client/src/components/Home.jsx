import React from 'react'
import { Navbar, Nav } from "react-bootstrap";
import "../components/home.css";
import Sidebar from './Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from 'react-bootstrap';
import UserCreate from './UserCreate';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MDBInput, MDBCheckbox, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import UserNavbar from './Navbar';
import Login from './Login';
import { context } from '../App';

function Home(props) {
  const navigate = useNavigate();
  const [isAdmin, setAdmin] = useState(false);
  const id = localStorage.getItem("id");
  console.log(context.userID, context.theme, context.firstname,context.lastname);
  
  async function isUserAdmin()
  {
  
    let check = false; 
    if(id != null && id != undefined && id != ""){
      try {       
        await fetch("http://localhost:3000/users/"+id+"/isAdmin", {
          method: "GET",    
          headers: {  
            "Content-type": "application/json; charset=UTF-8" 
          },        
          })
          .then(resp => {
              return resp.json()
          })
          .then(data => {        
                  
            setAdmin(data);    
          })
      }
      catch (err) {
            console.log(err.toString());
      }
    };
  }
  isUserAdmin();

  async function sendContact()
  {
    const msg = document.getElementById('userMsg').value
    const body = {
      _userID: id,
      message: msg,
      status: "unassigned",
      report: ""
    }
    console.log({body, msg});
    try {       
      await fetch("http://localhost:3000/alerts/"+id+"/create", {
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

  if(isAdmin === true){
    return (
      <>
        <div>
        <UserNavbar/>
        <Sidebar/>
        </div>
      </>
    )
  }
 else if(isAdmin !== true && id != "") {
  return (
    <>
    <UserNavbar/>

    <div style={{position: 'absolute', top: '20%', left: '40%'}} class="panel card col-3">
            <div class="card-body ">
            <form id='form' className='text-center ' style={{ width: '100%', margin: 'auto', border: '1px solid lightgrey' }}>
              <h2>CONTATTACI</h2>
              <MDBTextArea id='userMsg' wrapperClass='mb-4' label='Message' style={{ height: '200px' }} />
              </form>
              <MDBBtn type='button' color='primary' block className='my-4' onClick={sendContact}>
                INVIA
              </MDBBtn>
            </div>
    </div>

   
    </>
    
  )
 }
  else {
    return (
      <>
      <Login/>
      </>
    )
  }
}


export default Home;