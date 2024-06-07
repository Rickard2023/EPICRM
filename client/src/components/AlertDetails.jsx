import React, { useState } from 'react'
import { MDBInput, MDBCheckbox, MDBBtn, MDBTextArea } from 'mdb-react-ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import UserNavbar from './Navbar';
import Sidebar from './Sidebar';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AlertDetails() {

  const navigate = useNavigate();
  const params = useParams();
  const alertID = params.alertID;
  console.log(alertID);

  const [alert,setAlert] = useState('');
  const [user,setUser] = useState('');

  function setAppointmentDate(alert, value)
  {
     async function applyAppointmentDate()
     {
        const body = {report: document.getElementById('report').value};
        try {   
          await fetch("http://localhost:3000/alerts/"+alert._id+"/appointment/"+value, {
          method: "PUT",    
          headers: {  
            "Content-type": "application/json; charset=UTF-8" 
          },        
          body: JSON.stringify(body),
          })
          .then(resp => {
              return resp.json()
          })
          .then(data => {              
            console.log(data);
            navigate("/");
          })
        }
        catch (err) {
          console.log(err.toString());
        }
     }

     applyAppointmentDate();
  }

  async function getAlertInfo()
  {

    try {       
      await fetch("http://localhost:3000/alerts/"+alertID, {
        method: "GET",    
        headers: {  
          "Content-type": "application/json; charset=UTF-8" 
        },        
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {              

          setAlert(data);
          async function getUserInfo(alert)
          {     
            /*  
              const userURL = await fetch("http://localhost:3000/users/"+alert._userID);
              const userData = await userURL.json();
              console.log(userData);
              setUser(userData);
            */
              try {       
                await fetch("http://localhost:3000/users/"+alert._userID, {
                  method: "GET",    
                    headers: {  
                      "Content-type": "application/json; charset=UTF-8" 
                    },        
                 
                  })
                  .then(resp => {
                      return resp.json()
                  })
                  .then(data => {     
                    console.log(data);     
                    setUser(data);
                  })
              }
              catch (err) {
                    console.log(err.toString());
              }
           
          }  
          getUserInfo(data);
        })
    }
    catch (err) {
          console.log(err.toString());
    }


  }

  if(alert == '')
     getAlertInfo();

  async function setComplete(id)
  {
      console.log(id);
      try {   
          const URL = "http://localhost:3000/alerts/"+id+"/set/completed"
          await fetch(URL, {
          method: "PATCH",    
          headers: {  
            "Content-type": "application/json; charset=UTF-8" 
          },        
          })
          .then(resp => {
              return resp.json()
          })
          .then(data => {              
            console.log(data);
            navigate("/")
          })
        }
        catch (err) {
          console.log(err.toString());
      }
  }

  
  const [appt, setAppt] = useState('');

  const status = alert.status;
  return (

    <>
    <UserNavbar/>

    {alert &&
      <div style={{position: 'absolute', top: '20%', left: '40%'}} className='d-flex align-center'>
        <form style={{ width: '100%', maxWidth: '700px', margin: '50px', padding: '30px', border: '1px solid lightgrey' }}>
        <h3>Segnalazione dal cliente <span style={{color: status === "completed" ? "green" : "red"}}>{user.firstname} {user.lastname} {status === "completed" ? "(completato)" : '' }</span></h3>
        <MDBTextArea wrapperClass='mb-4' label='Messaggio Cliente' value={alert?.message} disabled='true' />
        <MDBInput id='apptDate'  disabled={alert.status == "completed"? true : false} label='Data appuntamento' type='date' value={alert.appointment}/>

        {alert.status == "unassigned" &&
          <MDBTextArea id='report' wrapperClass='mb-4' style={{marginTop: '20px'}} label='Resoconto'/>
        }
        {(alert.status == "scheduled" || alert.status == "completed") &&
          <MDBTextArea id='report' disabled={true} wrapperClass='mb-4' style={{marginTop: '20px'}} label='Resoconto' value={alert.report}/>
        }
        <button type='button' className='btn btn-primary'  onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} style={{marginRight:'10px'}}></FontAwesomeIcon>INDIETRO</button>

        {
          alert.status === "scheduled" && 
          <button type='button' style={{float: 'right'}} className='btn btn-success' onClick={() => {setComplete(alert._id)}}>COMPLETATO</button>
        }

        {
          alert.status === "unassigned" && 
          <button type='button' style={{float: 'right'}} className='btn btn-success' disabled={alert.status == "completed"? true : false} onClick={() => {let value = document.getElementById('apptDate').value; setAppointmentDate(alert,value)}}>CONFERMA</button>
        }
                
        </form>    
      </div>
    }
      
    </>
  )
}
