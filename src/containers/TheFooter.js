import React from 'react'
import { CFooter } from '@coreui/react';
import Logo from "../assets/images/logo.png";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      {/* <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a>
        <span className="ml-1">&copy; 2020 creativeLabs.</span>
      </div> */}
      <div className="mfs-auto">
      {/* <span className="ml-1">Powered by Cloud Clinic</span> */}
      {/* <img
          className="cc_logo"
          src={Logo}
          alt="Dashboard"
        /> */}
        <span className="mr-1 text-dark font-weight-bold">Powered by</span>
      
        <a   href="https://cloudclinic.ai/" src="https://cloudclinicdevapi.azurewebsites.net/images/CloudClinicLogo.png" target="_blank" rel="noopener noreferrer" style={{borderRadius: "7px"}}  >  <img
      style={{width:"100px", height:"45px"}}
                      src="https://cloudclinicdevapi.azurewebsites.net/images/CloudClinicLogo.png"
                      alt="Cloud Clinic Logo"
                      href="https://cloudclinic.ai/"
                      target="_blank"
         /></a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
