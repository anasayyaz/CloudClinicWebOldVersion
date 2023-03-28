import React, { useState, useEffect,useContext } from "react";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import list, { put, post } from "../../_helper/api";
import "./EditVitalSign.css";
import qs from "query-string";
import NewAppointmentCard from "../nurses/NewAppointmentCard";
import TempGraph from "./TempGraph";
import BloodPressureGraph from "./BloodPressureGraph";
import HRGraph from "./HRGraph";
import PIGraph from "./PIGraph";
import PRGraph from "./PRGraph";
import QRSGraph from "./QRSGraph";
import QTCGraph from "./QTCGraph";
import QTGraph from "./QTGraph";
import SPO2Graph from "./SPO2Graph";
import EditVitalSigns from "./EditVitalSigns";
import AddVitalSigns from "../Components/AddVitalSigns";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MeanArterialPressureGraph from "./MeanArterialPressureGraph";
import { Button } from "react-bootstrap";
import Canvas from "./Canvas";
import { get } from "js-cookie";
import { Settings } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TranslationContext from "../../context/translation";

const VitalSigns = (props) => {
  const { translate } = useContext(TranslationContext)
  const [Cdata, setCdata] = useState([]);
  const [showH, setShowH] = useState(false);
  const [showS, setShowS] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [modalIsOpenBPModal, setIsOpenBPModal] = React.useState(false);
  const [modalIsOpenMAPModal, setIsOpenMAPModal] = React.useState(false);
  const [modalIsOpenPRModal, setIsOpenPRModal] = React.useState(false);
  const [modalIsOpenQTModal, setIsOpenQTModal] = React.useState(false);
  const [modalIsOpenQRSModal, setIsOpenQRSModal] = React.useState(false);
  const [modalIsOpenQTCModal, setIsOpenQTCModal] = React.useState(false);
  const [modalIsOpenHRModal, setIsOpenHRModal] = React.useState(false);
  const [modalIsOpenPIModal, setIsOpenPIModal] = React.useState(false);
  const [modalIsOpenSPO2Modal, setIsOpenSPO2Modal] = React.useState(false);
  const [modalIsOpenTempModal, setIsOpenTempModal] = React.useState(false);
  const [modalIsOpenEcgGraph, setIsOpenEcgGraph] = React.useState(false);
  const [modalIsOpenEditVitalSigns, setIsOpenEditVitalSigns] = React.useState(false);
  const [modalIsOpenAddVitalSigns, setIsOpenAddVitalSigns] = React.useState(false);
  let vitalSignStatus=true;
  let pname,pid;
  useEffect(() => {

   setting();

    const response = list(
      `vitalsign/getPatientVitalSignbyVisit/${props.visitID}`
    ).then((response) => {
      console.log(response.data)
      pid=response.data.patientIdentificationNo;
      pname=response.data.patientFirstName;
      setCdata(response.data);
  console.log(response.data);

      if (response.data.ma == 0) {
        setShowH(true);
      } else {
        setShowS(true);
      }
    }).catch((error)=>{
     
      if(error.response.status === 404){
        vitalSignStatus=true;
      }
    });



  }, [props.visitID]);
  const tempModalHandler = () => {
    setIsOpenTempModal((prevMode) => !prevMode);
  };

  const BPModalHandler = () => {
    setIsOpenBPModal((prevMode) => !prevMode);
  };

  const MapModalHandler = () => {
    setIsOpenMAPModal((prevMode) => !prevMode);
  };

  const PRModalHandler = () => {
    setIsOpenPRModal((prevMode) => !prevMode);
  };

  const QTModalHandler = () => {
    setIsOpenQTModal((prevMode) => !prevMode);
  };

  const QRSModalHandler = () => {
    setIsOpenQRSModal((prevMode) => !prevMode);
  };

  const QTCModalHandler = () => {
    setIsOpenQTCModal((prevMode) => !prevMode);
  };
  function openModalEcgGraph() {
   
    setIsOpenEcgGraph(true);
  }
  const HRModalHandler = () => {
    setIsOpenHRModal((prevMode) => !prevMode);
  };

  const PIModalHandler = () => {
    setIsOpenPIModal((prevMode) => !prevMode);
  };

  const SPO2ModalHandler = () => {
    setIsOpenSPO2Modal((prevMode) => !prevMode);
  };

  const EditVitalSignsModalHandler = () => {
    get();
    setIsOpenEditVitalSigns((prevMode) => !prevMode);
  };
  const AddVitalSignsModalHandler = () => {
    get();
    setIsOpenAddVitalSigns((prevMode) => !prevMode);
  };
  function Added()
  {
    props.setVitalSignsAdd(true);
  }
   function setting()
  {
    list(
      `visit/getVisit/${props.visitID}`
    ).then((response) => {
   
      if(response.data[0].isVitalSignFilled=="false")
      {
       
        setShowAdd(true);
        setShowEdit(false);
      }
      else{
       
        setShowAdd(false);
        setShowEdit(true);
        
      }
    }).catch(error => {
      console.error('Error during service worker registration:', error);
    });
    
  }
function closeAll()
{
  get();
  setIsOpenAddVitalSigns(false);
  setIsOpenEditVitalSigns(false);
 
}
  function get()
  {
    list(
      `vitalsign/getPatientVitalSignbyVisit/${props.visitID}`
    ).then((response) => {
      setCdata(response.data);
  console.log(response.data);

      if (response.data.ma == 0) {
        setShowH(true);
      } else {
        setShowS(true);
      }
    }).catch((error)=>{
     
      if(error.response.status === 404){
        vitalSignStatus=true;
      }
    });
  }
  return (
    <div className="row m-0" style={{ width: "100%" }}>
            <ToastContainer />
      <div class="bg-dark m-0 cc-vital-signs" style={{ width: "100%" }}>
        <div className="p-0 m-0" style={{ width: "100%" }}>
          <div className="row cc-vitals-border-bottom mx-2 pb-2">
            <div className="col-6 col-md-3 p-0 ">
              <p>
                {translate("NAME")}:
                <br />
                <h6>
                  {Cdata.patientFirstName}
                </h6>
              </p>
            </div>
            <div className="col-6 col-md-2 p-0 ">
              <p>
                ID:
                <br />
                <h6>{Cdata.patientIdentificationNo}</h6>
              </p>
            </div>
            <div className="col-6 col-md-2 p-0 ">
              <p>
                {translate("GENDER")}:
                <br />
                <h6>{props.gender}</h6>
              </p>
            </div>
            <div className="col-6 col-md-3 p-0 ">
              <p>
                {translate("DATE_TIME")}:
                <br />
                <h6>
                  {new Date().toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h6>
              </p>
            </div>
           
            {showAdd ? (
           <div className="col-6 col-md-1 text-center">
           <button onClick={AddVitalSignsModalHandler} 
           >
         <h5 class="material-icons">
         add_circle_outline
</h5>
</button>
           </div>
                        ) : null}
                          {showEdit ? (
            <div className="col-6 col-md-1 text-center">
            <button onClick={EditVitalSignsModalHandler}>
          <h5 class="material-icons">
edit
</h5>
</button>
            </div>
            ) : null}
             <div className="col-6 col-md-1 text-center">
           <button onClick={get}>
         <h5 class="material-icons">
         sync
</h5>
</button>
           </div>
          </div>
        
          <div className="row px-1 py-2 ">
            <div className="col-4 d-flex justify-content-start">
              <p>
                {translate("WEIGHT")}:
                <br />

              </p>
              <h3 >{Cdata.weight}</h3>
              <small>(lbs)</small>
            </div>
            <div className="col-4 d-flex justify-content-start">
              <p>
                {translate("HEIGHT")}:
                <br />

              </p>
              <h3 >{Cdata.height}</h3>
              <small>(standard)</small>
            </div>
            {props.showAge == "true" ? (
              <div className="col-4 d-flex justify-content-start">
                <p>
                {translate("AGE")}:
                  <br />

                </p>
                <h3 >{props.age} </h3>
                <small>(years)</small>
              </div>
            ) : null}
          </div>
          <div className="row px-2 pb-2">
            <div className="cc-vital-nibp px-1 py-2">
              <div className="row justify-content-between mx-3 pt-2 pb-1 cc-vitals-border-bottom">
                <div>
                  <h4>
                    NIBP: <small> Oscillometric mmHg</small>
                  </h4>
                </div>
                <div>
                  <p className="text-right w-100">
                    <span className="font-weight-bold pl-2">
                      {new Date(Cdata.datetimeBP).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <div className="row pb-2 px-3 pt-2">
                <div className="col-8">
                  <div className="d-flex">
                    <p className="text-left pr-1">SYS/DIA</p>
                    <button
                      onClick={BPModalHandler}
                      className="col-8 p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <h1 className="font-weight-bold">
                        {Cdata.sys}/{Cdata.dia}
                      </h1>
                    </button>
                  </div>
                </div>
                <div className="col-4 d-flex">
                  <div className="d-flex">
                    <p className="font-weight-bold pr-1">PR:</p>
                    <br />
                    <button
                      onClick={PRModalHandler}
                      className="col-10 p-0"
                      style={{ cursor: "pointer" }}
                    >
                    <h1>
                      {Cdata.pr}
                      <small> /min</small>
                    </h1>
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="row mx-3 pt-2 cc-vitals-border-top"
                style={{ paddingBottom: "7px" }}
              >
                <div className="col-4 p-0 d-flex">
                  <p>SYS</p>
                  <h3 className="pl-1">{Cdata.sys}</h3>
                </div>
                <div className="col-4 p-0 d-flex">
                  <p>DIA</p>
                  <h3 className="pl-1">{Cdata.dia}</h3>
                </div>
                <div className="d-flex">
                  <p className="d-flex">MAP</p>
                  <button
                    onClick={MapModalHandler}
                    className="col-4 p-0"
                    style={{ cursor: "pointer" }}
                  >
                    <h3 className="d-flex ml-1">{Cdata.map}</h3>
                  </button>
                </div>
              </div>
            </div>
            <div className="cc-vital-temp px-1 py-2">
              <div className="row justify-content-between mx-1 pt-2 pb-1 cc-vitals-border-bottom">
                <button
                  onClick={tempModalHandler}
                  className="text-center"
                  style={{ cursor: "pointer" }}
                >
                  <h4 className="d-flex align-items-baseline">
                    Temp:
                    <h1 className="font-weight-bold pl-2 pr-2"> {Cdata.temp}<small>°F</small></h1>
                  </h4>
                </button>
                <p className="text-right">
                  <span className="font-weight-bold pl-2">
                    {new Date(Cdata.datetimeBP).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
              </div>
              <div className="row  px-3 py-2">
                <div className="col-5 p-0">
                  <div className="d-flex">
                    <h4 className="text-left pr-1 pl-1">SPO2:</h4>
                    <button
                      onClick={SPO2ModalHandler}
                      className="col-10 p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <h1 className="font-weight-bold">
                        {Cdata.spO2}    <small> %</small>
                      </h1>

                    </button>
                  </div>
                </div>
                <div className="col-3 p-0">
                  <div className="d-flex">
                    <p className="text-left  pr-1">PI:</p>
                    <button
                      onClick={PIModalHandler}
                      className="col-10 p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <h1 className="font-weight-bold">
                        {Cdata.pi}
                      </h1>
                    </button>
                  </div>
                </div>
                <div className="col-4 p-0">
                  <div className="d-flex">
                    <p className="font-weight-bold text-left pr-1 ">PR:</p>

                    <button
                      onClick={PRModalHandler}
                      className="col-12 p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <h1 className="font-weight-bold">
                        {Cdata.pr}    <small> /min</small>
                      </h1>

                    </button>
                  </div>
                </div>
                {/* <div className="col-4">
                  <div>
                    <button
                      onClick={PIModalHandler}
                      className="col-6 p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <p>PR:</p>
                      <div className="d-flex align-items-baseline">
                        <h1 className="pr-1">{Cdata.pi}</h1>
                      </div>
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row mx-1 pt-1 pb-1 cc-vitals-border-top">
            <div className="col-2 p-0">
              <div>
                <h5 className="font-weight-bold pl-2">ECG</h5>
              </div>
            </div>
            <div className="col-4 p-0 text-center">
              <div>
                {new Date(Cdata.datetimeECG).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
            <div className="col-5 p-0 text-center">
              <div>
                {!showH ? (
                  <p>
                    {translate("IRREGULAR_ECG_RHYTHM")} <MoodBadIcon />
                  </p>
                ) : null}
                {showH ? (
                  <p>
                    {translate("REGULAR_ECG_RHYTHM")} <SentimentVerySatisfiedIcon />
                  </p>
                ) : null}
              </div>
            </div>
            <div className="col-1 p-0 text-center">
      
                    
              <button onClick={openModalEcgGraph}
            
              // disabled={vitalSignStatus}
              >
              <h5 class="material-icons">
play_circle_outlined
</h5>
              </button>
                  
            </div>
          </div>
          <div className="row mx-2 pt-2 cc-vitals-border-top">
            <div className="col-6 col-md-3 p-0 d-flex">
              <button
                onClick={QTModalHandler}
                className="col-4 p-0"
                style={{ cursor: "pointer" }}
              >

                  <div className="col-4 p-0 d-flex align-items-baseline pl-2">
                  <p>QT:</p>
                  <h3 className="pl-1">{Cdata.qt}</h3>
                  <small className="pl-1">ms</small>
                </div>
              </button>
            </div>
            <div className="col-6 col-md-3 p-0 d-flex">
              <button
                onClick={QRSModalHandler}
                className="col-4 p-0"
                style={{ cursor: "pointer" }}
              >
                  <div className="col-4 p-0 d-flex align-items-baseline">
                  <p>QRS</p>
                  <h3 className="pl-1">{Cdata.qrs}</h3>
                  <small className="pl-1">ms</small>
                </div>
              </button>
            </div>
            <div className="col-6 col-md-3 p-0 d-flex">
              <button
                onClick={QTCModalHandler}
                className="col-4 p-0"
                style={{ cursor: "pointer" }}
              >
                  <div className="col-4 p-0 d-flex align-items-baseline">
                  <p>QTc:</p>
                  <h3 className="pl-1">{Cdata.qtc}</h3>
                  <small className="pl-1">ms</small>
                </div>
              </button>
            </div>
            <div className="col-6 col-md-3 p-0 d-flex">
              <button
                onClick={HRModalHandler}
                className="col-4 p-0"
                style={{ cursor: "pointer" }}
              >
                  <div className="col-4 p-0 d-flex align-items-baseline">
                  <p>HR:</p>
                  <h3 className="pl-1">{Cdata.hr}</h3>
                  <small className="pl-1">/min</small>
                </div>

              </button>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={modalIsOpenAddVitalSigns}
        onClose={() => {
           
          setIsOpenAddVitalSigns(false);
          
          
          
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

          <DialogTitle
            style={{ marginTop: "0px", color: "white", background: "#007bff" }}
            id="alert-dialog-title"

          >
            {"Vital Signs"}
            <Button
            color="secondary"
            onClick={() => {
              setIsOpenAddVitalSigns(false);
              
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
          <div style={{ width: '75vw' }}>
          <DialogContent>

          <AddVitalSigns  id={props.visitID} patientID={props.pid}  patientName={props.pname} closeAll={closeAll}  setting={setting}/>
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}></div>
          </DialogActions>
       </div>
      </Dialog>
      <Dialog
        open={modalIsOpenEditVitalSigns}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"lg"}
        onClose={() => {
          get();
          setIsOpenEditVitalSigns(false);
        }}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"Edit Vital signs"}
          <Button
            color="secondary"
            onClick={EditVitalSignsModalHandler}
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
        <DialogContent >
          <EditVitalSigns id={props.visitID}  closeAll={closeAll}/>
        </DialogContent>
      </Dialog>
      <Dialog
        open={modalIsOpenEcgGraph}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="true"
      >
        <DialogTitle
          style={{ color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"ECG graph"}
          <Button
            color="secondary"
            onClick={() => {
              setIsOpenEcgGraph(false);
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
          {/* <img src="avatars/ecg.gif" style={{ width: "100%" , height: "100%" }} /> */}

          <Canvas id={props.visitID}  modal={setIsOpenEcgGraph}/>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalIsOpenTempModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"Temperature"}
          <Button
            color="secondary"
            onClick={tempModalHandler}
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
        <DialogContent style={{ width: "23", height: "20" }}>
          <TempGraph patient_id={Cdata.patient_NationalID} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={modalIsOpenBPModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"Blood Pressure"}
          <Button
            color="secondary"
            onClick={BPModalHandler}
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
        <DialogContent style={{ width: "23", height: "20" }}>
          <BloodPressureGraph patient_id={Cdata.patient_NationalID} />
        </DialogContent>
      </Dialog>


      <Dialog
        open={modalIsOpenMAPModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"Mean Arterial Pressure"}
          <Button
            color="secondary"
            onClick={MapModalHandler}
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
        <DialogContent style={{ width: "23", height: "20" }}>
          <MeanArterialPressureGraph patient_id={Cdata.patient_NationalID} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalIsOpenPRModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"Pulse Rate"}
          <Button
            color="secondary"
            onClick={PRModalHandler}
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
        <DialogContent style={{ width: "23", height: "20" }}>
          <PRGraph patient_id={Cdata.patient_NationalID} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalIsOpenQTModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
        onClose={() => {
          setIsOpenQTModal(false);
        }}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"QT Interval"}
          <Button
            color="secondary"
            onClick={QTModalHandler}
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
        <DialogContent style={{ width: "23", height: "20" }}>
          <QTGraph patient_id={Cdata.patient_NationalID} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalIsOpenQRSModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"QRS Interval"}
          <Button
            color="secondary"
            onClick={QRSModalHandler}
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
        <DialogContent style={{ width: "23", height: "20" }}>
          <QRSGraph patient_id={Cdata.patient_NationalID} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalIsOpenQTCModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"QTC Interval"}
          <Button
            color="secondary"
            onClick={QTCModalHandler}
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
        <DialogContent style={{ width: "23", height: "20" }}>
          <QTCGraph patient_id={Cdata.patient_NationalID} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalIsOpenHRModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"Heart Rate"}
          <Button
            color="secondary"
            onClick={HRModalHandler}
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
        <DialogContent style={{ width: "23", height: "20" }}>
          <HRGraph patient_id={Cdata.patient_NationalID} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalIsOpenPIModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"Purfusion Index"}
          <Button
            color="secondary"
            onClick={PIModalHandler}
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
        <DialogContent style={{ width: "23", height: "20" }}>
          <PIGraph patient_id={Cdata.patient_NationalID} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalIsOpenSPO2Modal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"xs"}
      >
        <DialogTitle
          className="m-0 text-white"
          style={{ background: "#007bff" }}
          id="alert-dialog-title"
        >
          {"SPO2 level"}
          <Button
            color="secondary"
            onClick={SPO2ModalHandler}
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
        <DialogContent style={{ width: "23", height: "20" }}>
          <SPO2Graph patient_id={Cdata.patient_NationalID} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default VitalSigns;
