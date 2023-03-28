import React, {useRef,  useState, useEffect } from "react";
import ProgressComponent from "@material-ui/core/CircularProgress";
import cryptoRandomString from "crypto-random-string";
import qs from "query-string";
import axios from "axios";
import { patch } from "../../../_helper/api";
import { store } from "../../../store";
const API_URL = process.env.REACT_APP_API_URL;

const AtHome = (props) => {


  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [roomName, setroomName] = useState(null);
 
 
 
  


  const jitsiContainerStyle = {
    display: loading ? "none" : "block",
    width: "100%",
    height: "100%",
    marginBottom: "10px",
    marginTop: "10px",
    marginLeft: "10px",
  };


  cryptoRandomString({ length: 10, type: "numeric" });

  async function startConference() {

    try {
      const domain = "meet.cloudclinic.ai";
      var id = 5;
      // linkdata = () => {
      const visitresponse = await list(
        `visit/${props.match.params.Visit}`
      );
      setroomName(visitresponse?.data.meetinglink || "");
      setNumber(visitresponse?.data.patient.phone);
      setEmail(visitresponse?.data.patient.email);

  
      
      // };
      // const roomName = "cloudclinic_" + new roomName
      const options = {
        // roomName: "cloudclinic_12345",
        roomName: visitresponse?.data.meetinglink,

        height: 750,
        parentNode: document.getElementById("jitsi-container"),
        interfaceConfigOverwrite: {
          filmStripOnly: false,
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUEST: false,
        },
        configOverwrite: {
          disableSimulcast: false,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      api.addEventListener("videoConferenceJoined", () => {
        setLoading(false);
        api.executeCommand("displayName", "Cloud Clinic");
      });
    } catch (error) {
      console.error("Failed to load Jitsi API", error);
    }
  }
  
  

  useEffect(() => {

    // verify the JitsiMeetExternalAPI constructor is added to the global..
    if (window.JitsiMeetExternalAPI)
      startConference(props.match.params.Visit);
    else alert("Jitsi Meet API script not loaded");
  }, []);



 function list(endpoint, params = {}) {

  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props.match.params.Token}`,
    },
    params: params,
  };
 
  axios.get(API_URL + endpoint, config).then((response) => {
   
// alert(response.data);
}) .catch(error => {
  //  alert( error.message);
  if(error.message=="Request failed with status code 401")
  {
    
    alert("meeting has ended");
   
  }
});

  return axios.get(API_URL + endpoint, config).then((response) => {
    
    if (response.data.results !== undefined) {
     
      response.extra_data = {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      };
      response.data = response.data.results;
    }
    
    
    return response;

  });

}
  






  return (
    
     <div className="mt-100 px-40 py-40" style={{width:'98%'}}>

                  {loading && <ProgressComponent />}
                  <div id="jitsi-container"   style={jitsiContainerStyle} />
                </div>
  
  );
};

export default AtHome;
