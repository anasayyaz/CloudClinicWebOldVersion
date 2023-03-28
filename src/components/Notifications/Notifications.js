import React, { useState, useEffect,useContext } from "react";
import { getToken } from "../../firebaseInit.js";
import Axios from "axios";
import list, { put, del } from "../../_helper/api";

import { BsArrowLeftRight } from "react-icons/bs";
let token=localStorage.getItem("access_token");
let userid=JSON.parse(localStorage.getItem("user"));
var roles = localStorage.getItem("roles");

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

 
  console.log("", isTokenFound);
  
  


  // To load once
  useEffect(() => {
    let data;
   

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        console.log("Token is", data);
     
      put(`accounts/updateUserFCM_Web/${userid}`, {
        FCMID_Web: data,
       FirebaseID_Web: ""
      });
      }
      return data;
    }

    tokenFunc();
   
      
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};



export default Notifications;
