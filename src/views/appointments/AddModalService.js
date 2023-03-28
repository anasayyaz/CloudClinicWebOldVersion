import React, { useEffect, useContext } from "react";
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ReceiptPrint from "../Components/ReceiptPrint";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import {
  defaultDate,
  startEndDate,
  checkIsPast,
  endDate,
} from "../../_helper/functions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import DateTimePicker from "react-datetime-picker";
let image = localStorage.getItem("image");
let role = localStorage.getItem("role");
let name = JSON.parse(localStorage.getItem("user"));
let link = `https://cloudclinicdevapi.azurewebsites.net/images/${image}`;
let type, ID, speciality, Status, feeList,numID,doctorName,patientName,doctorSpeciality;
const AddEventModal = ({
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
  getVisits,
}) => {
  const { translate } = useContext(TranslationContext);
  const [modalIsOpenPaymentReceipt, setIsOpenPaymentReceipt] = React.useState(false);
  const [modalIsOpenPaymentReceiptPrint, setIsOpenPaymentReceiptPrint] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(moment().toDate());
  const [newStartDatePicker, setNewStartDatePicker] = React.useState(
    new Date()
  );
  const [startDatePast, setStartDatePast] = React.useState(false);
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
  const [amount, setAmount] = React.useState("");
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
  function handleAmountChange(event) {
    setAmount(event.target.value);
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
    //  console.log(e);
  }

  async function createVisit(event) {
    // console.log(event);

    toast.info("Creating Appointment...");
    post("visit", event)
      .then((response) => {
        toast.success("Appointment has been created successfully");
        setTimeout(() => {

          setIsOpenPaymentReceipt(true);
        }, 2000);
        getVisits();
        numID=response.data.id;
      })
      .catch((error) =>
        toast.error("there was an error creating the appointment")
      );
  }


  function printReceipt() {
    setIsOpenPaymentReceipt(false);
    setIsOpenPaymentReceiptPrint(true);
    setTimeout(() => {
      window.print();
    }, 2000);
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
    let event = {
      Title: Title,
      Patient_NationalID: nationalID || Patient,
      Consultant_NationalID: Consultant,
      SummaryNotes: SummaryNotes,
      StartDateTime: moment.parseZone(newStartDatePicker).format(), //StartDateTime.concat("T09:00:00-05:00"),
      EndDateTime: moment.parseZone(newEndDatePicker).format(), //EndDateTime.concat("T10:00:00-05:00")
      meetinglink: linkdata,
      VitalSignID: Vital,
      HistoryID: History,
      status: Status,
      meetingType: type,
      isConfirm: false,
      IsPaid: true,
      PaymentDate: moment.parseZone(newStartDatePicker).format(),
      Amount: amount,
      DiscountPerc: "0",
      NetAmount: amount,
      locationID: localStorage.getItem("locationID"),
    };
    // console.log(event);
    createVisit(event);

    handleClose();
    update(nationalID);
  };
  function getConsultantID(ID) {
    list(`physician/${ID}`).then((response) => {
      speciality = response.data.speciality;
      doctorName = response.data.name+" "+response.data.lastName
     
    });
    let x;
    list(`/physicianFee/getPhysicianFee/${ID}`).then((response) => {
      x = response.data;
      feeList =
        x.length > 0 &&
        x.map((item, i) => {
          return (
            <option key={i} value={item.feeID}>
              {item.fee}
            </option>
          );
        }, this);
      console.log(feeList);
      console.log(x)

    });
  }
  function update(id) {
    setPatient(id);
    data.isAppointmentSchedule = false;
    data["tag"] = "Appointment";
    put(`patient/updatePatientTag/${Patient}`, data)  .then((response) => {
   
    patientName=response.data.aspNetUser.firstName+" "+response.data.aspNetUser.lastName;
    });
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
    setNewStartDatePicker(eventStartDate);
    setNewEndDatePicker(eventEndDate);
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
      <ToastContainer />
      <Dialog
        open={modalIsOpenPaymentReceiptPrint}
        onClose={() => {
          setIsOpenPaymentReceiptPrint(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="true"
      >
        <DialogContent>
          <div style={{ width: "90vw" }}>
            <div className="row py-3 mx-2 d-flex align-items-center">
              <img
                src={link}
                alt="Cloud Clinic Logo"
                style={{ height: "90px" }}
              />

            </div>
            <div className="form-group px-3">
              <ReceiptPrint Title={Title}  std={newStartDatePicker} meetingType={type} amount={amount}  id={numID} patientName={patientName} doctorName={doctorName} speciality={speciality}/>
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
        open={modalIsOpenPaymentReceipt}
        onClose={() => {

          setIsOpenPaymentReceipt(false);



        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >

        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"

        >
          {"Payment Receipt"}
          <Button
            color="secondary"
            onClick={() => {
              setIsOpenPaymentReceipt(false);

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

            <>
              <h4>Do you want to print the payment receipt?</h4>
            </>
          </DialogContent>
          <DialogActions>
            <div className="modal-footer" style={{ width: "100%" }}>
              <Button
                className="btn btn-secondary"
                onClick={() => {
                  setIsOpenPaymentReceipt(false)
                }}
              >
                No
              </Button>
              <Button
                className="btn cc-btn"
                onClick={() => {
                  printReceipt();
                }}
              >
                Yes
              </Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
      <Modal show={checkTime && show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment</Modal.Title>
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
            <label htmlFor="Patient">{translate("PATIENT")}</label>
            <Autocomplete
              options={patientData}
              getOptionLabel={(patient) =>
                `${patient.name}  ${patient.lastName} - ${patient.phone}`
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
                `${physician.name} - ${physician.phone} - ${physician.speciality}`
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
            <label>Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="form-control"
            />
            {/* <select>{feeList}</select> */}
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
              <input name="isPrint" type="checkbox" />
              <label style={{ paddingLeft: "5px" }}>Print Receipt</label>
            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {translate("CLOSE")}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={
              newStartDatePicker < newEndDatePicker &&
                newStartDatePicker > currentDate
                ? false
                : true
            }
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddEventModal;
