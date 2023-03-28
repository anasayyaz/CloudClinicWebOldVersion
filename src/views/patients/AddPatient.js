import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { post } from "../../_helper/api";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import PopUp from "../Components/PopUp";
import * as functions from "../../_helper/functions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ReactPhoneInput from "react-phone-input-2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/material.css";
import MuiPhoneNumber from "material-ui-phone-number";
import list from "../../_helper/api";
import { v4 as uuidv4 } from "uuid";
import Spinner from 'react-bootstrap/Spinner';
import DateTimePicker from "react-datetime-picker";
import { TextField, withStyles } from "@material-ui/core";
import TranslationContext from "../../context/translation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-config";
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

import { alertTitleClasses } from "@mui/material";
import { TramOutlined } from "@material-ui/icons";
let userid = JSON.parse(localStorage.getItem("user"));
let wardData,
  currentDate = new Date(),
  wardID;
export default class AddPatient extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      Name: true,
      // NationalID: true,
      Email: true,
      LastName: true,
      GuardianName: true,
      DOB: true,
    };
    this.alert = {
      open: false,
      severity: "error",
      message: "",
      title: "error",
    };
    this.state = {
      loading: false,
      validatePhone: false,
      identificationNo: "",
      mrNumber: "",
      NationalID: "",
      title: "",
      titles: "",
      Name: "",
      LastName: "",
      DOB: "",
      age: "",
      Gender: "",
      Address: "",
      phone: "",
      GuardianName: " ",
      GuardianPhone: " ",
      Email: "",
      inHospital: "",
      validate: this.validate,
      alert: this.alert,
      IsConsultantAppointmentSchedule: false,
      IsAppointmentSchedule: true,
      isfollowup: false,
      AccountNo: " ",
      modalWard: false,
      checkWard: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
  }
  handleOnChange = (value) => {
    console.log(value);
    this.setState({ phone: value }, () => {});
  };

  getDate(d) {
    return (
      d.getFullYear() +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + d.getDate()).slice(-2)
    );
  }

  findDayDifference(date1, date2) {
    // always round down
    return Math.floor(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  }
  handleChange(event) {
    let { validate } = this.state;

    if (event.target.id === "age") {
      let x = new Date().getFullYear();
      x = x - event.target.value;
      var d = new Date(x, 11, 17);

      this.setState({ DOB: this.getDate(d) });
    }
    if (event.target.id === "DOB") {
      //  alert(event.target.value)
      let x = event.target.value;
      let y = x.split("-")[0];
      let a = new Date().getFullYear();

      let b = a - y;

      this.setState({ age: b });
    }

    if (!validate.Name && event.target.id === "Name") {
      validate["Name"] = !this.state.Name
        ? false
        : functions.validateName(event.target.value)
        ? true
        : false;
      this.setState({ validate });
    }
    if (!validate.dob && event.target.id === "DOB") {
      validate["DOB"] = !this.state.DOB
        ? false
        : functions.validateDateOfBirth(event.target.value)
        ? true
        : false;
      this.setState({ validate });
    }
    if (!validate.LastName && event.target.id === "LastName") {
      validate["LastName"] = !this.state.LastName
        ? false
        : functions.validateName(event.target.value)
        ? true
        : false;
      this.setState({ validate });
    }
    // if (!validate.Phone && event.target.id === "Phone") {
    //   validate['LastName'] = !this.state.LastName ? false : this.checkPhone() ? true : false;
    //     this.setState({ validate })

    // }
    if (event.target.id === "Email" && !validate.Email) {
      validate["Email"] = !this.state.Email
        ? false
        : functions.validateEmail(event.target.value)
        ? true
        : false;
      this.setState({ validate });
    }
    this.setState({ [event.target.id]: event.target.value });
  }
  handlePhone(val) {
    this.setState({ phone: val });
  }
  componentDidMount = () => {
    list("ward")
      .then((response) => {
        wardData = response.data;
      })
      .catch((error) => {
        if (error.response.data == "Record not found in system") {
          this.setState({ checkWard: true });
        }
      });
  };
  setWard(val) {
    wardID = val;
  }
  onCreatePatient = () => {
    //  alert(this.state.phone)
    // alert( this.state.phone.replace(/\D/g, ""))
    if (
      this.state.phone.replace(/\D/g, "").length != 11 &&
      this.state.phone.replace(/\D/g, "").length != 12
    ) {
      this.setState({ validatePhone: true });
    } else {
      this.setState({ validatePhone: false });
    }
    
    this.setState({Email: this.state.Email.toLowerCase().replace(/\s/g, '')})
    this.setState({ nationalID: uuidv4() });
    this.setState({ phone: this.state.phone.replace(/\D/g, "") });
    let { validate } = this.state;
    if (!this.state.Name) {
      // validate['NationalID'] = !this.state.NationalID ? false : functions.validateNationalID(this.state.NationalID) ? true : false;
      validate["Name"] = !this.state.Name
        ? false
        : functions.validateName(this.state.Name)
        ? true
        : false;
      // validate['Email'] = !this.state.Email ? false : functions.validateEmail(this.state.Email) ? true : false;
      validate["LastName"] = !this.state.Name
        ? false
        : functions.validateName(this.state.Name)
        ? true
        : false;
      // validate["DOB"] = !this.state.DOB
      //   ? false
      //   : functions.validateDateOfBirth(this.state.DOB)
      //   ? true
      //   : false;
      this.setState({ validate });
    } else {
      this.setState({ phone: this.state.phone.replace(/\D/g, "") });
      this.setState({loading: true });
      
      post("accounts/create", {
        ...this.state,
        email: this.state.Email,
        userName: this.state.Email,
        titles: this.state.titles,
        firstName: this.state.Name,
        lastName: this.state.LastName,
        roleName: "Patient",
        phoneNumber: this.state.phone.replace(/\D/g, ""),
        address: this.state.Address,
        IsActive: TramOutlined,
        ProfileImage: "cloudclinic_dummy.jpg",
        CreatedBy: userid,
        CreatedOn: new Date(),
      })
        .then((response) => {
          post("patient", {
            ...this.state,
            userID: response.data.id,
            wardID: wardID,
            mrNumber: this.state.mrNumber,
            inHospital: this.state.inHospital,
            IsActive: true,
            ProfileImage: "cloudclinic_dummy.jpg",
            CreatedBy: userid,
            CreatedOn: new Date(),
          })
            .then((response) => {
              this.setState({
                alert: {
                  open: true,
                  severity: "success",
                  message: "Patient successfully added",
                  title: "Success",
                },
              });
              setTimeout(() => {
                this.props.history.push("/patients/Patients");
              }, 2000);
            })
            .catch((error) => {
              if (error.response?.status === 409) {
                this.setState({
                  alert: {
                    open: true,
                    severity: "error",
                    message: "Patient with same ID already exists",
                    title: "Error",
                  },
                });
              } else {
                this.setState({
                  alert: {
                    open: true,
                    severity: "error",
                    message: error.response.data,
                    title: "Error",
                  },
                });
              }
            });
        })
        .catch((error) => {
          let domain = localStorage.getItem("domain");
          if (
            error.response.data.modelState[""][0] ==
            "Email cannot be null or empty."
          ) {
              this.setState({   Email:  domain+"-"+this.state.Name+"-"+this.state.nationalID+"@dummy.com"  });
            this.onCreatePatient();
          } else {
            
            this.setState({
              alert: {
                open: true,
                severity: "error",
                message: error.response?.data?.modelState[""][0],
                title: "Error",
              },
            });
          }
        });
    }

    let fcmemail = localStorage.getItem("domain") + "-" + this.state.Email;
    const user = createUserWithEmailAndPassword(auth, fcmemail, fcmemail)
      .then((userCredential) => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (value) {
      this.setState({ modalWard: true });
    }
    this.setState({
      [name]: value,
    });
  }

  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }

  save() {
    this.setState({ modalWard: false });
  }
  close() {
    this.setState({ inHospital: false });
    this.setState({ modalWard: false });
  }
  render() {
    const { translate } = this.context;
    let { alert, modalWard } = this.state;
    return (
      <>
        <PopUp
          $class={this}
          buttons={[
            { title: "Close", className: "btn btn-secondary", action: "close" },
            { title: "Save", className: "btn cc-btn", action: "save" },
          ]}
          show={modalWard}
          width="750px"
          title={translate("WARD")}
          name="modalWard"
          content={
            <>
              {!this.state.checkWard ? (
                <div className="form-group">
                  <label htmlFor="ward">{translate("WARD")}</label>
                  <Autocomplete
                    options={wardData}
                    getOptionLabel={(option) =>
                      `${option.name} - ${option.type}`
                    }
                    onChange={(event, selected) => {
                      this.setWard(selected?.wardID);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" />
                    )}
                  />
                </div>
              ) : (
                <>
                  <div className="col-md-12 px-1">
                    <NavLink
                      className="w-100 border-0 shadow btn btn-md cc-btn"
                      to={`/AddWard`}
                    >
                      Click to add a new Ward{" "}
                      <span>(Currently no Ward exists)</span>
                    </NavLink>
                  </div>
                </>
              )}
            </>
          }
        />
        <Snackbar
          open={alert.open}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={() => {
            this.handleClose();
          }}
        >
          <Alert
            onClose={() => {
              this.handleClose();
            }}
            severity={alert.severity}
          >
            <AlertTitle>{alert.title}</AlertTitle>
            <strong>{alert.message}</strong>
          </Alert>
        </Snackbar>

        <div className="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
          <div className="row w-100 d-flex justify-content-between m-0">
            <div className="d-flex align-items-center">
              <p className="m-0 cc-page-title text-uppercase pl-2">
                {translate("ADD_NEW_PATIENT")}
              </p>
            </div>
            <div className="col-md-2 px-1">
              <NavLink
                className="w-100 border-0 shadow btn btn-md cc-btn"
                to={`/Patients`}
              >
                {translate("BACK_TO_PATIENT_LIST")}
              </NavLink>
            </div>
          </div>
          <div className="mt-1 py-3 px-2">
            <div className="row">
              <div className="col-md-1">
                <div className="input-container">
                  <FormControl fullWidth>
                    <InputLabel>{translate("TITLE")}</InputLabel>
                    <Select
                      id="titles"
                      onChange={(e) => {
                        this.setState({ titles: e.target.value });
                      }}
                    >
                      <MenuItem value="Mr">Mr</MenuItem>
                      <MenuItem value="Ms">Ms</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-md-2">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="Name"
                    type="text"
                    onChange={this.handleChange}
                    required
                    label={translate("FIRST_NAME")}
                  />
                  {!this.state.validate.Name && (
                    <span className="text-danger">
                      Please Enter a Valid First Name
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-2">
                <div className="input-container">
                  <TextField
                    fullWidth
                    required
                    id="LastName"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("LAST_NAME")}
                  />
                  {!this.state.validate.LastName && (
                    <span className="text-danger">
                      Please Enter a Valid Last Name
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="identificationNo"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("NATIONAL_IDENTIFICATION_CODE")}
                  />
                  {/* {!this.state.validate.NationalID && <span className="text-danger">Please Enter a Valid National ID</span>} */}
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="mrNumber"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("MEDICAL_RECORD_NUMBER")}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="input-container">
                  <FormControl fullWidth>
                    <InputLabel>{translate("GENDER")}</InputLabel>
                    <Select
                      id="Gender"
                      onChange={(e) => {
                        this.setState({ Gender: e.target.value });
                      }}
                    >
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="col-md-2">
                <div className="input-container">
                  <TextField
                    fullWidth
                    type="date"
                    openTo="year"
                    InputLabelProps={{ shrink: true, required: true }}
                    onChange={this.handleChange}
                    value={this.state.DOB}
                    id="DOB"
                    label={translate("DATE_OF_BIRTH")}
                  />
                  {/* <>
                  <DatePicker
                    disableFuture
                    openTo="year"
                    format="dd/MM/yyyy"
                    label="Date of birth"
                    views={["year", "month", "date"]}
                    value={currentDate}
                    // onChange={handleDateChange}
                  />
                  </> */}
                  {/* {!this.state.validate.DOB && (
                    <span className="text-danger">
                      Please enter valid Date of Birth (age ≥ 22)
                    </span>
                  )} */}
                </div>
              </div>
              <div className="col-md-1">
                <div className="input-container">
                  <TextField
                    type="text"
                    value={this.state.age}
                    onChange={this.handleChange}
                    id="age"
                    label={translate("AGE")}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="Email"
                    type="email"
                    onChange={this.handleChange}
                    label={translate("EMAIL_ID")}
                  />
                  {/* {!this.state.validate.Email && <span className="text-danger">Please Please Enter a Valid Email ID</span>} */}
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-container">
                  <MuiPhoneNumber
                    className="col-md-12"
                    value={this.state.phone}
                    onlyCountries={["us", "pk"]}
                    autoFormat={true}
                    disableAreaCodes={true}
                    label={translate("MOBILE")}
                    defaultCountry={"pk"}
                    regions={["america", "europe", "asia"]}
                    onChange={(phone) => this.setState({ phone })}
                  />
                  {this.state.validatePhone && (
                    <span className="text-danger">
                      Please Enter a valid Mobile Number
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="GuardianName"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("GUARDIAN_NAME")}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-container">
                  <MuiPhoneNumber
                    className="col-md-12"
                    onlyCountries={["gb", "us", "in", "cn", "pk"]}
                    value={this.state.GuardianPhone}
                    label={translate("GUARDIAN_MOBILE")}
                    defaultCountry={"pk"}
                    onChange={(GuardianPhone) =>
                      this.setState({ GuardianPhone })
                    }
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="Address"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("ADDRESS")}
                  />
                </div>
              </div>

              <div className="col-md-2">
                <h5
                  style={{
                    textAlign: "left",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  <FormControlLabel
                    class="w-100 border-0 shadow btn cc-btn font-weight-bold"
                    control={
                      <Switch
                        checked={this.state.inHospital ? true : false}
                        onChange={(e) => this.handleInputChange(e)}
                        name="inHospital"
                        color="primary"
                      />
                    }
                    label={translate("IN_HOSPITAL")}
                  />
                </h5>
              </div>
            </div>

            <div className="row px-2 mt-1 d-flex justify-content-end">
              <div className="col-md-2 px-1">
                <button
                  className="w-100 border-0 shadow btn btn-md cc-btn"
                  onClick={this.onCreatePatient}
                >
                  {this.state.loading ? (<Spinner animation="border" variant="light" />) : (<>{translate("SAVE")}</>) }
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
