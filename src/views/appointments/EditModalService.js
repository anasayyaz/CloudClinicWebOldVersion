import React, { useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SchedulerService from "./SchedulerService.js";
import list, { put, del } from "../../_helper/api";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import TranslationContext from "../../context/translation";

const EditEventModal = ({
  show,
  handleClose,
  thisSummaryNotes,
  thisStartDateTime,
  thisEndDateTime,
  thisEventId,
  thisTitle,
  calendars,
  patientData,
  physicianData,
  events,
  patient_NationalID,
  consultant_NationalID,
  calendarId,
  historyID,
  vitalSignID,
  $class,
}) => {
  const [EventId, setEventId] = React.useState(EventId);
  useEffect(() => {
    setEventId(thisEventId);
  }, [thisEventId]);

  // console.log(EventId);
  // console.log(events);
  const { translate } = useContext(TranslationContext);
  const [Patient, setPatient] = React.useState(patient_NationalID);
  const [History, setHistory] = React.useState(historyID);
  const [Vital, setVital] = React.useState(vitalSignID);
  const [Consultant, setConsultant] = React.useState(consultant_NationalID);
  const [SummaryNotes, setSummaryNotes] = React.useState(thisSummaryNotes);
  const [Title, setTitle] = React.useState(thisTitle);
  const [calendar, setcalendar] = React.useState(null);
  const [history_list, setHistoryList] = React.useState([]);
  const [vital_list, setVitalList] = React.useState([]);
  useEffect(() => {
    setTitle(thisTitle);
  }, [thisTitle]);

  useEffect(() => {
    setSummaryNotes(thisSummaryNotes);
  }, [thisSummaryNotes]);

  const [StartDateTime, setStartDate] = React.useState(thisStartDateTime);
  useEffect(() => {
    setStartDate(thisStartDateTime);
  }, [thisStartDateTime]);

  const [EndDateTime, setEndDate] = React.useState(thisEndDateTime);
  useEffect(() => {
    setEndDate(thisEndDateTime);
  }, [thisEndDateTime]);

  const [newStartDatePicker, setNewStartDatePicker] = React.useState(
    new Date(StartDateTime)
  );
  const [newEndDatePicker, setNewEndDatePicker] = React.useState(
    new Date(EndDateTime)
  );

  // console.log(
  //   "HELLO THIS IS THE PREVIOUS DATES OF EVENT: ",
  //   "&nbsp;",
  //   EndDateTime
  // );

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleConsultantChange(event) {
    setConsultant(event.target.value);
  }
  function handlePatientChange(event) {
    setPatient(event.target.value);
  }
  function handleSummaryNotesChange(event) {
    setSummaryNotes(event.target.value);
  }
  function handleStartDateChange(e) {
    setNewStartDatePicker(e);
  }
  function handleEndDateChange(e) {
    setNewEndDatePicker(e);
  }

  const handleDelete = () => {
    deleteVisit();
    handleClose();
  };

  const handleSubmit = () => {
    let event = {
      EventId: EventId,
      Title: Title,
      SummaryNotes: SummaryNotes,
      Patient_NationalID: Patient,
      Consultant_NationalID: Consultant,
      VitalSignID: Vital,
      HistoryID: History,
      StartDateTime: newStartDatePicker, //StartDateTime.concat("T09:00:00-05:00"),
      EndDateTime: newEndDatePicker, //EndDateTime.concat("T10:00:00-05:00")
    };
    updateVisit(event);
    handleClose();
  };

  function updateVisit(event) {
    // console.log(event);
    put(`visit/updateEvent/${EventId}`, event).then((res) => {
      // console.log(res);
      window.location.reload();
    });
  }

  function deleteVisit() {
    del(`visit/${EventId}`).then((response) => {
      // console.log(response);
      window.location.reload();
    });
  }

  const checkStartTime = newStartDatePicker >= new Date();
  const checkEndTime = newEndDatePicker > newStartDatePicker;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{translate("EDIT_APPOINTMENT")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="Title">{translate("TITLE")}</label>
            <input
              type="text"
              id="title"
              value={Title}
              onChange={handleTitleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Patient">{translate("PATIENT")}</label>
            <select
              onChange={(val) => setPatient(val.target.value)}
              value={Patient ? Patient : patient_NationalID}
              className="form-control"
            >
              <option value={null}>select a patient</option>
              {patientData &&
                patientData.length > 0 &&
                patientData.map((item) => {
                  return <option value={item.nationalID}>{item.name}</option>;
                })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Consultant">{translate("DOCTOR")}</label>
            <select
              onChange={(val) => {
                setConsultant(val.target.value);
                let clndr = physicianData.filter(
                  (data) => data.nationalID == val.target.value
                );
                setcalendar(clndr[0].calendarId);
              }}
              value={Consultant ? Consultant : consultant_NationalID}
              className="form-control"
            >
              <option value={null}>select a consultant</option>
              {physicianData &&
                physicianData.length > 0 &&
                physicianData.map((item) => {
                  return <option value={item.nationalID}>{item.name}</option>;
                })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="SummaryNotes">{translate("SUMMARY_NOTES")}</label>
            <input
              type="text"
              id="summaryNotes"
              value={SummaryNotes}
              onChange={handleSummaryNotesChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="StartDateTime">{translate("START_DATE")}</label>
            {/* {console.log(newStartDatePicker, "start", newEndDatePicker)} */}
            <DateTimePicker
              value={newStartDatePicker}
              onChange={(e) => {
                handleStartDateChange(e);
              }}
              format="MM-dd-yyyy hh:mm a"
              className="form-control"
            />
            <p
              className="text-danger"
              style={{ display: !checkStartTime ? "" : "none" }}
            >
              {translate("START_DATETIME_PAST_DATETIME")}
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="EndDateTime">{translate("END_DATE")}</label>
            <DateTimePicker
              value={newEndDatePicker}
              onChange={(e) => {
                handleEndDateChange(e);
              }}
              format="MM-dd-yyyy hh:mm a"
              className="form-control"
            />
            <p
              className="text-danger"
              style={{ display: !checkEndTime ? "" : "none" }}
            >
              {translate("END_DATETIME_AFTER_DATETIME")}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {translate("CLOSE")}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
          {translate("DELETE")}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (Title && Patient) {
                handleSubmit();
              }
            }}
            disabled={!checkStartTime || !checkEndTime}
          >
            {/* {console.log(checkStartTime, "....start")}
            {console.log(checkEndTime, "....end")} */}
            {translate("UPDATE")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditEventModal;
