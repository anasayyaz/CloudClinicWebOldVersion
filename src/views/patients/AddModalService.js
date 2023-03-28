import React, { useEffect } from "react";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SchedulerService from "./SchedulerService.js";
import list, {put, post} from '../../_helper/api';
import {defaultDate, startEndDate, checkIsPast, endDate} from "../../_helper/functions";


const AddEventModal = ({
  show,
  handleClose,
  calendars,
  patientData,
  physicianData,
  eventStartDate,
  getEvents,
  $class,
  nationalID
}) => {
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
    isAppointmentSchedule: false
  });
  const [validation, setValidation] = React.useState({
    checkPast: false,
    checkEnd: false,
  });
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleSummaryNotesChange(event) {
    setSummaryNotes(event.target.value);
  }
  function handleStartDateChange(event) {
    let valid = validation;
    valid.checkPast=checkIsPast(event.target.value, null);
    valid.checkEnd=checkIsPast(event.target.value, EndDateTime);
    setValidation(validation);
    setStartDate(event.target.value);
    setmeetinglink(event.target.value);
  }
  function handleEndDateChange(event) {
    setValidation({...validation, checkEnd:checkIsPast(StartDateTime ? StartDateTime : defaultDate(defaultStartDate), event.target.value)});
    setEndDate(event.target.value);
  }

  async function createVisit(event) {
    post("visit", event).then((response)=>{
      getEvents($class);
    });
  }
  function convertTZ(date, tzString) {
    return new Date(new Date(date).toLocaleString("en-US", {timeZone: tzString}));   
  }
  //Calendar List
  const handleSubmit = () => {
    var linkdata = new Date().getTime();
    let event = {
      Title: Title,
      Patient_NationalID: nationalID || Patient,
      Consultant_NationalID: Consultant,
      SummaryNotes: SummaryNotes,
      StartDateTime: moment.utc(StartDateTime).format(), //StartDateTime.concat("T09:00:00-05:00"),
      EndDateTime: moment.utc(EndDateTime).format(), //EndDateTime.concat("T10:00:00-05:00")
      meetinglink: linkdata,
      VitalSignID: Vital,
      HistoryID: History
    };
    let googleEvent = {
      title: Title,
      calendarId: calendar,
      summary: SummaryNotes,
      end: {
        dateTime: moment.utc(EndDateTime).format(), //'2014-07-28T23:00:00',//end,
        timeZone: "UTC",
      },
      start: {
        dateTime: moment.utc(StartDateTime).format(), //'2014-07-28T18:00:00',//start,
        timeZone: "UTC",
      },
    };
    let ss = new SchedulerService();

    let returnval = ss.AddThisEvent(googleEvent).then(
      function (response) {
        event.eventId = response.result.id;
        createVisit(event);
      },

      function (err) {
        console.error("Execute error", err);
      }
    );
  handleClose();
    data.isAppointmentSchedule = false;
    data.IsConsultantAppointmentSchedule=false;
    data['tag'] = "Appointment"
    put(`patient/updatePatientTag/${Patient}`, data);
  };
  function setDates(){
    let date = new Date(eventStartDate);
    let valid = validation;
    valid.checkPast=checkIsPast(startEndDate(date), null)
    valid.checkEnd=checkIsPast(startEndDate(date), startEndDate(date) + (30 * 60 * 1000))
    setDefaultStartDate(startEndDate(date))
    setDefaultEndDate(startEndDate(date))
    setStartDate(startEndDate(date, true))
    setEndDate(endDate(date))
    setValidation(valid);
  }
  useEffect(()=>{
    eventStartDate && setDates()
  },[eventStartDate])
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="Title">Visit Description</label>
            <input
              type="text"
              id="title"
              value={Title}
              onChange={handleTitleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Patient">Patient</label>
            <select
              value={nationalID}
              disabled={nationalID ? true : false}
              onChange={(val) => setPatient(val.target.value)}
              className="form-control"
            >
              <option value={null}>select a patient</option>
              {patientData &&
                patientData.length > 0 &&
                patientData.map((item, index) => {
                  return <option key={index} value={item.nationalID}>{item.name}</option>;
                })}
            </select>
          </div>
          {/* <div className="form-group">
            <label htmlFor="Patient">calendars</label>
            <select
              onChange={(val) => setcalendar(val.target.value)}
              className="form-control"
              value={calendar}
            >
              <option value={null}>select a Calendar</option>
              {calendars &&
                calendars.length > 0 &&
                calendars.map((items, index) => {
                  return <option key={index} value={items.value}>{items.name}</option>;
                })}
            </select>
          </div> */}
          <div className="form-group">
            <label htmlFor="Consultant">Consultant</label>
            <select
              onChange={(val) => {
                setConsultant(val.target.value)
                let clndr = physicianData.filter(data=> data.nationalID == val.target.value);
                setcalendar(clndr[0].calendarID)
              }}
              className="form-control"
            >
              <option value={null}>select a consultant</option>
              {physicianData &&
                physicianData.length > 0 &&
                physicianData.map((item, index) => {
                  return <option key={index} value={item.nationalID}>{item.name}</option>;
                })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="SummaryNotes">Summary Notes</label>
            <input
              type="text"
              id="summaryNotes"
              value={SummaryNotes}
              onChange={handleSummaryNotesChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="StartDateTime">Start Date</label>
            <input
              type="datetime-local"
              id="startDateTime"
              defaultValue={defaultDate(defaultStartDate)}
              onChange={handleStartDateChange}
              className="form-control"
            />
          <p className="text-danger" style={{display: validation.checkPast ? '' : 'none'}}>Start Date should not be past date</p>
          </div>
          <div className="form-group">
            <label htmlFor="EndDateTime">End Date</label>
            <input
              type="datetime-local"
              id="endDateTime"
              defaultValue={defaultDate(defaultEndDate + (30 * 60 * 1000))}
              onChange={handleEndDateChange}
              className="form-control"
            />
            <p className="text-danger" style={{display: validation.checkEnd ? '' : 'none'}}>End Date should be after start date</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}
          disabled={validation.checkPast || validation.checkEnd}
          >
            
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddEventModal;
