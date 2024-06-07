import React from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtnGroup,
  MDBCheckbox,
  MDBIcon,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem 
}
from 'mdb-react-ui-kit';

import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import "./clientcreate.css";
import { useParams } from 'react-router-dom';

const MAX_INFO_BUTTONS = 3;
const SECTION_PERSONAL_INFO = 0;
const SECTION_COMPANY_INFO = 1;
const SECTION_SERVICE_INFO = 2;
const SECTION_SUMMARY = 3;

function resetColorButtons()
{
  for(let i = 0; i < MAX_INFO_BUTTONS; i++)
  {
    let button = document.getElementById('button-client-info' +i);
    if(button){

      if(button.classList.contains('btn-success')){
        button.classList.remove('btn-success')
      }
      if(!button.classList.contains('btn-primary')){
        button.classList.add('btn-primary')
      }
    }
  }
}

function setActiveButtonColor(buttonNo)
{
  let button = document.getElementById('button-client-info' + buttonNo);
  if(button){
    if(!button.classList.contains('btn-success')){
      button.classList.add('btn-success')
    }
    if(button.classList.contains('btn-primary')){
      button.classList.remove('btn-primary')
    }
  }
}

function toggleFields(toggle)
{
  let fields = document.getElementsByTagName("input");
  for(let f of fields){
    f.disabled = toggle;
  }
}



export default function UserDetails() {

  const params = useParams();
  const id = params.userID;
  console.log(id);
  const [section, setSection] = useState(0);
  
  function handleSection(x){
    section = setSection(x);
  }

  const serviceName = ["Nessuno", "Privacy", "Antiriciclaggio", "Whistleblowing", "Customer care"];
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [fiscalcode, setFiscalCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [companyvat, setCompantVat] = useState("");
  const [companyaddress, setCompanyAddress] = useState("");
  const [companybusiness, setCompanyBusiness] = useState("");
  const [companymail, setCompanyMail] = useState("");
  const [companyphone, setCompanyPhone] = useState("");
  const [companymobile, setCompanyMobile] = useState("");
  const [service, setService] = useState("");
  const [servicestart, setServiceStart] = useState("");
  const [serviceend, setServiceEnd] = useState("");
  const [agent, setAgent] = useState("");
  const [firstyear, setFirstYear] = useState("");
  const [yearly, setYearly] = useState("");

  function clearAllFields()
  {
    setFirstname("");
    setLastname("");
    setLastname("");
    setDob("");
    setAddress("");
    setFiscalCode("");
    setEmail("");
    setPassword("");
    setCompanyName("");
    setCompantVat("");
    setCompanyAddress("");
    setCompanyBusiness("");
    setCompanyMail("");
    setCompanyPhone("");
    setCompanyMobile("");
    setService("");
    setServiceStart("");
    setServiceEnd("");
    setAgent("");
    setFirstYear("");
    setYearly("");

  }

  function handleClientCreation()
  {
    const body = {
      email: email,
      password: password,
      username: "",
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      pfp: "",
      usertype: "cliente",
      _clientID: ""  // serviceID is empty because it will be filled by the second API call's res
    }

    let newUser = null;

    async function sendClientCreationRequest()
    {
   //   try {       
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

            newUser = data;  

            // CLIENT CREATION CALL
            const clientBody = {
              _clientID: newUser._id,
              email: email,
              password: password,
              firstname: firstname,
              lastname: lastname,
              address: address,
              dob: dob,
              fiscalcode: fiscalcode,
//            phone: phone,
 //           mobile: mobile,
              pfp: "",
              companyname: companyname,
              vatnumber: companyvat,
              companyaddress: companyaddress,
              businesstype: companybusiness,
              companyphone: companyphone,
              companymobile: companymobile,
              servicetype: service,
              servicestart: servicestart,
              serviceend: serviceend,
              serviceseller: agent,
              servicefirstcost: firstyear,
              serviceyearlycost: yearly
            }
            
             console.log(newUser);
             async function sendClientCreation()
             {

              await fetch("http://localhost:3000/clients/create", {
              method: "POST",    
              headers: {  
                "Content-type": "application/json; charset=UTF-8" 
              },        
              body: JSON.stringify(clientBody)
              })
              .then(resp => {
                  return resp.json()
              })
              .then(data => {   
                console.log(data);
                clearAllFields();
              })
             }    

             sendClientCreation();     

          })
    }
    sendClientCreationRequest();
  }
    

  console.log("firstname " + firstname);
  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>   
    <MDBRow>
      <MDBCol md='1' className='text-center text-md-start d-flex flex-column justify-content-center'>
      <MDBBtn type="button" id='button-client-info0' className='info-buttons btn-primary' onClick={() => {resetColorButtons(); setActiveButtonColor(0); setSection(0);}}>DATI ANAGRAFICI</MDBBtn>
      <MDBBtn type="button" id='button-client-info1' className='info-buttons btn-primary' onClick={() => {resetColorButtons(); setActiveButtonColor(1); setSection(1);}}>DATI SOCIETARI</MDBBtn>
      <MDBBtn type="button" id='button-client-info2' className='info-buttons btn-primary' onClick={() => {resetColorButtons(); setActiveButtonColor(2); setSection(2);} }>DATI SERVIZIO</MDBBtn>
      <MDBBtn type="button" id='button-client-info2' className='info-buttons btn-primary' onClick={() => {resetColorButtons(); setActiveButtonColor(3) ;setSection(3);}}>RIEPILOGO</MDBBtn>
      </MDBCol>

      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <MDBCard className='my-5 bg-glass'>
          { 
            (section === SECTION_PERSONAL_INFO || section === SECTION_SUMMARY) && 
              <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Nome' id='form-firstname' type='text' disabled={section === SECTION_SUMMARY ? true : false} value={firstname} onChange={() => setFirstname(document.getElementById("form-firstname").value)}/>
                </MDBCol>
  
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Cognome' id='form-lastname' type='text'  disabled={section === SECTION_SUMMARY ? true : false} value={lastname}  onChange={() => setLastname(document.getElementById("form-lastname").value)}/>
                </MDBCol>
              </MDBRow>

              <MDBRow>

                <MDBCol col='5'>
                  <MDBInput wrapperClass='mb-4' label='Data di nascita' id='form-dob' type='date'  disabled={section === SECTION_SUMMARY ? true : false} value={dob} onChange={() => setDob(document.getElementById("form-dob").value)}/>                                
                </MDBCol>  
                <MDBCol col='5'>
                  <MDBInput wrapperClass='mb-4' label='Indirizzo' id='form-address' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={address} onChange={() => setAddress(document.getElementById("form-address").value)}/>
                </MDBCol> 
                 
                <MDBCol col='5'>
                  <MDBInput wrapperClass='mb-4' label='Codice fiscale' id='form-fiscalcode' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={fiscalcode} onChange={() => setFiscalCode(document.getElementById("form-fiscalcode").value)}/>
                </MDBCol> 

              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Email' id='form-email' type='email'  disabled={section === SECTION_SUMMARY ? true : false}  value={email} onChange={() => setEmail(document.getElementById("form-email").value)}/>    
              <MDBInput wrapperClass='mb-4' label='Password' id='form-pwd' type='password'  disabled={section === SECTION_SUMMARY ? true : false}  value={password} onChange={() => setPassword(document.getElementById("form-pwd").value)}/>  
              </MDBCardBody>            
          }
         
          {
              (section === SECTION_COMPANY_INFO || section === SECTION_SUMMARY)  && 

                <MDBCardBody className='p-5'>

                <MDBRow>
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Nome società' id='form-companyname' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={companyname} onChange={() => setCompanyName(document.getElementById("form-companyname").value)}/>
                  </MDBCol>
    
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Partita IVA' id='form-vatnumber' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={companyvat} onChange={() => setCompantVat(document.getElementById("form-vatnumber").value)}/>
                  </MDBCol>
                </MDBRow>

                <MDBRow>

                  <MDBCol col='5'>
                    <MDBInput wrapperClass='mb-4' label='Sede legale' id='form-companyaddress' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={companyaddress} onChange={() => setCompanyAddress(document.getElementById("form-companyaddress").value)}/>                                
                  </MDBCol>  
                  <MDBCol col='5'>
                    <MDBInput wrapperClass='mb-4' label='Tipologia di business' id='form-companybusiness' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={companybusiness} onChange={() => setCompanyBusiness(document.getElementById("form-companybusiness").value)}/>
                  </MDBCol>    

                </MDBRow>

                <MDBRow>
                  <MDBCol col='4'>
                    <MDBInput wrapperClass='mb-4' label='Email' id='form-companymail' type='email'  disabled={section === SECTION_SUMMARY ? true : false}  value={companymail} onChange={() => setCompanyMail(document.getElementById("form-companymail").value)}/>                                 
                  </MDBCol>  
                  <MDBCol col='4'>
                    <MDBInput wrapperClass='mb-4' label='Telefono' id='form-companyphone' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={companyphone} onChange={() => setCompanyPhone(document.getElementById("form-companyphone").value)}/>
                  </MDBCol>    
                  <MDBCol col='4'>
                  <MDBInput wrapperClass='mb-4' label='Cellulare' id='form-companymobile' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={companymobile} onChange={() => setCompanyMobile(document.getElementById("form-companymobile").value)}/>
                  </MDBCol>   
                </MDBRow>
                </MDBCardBody>             
          }

          {
              (section === SECTION_SERVICE_INFO || section === SECTION_SUMMARY)  && 
                <MDBCardBody className='p-5'>

                <MDBRow>
                  <MDBCol col='6'>
                  <MDBDropdown>
                    <MDBDropdownToggle  disabled={section === SECTION_SUMMARY ? true : false}>  Servizio: {serviceName[service]}</MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem link onClick={() => {setService(0)}}>Nessuno</MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => {setService(1)}}>Privacy</MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => {setService(2)}}>Antiriciclaggio</MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => {setService(3)}}>Whistleblowing</MDBDropdownItem>
                      <MDBDropdownItem link onClick={() => {setService(4)}}>Customer care</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                  </MDBCol>
    
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Data inizio contratto' id='form-servicestart' type='date'  disabled={section === SECTION_SUMMARY ? true : false}  value={servicestart} onChange={() => setServiceStart(document.getElementById("form-servicestart").value)}/>
                  </MDBCol>
                  <MDBCol col='6'>
                    <MDBInput wrapperClass='mb-4' label='Data fine contratto' id='form-serviceend' type='date'  disabled={section === SECTION_SUMMARY ? true : false}  value={serviceend} onChange={() => setServiceEnd(document.getElementById("form-serviceend").value)}/>
                  </MDBCol>
                </MDBRow>

                <MDBRow>

                  <MDBCol col='4'>
                    <MDBInput wrapperClass='mb-4' label='Agente' id='form-serviceseller' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={agent} onChange={() => setAgent(document.getElementById("form-serviceseller").value)}/>                                
                  </MDBCol>  
                  <MDBCol col='4'>
                    <MDBInput wrapperClass='mb-4' label='Costo primo anno' id='form-servicefirstcost' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={firstyear} onChange={() => setFirstYear(document.getElementById("form-servicefirstcost").value)}/>
                  </MDBCol>    
                  <MDBCol col='4'>
                    <MDBInput wrapperClass='mb-4' label='Costo annuale' id='form-serviceyearlycost' type='text'  disabled={section === SECTION_SUMMARY ? true : false}  value={yearly} onChange={() => setYearly(document.getElementById("form-serviceyearlycost").value)}/>
                  </MDBCol>   
                </MDBRow>       
                </MDBCardBody>             
          }

          {
              section === SECTION_SUMMARY && 

              <MDBBtn className='w-100 mb-4' size='md' onClick={handleClientCreation}>Create user</MDBBtn>
          }
        </MDBCard>

      </MDBCol>

    </MDBRow>

  </MDBContainer>
  )
}
