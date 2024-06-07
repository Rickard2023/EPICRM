import React from "react";
import "./cards.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { X } from "react-bootstrap-icons";
import { context } from "../App";

function Cards(props) {

    const alerts = props.alerts;

    alerts.map((x) => {console.log(x.status)})
    return (
        
        <>
        <div class="panel card col-3" style={{margin: '25px', padding: '10px'}}>
            <div class="card-body ">
                <h5 class="card-title-1">Segnalazioni</h5>
                {alerts && alerts.map((x) =>     
                    <ul key={x._id}>     
                    {x.status == "unassigned" && 
                        <li><a href={"/alert-details/"+x._id}> Segnalazione dal cliente {x.firstname} {x.lastname} </a></li>
                    }            
                    </ul>       
                )}
            </div>
        </div>
        <div class="panel card col-3" style={{margin: '25px', padding: '10px'}}>  
            <div class="card-body">
                <h5 class="card-title-2">Appuntamenti programmati</h5>
                {alerts && alerts.map((x) =>     
                    <ul key={x._id}>     
                    {x.status == "scheduled" && 
                    <li><a href={"/alert-details/"+x._id}> Segnalazione dal cliente {x.firstname} {x.lastname}</a>   
                                                      
                    </li>   
                    }            
                    </ul>       
                )}
            </div>
        </div>
        <div class="panel card col-3" style={{margin: '25px', padding: '10px'}}>  
            <div class="card-body">
                <h5 class="card-title-3">Appuntamenti completati</h5>
                {alerts && alerts.map((x) =>     
                    <ul key={x._id}>     
                    {x.status == "completed" && 
                        <li><a href={"/alert-details/"+x._id}> Segnalazione dal cliente {x.firstname} {x.lastname} </a></li>
                    }            
                    </ul>       
                )}
            </div>
        </div>  
        </> 
    );
}   
  
  
export default Cards;

