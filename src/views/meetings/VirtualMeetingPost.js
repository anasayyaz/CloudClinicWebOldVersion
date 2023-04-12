import React, { useRef, useState, useEffect, useContext } from "react";
import qs from "query-string";
import TranslationContext from "../../context/translation";
import { NavLink } from "react-router-dom";
import list, { put, post } from "../../_helper/api";
import VitalSigns from "../Components/VitalSigns";
import Loader from "react-loader-spinner";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PrescriptionPrint from "../Components/PrescriptionPrint";
import PrescriptionPrintNew from "../Components/PrescriptionPrintNew";
import LabTestPrint from "../Components/LabTestPrint";
import ReportPrint from "../Components/ReportPrint";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, Col, Row, Table, ButtonToolbar } from "react-bootstrap";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCarousel from "../Components/ModalCarousel";
import UploadImages from "../Components/UploadImages";
import QRCode from "react-qr-code";
import ReactDOM from "react-dom";

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Switch,
  Checkbox,
} from "@material-ui/core";
import ConsultantPrescriptionData from "../Components/ConsultantPrescriptionData";
import NewPrescriptionData from "../Components/NewPrescriptionData";
import AddIntakeHistory from "../Components/AddIntakeHistory";
import PrescriptionData from "../Components/PrescriptionData";
import DiagnosisData from "../Components/DiagnosisData";
import ConsultantDiagnosisData from "../Components/ConsultantDiagnosisData";
import EditIntakeHistory from "../Components/EditIntakeHistory";
import { QrCode } from "@mui/icons-material";
import LabTestData from "../Components/LabTestData";
let domainName = localStorage.getItem("domain");
let image = localStorage.getItem("image");
let role = localStorage.getItem("role");
let name = JSON.parse(localStorage.getItem("user"));
let link = `https://cloudclinicdevapi.azurewebsites.net/images/${image}`;
// import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const appId = '275ea0a1-e8e1-4df0-bfd1-8b84d53989ca';
// const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
// SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
const VirtualMeetingPost = (props) => {
  const { translate } = useContext(TranslationContext);
  const jitsiContainerStyle = {
    display: loading ? "none" : "block",
    width: "100%",
    height: "100%",
    marginBottom: "10px",
    marginTop: "10px",
    marginLeft: "10px",
  };

  const [P, setP] = useState(false);
  const [modalIsOpenPPrint, setIsOpenPPrint] = React.useState(false);
  const [modalIsOpenPPrintNew, setIsOpenPPrintNew] = React.useState(false);
  const [modalIsOpenLPrint, setIsOpenLPrint] = React.useState(false);
  const [modalIsOpenRPrint, setIsOpenRPrint] = React.useState(false);
  const [modalIsOpenAPrint, setIsOpenAPrint] = React.useState(false);
  const [reportData, setReportData] = React.useState();
  const [labTestData, setLabTestData] = React.useState();
  const [loading, setLoading] = useState(false);
  const [Role, setRole] = useState(false);
  const [modalIsOpenAssessment, setIsOpenAssessment] = React.useState(false);
  const [ecgFullscreen, setEcgFullscreen] = React.useState(true);
  const [HistoryView, setHistoryView] = useState(false);
  const [modalIsOpenDate, setIsOpenDate] = React.useState(false);
  const [modalIsOpenConsultation, setIsOpenConsultation] =
    React.useState(false);
  const [VitalSignView, setVitalSignView] = useState();
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [roomName, setroomName] = useState(null);
  const [modalPreviousVisit, setModalPreviousVisit] = useState(false);
  const [visitID, setVisitID] = useState(null);
  const [previousVisitID, setPreviousVisitID] = useState(null);
  const [data, setData] = React.useState("");
  const [modalIsOpenPrescription, setIsOpenPrescription] =
    React.useState(false);
  const [modalIsOpenPrescriptionNew, setIsOpenPrescriptionNew] =
    React.useState(false);
  const [modalIsOpenLabTest, setIsOpenLabTest] = React.useState(false);
  const [modalIsOpenR, setIsOpenR] = React.useState(false);
  const [age, setAge] = useState(null);
  const [images, setImages] = React.useState(null);
  const [patientNationalID, setPatientNationalID] = useState(null);
  const [identificationNo, setIdentificationNo] = useState(null);
  const [patientName, setPatientName] = useState(null);
  const [patientGender, setPatientGender] = useState(null);
  const [modalIsOpenIntakeHistory, setIsOpenIntakeHistory] =
    React.useState(false);
  const [consultantNationalID, setConsultantNationalID] = useState(null);
  const [consultantName, setConsultantName] = useState(null);
  const [modalIsOpenFile, setIsOpenFile] = React.useState(false);
  const [modalIsOpenFileUpload, setIsOpenFileUpload] = React.useState(false);
  const [consultantPreviousNationalID, setConsultantPreviousNationalID] =
    useState(null);
  const [consultantPreviousName, setConsultantPreviousName] = useState(null);
  const [rows, setRows] = React.useState([]);
  const [modalIsOpenPreviousIntakeHistory, setIsOpenPreviousIntakeHistory] =
    React.useState(false);
  const [modalIsOpenAddIntakeHistory, setIsOpenAddIntakeHistory] =
    React.useState(false);
  const [modalIsOpenPrescriptionTable, setIsOpenPrescriptionTable] =
    useState(false);
  const [modalIsOpenDiagnosisTable, setIsOpenDiagnosisTable] = useState(false);
  const [modalIsOpenQrCode, setIsOpenQrCode] = useState(false);
  const [qrcode, setqrcode] = useState("");
  const [lab, setLab] = React.useState(false);
  const [vital, setVital] = React.useState(false);
  const [diagnosis, setDiagnosis] = React.useState(false);
  const [prescrtiption, setPrescrtiptration] = React.useState(false);
  async function startConference(vid) {
    try {
      const domain = "meet.cloudclinic.ai";
      var id = 5;
      const visitresponse = await list(`visit/getVisit/${vid}`);
      setroomName(visitresponse?.data[0].meetinglink);
      console.log(visitresponse.data[0].meetinglink);

      // const roomName = "cloudclinic_" + new roomName
      const options = {
        // roomName: "cloudclinic_12345",
        roomName: visitresponse.data[0].meetinglink,
        height: 450,
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
      console.log(domain);
      console.log(options);
      const api = new window.JitsiMeetExternalAPI(domain, options);
      api.addEventListener("videoConferenceJoined", () => {
        // setLoading(false);
        api.executeCommand("displayName", "Cloud Clinic");
      });
    } catch (error) {
      console.error("Failed to load Jitsi API", error);
    }
  }
  async function getPreviousVisitData() {
    toast.success("loading...");
    list(`visit/getpatientPreviousVisits/${patientNationalID}`)
      .then((response) => {
        setRows(response.data);
        setModalPreviousVisit(true);
      })
      .catch((error) => {
        toast.error("No Record Found");
      });
  }
  function set(v) {
    data.referredTo = v;
  }
  function handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    data.name = value;
  }
  const openPrescription = () => {
    // alert(domainName)
    if (domainName == "hanif") {
      setIsOpenPrescriptionNew(true);
    }
    else {
      setIsOpenPrescription(true);
    }
  }
  const handleEnd = () => {
    if (data.isfollowup) {
      //  alert("follow up");
      put(`visit/updateVisit/${qs.parse(props.location.search)?.VisitID}`, {
        isConsultantRequired: false,
        referredTo: consultantName,
        followupdatetime: data.followupdatetime,
        isfollowup: data.isfollowup,
        isConsultantappointmentSchedule: true,
        prescription: data.prescription,
        notes: data.notes,
        initialComplain: data.initialComplain,
        isActive: false,
        status: 8,
      }).then((response) => {
        put(`visit/updatePatientTags/${patientNationalID}`, {
          IsAppointmentSchedule: false,
          followupdatetime: data.followupdatetime,
          isfollowup: data.isfollowup,
          isConsultantappointmentSchedule: true,
          IsAppointmentSchedule: false,
        });
      });
    } else if (data.isConsultantRequired) {
      //  alert("consultant");
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
        put(`visit/updatePatientTags/${patientNationalID}`, {
          followupdatetime: null,
          isfollowup: false,
          IsAppointmentSchedule: false,
          isConsultantappointmentSchedule: true,
          IsAppointmentSchedule: false,
        });
      });
    } else {
      // alert("none");
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
        put(`visit/updatePatientTags/${patientNationalID}`, {
          followupdatetime: null,
          isfollowup: false,
          IsAppointmentSchedule: false,
          isConsultantappointmentSchedule: false,
          IsAppointmentSchedule: false,
        });
      });
    }
    console.log(data);
  };

  function dataChange(event) {
    let [key, value, newData] = [
      event.target.name,
      event.target.value,
      { ...data },
    ];
    console.log(data);

    if (key == "isConsultantRequired") {
      data.isConsultantRequired = true;
    } else if (key == "isfollowup") {
      data.isfollowup = true;
    } else {
      newData[key] = value;
    }

    setData(newData);
    console.log(data);
  }
  function sendEmailA() {
    let id = qs.parse(props.location.search)?.Consultant;
    // data["tag"] = "Asssessment";
    // data["visitid"] = id;
    // post(`visit/sendEmailToPatient`, data);
    toast.info("Assessment sent to " + email + " by Email");
  }
  function sendSMSA() {
    let id = qs.parse(props.location.search)?.Consultant;
    // data["tag"] = "Asssessment";
    // data["visitid"] = id;
    // post(`visit/sendSMSToPatient`, "hello" + data);
    toast.info("Assessment sent to " + number + " by SMS");
  }
  function sendEmailP() {
    let id = qs.parse(props.location.search)?.Consultant;

    // data["tag"] = "Prescription";
    // data["visitid"] = id;
    // post(`visit/sendEmailToPatient`, data);
    toast.info("Prescription sent to " + email + " by Email");
  }
  function sendSMSP() {
    let id = qs.parse(props.location.search)?.Consultant;
    // data["tag"] = "Prescription";
    // data["visitid"] = id;
    // post(`visit/sendSMSToPatient`,+ data);
    toast.info("Prescription sent to " + number + " by SMS");
  }
  function printP() {
    setIsOpenPPrint(true);
    setP(JSON.parse(localStorage.getItem("PrescriptionPrint")));
    setTimeout(() => {
      window.print();
      setIsOpenPPrint(false);
      // handlePrint();
    }, 1000);
  }
  function printPNew() {
    setIsOpenPPrintNew(true);
    setP(JSON.parse(localStorage.getItem("PrescriptionPrint")));
    setTimeout(() => {
      window.print();
      setIsOpenPPrintNew(false);
      // handlePrint();
    }, 1000);
  }
  function printL() {
    list(`VisitLabTest/GetByVisit/${visitID}`)
      .then((response) => {
        console.log(response);
        console.log(response.data)
        if (response == "Record not found in system") {
          setLabTestData(null)
        } else {
          setLabTestData(response.data);
          setIsOpenLPrint(true);
          window.print();
          setIsOpenLPrint(false);
        }
        // console.log(reportData.diagnostics)
        // console.log(reportData.prescriptions)
        // console.log(reportData.vitalsigns)
        // console.log(reportData.visitLabTests)




      })
      .catch((error) => {
        // toast.error("No Record Found");
      });

  }
  const printR = () => {
    //  toast.info("Please wait we are genrating report");
    list(`Visit/getVisitForReport/${visitID}`)
      .then((response) => {
        setReportData(response.data[0]);
        setVitalSignView(reportData.isVitalSignFilled);

        // console.log(reportData.diagnostics)
        // console.log(reportData.prescriptions)
        // console.log(reportData.vitalsigns)
        // console.log(reportData.visitLabTests)


        setIsOpenRPrint(true);
        window.print();
        setIsOpenRPrint(false);

      })
      .catch((error) => {
        // toast.error("No Record Found");
      });


  }
  function reset() {
    list(`visit/getVisit/${qs.parse(props.location.search)?.Consultant}`).then(
      (response) => {
        if (response.data[0].isIntakeHistoryFilled == "false") {
          setHistoryView(false);
        } else {
          setHistoryView(true);
        }

        setIsOpenAddIntakeHistory(false);
      }
    );
  }
  function printA(val) {
    //   setAprint(val);
    //   setIsOpenAPrint(true);
    //   setTimeout(() => {
    //     window.print();
    //     setIsOpenAPrint(false);
    //   // handlePrint();
    // }, 1000);
  }
  const handleUpdate = () => {
    console.log(data);
    // if(transition2)
    // {
    //   // alert(data.initialComplain);
    //   data.initialComplain=transcript;
    //   // alert(data.initialComplain);
    // }
    // else{

    // }

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

      // setIsOpenDate(false);
    });
    setIsOpenLabTest(false)
    setIsOpenConsultation(false);
    setIsOpenDate(false);
  };
  function getUploadedFiles() {
    console.log(data);
    toast.success("loading...");
    list(`LabTest/visitsLabtests/${qs.parse(props.location.search)?.VisitID}`)
      .then((response) => {
        //   if(response.data="Record not found in system")

        //   {
        //     toast.error("No Reports Available")
        // }

        setImages(response.data);
        setIsOpenFile(true);
      })
      .catch((error) => {
        toast.error("No Record Found");
        // alert(error.message);
      });
  }
  function closeAll() {
    setHistoryView(true);
    setIsOpenAddIntakeHistory(false);
  }
  useEffect(() => {
    setVisitID(qs.parse(props.location.search)?.VisitID);
    if (window.JitsiMeetExternalAPI) {
      startConference(qs.parse(props.location.search)?.VisitID);
    } else {
      alert("Jitsi Meet API script not loaded");
    }

    if (
      localStorage.getItem("roles") == "Nurse" ||
      localStorage.getItem("roles") == "Patient"
    ) {
      setRole(false);
    } else if (
      localStorage.getItem("roles") == "Admin" ||
      localStorage.getItem("roles") == "Physician"
    ) {
      setRole(true);
    }

    list(`visit/getVisit/${qs.parse(props.location.search)?.VisitID}`).then(
      (response) => {
        setData(response.data[0]);
        setAge(response.data[0].age);
        setIdentificationNo(response.data[0].identificationNo);
        setPatientNationalID(response.data[0].patient_NationalID);
        setConsultantNationalID(response.data[0].consultant_NationalID);
        setConsultantName(response.data[0].consultant);
        setPatientName(response.data[0].patient);
        if (response.data[0].isVitalSignFilled == "false") {
          // setVitalSignView(false);
          setLoading(false);
        } else {
          // setVitalSignView(true);
          setLoading(false);
        }
        if (response.data[0].isIntakeHistoryFilled == "false") {
          setHistoryView(false);
          setLoading(false);
        } else {
          setHistoryView(true);
          setLoading(false);
        }
      }
    );
    setqrcode({ vid: visitID, pid: patientNationalID });
  }, []);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader
            type="Grid"
            color="#0b7adb"
            secondaryColor="#64c0ff"
            height="75vm"
            width="75vm"
            timeout={20000} //3 secs
          />
        </div>
      ) : (
        <div className="container px-4 col-12 m-0 pt-2 h-100 overflow-auto">
          <div className="row w-100 d-flex justify-content-between m-0">
            <div className="d-flex align-items-center">
              <p className="m-0 cc-page-title text-uppercase pl-2">
                {translate("VIRTUAL_CLINIC")}
              </p>
            </div>
            <div className="d-flex align-items-center">
              <p className="m-0 cc-page-title  pl-2">{"Consultant Name:  "}</p>
              <p
                className="m-0 cc-page-title  pl-1"
                style={{ color: "#0b7adb" }}
              >
                {consultantName}
              </p>
              <p className="m-0 cc-page-title  pl-4">{"Patient Name:"}</p>
              <p
                className="m-0 cc-page-title  pl-1"
                style={{ color: "#0b7adb" }}
              >
                {patientName}
              </p>
              <p className="m-0 cc-page-title  pl-4">{"VisitID:"}</p>
              <p
                className="m-0 cc-page-title  pl-1"
                style={{ color: "#0b7adb" }}
              >
                {qs.parse(props.location.search)?.VisitID}
              </p>
            </div>
          </div>
          <div className="card bg-white mt-3 py-3 px-4 shadow">
            <div className="col-md-12">
              <div className="row">
                <div className={`ecg_fulscreen ${ecgFullscreen && "active"}`}>
                  <div className="row px-3 align-items-center justify-content-between pb-2">
                    <div className="pb-1">
                      <h5 className="m-0 cc-page-title ">
                        {translate("PATIENT_VITAL_SIGNS")}
                      </h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <img
                        className="btn cc-btn ml-2  "
                        onClick={() => printR()}
                        src="avatars/report.png"
                      />
                      {ecgFullscreen ? (
                        <img
                          className="btn cc-btn ml-2  "
                          onClick={() =>
                            setEcgFullscreen((prevMode) => !prevMode)
                          }
                          src="avatars/expand.png"
                        />
                      ) : null}

                      {!ecgFullscreen ? (
                        <img
                          className="btn cc-btn ml-2  "
                          onClick={() =>
                            setEcgFullscreen((prevMode) => !prevMode)
                          }
                          src="avatars/contract.png"
                        />
                      ) : null}
                    </div>
                  </div>
                  <VitalSigns
                    visitID={qs.parse(props.location.search)?.VisitID}
                    age={age}
                    pid={patientNationalID}
                    idNo={identificationNo}
                    showAge="true"
                  />
                </div>
                <div className="outer-jitsi">
                  <div className="row px-3 meeting-detail-btns">
                    <div className="col-md-3 pr-md-0">
                      <button
                        onClick={() => {
                          getPreviousVisitData();
                        }}
                        class="btn cc-btn"
                      >
                        <span className="material-icons md-18"> history </span>
                        <p className="m-0 pl-1 cc-page-title">
                          {translate("PREVIOUS_VISITS")}
                        </p>
                      </button>
                    </div>
                    <div className="col-md-3 pr-md-0">
                      {HistoryView ? (
                        <button
                          class="btn cc-btn"
                          onClick={() => {
                            setIsOpenIntakeHistory(true);
                          }}
                        >
                          <span class="material-icons"> description </span>
                          <p className="m-0 pl-1 cc-page-title">
                            {translate("EDIT_INTAKE_HISTORY")}
                          </p>
                        </button>
                      ) : (
                        <button
                          class="btn cc-btn"
                          onClick={() => {
                            setIsOpenAddIntakeHistory(true);
                          }}
                        >
                          <span class="material-icons "> edit_note </span>
                          <p className="m-0 pl-1 cc-page-title">
                            Add Intake History
                          </p>
                        </button>
                      )}
                    </div>
                    <div className="col-md-3 pr-md-0">
                      <button
                        onClick={() => {
                          setIsOpenFileUpload(true);
                        }}
                        class="btn cc-btn"
                      >
                        <span className="material-icons ">
                          {" "}
                          add_photo_alternate{" "}
                        </span>
                        <p className="text-left m-0 pl-1 cc-page-title">
                          {translate("UPLOAD_LAB_REPORTS")}{" "}
                        </p>
                      </button>
                    </div>
                    <div className="col-md-3 pr-md-0">
                      <button
                        onClick={() => {
                          getUploadedFiles();
                        }}
                        class="btn cc-btn"
                      >
                        <span className="material-icons"> collections </span>
                        <p className="text-left m-0 pl-1 cc-page-title">
                          {translate("VIEW_LAB_REPORTS")}
                        </p>
                      </button>
                    </div>
                  </div>
                  <div
                    className={`w-100 ecg_fulscreen_jitsi ${ecgFullscreen && "active"
                      }`}
                  >
                    <div className="row m-0" style={{ width: "100%" }}>
                      {/* <JitsiMeeting id="jitsi-container" style={jitsiContainerStyle} roomName={"hello"} /> */}
                      <div id="jitsi-container" style={jitsiContainerStyle} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {Role ? (
              <>
                <div className="row px-2">
                  <div className="col-md-2 px-1  mt-1">
                    <button
                      class="w-100 border-0 shadow btn btn-primary cc-btn cc-page-title"
                      onClick={() => {
                        setIsOpenConsultation(true);
                      }}
                    >
                      {data.isConsultantRequired ? (
                        <>
                          {"✔   "}
                          {translate("CONSULTATION_NEEDED")}{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          {"✘   "} {translate("CONSULTATION_NEEDED")}
                        </>
                      )}
                    </button>
                    {/* <FormControlLabel
                      key={props.id}
                      className="w-100 border-0 shadow btn btn-primary cc-btn"
                      control={
                        <Checkbox
                          style={{ color: "#fff" }}
                          checked={props.isChecked}
                          defaultChecked={
                            props.defaultChecked ? props.defaultChecked : false
                          }
                          value={data.isConsultantRequired}
                          onChange={props.handleCheckChildElement}
                        />
                      }
                      label={translate("CONSULTATION_NEEDED")}
                      labelPlacement="end"
                    /> */}
                  </div>
                  <div className="col-md-2 px-1  mt-1">
                    {/* <FormControlLabel
                      key={props.id}
                      className="w-100 border-0 shadow btn btn-primary cc-btn"
                      control={
                        <Checkbox
                          style={{ color: "#fff" }}
                          checked={props.isChecked}
                          defaultChecked={
                            data.isfollowup ? data.isfollowup : false
                          }
                          value={data.followupdatetime}
                          onChange={props.handleCheckChildElement}
                        />
                      }
                      label={translate("FOLLOWUP_NEEDED")}
                      labelPlacement="end"
                    /> */}
                    <button
                      class="w-100 border-0 shadow btn btn-primary cc-btn cc-page-title"
                      onClick={() => {
                        setIsOpenDate(true);
                      }}
                    >
                      {data.isfollowup ? (
                        <>
                          {"✔   "}
                          {translate("FOLLOWUP_NEEDED")}{" "}
                        </>
                      ) : (
                        <>
                          {"✘   "} {translate("FOLLOWUP_NEEDED")}
                        </>
                      )}
                    </button>
                  </div>

                  <div className="col-md-2 px-1 mt-1">
                    <button
                      class="w-100 border-0 shadow btn btn-primary cc-btn cc-page-title"
                      onClick={() => {
                        openPrescription()
                      }}
                    >
                      {translate("PRESCRIPTION")}
                    </button>
                  </div>
                  <div className="col-md-2 px-1 mt-1">
                    <button
                      class="w-100 border-0 shadow btn btn-primary cc-btn cc-page-title"
                      onClick={() => {
                        // setTransition1(true);
                        // setTransition2(false);
                        setIsOpenAssessment(true);
                      }}
                    >
                      {translate("DIAG_PLAN")}
                    </button>
                  </div>
                  <div className="col-md-2 px-1 mt-1">
                    <button
                      class="w-100 border-0 shadow btn btn-primary cc-btn cc-page-title"
                      onClick={() => {
                        setIsOpenLabTest(true);
                      }}
                    >
                      Lab Test
                    </button>
                  </div>
                  <div className="col-md-1 px-1 mt-1">
                    <button
                      class="w-100 border-0 shadow btn btn-primary cc-btn cc-page-title"
                      onClick={() => {
                        setIsOpenR(true);
                      }}
                    >
                      {translate("ADD_NOTES")}
                    </button>
                  </div>

                  <div className="col-md-1 px-1 mt-1 ">
                    <NavLink
                      className="w-100 border-0 shadow btn  cc-btnred cc-page-title"
                      onClick={handleEnd}
                      to={`/PhysicianDashboard`}
                    >
                      {translate("END")}
                    </NavLink>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
      <Dialog
        open={modalPreviousVisit}
        onClose={() => {
          setModalPreviousVisit(false);
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
              setModalPreviousVisit(false);
            }}
            y
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
        <div style={{ width: "90vw" }}>
          <DialogContent>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Visit ID</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="center">Doctors Name</TableCell>
                    <TableCell align="center">Initial Complain</TableCell>
                    <TableCell align="center">Prescription</TableCell>
                    <TableCell align="center">Diagnosis</TableCell>
                    <TableCell align="center">Referred To</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 &&
                    rows.map((row) => {
                      return (
                        <TableRow key={row.patient_id}>
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="center">{row.title}</TableCell>
                          <TableCell align="center">
                            {row.consultantFirstName}
                          </TableCell>
                          <TableCell align="center">
                            {row.initialComplain}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              className="btn cc-btn"
                              onClick={() => {
                                //  getP(row.id);
                                setConsultantPreviousNationalID(
                                  row.consultant_NationalID
                                );
                                setConsultantPreviousName(row.consultantName);
                                setPreviousVisitID(row.id);
                                setIsOpenPrescriptionTable(true);
                              }}
                            >
                              Prescription
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              className="btn  cc-btn"
                              onClick={() => {
                                setConsultantPreviousNationalID(
                                  row.consultant_NationalID
                                );
                                setConsultantPreviousName(row.consultantName);
                                setPreviousVisitID(row.id);
                                setIsOpenDiagnosisTable(true);
                              }}
                            >
                              {"Diagnosis"}
                            </Button>
                          </TableCell>
                          <TableCell align="center">{row.referredTo}</TableCell>
                          <TableCell align="center">
                            <span>
                              {new Date(row.startDateTime).toLocaleString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                }
                              )}
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              className="btn cc-btn"
                              onClick={() => {
                                setConsultantPreviousNationalID(
                                  row.consultant_NationalID
                                );
                                setConsultantPreviousName(row.consultantName);
                                setPreviousVisitID(row.id);
                                setIsOpenPreviousIntakeHistory(true);
                              }}
                            >
                              {translate("INTAKE_HISTORY")}
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              className="btn cc-btn"
                              onClick={() => {
                                // getVitals(row.id);
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
        </div>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog
        open={modalIsOpenFileUpload}
        onClose={() => {
          setIsOpenFileUpload(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          Upload Files
          <Button
            color="secondary"
            onClick={() => {
              setIsOpenFileUpload(false);
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
        <div style={{ width: "620px" }}>
          <DialogContent>
            <UploadImages
              id={visitID}
              pid={patientNationalID}
              openQr={setIsOpenQrCode}
            />
          </DialogContent>
        </div>
      </Dialog>
      <Dialog
        open={modalIsOpenQrCode}
        onClose={() => {
          setIsOpenQrCode(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          QR code
          <Button
            color="secondary"
            onClick={() => {
              setIsOpenQrCode(false);
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
        <div style={{ width: "620px" }}>
          <DialogContent>
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 200,
                width: "100%",
                marginBottom: "50px",
                marginTop: "50px",
              }}
            >
              {/* <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={{"vid": visitID , "pid": patientNationalID}}
                viewBox={`0 0 256 256`}
              /> */}
              <QRCode
                value={JSON.stringify({
                  vid: visitID,
                  pid: patientNationalID,
                  pname: patientName,
                })}
                size="250"
              />
            </div>
          </DialogContent>
        </div>
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
        <div style={{ width: "40vw" }}>
          <DialogContent>
            <PrescriptionData
              cname={consultantPreviousName}
              visitID={previousVisitID}
              consultantID={consultantPreviousNationalID}
            />
          </DialogContent>
        </div>
        <DialogActions>
          <div
            className="modal-footer"
            style={{ width: "100%", float: "center" }}
          >
            <Button
              className="btn cc-btn"
              onClick={() => {
                printP();
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
                // sendEmailP();
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
                // sendSMSP();
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

      <Dialog
        open={modalIsOpenDiagnosisTable}
        onClose={() => {
          setIsOpenDiagnosisTable(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          {translate("DIAG_PLAN")}
        </DialogTitle>
        <div style={{ width: "40vw" }}>
          <DialogContent>
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">
                    <img
                      src={link}
                      alt="Cloud Clinic Logo"
                      className="cc_logo"
                      style={{ height: "50px", width: "200px" }}
                    />
                    <div className="text-right">
                      <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-4"></div>
                    </div>
                  </div>
                  <div className="form-group px-3">
                    <DiagnosisData
                      cname={consultantPreviousName}
                      visitID={previousVisitID}
                      patientID={patientNationalID}
                      consultantID={consultantPreviousNationalID}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
        <DialogActions>
          <div
            className="modal-footer"
            style={{ width: "100%", float: "center" }}
          >
            <Button
              className="btn cc-btn"
              onClick={() => {
                // printA(a);
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
                // sendEmailA();
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
                // sendSMSA();
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

      <Dialog
        open={modalIsOpenPreviousIntakeHistory}
        onClose={() => {
          setIsOpenPreviousIntakeHistory(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          {translate("INTAKE_HISTORY")}
          <Button
            color="secondary"
            onClick={() => {
              setIsOpenPreviousIntakeHistory(false);
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
        <div style={{ width: "60vw" }}>
          <DialogContent>
            <EditIntakeHistory
              id={previousVisitID}
              setIsOpenPreviousIntakeHistory={setIsOpenPreviousIntakeHistory}
              showSave={0}
            />
          </DialogContent>
        </div>
        <DialogActions>
          <div className="modal-footer" style={{ width: "100%" }}></div>
        </DialogActions>
      </Dialog>
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
          {translate("IMAGE_LAB_REPORTS")}
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
        <div style={{ width: "30vw" }}>
          <DialogContent>
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <ModalCarousel images={images} />
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog
        open={modalIsOpenAddIntakeHistory}
        onClose={() => {
          reset();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          {translate("INTAKE_HISTORY")}
          <Button
            color="secondary"
            onClick={() => {
              setIsOpenAddIntakeHistory(false);
              reset();
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
        <div style={{ width: "60vw" }}>
          <DialogContent>
            <AddIntakeHistory id={visitID} closeAll={closeAll} />
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}></div>
          </DialogActions>
        </div>
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
          {translate("INTAKE_HISTORY")}
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
        <div style={{ width: "60vw" }}>
          <DialogContent>
            <EditIntakeHistory id={visitID} closeAll={closeAll} showSave={1} />
          </DialogContent>
        </div>
        <DialogActions>
          <div className="modal-footer" style={{ width: "100%" }}></div>
        </DialogActions>
      </Dialog>
      <Dialog
        open={modalIsOpenLabTest}
        onClose={() => {
          setIsOpenLabTest(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          Lab Test
          <Button
            color="secondary"
            onClick={() => {
              setIsOpenLabTest(false);
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
        <div style={{ width: "40vw" }}>
          <DialogContent>
            <LabTestData
              cname={consultantName}
              visitID={visitID}
              patientID={patientNationalID}
              consultantID={consultantNationalID}
            />
          </DialogContent>
        </div>
        <DialogActions>
          <div
            className="modal-footer"
            style={{ width: "100%", float: "center" }}
          >
            <Button
              className="btn cc-btn"
              onClick={() => {
                printL();
              }}
            >
              <img
                src="avatars/printer.png"
                style={{ width: "20px", height: "20px" }}
              />
            </Button>
            {/* <Button
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
            </Button> */}
            <Button
              className="btn cc-btnred"
              onClick={() => {
                setIsOpenLabTest(false);
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
        open={modalIsOpenPrescriptionNew}
        onClose={() => {
          setIsOpenPrescriptionNew(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          Prescription
          <Button
            color="secondary"
            onClick={() => {
              setIsOpenPrescriptionNew(false);
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
        <div style={{ width: "40vw" }}>
          <DialogContent>


            <NewPrescriptionData
              cname={consultantName}
              visitID={visitID}
              patientID={patientNationalID}
              consultantID={consultantNationalID}
            />
          </DialogContent>
        </div>
        <DialogActions>
          <div
            className="modal-footer"
            style={{ width: "100%", float: "center" }}
          >
            <Button
              className="btn cc-btn"
              onClick={() => {
                printPNew();
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
              className="btn cc-btnred"
              onClick={() => {
                setIsOpenPrescriptionNew(false);
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
          Prescription
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
        <div style={{ width: "40vw" }}>
          <DialogContent>
            <ConsultantPrescriptionData
              cname={consultantName}
              visitID={visitID}
              patientID={patientNationalID}
              consultantID={consultantNationalID}
            />
          </DialogContent>
        </div>
        <DialogActions>
          <div
            className="modal-footer"
            style={{ width: "100%", float: "center" }}
          >
            <Button
              className="btn cc-btn"
              onClick={() => {
                printP();
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
              className="btn cc-btnred"
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
        open={modalIsOpenR}
        onClose={() => {
          setIsOpenR(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          {translate("REMARKS")}
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
        <div style={{ width: "30vw" }}>
          <DialogContent>
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">
                    <img
                      src={link}
                      alt="Cloud Clinic Logo"
                      className="cc_logo"
                      style={{ height: "50px", width: "200px" }}
                    />
                    <div className="text-right">
                      <div className="w-100 d-flex align-items-baseline col-md-12 mt-2 px-4">
                        <p className="pb-2 pr-2 m-0 cc-form-label">Dr.</p>
                        <h5 className="pt-2 cc-form-input">{consultantName}</h5>
                      </div>
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
        </div>
        <DialogActions>
          <div className="modal-footer" style={{ width: "100%" }}>
            <Button
              className="btn cc-btn"
              onClick={() => {
                setIsOpenR(false);
                handleUpdate();
              }}
            >
              {translate("SAVE")}
            </Button>
          </div>
        </DialogActions>
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
          {translate("DIAG_PLAN")}
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
        <div style={{ width: "40vw" }}>
          <DialogContent>
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">
                    <img
                      src={link}
                      alt="Cloud Clinic Logo"
                      className="cc_logo"
                      style={{ height: "50px", width: "200px" }}
                    />
                    <div className="text-right">
                      <div className="w-100 d-flex align-items-baseline col-md-12 mt-2 px-4">
                        <p className="pb-2 pr-2 m-0 cc-form-label">Dr.</p>
                        <h5 className="pt-2 cc-form-input">{consultantName}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="form-group px-3">
                    {/* {transition1 ? (
                      <textarea
                        className="form-control border-0"
                        rows={5}
                        name="initialComplain"
                        placeholder={translate("ENTER_TEXT_HERE")}
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
                    ) : null} */}
                    <textarea
                      className="form-control border-0"
                      rows={5}
                      name="initialComplain"
                      placeholder={translate("ENTER_TEXT_HERE")}
                      value={data.initialComplain}
                      onChange={(e) => dataChange(e)}
                    />
                    <hr></hr>
                    <ConsultantDiagnosisData
                      cname={consultantName}
                      visitID={visitID}
                      patientID={patientNationalID}
                      consultantID={consultantNationalID}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
        <DialogActions>
          <div className="modal-footer" style={{ width: "100%" }}>
            {/* <button
              className="btn cc-btn"
              // onTouchStart={startListening}
              // onMouseDown={startListening}
              // onTouchEnd={stopListening}
              // onMouseUp={stopListening}
            >
              {translate("HOLD_TO_SPEAK")}
            </button> */}

            {/* <Button
              className="btn cc-btn"
              onClick={() => {
                printA(data.initialComplain);
              }}
            >
              {" "}
              <img
                src="avatars/printer.png"
                style={{ width: "20px", height: "20px" }}
              />
            </Button> */}
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
              className="btn cc-btnred"
              onClick={() => {
                setIsOpenAssessment(false);
              }}
            >
              {translate("CANCEL")}
            </Button>
            <Button
              className="btn cc-btn"
              onClick={() => {
                handleUpdate();
              }}
            >
              {translate("UPDATE")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
      <Dialog
        open={modalIsOpenDate}
        onClose={() => {
          data.isfollowup = false;
          setIsOpenDate(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{
            marginTop: "0px",
            color: "white",
            background: "#007bff",
          }}
          id="alert-dialog-title"
        >
          {"Follow up Timing"}
          <Button
            color="secondary"
            onClick={() => {
              data.isfollowup = false;
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
        <div style={{ width: "30vw" }}>
          <DialogContent>
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <div className="row py-3 mx-2 border-bottom d-flex justify-content-between">
                    <div className="text-right"></div>
                  </div>
                  <div className="form-group px-3">
                    <input
                      type="datetime-local"
                      onChange={dataChange}
                      className="form-control"
                      name="followupdatetime"
                      defaultValue={data.followupdatetime}
                    // value={new Date().toLocaleDateString("en-CA")}
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
              className="btn cc-btnred"
              onClick={() => {
                data.isfollowup = false;
                setIsOpenDate(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="btn cc-btn"
              onClick={() => {
                data.isfollowup = true;
                handleUpdate();
              }}
            >
              Update
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog
        open={modalIsOpenConsultation}
        onClose={() => {
          data.isConsultantRequired = false;
          setIsOpenConsultation(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{
            marginTop: "0px",
            color: "white",
            background: "#007bff",
          }}
          id="alert-dialog-title"
        >
          {"Consultation Needed"}
          <Button
            color="secondary"
            onClick={() => {
              data.isConsultantRequired = false;
              setIsOpenConsultation(false);
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
        <div style={{ width: "30vw" }}>
          <DialogContent>
            {/* <Autocomplete
              id="combo-box-demo"
              value={data.referredTo}
              options={Specialities}
              getOptionLabel={(option) => option.Speciality}
              // style={{ width: "28vw" }}
              onChange={(event, selected) => {
                set(selected?.Speciality || null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Speciality"
                  variant="outlined"
                  
                />
              )}
            /> */}
            <div>
              <select
                className="form-control font-weight-bold m-2 "
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
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}>
              <Button
                className="btn cc-btnred"
                onClick={() => {
                  data.isConsultantRequired = false;
                  setIsOpenConsultation(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="btn cc-btn"
                onClick={() => {
                  data.isConsultantRequired = true;
                  handleUpdate();
                }}
              >
                Update
              </Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={modalIsOpenLPrint}
        onClose={() => {
          setIsOpenLabTest(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="true"
      >
        <DialogContent>
          <div style={{ width: "95vw" }}>
            <div className="row py-3 mx-2 d-flex align-items-center">
              <img
                src={link}
                alt="Cloud Clinic Logo"
                style={{ height: "50px", width: "200px" }}
              />
              <div className="text-left pl-4">
                <p
                  className="pb-1 mb-1 h2 font-weight-bold"
                  style={{
                    color: "rgb(39, 122, 210)",
                    borderBottom: "2px solid rgb(39, 122, 210)",
                    paddingRight: "20px",
                  }}
                >
                  Dr. {consultantName}
                </p>
                <span className="text-dark">
                  M.S. (Ayurveda), P.H.D. (Ayurveda)
                </span>
                <br />
                <span className="text-dark">Medical Officer</span>
                <br />
                <span className="text-dark">Dept. of Oral Medicine</span>
              </div>
            </div>
            <div className="form-group px-3">
              <LabTestPrint labTestData={labTestData} pname={patientName} age={age} />
            </div>
            <div className="row pb-3 ml-5 d-flex align-items-center">
              <img
                src="https://rohanileader.com/wp-content/uploads/2020/09/tracking-icon-png-29.png"
                alt="Cloud Clinic Logo"
                style={{ height: "60px" }}
              />
              <div className="text-left pl-4">
                <span className="text-dark">123-456-7890, 444-324-3241</span>
                <br />
                <span className="text-dark">
                  Street Address Here, City Name
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={modalIsOpenPPrintNew}
        onClose={() => {
          setIsOpenPrescriptionNew(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="true"
      >
        <DialogContent>
          <div style={{ width: "95vw" }}>
            <div className="row py-3 mx-2 d-flex align-items-center">
              <img
                src={link}
                alt="Cloud Clinic Logo"
                style={{ height: "50px", width: "200px" }}
              />
              <div className="text-left pl-4">
                <p
                  className="pb-1 mb-1 h2 font-weight-bold"
                  style={{
                    color: "rgb(39, 122, 210)",
                    borderBottom: "2px solid rgb(39, 122, 210)",
                    paddingRight: "20px",
                  }}
                >
                  Dr. {consultantName}
                </p>
                <span className="text-dark">
                  M.S. (Ayurveda), P.H.D. (Ayurveda)
                </span>
                <br />
                <span className="text-dark">Medical Officer</span>
                <br />
                <span className="text-dark">Dept. of Oral Medicine</span>
              </div>
            </div>
            <div className="form-group px-3">
              <PrescriptionPrintNew P={P} pname={patientName} age={age} />
            </div>
            <div className="row pb-3 ml-5 d-flex align-items-center">
              <img
                src="https://rohanileader.com/wp-content/uploads/2020/09/tracking-icon-png-29.png"
                alt="Cloud Clinic Logo"
                style={{ height: "60px" }}
              />
              <div className="text-left pl-4">
                <span className="text-dark">123-456-7890, 444-324-3241</span>
                <br />
                <span className="text-dark">
                  Street Address Here, City Name
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
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
          <div style={{ width: "95vw" }}>
            <div className="row py-3 mx-2 d-flex align-items-center">
              <img
                src={link}
                alt="Cloud Clinic Logo"
                style={{ height: "50px", width: "200px" }}
              />
              <div className="text-left pl-4">
                <p
                  className="pb-1 mb-1 h2 font-weight-bold"
                  style={{
                    color: "rgb(39, 122, 210)",
                    borderBottom: "2px solid rgb(39, 122, 210)",
                    paddingRight: "20px",
                  }}
                >
                  Dr. {consultantName}
                </p>
                <span className="text-dark">
                  M.S. (Ayurveda), P.H.D. (Ayurveda)
                </span>
                <br />
                <span className="text-dark">Medical Officer</span>
                <br />
                <span className="text-dark">Dept. of Oral Medicine</span>
              </div>
            </div>
            <div className="form-group px-3">
              <PrescriptionPrint P={P} pname={patientName} age={age} />
            </div>
            <div className="row pb-3 ml-5 d-flex align-items-center">
              <img
                src="https://rohanileader.com/wp-content/uploads/2020/09/tracking-icon-png-29.png"
                alt="Cloud Clinic Logo"
                style={{ height: "60px" }}
              />
              <div className="text-left pl-4">
                <span className="text-dark">123-456-7890, 444-324-3241</span>
                <br />
                <span className="text-dark">
                  Street Address Here, City Name
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={modalIsOpenRPrint}
        onClose={() => {
          setIsOpenRPrint(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="true"
      >
        <DialogContent>
          <div style={{ width: "95vw" }}>
            <div className="row py-3 mx-2 d-flex align-items-center">
              <img
                src={link}
                alt="Cloud Clinic Logo"
                style={{ height: "50px", width: "200px" }}
              />
              <div className="text-left pl-4">
                <p
                  className="pb-1 mb-1 h2 font-weight-bold"
                  style={{
                    color: "rgb(39, 122, 210)",
                    borderBottom: "2px solid rgb(39, 122, 210)",
                    paddingRight: "20px",
                  }}
                >
                  Dr. {consultantName}
                </p>
                <span className="text-dark">
                  M.S. (Ayurveda), P.H.D. (Ayurveda)
                </span>
                <br />
                <span className="text-dark">Medical Officer</span>
                <br />
                <span className="text-dark">Dept. of Oral Medicine</span>
              </div>
            </div>
            <div className="form-group px-3">
              <ReportPrint P={P} pname={patientName} age={age} reportData={reportData} VitalSignView={VitalSignView} />
            </div>
            <div className="row pb-3 ml-5 d-flex align-items-center">
              <img
                src="https://rohanileader.com/wp-content/uploads/2020/09/tracking-icon-png-29.png"
                alt="Cloud Clinic Logo"
                style={{ height: "60px" }}
              />
              <div className="text-left pl-4">
                <span className="text-dark">123-456-7890, 444-324-3241</span>
                <br />
                <span className="text-dark">
                  Street Address Here, City Name
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VirtualMeetingPost;
