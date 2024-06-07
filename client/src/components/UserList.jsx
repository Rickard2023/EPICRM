import React, { useState } from 'react'
import { useEffect } from 'react';
import "./userList.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { json } from 'react-router-dom';
import { Link } from 'react-router-dom';

function handleUserDeletion(id)
{
    const body = {_id: id};
    async function sendDeletion(){
        await fetch("http://localhost:3000/users/delete/" + id, {
            method: "DELETE",     
        })
        .then(resp => {
            return resp
        })
        .then(data => {     
           alert("user " + id + " has been deleted");
            window.location.reload();
        })
        .catch((err) => console.log("problem: ", err))
    }
    sendDeletion();
}

export default function UserList() {

    const [userList, setUserList] = useState(0);
    let newList = 0;
    function handleUserList(x)
    {
        setUserList(x);
    }

    async function getAllUsers()
    {
        try {       
            await fetch("http://localhost:3000/users/getall", {
              method: "GET",    
              headers: {  
                "Content-type": "application/json; charset=UTF-8" 
              },        
              })
              .then(resp => {
                  return resp.json()
              })
              .then(data => {                   
                setUserList(data);      
                console.log(data);             
              })
        }
        catch (err) {
              console.log(err.toString());
        }
    }
   
   if(userList === 0)
       getAllUsers();
    
   let c = 0;
  return (
    <>
        {userList && userList.map((x) =>     
          <ul key={c++}>     
          {x.usertype == "cliente" && 
            <li className='user-list'><FontAwesomeIcon icon={faUser} /> {x.firstname }  <FontAwesomeIcon icon={faDeleteLeft} style={{color: "red"}} onClick={()=> handleUserDeletion(x._id)}/>  <Link to={"/user-edit/"+x._id}>Modifica</Link> </li>
          }            
          </ul>       
        )}
    </>
  )
}
