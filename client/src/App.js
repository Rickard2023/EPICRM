import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  UseNavigate,
} from "react-router-dom";
import Sidebar from './components/Sidebar';
import UserCreate from './components/UserCreate';
import ClientCreate from './components/ClientCreate';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import AlertDetails from './components/AlertDetails';
import { createContext } from 'react';

export const context = createContext(
  {
    "theme": "dark",
    "userID": "",
    "firstname": "",
    "lastname": ""
  }
);

// creare un context per il token da cui prendere il valore del token. Valore iniziale è quello del local storage, e poi alla login fare il setState del token al valore attuale
function App() {


  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  if(id != "" && id != undefined && id != null){

    async function getUser()
    {
      const user = await fetch("http://localhost:3000/users/"+id)
      const userInfo = await user.json();
      console.log(userInfo);
      context.firstname = userInfo.firstname;
      context.lastname = userInfo.lastname;
      context.isAdmin = userInfo.usertype == "admin" ? true : false;
    }
    getUser();
  }


  context.userID = id;
  context.theme = "dark";
  context.unassignedAlerts = 0;

  return (
    <>
    <context.Provider>
      <Router>
          <Routes>
          <Route
            path="/"
            element={token === null ? <Login/> : <><Home/></>}
           />   

 
           <Route
            path="/user-create"
            element={<UserCreate/>}
           />         

            <Route
            path="/client-create"
            element={<ClientCreate/>}
           />    

             <Route
            path="/user-list"
            element={<UserList/>}
           />    
            <Route          
            path="/user-edit/:clientID"
            element={<UserDetails/>}
           />  
            <Route          
            path="/alert-details/:alertID"
            element={<AlertDetails/>}
           />   
        </Routes>
      </Router>
    </context.Provider>
    </>
    
  );
}

export default App;
