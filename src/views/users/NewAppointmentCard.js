import React, { useEffect, useState, useContext } from "react";
import {FcClock} from 'react-icons/fc';
import { useHistory } from "react-router-dom";
import VitalSigns from "../Components/VitalSigns";
import moment from 'moment';
import "./App.css";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import list, { put, post } from "../../_helper/api";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Col, Row, Table, ButtonToolbar } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./ccstyles.css";
import "./EditVitalSign.css";
import { FormControlLabel, Switch } from '@material-ui/core';
import TranslationContext from "../../context/translation";
import { getTabId } from "@material-ui/lab";
let vid;
var intake_monitoring = localStorage.getItem("intake_monitoring");

const NewAppointmentCard = (props) => {

  const { translate } = useContext(TranslationContext);
  const [modalIsOpenDate, setIsOpenDate] = React.useState(false);
  const [id, setId] = useState("");
  const [ir, setir] = useState("");
  const [rt, setrt] = useState("");
  const [userid, setuserid] = useState("");
  const [showPre,setPre]=useState(false);
  const [showPost,setPost]=useState(false);
  const history = useHistory();
  function formatDate (time) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join (''); // return adjusted time or original string
  }
  useEffect(() => {
 
 
    if(intake_monitoring=="PreMonitoring")
      {
        setPre(true);
        setPost(false);
      }
      else if(intake_monitoring=="PostMonitoring")
      {
        setPre(false);
        setPost(true);
      }
    });
  const handleUpdate = () => {
    
    setuserid(JSON.parse(localStorage.getItem("user")));
    
    put(`visit/sendRescheduleAppointmentEmail`, {
      IsRescheduled:true,
      RescheduleDatetime:rt,
      UserId:JSON.parse(localStorage.getItem("user")),
    })
  
    setIsOpenDate(false);
    toast.info("Email sent successfully to reschedule appointment");
  };
  const handleCancel = () => {
    
    setuserid(JSON.parse(localStorage.getItem("user")));
    post(`visit/sendCancelAppointmentEmail/${vid}`, {
      visitId:vid,
      UserId:userid,
    })

    
    toast.info("Email sent successfully to cancel appointment");
  };
  function dataChange(event) {
    // let [key, value, newData] = [
    //   event.target.name,
    //   event.target.value,
    //   { ...data },
    // ];

setrt(event.target.value);
setir(true);
    
  
    
  }

  function goToMeeting(type,id)
  {

    if(intake_monitoring=="PreMonitoring")
    {
    
   
      if(type=="Virtual")
    {
      history.push(`/meeting/virtual?VisitID=${id}`)
    }
    else
    { 
        history.push(`/meeting/inperson?VisitID=${id}`)
  }
}
else if(intake_monitoring=="PostMonitoring")
{
  
  if(type=="Virtual")
    {
      history.push(`/meeting/virtualpost?VisitID=${id}`)
    }
    else
    { 
        history.push(`/meeting/inpersonpost?VisitID=${id}`)
  }
}
  }
  function dataChange(event) {
    // let [key, value, newData] = [
    //   event.target.name,
    //   event.target.value,
    //   { ...data },
    // ];

setrt(event.target.value);
setir(true);
    
  
    
  }
  function getId(id)
  {
    vid=id;
    setIsOpenDate(true);
  }
  function getIdtocancel(id)
  {
    vid=id;
    handleCancel();
  }
  function getDuration(startTime, endTime, lunchTime){
    var start = moment(startTime, "HH:mm");
    var end = moment(endTime, "HH:mm");
    var minutes = end.diff(start, 'minutes');
    var interval = moment().hour(0).minute(minutes);
    interval.subtract(lunchTime, 'minutes');
    return interval.format("HH:mm");
}

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div>
      {props.data?.items?.map((data, index) => {
        return (
          <div className="col-md-12">

            <div className="card shadow px-3">
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-3 my-1 text-info font-weight-bold text-center">
                <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.isConfirm ? true : false}
                                         onChange={(e) => props.setConfirm(data.id,data.isConfirm)}
                                        color="primary"
                                    />
                                }
                                 label={data.isConfirm == 1  ? ( <span style={{fontSize: "12px"}}>Confirmed</span> ) : (<span style={{fontSize: "12px"}}>Unconfirmed</span>)}
                            />
                            <h4 className="m-0 pt-1 font-weight-bold ">{translate("VISIT_ID")}-{data.id}</h4>
                  <h4 className="m-0 font-weight-bold">{days[(new Date(data.startDateTime)).getDay()]}</h4>
                  <h2 className="m-0 font-weight-bold">

                  {month[(new Date(data.startDateTime)).getMonth()]}{" "}{data?.startDateTime?.split("-")[2]?.split("T")[0]}
                  </h2>
                  <h4 className="m-0 font-weight-bold">{data?.startDateTime?.split("-")[0]}</h4>
                  
                </div>
                <div className="col-lg-3 col-md-9 col-sm-9 my-1 border-left font-weight-bold">
                  <div>
                    <p className="text-dark font-weight-bold h4 m-0">
                      {" "}
                      {data?.consultantTitle} {". "} {data?.consultantFirstName}{" "}
                      {data?.consultantLastName}
                    </p>
                    <p className="text-dark m-0 h5 font-weight-bold">
                      <FcClock viewBox="0 0 50 50" />
                      {translate("ARRIVE_BY")} {""}
                      {new Date(data.startDateTime).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <img
                    src={`https://cloudclinicdevapi.azurewebsites.net/Profile/${data.physicinProfilImage}`}
                    height="70px"
                    width="70px"
                    className="mt-3"
                    style={{ objectFit: "cover", borderRadius: "2rem" }}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 my-1 border-left font-weight-bold">
                  <div>
                    <p className="text-dark font-weight-bold h4 m-0">
                      {data.title}
                    </p>
                    <p className="text-dark font-weight-bold h5 pt-2">{data.patientName}</p>
                  </div>
                  <div className="d-flex align-items-center pt-3">
                    <div className="col-lg-5 col-md-6 col-sm-6">
                      <img
                        src= {`https://cloudclinicdevapi.azurewebsites.net/Profile/${data.patientProfilImage}`}
                        height="70px"
                        width="70px"
                        style={{ objectFit: "cover", borderRadius: "2rem" }}
                      />
                    </div>
                    <div className="col-lg-7 col-md-6 col-sm-6">
                      <button
                        className={`w-100 btn cc-btn btn-sm btn-primary mb-2 ${
                          data.historystatus == "Intake History filled"
                            ? "btn-secondary"
                            : "btn-primary"
                        }`}
                        onClick={() => history.push(`/EditHistory/${data.id}`)}
                        disabled={
                          data.historystatus == "Intake History filled"
                            ? true
                            : false
                        }
                      >
                        {translate("INTAKE_HISTORY")}
                      </button>
                      <button
                        className="w-100 btn cc-btn btn-sm btn-primary"
                        onClick={() => {
                          {
                            data.vitalsignStatus != "VitalSigns filled" &&
                              toast.info(
                                "Kindly Upload Vital Signs Using Tablet!"
                              );
                          }
                          setId(data.id);
                        }}
                        data-toggle={
                          data.vitalsignStatus == "VitalSigns filled" && "modal"
                        }
                        data-target={
                          data.vitalsignStatus == "VitalSigns filled" &&
                          "#vitalSignsModal"
                        }
                      >
                        {translate("VITAL_SIGNS")}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 my-1 border-left pr-md-4 text-center">
                { showPre ?   ( 
                <button
                    className={`w-100 btn cc-btn btn-primary mb-2 mt-4 ${
                      data.meetingInitiate == "true"
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                    onClick={() =>
                      goToMeeting(data.meetingtype,data.id)
                       }
                    disabled={
                      data.meetingInitiate == "true" ? false : true
                    }
                  >
                    {translate("START_MEETING")}
                  </button>
                    ) : null }
                      { showPost ?   ( 
                <button
                    className="w-100 btn cc-btn btn-primary mb-2 mt-4"
                    onClick={() =>
                      goToMeeting(data.meetingtype,data.id)
                       }
                   
                  >
                    {translate("START_MEETING")}
                  </button>
                    ) : null }
                  <div className="d-flex jusitfy-content-between mb-1">
                    <button
                      className="w-100 btn cc-btn btn-sm btn-primary mr-1"
                      onClick={() => props.getDocuments(data.id)}
                    >
                      {translate("IMAGE_LAB_REPORTS")}
                    </button>
                    <button
                      className="w-100 btn cc-btn btn-sm btn-primary ml-1"
                      onClick={() => props.uploadDocuments(data.id)}
                    >
                      {translate("UPLOAD_DOCUMENTS")}
                    </button>
                  </div>
                  <div className="d-flex jusitfy-content-between mb-1">
                  <button
                      className="w-100 btn  btn-sm btn-danger mr-1"
                      // onClick={() => props.getDocuments(data.id)}
                      onClick={() => {
                        getIdtocancel(data.id);
                      }}
                    >
                      {translate("CANCEL_MEETING")}
                    </button>
                    <button
                      className="w-100 btn cc-btn btn-sm btn-info ml-1"
                      // onClick={(data) => props.uploadDocuments(data.id)}
                      onClick={() => {
                        getId(data.id);
                      }}
                    >
                      {translate("RESCHEDULE_MEETING")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
<Dialog
        open={modalIsOpenDate}
        onClose={() => {
          setIsOpenDate(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <div style={{ width: 700 }}>
          <DialogTitle
            style={{ marginTop: "0px", zIndex: "9999", color: "white", background: "#007bff" }}
            id="alert-dialog-title"
          >
            {translate("RESCHEDULE_MEETING")}
          </DialogTitle>
          <DialogContent>
            <div className="modal-body pb-3 cc-bg-light-grey">
         
                <div className="col-md-12">
                  
                  <div className="form-group px-3">
                    <input
                      type="datetime-local"
                      onChange={dataChange}
                      className="form-control"
                      name="rt"
                    />
                  </div>
                </div>
         
            </div>
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}>
              <Button
                className="btn-danger"
                onClick={() => {
                  setIsOpenDate(false);
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
        </div>
      </Dialog>
      <div
        class="modal fade"
        id="vitalSignsModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {translate("VITAL_SIGNS")}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <VitalSigns consultant={id} />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                {translate("CLOSE")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppointmentCard;
