import React, { useEffect, useState } from "react";
import {BsClock} from 'react-icons/bs';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Col, Row, Table, ButtonToolbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import VitalSigns from "../Components/VitalSigns";
import moment from 'moment';
import list, { put, post } from "../../_helper/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

let vid;
const PatientsCard = (props) => {
  const [modalIsOpenDate, setIsOpenDate] = React.useState(false);
  const [id, setId] = useState("");
  const history = useHistory();
  const [ir, setir] = useState("");
  const [rt, setrt] = useState("");
  const [userid, setuserid] = useState("");
  
 
 
  
 
  


  return (
    <div>
          <div className="row shadow mt-3  py-1 px-3" style={{background: "linear-gradient(120deg,  #64c0ff,#0b7adb)" , borderRadius: "7px" }}>
            <div className="col-lg-2 col-md-3 col-sm-3  mt-1 text-center">
              <h5 style={{color:"#FFFFFF"}}>Name</h5>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 mt-1  text-center">
              <h5 style={{color:"#FFFFFF"}}>National ID</h5>
              </div>
              <div className="col-lg-4 col-md-3 col-sm-3  mt-1 text-center">
              <h5 style={{color:"#FFFFFF"}}>Phone</h5>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3  mt-1 text-center">
              <h5 style={{color:"#FFFFFF"}}>Address</h5>
              </div>
             
              </div>
      {props.data?.items?.map((data, index) => {
        return (
          <div className="col-md-12">
              <ToastContainer />
            {console.log(data)}
            <div className="card shadow px-1 mt-2">
            <div className="row" style={{fontWeight:"bold"}}>
            <div className="col-lg-2 col-md-3 col-sm-3 py-1  text-center">
              {data.name}
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3  py-1 text-center">
              {data.nationalID}
              </div>
              <div className="col-lg-4 col-md-3 col-sm-3  py-1 text-center">
              {data.phone}
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3 py-1  text-center">
              {data.address}
              </div>
                
                
              </div>
            </div>
          </div>
        );
      })}

      
      
    </div>
  );
};

export default PatientsCard;
