import React, { useEffect,useContext } from "react";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SchedulerService from "./SchedulerService.js";
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

let type, ID, speciality, Status;
const AddEventModalSlots = ({
  show,
  handleClose,
  calendars,
  patientData,
  physicianData,
  eventStartDate,
  eventEndDate,
  getEvents,
  $class,
  nationalID,
}) => {
  const [newStartDatePicker, setNewStartDatePicker] = React.useState(
    new Date()
  );
  const { translate } = useContext(TranslationContext);
  const [newEndDatePicker, setNewEndDatePicker] = React.useState(new Date());
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
  function handleStartDateChange() {
    let valid = validation;
    valid.checkPast = checkIsPast(newStartDatePicker, null);
    valid.checkEnd = checkIsPast(newStartDatePicker, EndDateTime);
    setValidation(validation);
    setStartDate(newStartDatePicker);
    setmeetinglink(newStartDatePicker);
  }
  function handleEndDateChange() {
    setValidation({
      ...validation,
      checkEnd: checkIsPast(
        StartDateTime ? StartDateTime : defaultDate(defaultStartDate),
        newEndDatePicker
      ),
    });
    setEndDate(newEndDatePicker);
  }

  async function createVisit(event) {
    post("visit", event).then((response) => {
      // getEvents($class);
      // console.log(response);
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
    if (speciality == "FAMILY PHYSICIAN" && type == "Inperson") {
      Status = 0; //nurse & physician
    } else if (speciality != "FAMILY PHYSICIAN" && type == "Virtual") {
      Status = 1; //consultant & nurse
    } else if (speciality != "FAMILY PHYSICIAN" && type == "Inperson") {
      Status = 2; //consultant & nurse
    } else if (speciality == "FAMILY PHYSICIAN" && type == "Virtual") {
      Status = 3; //nurse & physciaian
    }
    // else if (speciality != "FAMILY PHYSICIAN" && type == "Virtual") {
    //   Status = 4;
    // }

    let event = {
      Title: Title,
      Patient_NationalID: nationalID || Patient,
      Consultant_NationalID: Consultant,
      SummaryNotes: SummaryNotes,
      StartDateTime: moment.parseZone(StartDateTime).format(), //StartDateTime.concat("T09:00:00-05:00"),
      EndDateTime: moment.parseZone(EndDateTime).format(), //EndDateTime.concat("T10:00:00-05:00")
      meetinglink: linkdata,
      VitalSignID: Vital,
      HistoryID: History,
      status: Status,
      meetingType: type,
    };
    
    createVisit(event);

    handleClose();
    update(nationalID);
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
    put(`patient/updatePatientTag/${Patient}`, data);
  }
  function setDates() {
    let date = new Date(eventStartDate);
    let valid = validation;
    valid.checkPast = checkIsPast(startEndDate(date), null);
    valid.checkEnd = checkIsPast(
      startEndDate(date),
      startEndDate(date) + 30 * 60 * 1000
    );
    setDefaultStartDate(startEndDate(date));
    setDefaultEndDate(startEndDate(date));
    setStartDate(startEndDate(date, true));
    setEndDate(endDate(date));
    setValidation(valid);
  }
  useEffect(() => {
    eventStartDate && setDates();
  }, [eventStartDate]);

  function setMeetingType(e) {
    type = e.target.value;
  }

  const newStartDate = Date(Date.parse(defaultDate(defaultStartDate)));
  const newEndDate = Date(
    Date.parse(defaultDate(defaultEndDate + 30 * 60 * 1000))
  );
  const checkTime = new Date(eventStartDate).getTime() > new Date().getTime();
  return (
    <>
      <Modal show={checkTime && show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{translate("CREATE_SLOT")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="Title">{translate("VISIT_DESCRIPTION")}</label>
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
            <Autocomplete
              options={patientData}
              getOptionLabel={(patient) =>
                `${patient.name} - ${patient.phone}`
              }
              onChange={(event, selected) => {
                setPatient(selected?.nationalID || null);
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Consultant">{translate("DOCTOR")}</label>
            <Autocomplete
              options={physicianData}
              getOptionLabel={(physician) =>
                `${physician.name} - ${physician.nationalID} - ${physician.speciality}`
              }
              onChange={(event, selected) => {
                setConsultant(selected?.nationalID || null);
                let clndr = physicianData.filter(
                  (data) => data.nationalID == selected?.nationalID
                );
                setcalendar(clndr[0].calendarID);
                getConsultantID(selected?.nationalID);
              }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
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
            <label htmlFor="StartDateTime">{translate("START_TIME")}</label>
            <DateTimePicker
              value={newStartDatePicker}
              onChange={(e) => {
                setNewStartDatePicker(e);
                handleStartDateChange();
              }}
              format="MM-dd-yyyy hh:mm a"
              className="form-control"
            />
            <p
              className="text-danger"
              style={{ display: validation.checkPast ? "" : "none" }}
            >
              {translate("START_DATETIME_PAST_DATETIME")}
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="EndDateTime">{translate("END_TIME")}</label>
            <DateTimePicker
              value={newEndDatePicker}
              onChange={(e) => {
                setNewEndDatePicker(e);
                handleEndDateChange();
              }}
              format="MM-dd-yyyy hh:mm a"
              className="form-control"
            />
            <p
              className="text-danger"
              style={{ display: validation.checkEnd ? "" : "none" }}
            >
              {translate("END_DATETIME_AFTER_DATETIME")}
            </p>
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          {translate("CLOSE")}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={validation.checkPast || validation.checkEnd}
          >
            {translate("SAVE")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddEventModalSlots;
