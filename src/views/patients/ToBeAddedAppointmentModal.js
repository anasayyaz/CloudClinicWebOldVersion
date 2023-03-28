import React, { useEffect, useContext} from "react";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import list, { put, post } from "../../_helper/api";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TranslationContext from "../../context/translation";
import {
  defaultDate,
  startEndDate,
  checkIsPast,
  endDate,
} from "../../_helper/functions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import DateTimePicker from "react-datetime-picker";
import { ToastContainer, toast } from "react-toastify";
import { faSleigh } from "@fortawesome/free-solid-svg-icons";
let type, ID, speciality, Status;
let userid=JSON.parse(localStorage.getItem("user"));
const ToBeAddedAppointmentModal = (props) => {

  const { translate } = useContext(TranslationContext);
  const [currentDate, setCurrentDate] = React.useState(moment().toDate());
  const [newStartDatePicker, setNewStartDatePicker] = React.useState(
    new Date()
  );
  const [startDatePast, setStartDatePast] = React.useState(false);

  const [newEndDatePicker, setNewEndDatePicker] = React.useState(new Date(newStartDatePicker.getTime() + 30 * 60 * 1000));
  const [Title, setTitle] = React.useState("");
  const [SummaryNotes, setSummaryNotes] = React.useState("");
  const [Consultant, setConsultant] = React.useState(null);
  const [Patient, setPatient] = React.useState(null);
  const [History, setHistory] = React.useState(null);
  const [Vital, setVital] = React.useState(null);
  const [StartDateTime, setStartDate] = React.useState();
  const [EndDateTime, setEndDate] = React.useState();
  const [meetinglink, setmeetinglink] = React.useState(new Date(""));
  const [calendar, setcalendar] = React.useState("");
  const [defaultStartDate, setDefaultStartDate] = React.useState();
  const [defaultEndDate, setDefaultEndDate] = React.useState();
  const [selectedValue, setSelectedValue] = React.useState("");
  const [data, setData] = React.useState({
    nationalID: "",
    name: "",
    dob: "",
    address: "",
    phone: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
    isDeleted: false,
    isAppointmentSchedule: false,
  });
  const [validation, setValidation] = React.useState({
    checkPast: false,
    checkEnd: false,
  });
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleSummaryNotesChange(event) {
    setSummaryNotes(event.target.value);
  }
  function handleStartDateChange(e) {
    if (e < currentDate) {
      setStartDatePast(true);
    } else {
      setNewStartDatePicker(e);
      // console.log(e);
    }
  }

  function handleEndDateChange(e) {
    setValidation({
      ...validation,
      checkEnd: checkIsPast(
        StartDateTime ? StartDateTime : defaultDate(defaultStartDate),
        e
      ),
    });
    setNewEndDatePicker(e);
    setEndDate(e);
    // console.log(e);
  }

  async function createVisit(event) {
      console.log(event);
      post(`visit/sendAppointmentRequest/${userid}`, event).then((response) => {
      console.log(response);
      // window.location.reload();
    });
  }
  function convertTZ(date, tzString) {
    return new Date(
      new Date(date).toLocaleString("en-US", { timeZone: tzString })
    );
  }
  //Calendar List
  const handleSubmit = () => {
    var linkdata = new Date().getTime();
    // if (speciality == "FAMILY PHYSICIAN" && type == "Inperson") {
    //   Status = 0; //nurse & physician
    // } else if (speciality != "FAMILY PHYSICIAN" && type == "Virtual") {
    //   Status = 1; //consultant & nurse
    // } else if (speciality != "FAMILY PHYSICIAN" && type == "Inperson") {
    //   Status = 2; //consultant & nurse
    // } else if (speciality == "FAMILY PHYSICIAN" && type == "Virtual") {
    //   Status = 3; //nurse & physciaian
    // }
      let event = {
      Title: Title,
      Patient_NationalID: userid,
      Consultant_NationalID: Consultant,
      SummaryNotes: Title,
      StartDateTime: moment.parseZone(newStartDatePicker).format(), //StartDateTime.concat("T09:00:00-05:00"),
      EndDateTime: moment.parseZone(newEndDatePicker).format(), //EndDateTime.concat("T10:00:00-05:00")
      meetinglink: linkdata,
      // VitalSignID: Vital,
      // HistoryID: History,
      status: 11,
      meetingType: type,
      isConfirm: false,
      locationID: localStorage.getItem("locationID"),
    };
    // console.log(event);
    createVisit(event);
    update("ed749b1f-7bfc-45f8-9550-fd991b1e5144");
  
   
    
     
  };
  function getConsultantID(ID) {
    list(`physician/${ID}`).then((response) => {
      speciality = response.data.speciality;
    });
  }
  function update(id) {
    setPatient(id);
    data.isAppointmentSchedule = false;
    data["tag"] = "Appointment";
    put(`patient/updatePatientTag/${id}}`, data);
    put(`visit/updateVisit/${props.vid}`, {
    // isRescheduled:false,
    isConsultantRequired:false,
    isfollowup:false,
    rescheduleDatetime:null,

      status: 11,
      IsConsultantAppointmentSchedule: true,
    });
    toast.info("Appointment created successfully!");
    
    setTimeout(() => {
 window.location.reload();
    }, 1000);
  }

  



  // useEffect(() => {
    
  //   let dt = new Date();
  //   dt = new Date(dt.getTime() + 30 * 60 * 1000)
    
  //   setNewEndDatePicker(dt);
 

       
  // })
 

  function setMeetingType(e) {
    type = e.target.value;
  }

  const newStartDate = Date(Date.parse(defaultDate(defaultStartDate)));
  const newEndDate = Date(
    Date.parse(defaultDate(defaultEndDate + 30 * 60 * 1000))
  );
  const checkTime = new Date().getTime() > new Date().getTime();

  return (
   
    <>
            <ToastContainer />
          <div className="form-group">
            <label htmlFor="Title">Reason</label>
            <input
              type="text"
              id="title"
              value={Title}
              onChange={handleTitleChange}
              className="form-control"
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="Patient">{translate("PATIENT")}</label>
            <input
              type="text"
              id="patient"
              value={props.pname}
              className="form-control"
              disabled= {true}
            />
          </div> */}
  
            <div className="form-group">
            <label htmlFor="Consultant">{translate("DOCTOR")}</label>
           
               
            <Autocomplete
              options={props.specialityData}
              getOptionLabel={(physician) =>
                `${physician.name} - ${physician.phone} - ${physician.speciality})`
              }
              onChange={(event, selected) => {
                setConsultant(selected?.nationalID || null);
                getConsultantID(selected?.nationalID);
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </div>
         
          {/* <div className="form-group">
            <label htmlFor="SummaryNotes">{translate("SUMMARY_NOTES")}</label>
            <input
              type="text"
              id="summaryNotes"
              value={SummaryNotes}
              onChange={handleSummaryNotesChange}
              className="form-control"
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="StartDateTime">{translate("START_TIME")}</label>
            <DateTimePicker
              minDate={currentDate}
              value={newStartDatePicker}
              onChange={(e) => handleStartDateChange(e)}
              format="MM-dd-yyyy hh:mm a"
              className="form-control"
            />
            {newStartDatePicker < currentDate ? (
              <p className="text-danger">
                {translate("START_DATETIME_PAST_DATETIME")}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label htmlFor="EndDateTime">{translate("END_TIME")}</label>
            {/* {console.log(newEndDatePicker)} */}
            <DateTimePicker
              minDate={newStartDatePicker}
              value={newEndDatePicker}
              onChange={(e) => handleEndDateChange(e)}
              format="MM-dd-yyyy hh:mm a"
              className="form-control"
            />
            {newStartDatePicker < newEndDatePicker ? (
              " "
            ) : (
              <p className="text-danger">
                {translate("END_DATETIME_AFTER_DATETIME")}
              </p>
            )}
          </div>
          <div className="form-group">
            <div onChange={(e) => setMeetingType(e)}>
              <Radio
                type="radio"
                color="default"
                onChange={handleChange}
                checked={selectedValue === "Inperson"}
                value="Inperson"
                name="MeetingType"
              />{" "}
              In-person
              <Radio
                type="radio"
                color="default"
                onChange={handleChange}
                checked={selectedValue === "Virtual"}
                value="Virtual"
                name="MeetingType"
              />{" "}
              Virtual
            </div>
            {/* <div class="float-right">
              <input name="isFever" type="checkbox" />
              <label style={{ paddingLeft: "5px" }}>At Home</label>
            </div> */}
          </div>
        
     
          {/* <Button class="btn secondary" onClick={() => props.close()}>
          {translate("CLOSE")}
          </Button> */}
          <Button
            className="cc-btn btn w-100"

            onClick={handleSubmit}
            // disabled={
            //   newStartDatePicker < newEndDatePicker &&
            //   newStartDatePicker > currentDate
            //     ? false
            //     : true
            // }
          >
            Submit
          </Button>
       
    </>
  );
};
export default ToBeAddedAppointmentModal;
