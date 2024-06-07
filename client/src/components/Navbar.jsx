import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    UseNavigate,
    useNavigate,
  } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { context } from '../App';
import "./navbar.css";
import "./context.css";
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faFlagUsa } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function UserNavbar() {

  const navigate = useNavigate();

  const firstname = context.firstname;
  const lastname = context.lastname;
  const isAdmin = context.isAdmin;

  function logOut()
  {
    localStorage.setItem("token", "");
    localStorage.setItem("id","");
    navigate("/");
    window.location.reload();
    async function sendLogOut()
    {
        try {
            await fetch("http://localhost:3000/users/logout", {
              method: "DELETE",
            });
          } catch (error) {
            console.error(error.message);
          }
    }
    sendLogOut();
  }

  function changeTheme()
  {
    let elements = document.getElementsByClassName("theme");
    context.theme = context.theme === "dark" ? "light" : "dark";
    console.log("theme is now " + context.theme);
    for(let e of elements)
    {
       if(e && e.classList.contains("theme")) { 
          e.classList.remove( "theme-bg-dark");
          e.classList.remove("theme-bg-light");
          e.classList.remove("theme-font-dark");
          e.classList.remove("theme-font-light");
          e.classList.add("theme-bg-"+context.theme);
          e.classList.add("theme-font-"+context.theme);        
          e.classList.add("theme");
       }
    }

  }

  let c = context.unassignedAlerts;
  console.log(isAdmin);

  return (
    <nav id="main-navbar" class="theme navbar navbar-expand-lg navbar-light bg-white">

       <div class="container-fluid">

        <button data-mdb-button-init
            class="navbar-toggler"
            type="button"
            data-mdb-collapse-init
            data-mdb-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="true"
           aria-label="Toggle navigation"
        >
        <i class="fas fa-bars"></i>
        </button>


        <a class="navbar-brand" href="#">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
              height="25"
              alt="MY COMPANY LOGO"
              loading="lazy"
            />
        </a>
        {isAdmin && 
          <button className='btn btn-primary' onClick={() => navigate("/client-create")}>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            <span style={{color: 'white', marginLeft: '10px'}}>crea nuovo utente</span>
          </button>         
        }


        <ul class="navbar-nav ms-auto d-flex flex-row">

         <li class="nav-item dropdown">
              <a
                data-mdb-dropdown-init class="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
              <FontAwesomeIcon icon={faBell} style={{fontSize: '30px'}}></FontAwesomeIcon>
              { c > 0 &&
                <span class="badge rounded-pill badge-notification bg-danger">{c}</span>
              }
              
            </a>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuLink"
        >
        <li>
          <a class="dropdown-item" href="#">Some news</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Another news</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">Something else here</a>
        </li>
        </ul>
        </li>


        <li class="nav-item">
                <a class="nav-link me-3 me-lg-0" href="#">
                    <i class="fas fa-fill-drip"></i>
                </a>
        </li>

        <li class="nav-item me-3 me-lg-0">
                <a class="nav-link" href="#">
                    <i class="fab fa-github"></i>
                </a>
        </li>

          <Dropdown>
            <Dropdown.Toggle className="profile-pic" id="dropdown-basic">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                    class="rounded-circle"
                    height="45"
                    alt="Avatar"
                    loading="lazy"
                    />
                  <span style={{color: 'black'}}>{firstname} {lastname}</span>
            </Dropdown.Toggle>
            
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Informazioni profilo</Dropdown.Item>
              <Dropdown.Item href="#/action-2"><FontAwesomeIcon style={{color: 'red'}} icon={faPowerOff}/><span style={{color:'black', marginLeft: '5px'}} onClick={logOut}>Esci</span></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
       
        </ul> 
       </div>
    </nav>
  )
}
