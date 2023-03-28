import React, {useRef,  useState, useEffect } from "react";
import ProgressComponent from "@material-ui/core/CircularProgress";
import list, { put, post } from "../../_helper/api";
import "./styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./App.css";
import {Person} from '@material-ui/icons';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from '@material-ui/core/TextField';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
 import createSpeechlySpeechRecognition from './createSpeechRecognition.js';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import CanvasJSReact from "../physicians/canvasjs.react";
import ConsultantPrescriptionData from "../Components/ConsultantPrescriptionData";
import PrescriptionData from "../Components/PrescriptionData";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import PrescriptionPrint from "../Components/PrescriptionPrint";
import "../style/ccstyle.css";
import "./EditVitalSign.css";
import { NavLink } from "react-router-dom";
import { Button, Col, Row, Table, ButtonToolbar } from "react-bootstrap";
import "moment-timezone";
import cryptoRandomString from "crypto-random-string";
import qs from "query-string";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import VitalSigns from "../Components/VitalSigns";
import IntakeHistory from "./IntakeHistory";
import ModalCarousel from "../Components/ModalCarousel";
const appId = '275ea0a1-e8e1-4df0-bfd1-8b84d53989ca';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

var name, pid, pname, cname, cspeciality, p, a, age,vid;
const InPersonMeeting = (props) => {
  // const commands = [
   
  //   {
  //     command: ['*'],
  //     callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
  //     matchInterim: true
  //   }
  // ]

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const Specialities= [
    { Speciality: 'Family Physician' },
    { Speciality: 'Surgeon' },
    { Speciality: 'Cardiologist' },
    { Speciality: 'Psychiatrist' },
    { Speciality: 'Gynecologist' },
    { Speciality: 'Pathologist' },
    { Speciality: 'Urologist' },
    { Speciality: 'Dermatologist' },
    { Speciality: 'Radiologist' },
     { Speciality: 'Urologist' },
    { Speciality: 'Neurologist' },
    { Speciality: 'Pediatrician' },
    { Speciality: 'Gynecologist' },
    ];
  // const [message, setMessage] = useState('')
  const[transition1,setTransition1]=useState(true);
  const[transition2,setTransition2]=useState(false);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState(null);
  const [assessment, setassessment] = useState(null);
  const [collapse, setCollapse] = useState(false);
  const [assessmentcollapse, setassessmentcollapse] = useState(false);
  const [roomName, setroomName] = useState(null);
  const [selectedFile, setselectedFile] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenVS, setIsOpenVS] = React.useState(false);
  const [modalIsOpenP, setIsOpenP] = React.useState(false);
  const[consultantPopup,setConsultantPopup]=useState(false);
  const [modalIsOpenA, setIsOpenA] = React.useState(false);
  const [modalIsOpenR, setIsOpenR] = React.useState(false);
  const [remarks, setRemarks] = React.useState(false);
  const [images, setImages] = React.useState(null);
  const[P,setP]=useState(false);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [modalIsOpenAssessment, setIsOpenAssessment] = React.useState(false);
  const [modalIsOpenVitalSign, setIsOpenVitalSign] = React.useState(false);
  const [modalIsOpenIntakeHistory, setIsOpenIntakeHistory] = React.useState(
    false
  );
  const [modalIsOpenPPrint, setIsOpenPPrint] = React.useState(false);
  const [modalIsOpenPrescription, setIsOpenPrescription] = React.useState(
    false
  );
  const [modalIsOpenPrescriptionTable, setIsOpenPrescriptionTable] = React.useState(
    false
  );
  const [choice, setChoice] = useState(true);
  const [audioInput, setAudioInput] = useState(false);
  const [textInput, setTextInput] = useState(false);
  const[modalChoice,setIsOpenModalChoice]=useState(false);

  const [showH, setShowH] = useState(false);
  const [Role, setRole] = useState(true);
  const [modalIsOpenDate, setIsOpenDate] = React.useState(false);
  const [modalIsOpenFile, setIsOpenFile] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [Cdata, setCdata] = useState([]);
  const [Intakedata, setIntakedata] = useState([]);
  const [showECG, setShowECG] = React.useState(false);
  const [showALL, setShowALL] = React.useState(true);
  const [showFSD, setFSD] = React.useState(true);
  const [showVSECG, setShowVSECG] = React.useState(false);
  const [showVSALL, setShowVSALL] = React.useState(true);
  const [ecgFullscreen, setEcgFullscreen] = React.useState(false);
  const [modalIsOpenEcgGraph, setIsOpenEcgGraph] = React.useState(false);

  const setVisitID = qs.parse(props.location.search)?.VisitID;

  const [data, setData] = React.useState({
    initialComplain: "",
    prescription: "",
    notes: "",
    referredTo: "",
    consultantName: "",
    startDateTime: "",
    isConsultantRequired: "",
    isfollowup: "",
    followupdatetime: "",
    DateTime: "",
  });
  const [patientData, setPatientData] = React.useState({
    nationalID: "",
    name: "",
    dob: "",
    address: "",
    phone: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
    isDeleted: "",
    isAppointmentSchedule: "",
    isActive: "",
  });
  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition
  // } = useSpeechRecognition();
  // const startListening = () => SpeechRecognition.startListening({ continuous: true });
  
  var roles = localStorage.getItem("roles");

  const startListening = () => {
    
    setTransition1(false);
    setTransition2(true);
    setIsListening(true);
    SpeechRecognition.startListening({ language: 'en-US', continuous: true });
};

const stopListening = () => {
  data.initialComplain=transcript;
  setTransition2(false);
  setTransition1(true);
  SpeechRecognition.stopListening();

};
  const handleListening = () => {
    setTransition1(false);
    setTransition2(true);
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      language: 'en-US',
      continuous: true,
    });
manageAudio();
  };

  const stopHandle = () => {

    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    data.initialComplain=transcript;
    setTransition2(false);
    setTransition1(true);
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  function set(v)
{

data.referredTo=v;
}


  function getUploadedFiles() {
    list(
      `LabTest/visitsLabtests/${qs.parse(props.location.search)?.VisitID}`
    ).then((response) => {
      setImages(response.data);
    }).catch((error) => {

      toast.error("No Record Found");
              
            });;
  }




  function printt()
  {
    setIsOpenPPrint(true);
    setP(JSON.parse(localStorage.getItem('PrescriptionPrint')));
    console.log(P);
    setTimeout(() => {
  
      window.print();
      setIsOpenPPrint(false);
    // handlePrint();
  }, 1000);
  
  }

  function reload() {
    window.location.reload();
  }




  const jitsiContainerStyle = {
    display: loading ? "none" : "block",
    width: "100%",
    height: "100%",
    marginBottom: "10px",
    marginTop: "10px",
    marginLeft: "10px",
  };

  cryptoRandomString({ length: 10, type: "numeric" });

//   async function startConference() {

//     try {
//       const domain = "meet.cloudclinic.ai";
//       var id = 5;
//       // linkdata = () => {
//       const visitresponse = await list(
//         `visit/${qs.parse(props.location.search)?.VisitID}`
//       );
//       setroomName(visitresponse?.data.meetinglink || "");
//       setNumber(visitresponse?.data.patient.phone);
//       setEmail(visitresponse?.data.patient.email);
//       // };
//       // const roomName = "cloudclinic_" + new roomName
//       const options = {
//         // roomName: "cloudclinic_12345",
//         roomName: visitresponse?.data.meetinglink,

//         height: 450,
//         parentNode: document.getElementById("jitsi-container"),
//         interfaceConfigOverwrite: {
//           filmStripOnly: false,
//           SHOW_JITSI_WATERMARK: false,
//           SHOW_WATERMARK_FOR_GUEST: false,
//         },
//         configOverwrite: {
//           disableSimulcast: false,
//         },
//       };

//       const api = new window.JitsiMeetExternalAPI(domain, options);
//       api.addEventListener("videoConferenceJoined", () => {
//         setLoading(false);
//         api.executeCommand("displayName", "Cloud Clinic");
//       });
//     } catch (error) {
//       console.error("Failed to load Jitsi API", error);
//     }
//   }
  const consultant = qs.parse(props.location.search)?.VisitID;
  useEffect(() => {


    if (roles == "Nurse") {
      setRole(false);
    }
    const visitResponse = list(
      `visit/getVisit/${qs.parse(props.location.search)?.VisitID}`
    ).then((response) => {
      if (typeof response.data == typeof "abc") {
      } else {
        setData(response.data);
      }

      calculateAge(response.data[0].dob);

      pid = response.data[0].patient_NationalID;
      pname = response.data[0].patient;
      cname = response.data[0].consultant;
      cspeciality = response.data[0].doctorSpeciality;
    });

    setContent(visitResponse?.data?.summaryNotes || "");
    setassessment(visitResponse?.data?.prescription || "");


   
    fetchPatient();
    fetchVisit();

    list(
      `vitalsign/getPatientVitalSignbyVisit/${
        qs.parse(props.location.search)?.VisitID
      }`
    ).then((response) => {
      setCdata(response.data);
      // if (response.data.ma == 0) {
      //   setShowH(true);
      // } else {
      //   setShowS(true);
      // }
    });

    getUploadedFiles();

    console.log("THIS IS THE INNER WIDTH");
    console.log(window.innerWidth);
  }, []);
  function calculateAge(dob1) {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    age = age_now;
  }
  async function fetchPatient() {
    list(`visit/getVisit/${qs.parse(props.location.search)?.VisitID}`).then(
      (response) => {
        setPatientData(response.data);
      }
    );
  }
  async function fetchVisit() {

    const visitResponse = list(
      `visit/${qs.parse(props.location.search)?.VisitID}`
    ).then((response) => {
      setData(response.data);
    });
    setContent(visitResponse?.data?.summaryNotes || "");
    setassessment(visitResponse?.data?.prescription || "");
  }

  //Handle Click
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();

    alert("File Clicked");
  };
  //Handle On Change
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  //Content
  const updateContent = (newContent) => {
    setContent(newContent);
  };
  //Update
  const handleUpdate = () => {

    
if(transition2)
{

  data.initialComplain=transcript;

}
else{
 
}
 
    put(`visit/updateVisit/${qs.parse(props.location.search)?.VisitID}`, {
      prescription: data.prescription,
      notes: data.notes,
      initialComplain: data.initialComplain,
      isConsultantRequired: data.isConsultantRequired,
      referredTo: data.referredTo,
      followupdatetime: data.followupdatetime,
      isfollowup: data.isfollowup,
      isActive: data.isActive,
    }).then((response) => {
      setIsOpenPrescription(false);
      setIsOpenAssessment(false);

      setIsOpenDate(false);
    });


  };

  const handleEnd = () => {

    if (data.isfollowup) {


      put(`visit/updateVisit/${qs.parse(props.location.search)?.VisitID}`, {
        isConsultantRequired: false,
        referredTo: cname,
        followupdatetime: data.followupdatetime,
        isfollowup: data.isfollowup,
        isConsultantappointmentSchedule: true,
        prescription: data.prescription,
        notes: data.notes,
        initialComplain: data.initialComplain,
        isActive: false,
        status: 8,
      }).then((response) => {
        put(`visit/updatePatientTags/${pid}`, {
          IsAppointmentSchedule: false,
          followupdatetime: data.followupdatetime,
          isfollowup: data.isfollowup,
          isConsultantappointmentSchedule: true,
          IsAppointmentSchedule: false,
        });
      });
    }


    else if (data.isConsultantRequired) {


      put(`visit/updateVisit/${qs.parse(props.location.search)?.VisitID}`, {
        isConsultantRequired: true,
        followupdatetime: null,
        isfollowup: false,
        referredTo: data.referredTo,
        isconsultantappointmentSchedule: true,
        prescription: data.prescription,
        notes: data.notes,
        initialComplain: data.initialComplain,
        isActive: false,
        status: 6,
      }).then((response) => {
        put(`visit/updatePatientTags/${pid}`, {
          followupdatetime: null,
          isfollowup: false,
          IsAppointmentSchedule: false,
          isConsultantappointmentSchedule: true,
          IsAppointmentSchedule: false,
        });
      });
    } else {

      put(`visit/updateVisit/${qs.parse(props.location.search)?.VisitID}`, {
        isConsultantRequired: false,
        followupdatetime: null,
        isfollowup: false,
        referredTo: null,
        isconsultantappointmentSchedule: false,
        prescription: data.prescription,
        notes: data.notes,
        initialComplain: data.initialComplain,
        isActive: false,
        status: null,
      }).then((response) => {
        put(`visit/updatePatientTags/${pid}`, {
          followupdatetime: null,
          isfollowup: false,
          IsAppointmentSchedule: false,
          isConsultantappointmentSchedule: false,
          IsAppointmentSchedule: false,
        });
      });
    }

 
  };
  function getVitals(val) {
  vid=val;
  setIsOpenVitalSign(true);
  }

  function getP(val) {
    p = val;
  }
  function getA(val) {
    a = val;
  }
  function getIntake(val) {

    vid=val;
  }
function manageAudio()
{
  SpeechRecognition.startListening();
setTransition1(false);
setTransition2(true);
}
  function sendEmailP() {
    let id = qs.parse(props.location.search)?.VisitID;

    data["tag"] = "Prescription";
    data["visitid"] = id;
    post(`visit/sendEmailToPatient`, data);
    toast.info("Prescription sent to " + email + " by Email");
  }
  function sendEmailA() {
    let id = qs.parse(props.location.search)?.VisitID;
    data["tag"] = "Asssessment";
    data["visitid"] = id;
    post(`visit/sendEmailToPatient`, data);
    toast.info("Assessment sent to " + email + " by Email");
  }
  function sendSMSA() {

    let id = qs.parse(props.location.search)?.VisitID;
    data["tag"] = "Asssessment";
    data["visitid"] = id;
    post(`visit/sendSMSToPatient`, "hello" + data);
    toast.info("Assessment sent to " + number + " by SMS");
  }
  function sendSMSP() {
    let id = qs.parse(props.location.search)?.VisitID;
    data["tag"] = "Prescription";
    data["visitid"] = id;
    post(`visit/sendSMSToPatient`, "hello" + data);
    toast.info("Prescription sent to " + number + " by SMS");
  }

  function print() {
    window.print();
  }
  function getData() {
    list(`visit/getpatientPreviousVisits/${pid}`).then((response) => {
      let data = [];
      response.data.map((row) => {
        data.push(
          createData(
            row.id,
            row.patient_NationalID,
            row.title,
            row.prescription,
            row.initialComplain,
            row.referredTo,
            row.consultantName,
            row.startDateTime,
            row.notes
          )
        );
      });
      setRows(data);
    });
  }
  function createData(
    id,
    patient_id,
    title,
    prescription,
    initial_complain,
    refered_to,
    consultant_name,
    start_date,
    notes
  ) {
    return {
      id,
      patient_id,
      title,
      prescription,
      initial_complain,
      refered_to,
      consultant_name,
      start_date,
      notes,
    };
  }
  function openTab() {
    window.open(
      "https://med-samples.github.io/HeartBeatSystem/doctorRoom101.html"
    );
  }
  function dataChange(event) {


    
    let [key, value, newData] = [
      event.target.name,
      event.target.value,
      { ...data },
    ];
   
    if (key == "isConsultantRequired") {
      newData["isConsultantRequired"] =
        newData["isConsultantRequired"] == false ? true : false;
        newData["isConsultantRequired"] == false ? setConsultantPopup(false) : setConsultantPopup(true);
      setData(newData);
     
    } else if (key == "isfollowup") {
      newData["isfollowup"] = newData["isfollowup"] == false ? true : false;
      setData(newData);
     
    } else {
    
      newData[key] = value;
    }

    setData(newData);
  }
  //File Change Handler
  const fileChangedHandler = (event) => {
    setselectedFile({
      file: event.target.files[0],
    });
  };
  //Upload Handler

  const uploadHandler = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
  };
  let addModalClose = () => this.setState({ addModalShow: false });
  return (
    <div className="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
      <ToastContainer />
      <Dialog
        open={consultantPopup}
        onClose={() => {
          setConsultantPopup(false)
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"

          >
            {"Consultation Needed"}
            <Button
            color="secondary"
            onClick={() => {
              data.isConsultantRequired=false;
              setConsultantPopup(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>
          <div style={{ width: '30vw' }}>
          <DialogContent>
          <Autocomplete
      id="combo-box-demo"
      options={Specialities}
      getOptionLabel={(option) => option.Speciality}
      style={{ width: '28vw' }}
      onChange={(event, selected) => {
        set(selected?.Speciality || null);
      }}
      renderInput={(params) => <TextField {...params} label="Speciality" variant="outlined" />}
    />
          {/* <div>
                  <select
                    className="form-control font-weight-bold"
                    value={data.referredTo}
                    id="typeofconsultation"
                    name="referredTo"
                    onChange={(e) => dataChange(e)}
                  >
                    <option value="FAMILY PHYSICIAN">FAMILY PHYSICIAN</option>
                    <option value="CARDIOLOGIST">CARDIOLOGIST</option>
                    <option value="PEDIATRICIAN">PEDIATRICIAN</option>
                    <option value="PSYCHIATRIST">PSYCHIATRIST</option>
                    <option value="GYNECOLOGIST">GYNECOLOGIST</option>
                    <option value="SURGEON">SURGEON</option>
                    <option value="PATHOLOGIST">PATHOLOGIST</option>
                    <option value="NEUROLOGIST">NEUROLOGIST</option>
                    <option value="UROLOGIST">UROLOGIST</option>
                    <option value="DERMATOLOGIST">DERMATOLOGIST</option>
                    <option value="RADIOLOGIST">RADIOLOGIST</option>
                  </select>
                </div>
          */}
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}>
            <Button
                 className="btn cc-btn"
                onClick={() => {
                 setConsultantPopup(false);
                }}
              >
                Update
              </Button>
            </div>
          </DialogActions>
       </div>
      </Dialog>
<Dialog
        open={modalIsOpenPPrint}
        onClose={() => {
          setIsOpenPrescription(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="true"
      >

       

          <DialogContent>
          
              
                <div style={{width:"95vw"}}>
                  <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">
                    <img
                      src="https://cloudclinicdevapi.azurewebsites.net/images/CloudClinicLogo.png"
                      alt="Cloud Clinic Logo"
                      className="cc_logo"
                    />
                    <div className="text-right">
          <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-2">
            <p className="pb-2 pr-2 m-0 cc-form-label">Dr.{" "}{cname}</p>
          </div>
        </div>
                    
                  </div>
                  <div className="form-group px-3">
                  <PrescriptionPrint P={P}/>
             
                  </div>
                </div>
           
         
          </DialogContent>
       

      </Dialog>
      <Dialog
        open={modalIsOpenP}
        onClose={() => {
          setIsOpenP(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"
          >
            {"Prescription"}
            <Button
            color="secondary"
            onClick={() => {
              setIsOpenP(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>
          <DialogContent>
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">
                    <img
                      src="https://cloudclinicdevapi.azurewebsites.net/images/CloudClinicLogo.png"
                      alt="Cloud Clinic Logo"
                      className="cc_logo"
                    />
                    <div className="text-right">
                      <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-4"></div>
                    </div>
                  </div>
                  <div className="form-group px-3">
                    <textarea
                      className="form-control border-0"
                      rows={5}
                      name="prescription"
                      value={p}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}>
              <Button
                className="btn cc-btn"
                onClick={() => {
                  setIsOpenP(false);
                }}
              >
                Close
              </Button>
            </div>
          </DialogActions>

      </Dialog>
      <Dialog
        open={modalIsOpenR}
        onClose={() => {
          setIsOpenR(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <div style={{ width: 700 }}>
          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"
          >
            {"Remarks"}
            <Button
            color="secondary"
            onClick={() => {
              setIsOpenR(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>
          <DialogContent>

            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">
                    <img
                      src="https://cloudclinicdevapi.azurewebsites.net/images/CloudClinicLogo.png"
                      alt="Cloud Clinic Logo"
                      className="cc_logo"
                    />
                    <div className="text-right">
                      <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-4"></div>
                    </div>
                  </div>
                  <div className="form-group px-3">
                    <textarea
                      className="form-control border-0"
                      rows={5}
                      name="notes"
                      value={data.notes}
                      onChange={(e) => dataChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}>
              <Button
                className="btn cc-btn"
                onClick={() => {
                  setIsOpenR(false);
                  handleUpdate();
                }}
              >
                Save
              </Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
open={modalIsOpenAssessment}
onClose={() => {
  setIsOpenAssessment(false);
}}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
maxWidth="false"
>

  <DialogTitle
    style={{ marginTop: "0px", color: "white", background: "#007bff" }}
    id="alert-dialog-title"
  >
    {"Diagnosis & Plan"}
    <Button
    color="secondary"
    onClick={() => {
      setIsOpenAssessment(false);
    }}
    style={{
      float: "right",
      background: "transparent",
      borderColor: "transparent",
      fontSize: "larger",
    }}
  >
    X
  </Button>
  </DialogTitle>
  <div style={{ width: '90vw' }}>
  <DialogContent>
    <div className="modal-body pb-3 cc-bg-light-grey">
      <div className="card shadow">
        <div className="col-md-12">
          <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">
            <img
              src="https://cloudclinicdevapi.azurewebsites.net/images/CloudClinicLogo.png"
              alt="Cloud Clinic Logo"
              className="cc_logo"
            />          
            <div className="text-right">
              <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-4">
                <p className="pb-2 pr-2 m-0 cc-form-label">Dr.</p>
                <h5 className="pt-2 cc-form-input">{cname}</h5>
              </div>
            </div>
          </div>
          <div className="form-group px-3">
          {transition1 ? (       
            <textarea
            
              className="form-control border-0"
              rows={5}
              name="initialComplain"
              placeholder="Enter Text Here"
              value={data.initialComplain}
              onChange={(e) => dataChange(e)}
            />
            ) : null}
                      {transition2 ? (  
<textarea
className="form-control border-0"
rows={5}
name="transcript"
value={transcript}

            /> 
             ) : null}


          </div>
        </div>
      </div>
    </div>
  </DialogContent>
  </div>
  <DialogActions>
    <div className="modal-footer" style={{ width: "100%" }}>
    {/* <div className="microphone-wrapper">
<div className="mircophone-container">
<div
  className="microphone-icon-container"
  ref={microphoneRef}
  onClick={handleListing}
>
  <img src="avatars/mic.png" className="microphone-icon" />
  {isListening ? "Recording........." : "Click microphone to record assessment"}
</div>


</div>
{isListening && (
  <Button    className="btn cc-btn" onClick={stopHandle}>
  Stop
  </Button>
)}
{transcript && (



  <Button    className="btn cc-btn" onClick={handleReset}>
   Reset
  </Button>

)}
</div> */}
  <button
    className="btn cc-btn"
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={stopListening}
        onMouseUp={stopListening}
      >𝙃𝙤𝙡𝙙 𝙏𝙤 𝙎𝙥𝙚𝙖𝙠</button>
      <Button
        className="btn cc-btn"
        onClick={() => {
          print();
        }}
      > {" "}
        <img
          src="avatars/printer.png"
          style={{ width: "20px", height: "20px" }}
        />
      </Button>
      <Button
         className="btn cc-btn"
        onClick={() => {
          sendEmailA();
        }}
      >
        {" "}
        <img
          src="avatars/email.png"
          style={{ width: "20px", height: "20px" }}
        />
      </Button>
      <Button
         className="btn cc-btn"
        onClick={() => {
          sendSMSA();
        }}
      >
        {" "}
        <img
          src="avatars/sms.png"
          style={{ width: "20px", height: "20px" }}
        />
      </Button>
      <Button
         className="btn cc-btn"
        onClick={() => {
          setIsOpenAssessment(false);
        }}
      >
        Cancel
      </Button>
      <Button
        className="btn cc-btn"
        onClick={() => {
          handleUpdate();
        }}
      >
        Update
      </Button>
    </div>
  </DialogActions>

</Dialog>

      <Dialog
        open={modalIsOpenA}
        onClose={() => {
          setIsOpenA(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"
          >
            {"Diagnosis & Plan"}
          </DialogTitle>
          <div style={{ width: '90vw' }}>
          <DialogContent>
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">
                    <img
                      src="https://cloudclinicdevapi.azurewebsites.net/images/CloudClinicLogo.png"
                      alt="Cloud Clinic Logo"
                      className="cc_logo"
                    />
                    <div className="text-right">
                      <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-4"></div>
                    </div>
                  </div>
                  <div className="form-group px-3">
                    <textarea
                      className="form-control border-0"
                      rows={5}
                      name="assessment"
                      value={a}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          </div>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}>
              <Button
                className="btn cc-btn"
                onClick={() => {
                  setIsOpenA(false);
                }}
              >
                Close
              </Button>

            </div>
          </DialogActions>

      </Dialog>

      <div className="row w-100 d-flex justify-content-between m-0">
        <div className="d-flex align-items-center">
          <p className="m-0 cc-page-title text-uppercase pl-2">
            Virtual Clinic
          </p>
        </div>
      </div>
      <div className="card bg-white mt-3 py-3 px-4 shadow">
        <div className="col-md-12">
          <div className="row">
            <div className={`ecg_fulscreen ${ecgFullscreen && "active"}`}>
              <div className="row px-3 align-items-center justify-content-between pb-2">
                <div className="pb-1">
                  <h5 className="m-0">Patient Vital Signs</h5>
                </div>
                <div className="d-flex align-items-center">
                <img   className="btn cc-btn ml-2  " onClick={reload}

                                            src="avatars/refresh.png"   />


                  {ecgFullscreen? (
                 <img   className="btn cc-btn ml-2  " onClick={() => setEcgFullscreen((prevMode) => !prevMode)}

                                       src="avatars/expand.png"   />
                                         ) : null}

                          {!ecgFullscreen? (
                 <img   className="btn cc-btn ml-2  " onClick={() => setEcgFullscreen((prevMode) => !prevMode)}

                                       src="avatars/contract.png"   />
                                         ) : null}
                </div>
              </div>
              <VitalSigns consultant={consultant} age={age} showAge="true" />
            </div>
            <div className="outer-jitsi">
              <div className="row px-3 meeting-detail-btns">
                <div className="col-md-4 pr-md-0">
                  <button
                    onClick={() => {
                      getData();
                      setModelOpen(true);
                    }}
                    class="btn cc-btn"
                  >
                    <span className="material-icons md-18"> history </span>
                    <p className="m-0 pl-2">Previous History</p>
                  </button>
                </div>
                <div className="col-md-4 pr-md-0">
                  <button
                    class="btn cc-btn"
                    onClick={() => {
                      getIntake(consultant);
                      setIsOpenIntakeHistory(true);
                    }}
                  >
                    <span class="material-icons"> description </span>
                    <p className="m-0 pl-2">Intake History</p>
                  </button>
                </div>
                <div className="col-md-4 pr-md-0">
                  <button
                    onClick={() => {
                      setIsOpenFile(true);
                    }}
                    class="btn cc-btn"
                  >
                    <span className="material-icons"> collections </span>
                    <p className="text-left m-0 pl-2">Imaging / Lab Reports</p>
                  </button>
                </div>
              </div>
              <div
                className={`w-100 ecg_fulscreen_jitsi ${ecgFullscreen && "active"}`}
              >
                {/* <div className="row m-0" style={{ width: "100%" }}>
                  {loading && <ProgressComponent />}
                  <div id="jitsi-container" style={jitsiContainerStyle} />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="row my-3 mx-1">
          <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-4">
            <p className="pb-2 pr-2 m-0 cc-form-label"><a><FingerprintIcon /></a>Patient ID:</p>
            <h5 className="pt-2 cc-form-input">{pid}</h5>
          </div>
          <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-4">
            <p className="pb-2 pr-2 m-0 cc-form-label"><a><Person /></a>Patient Name:</p>
            <h5 className="pt-2 cc-form-input">{pname}</h5>
          </div>
        </div>
        {Role ? (
         <>
        <div className="row px-2 mt-1">
          <div className="col-md-2 px-1 ">
            <h5
              style={{
                textAlign: "left",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              <FormControlLabel
               class="w-100 border-0 shadow btn btn-sm cc-btn font-weight-bold"
                control={
                  <Switch
                    checked={data.isConsultantRequired ? true : false}
                    onChange={(e) => dataChange(e)}
                    name="isConsultantRequired"
                    color="primary"
                  />
                }
                label="Consultation Needed"
              />
              {data.isConsultantRequired ? (
                <div>
                  <select
                    className="form-control font-weight-bold"
                    value={data.referredTo}
                    id="typeofconsultation"
                    name="referredTo"
                    onChange={(e) => dataChange(e)}
                  >
                    {/* <option value="FAMILY PHYSICIAN">FAMILY PHYSICIAN</option>
                    <option value="CARDIOLOGIST">CARDIOLOGIST</option>
                    <option value="PEDIATRICIAN">PEDIATRICIAN</option>
                    <option value="PSYCHIATRIST">PSYCHIATRIST</option>
                    <option value="GYNECOLOGIST">GYNECOLOGIST</option>
                    <option value="SURGEON">SURGEON</option>
                    <option value="PATHOLOGIST">PATHOLOGIST</option>
                    <option value="NEUROLOGIST">NEUROLOGIST</option>
                    <option value="UROLOGIST">UROLOGIST</option>
                    <option value="DERMATOLOGIST">DERMATOLOGIST</option>
                    <option value="RADIOLOGIST">RADIOLOGIST</option> */}
                  </select>
                </div>
              ) : null}
            </h5>
          </div>
          <div className="col-md-2 px-1">
            <FormControlLabel
             class="w-100 border-0 shadow btn btn-sm  cc-btn font-weight-bold"
              control={
                <Switch
                  checked={data.isfollowup ? true : false}
                  onChange={(e) => dataChange(e)}
                  name="isfollowup"
                  color="primary"
                  onClick={() => {
                    setIsOpenDate(true);
                  }}
                />
              }
              label="Follow up Needed"
            />
          </div>
          <div className="col-md-2 px-1">

          </div>
          <div className="col-md-2 px-1 mt-1">
            <button
              class="w-100 border-0 shadow btn btn-primary cc-btn"
              onClick={() => {
                setIsOpenPrescription(true);
              }}
            >
              Prescription
            </button>
          </div>
          <div className="col-md-2 px-1 mt-1">
            <button
              class="w-100 border-0 shadow btn btn-primary cc-btn"
              onClick={() => {
                setTransition1(true);
                setTransition2(false);
                setIsOpenAssessment(true);
              }}
            >
              Diagnosis & Plan
            </button>
          </div>
          <div className="col-md-2 px-1 mt-1">
            <button
              class="w-100 border-0 shadow btn btn-primary cc-btn"
              onClick={() => {
                setIsOpenR(true);
              }}
            >
              Add Notes
            </button>
          </div>
        
          <div className="col-md-1 px-1 mt-1">

              <NavLink
                className="w-100 border-0 shadow btn btn-md btn-danger"
                onClick={handleEnd}
                to={`/PhysicianDashboard`}
              >
                End
              </NavLink>

          </div>
          </div>
          </>
          ) : null}
        
      </div>

      <Dialog
        open={modelOpen}
        onClose={() => {
          setModelOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"

          >
            {"Previous Assessments"}
            <Button
            color="secondary"
            onClick={() => {
              setModelOpen(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Visit ID</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Doctors Name</TableCell>
                    <TableCell align="left">Prescription</TableCell>
                    <TableCell align="left">Assessment</TableCell>
                    <TableCell align="left">Referred To</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 &&
                    rows.map((row) => {
                      return (
                        <TableRow key={row.patient_id}>

                          <TableCell align="left">{row.id}</TableCell>
                          <TableCell align="left">{row.title}</TableCell>
                          <TableCell align="left">
                            {row.consultant_name}
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="btn cc-btn"
                              onClick={() => {
                               getP(row.id);

                                setIsOpenPrescriptionTable(true);
                              }}
                            >
                              Prescription
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="btn  cc-btn"
                              onClick={() => {
                                getA(row.initial_complain);
                                setIsOpenA(true);
                              }}
                            >
                              Assessment &amp; Plan
                            </Button>
                          </TableCell>
                          <TableCell align="left">{row.refered_to}</TableCell>
                          <TableCell align="left">
                            <span>
                              {new Date(row.start_date).toLocaleString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="btn cc-btn"
                              onClick={() => {
                                getIntake(row.id);
                                setIsOpenIntakeHistory(true);
                              }}
                            >
                              Intake History
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="btn cc-btn"
                              onClick={() => {
                                getVitals(row.id);

                              }}
                            >
                              Vital Signs
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>

          </DialogActions>

      </Dialog>
      <Dialog
        open={modalIsOpenIntakeHistory}
        onClose={() => {
          setIsOpenIntakeHistory(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"

          >
            {"Intake History"}
            <Button
            color="secondary"
            onClick={() => {
              setIsOpenIntakeHistory(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>
          <div style={{ width: 1200 }}>
          <DialogContent>

          <IntakeHistory consultant={vid} />
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}></div>
          </DialogActions>
       </div>
      </Dialog>
      <Dialog
        open={modalIsOpenVitalSign}
        onClose={() => {
          setIsOpenVitalSign(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"
            max-width="false"
          >
            {"Vital Signs"}
            <Button
            color="secondary"
            onClick={() => {
              setIsOpenVitalSign(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>
          <DialogContent>
          <VitalSigns consultant={consultant} age={age} showAge="true" />
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}></div>
          </DialogActions>

      </Dialog>
           <Dialog
        open={modalIsOpenPrescription}
        onClose={() => {
          setIsOpenPrescription(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"
          >
            {"Prescription "}
            <Button
            color="secondary"
            onClick={() => {
              setIsOpenPrescription(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>

          <DialogContent>
            <ConsultantPrescriptionData
              cname={cname}
              visitID={setVisitID}
              patientID={pid}
              consultantID={patientData[0]?.consultant_NationalID}
            />
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%",float: "center", }}>
              <Button
                 className="btn cc-btn"
                onClick={() => {
                  print();
                }}
              >
                <img
                  src="avatars/printer.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>
              <Button
                 className="btn cc-btn"
                onClick={() => {
                  sendEmailP();
                }}
              >
                {" "}
                <img
                  src="avatars/email.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>
              <Button
                className="btn cc-btn"
                onClick={() => {
                  sendSMSP();
                }}
              >
                {" "}
                <img
                  src="avatars/sms.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>
              <Button
                 className="btn cc-btn"
                onClick={() => {
                  setIsOpenPrescription(false);
                }}
              >
                Cancel
              </Button>
              <Button
                 className="btn cc-btn"
                onClick={() => {
                  handleUpdate();
                }}
              >
                Update
              </Button>
            </div>
          </DialogActions>

      </Dialog>
      <Dialog
        open={modalIsOpenPrescriptionTable}
        onClose={() => {
          setIsOpenPrescriptionTable(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"
          >
            {"Prescription "}
            <Button
            color="secondary"
            onClick={() => {
              setIsOpenPrescription(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>

          <DialogContent>
          <PrescriptionData
              cname={cname}
              visitID={p}
              consultantID={patientData[0]?.consultant_NationalID}
            />
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%",float: "center", }}>
              <Button
                 className="btn cc-btn"
                onClick={() => {
                  print();
                }}
              >
                <img
                  src="avatars/printer.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>
              <Button
                 className="btn cc-btn"
                onClick={() => {
                  sendEmailP();
                }}
              >
                {" "}
                <img
                  src="avatars/email.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>
              <Button
                className="btn cc-btn"
                onClick={() => {
                  sendSMSP();
                }}
              >
                {" "}
                <img
                  src="avatars/sms.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>

            </div>
          </DialogActions>

      </Dialog>
      {/* <Dialog
        open={modalIsOpenPrescriptionTable}
        onClose={() => {
          setIsOpenPrescriptionTable(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <div>
          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"
          >
            {"Prescription "}
            <Button
            color="secondary"
            onClick={() => {
              setIsOpenPrescriptionTable(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>

          <DialogContent>
            <PrescriptionData
              cname={cname}
              visitID={setVisitID}
              visitID={p}
              consultantID={patientData[0]?.consultant_NationalID}
            />
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}>
              <Button
                 className="btn cc-btn"
                onClick={() => {
                  print();
                }}
              >
                <img
                  src="avatars/printer.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>
              <Button
                 className="btn cc-btn"
                onClick={() => {
                  sendEmailP();
                }}
              >
                {" "}
                <img
                  src="avatars/email.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>
              <Button
                className="btn cc-btn"
                onClick={() => {
                  sendSMSP();
                }}
              >
                {" "}
                <img
                  src="avatars/sms.png"
                  style={{ width: "20px", height: "20px" }}
                />
              </Button>

            </div>
          </DialogActions>
        </div>
      </Dialog> */}
      <Dialog
        open={modalIsOpenFile}
        onClose={() => {
          setIsOpenFile(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"
          >
            {"Imaging / Lab Reports"}
            <Button
            color="secondary"
            onClick={() => {
              setIsOpenFile(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>

          <DialogContent>
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <ModalCarousel images={images} />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions></DialogActions>

      </Dialog>
      <Dialog
        open={modalIsOpenDate}
        onClose={() => {
          data.isfollowup =  false
          setIsOpenDate(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"
          >
            {"Follow up Day"}
            <Button
            color="secondary"
            onClick={() => {
              data.isfollowup =  false
              setIsOpenDate(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
          </DialogTitle>
          <DialogContent>
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">

                    <div className="text-right">

                    </div>
                  </div>
                  <div className="form-group px-3">
                    <input
                      type="Date"
                      onChange={dataChange}
                      className="form-control"
                      name="followupdatetime"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}>
              <Button
                className="btn btn-secondary"
                onClick={() => {
                  data.isfollowup =  false
                  setIsOpenDate(false);
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  handleUpdate();
                }}
              >
                Update
              </Button>
            </div>
          </DialogActions>

      </Dialog>
    </div>
  );
};

export default InPersonMeeting;
