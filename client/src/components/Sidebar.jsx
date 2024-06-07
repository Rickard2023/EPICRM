import React from 'react'
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, {
    Toggle,
    Nav,
    NavItem,
    NavIcon,
    NavText
  } from "@trendmicro/react-sidenav";
  import "bootstrap/dist/css/bootstrap.min.css";

import { ArrowRight, Display } from 'react-bootstrap-icons';
import UserList from './UserList';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard } from '@fortawesome/free-solid-svg-icons';
import { faMegaport } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCancel } from '@fortawesome/free-solid-svg-icons';
import "./sidebar.css";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { context } from '../App';
import Footer from './Footer';
import Cards from './Cards';


function Sidebar() {

    const [alerts, setAlerts] = useState([]);
    const [fetched,setFetched] = useState(false);

    async function CheckAlerts()
    {
        try {       
            await fetch("http://localhost:3000/alerts/getall", {
              method: "GET",    
              headers: {  
                "Content-type": "application/json; charset=UTF-8" 
              },        
              })
              .then(resp => {
                  return resp.json()
              })
              .then(data => {        
                      
                setAlerts(data);
                setFetched(true);

              })
          }
          catch (err) {
                console.log(err.toString());
          } 
    }
 

    if(fetched == false)
        CheckAlerts();


    let array = [];
    for(let i = 0; i < alerts.count; i++)
    {
        array[i] = {
            "_id": alerts.alerts[i]._id,
            "message": alerts.alerts[i].message,
            "_userID": alerts.alerts[i]._userID,
            "_agentID": "",
            "firstname": alerts.users[i].firstname,
            "lastname": alerts.users[i].lastname,
            "status":alerts.alerts[i].status
        }
        
    }

    context.unassignedAlerts = 0;
    for(let a of array){
        if(a.status === "unassigned")
            context.unassignedAlerts++;
    }


    const navigate = useNavigate();
    
    return  (
    <>
        <header style={{height: "5vh"}}>
            <div class='theme   d-flex row'>
                <div class= 'col-2'>
                    <nav style={{height:'100%'}} id="sidebarMenu" class="row collapse d-lg-block sidebar collapse bg-white">
                <div class="theme row position-sticky">
                <div class="list-group list-group-flush">
                    <a
                    href="#"
                    class="list-group-item list-group-item-action py-2 ripple"
                    aria-current="true"
                    >
                    <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action py-2 ripple">
                    <i class="fas fa-chart-area fa-fw me-3"></i><span>Webiste traffic</span>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action py-2 ripple"
                    ><i class="fas fa-lock fa-fw me-3"></i><span>Password</span></a
                    >
                    <a href="#" class="list-group-item list-group-item-action py-2 ripple"
                    ><i class="fas fa-chart-line fa-fw me-3"></i><span>Analytics</span></a
                    >
                    <a href="#" class="list-group-item list-group-item-action py-2 ripple">
                    <i class="fas fa-chart-pie fa-fw me-3"></i><span>SEO</span>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action py-2 ripple"
                    ><i class="fas fa-chart-bar fa-fw me-3"></i><span>Orders</span></a
                    >
                    <a href="#" class="list-group-item list-group-item-action py-2 ripple"
                    ><i class="fas fa-globe fa-fw me-3"></i><span>International</span></a
                    >
                    <a href="#" class="list-group-item list-group-item-action py-2 ripple"
                    ><i class="fas fa-building fa-fw me-3"></i><span>Partners</span></a
                    >
                    <a href="#" class="list-group-item list-group-item-action py-2 ripple"
                    ><i class="fas fa-calendar fa-fw me-3"></i><span>Calendar</span></a
                    >
                    <a href="#" class="list-group-item list-group-item-action py-2 ripple"
                    ><i class="fas fa-users fa-fw me-3"></i><span>Users</span></a
                    >
                    <a href="#" class="list-group-item list-group-item-action py-2 ripple"
                    ><i class="fas fa-money-bill fa-fw me-3"></i><span>Sales</span></a
                    >
                </div>
                </div>
                </nav>
                

                </div>    
        
                <Cards
                    alerts = {array}
                />           
                <Footer/>    
            </div>   
        </header>
    </>
    );
}
export default Sidebar;