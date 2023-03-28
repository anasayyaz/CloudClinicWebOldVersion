import React, { useEffect, useState } from "react";
import {BsClock} from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import VitalSigns from "../Components/VitalSigns";
import moment from 'moment';
import DummyImage from '../../assets/images/dummyimage.jpg';
import { ToastContainer, toast } from "react-toastify";
import {
  FormControlLabel, Switch
} from '@material-ui/core';
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const RescheduleList = (props) => {

    const history = useHistory();

    useEffect(() => {

    
      }, []);
    
      function create()
      {
        // setTimeout(() => {
        //     history.push({
        //       pathname: `/appointments/Appointments/1121`,
        //     });
        //   }, 500);
      }
      
return(
   
    <div> 
         <div className="col-md-12">
            <div className="row cc-bg-img mt-1 mb-0 py-2 px-2  mr-4 ml-0 text-white rounded shadow">
            
               
                <div className="col-md-3   text-white text-center">
                <h5>Patient Name</h5>
                </div>
                <div className="col-md-5 border-left text-white text-center">
                <h5>Visit Reason</h5>
                </div>
                <div className="col-md-3 border-left  text-white text-center">
                <h5>Start Time</h5>
                </div>
                <div className="col-md-1 border-left  text-white text-center">
                <h5></h5>
                </div>
                </div>
          
                </div>
    
            {props.data?.map((data, index) => {
        return(
            <div className="col-md-12 mt-1">
            <div className="card shadow px-3 mt-1 mb-0 ml-0 mr-4">
            <div className="row">
        
                
                <div className="col-md-3  my-1 text-dark text-center">
                <h4>{data.patientFirstName}{" "}{data.patientLastName}</h4>
                </div>
                <div className="col-md-5 border-left  my-1 text-dark text-center">
                <h4>{data.title}</h4>
                </div>
                <div className="col-md-3 border-left my-1 text-dark text-center">
                <h4>
                {days[(new Date(data.startDateTime)).getDay()]}{" "}{month[(new Date(data.startDateTime)).getMonth()]}{" "}{data?.startDateTime?.split("-")[2]?.split("T")[0]}{", "}{new Date(data.startDateTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}   </h4> 
                </div>
                <div className="col-md-1 border-left my-1 text-dark text-center">
<div onClick={create} className="btn cc-btn rounded">
Create
    </div>
                    </div>
                </div>
                </div>
                </div>
    );
    })}
    </div>
)
};
export default RescheduleList;