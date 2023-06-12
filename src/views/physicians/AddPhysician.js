import React from "react";
import { NavLink } from "react-router-dom";
import list, { put, post } from "../../_helper/api";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import SchedulerService from "../appointments/SchedulerService";
import * as functions from "../../_helper/functions";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MuiPhoneNumber from "material-ui-phone-number";
import { v4 as uuidv4, validate } from "uuid";
import TranslationContext from "../../context/translation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import InputRange from 'react-input-range';
import { auth } from "../../firebase-config";
let userid = JSON.parse(localStorage.getItem("user"));
export default class AddPhysician extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      Name: true,
      LastName: true,
      Email: true,
      dob: true,
      Speciality: true,
      Color: true,
      EC: true,
    };
    this.alert = {
      open: false,
      severity: "error",
      message: "",
      title: "error",
    };
    this.SchedulerService = new SchedulerService();
    this.state = {
      validatePhone: false,
      identificationNo: "",
      // NationalID: "",
      color: [],
      choosenColor: "",
      healthCareLicenseID: "",
      titles: "",
      Name: "",
      LastName: "",
      dob: "",
      gender: "",
      address: "",
      phone: "",
      healthCareLicenseValidDate: " ",
      speciality: " ",
      validate: this.validate,
      alert: this.alert,
      Email: "",
      title: "",
      degree: "",
      EmployeeCode: "",
      Role: "Physician",
      feeShare: "",
      // CreatedBy: "",
      // CreatedOn: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let { validate } = this.state;
    if (!validate.dob) {
      validate["dob"] = !this.state.dob
        ? false
        : functions.validateDateOfBirth(this.state.dob)
          ? true
          : false;
      this.setState({ validate });
    }
    if (event.target.id === "EmployeeCode" && !validate.EmployeeCode) {
      validate["EC"] = !this.state.EmployeeCode
        ? false
        : functions.validateEmployeCode(event.target.value)
          ? true
          : false;
      this.setState({ validate });
    }
    if (!validate.Name && event.target.id === "Name") {
      validate["Name"] = !this.state.Name
        ? false
        : functions.validateName(event.target.value)
          ? true
          : false;
      this.setState({ validate });
    }

    if (!validate.LastName && event.target.id === "LastName") {
      validate["LastName"] = !this.state.LastName
        ? false
        : functions.validateLastName(event.target.value)
          ? true
          : false;
      this.setState({ validate });
    }

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

  changeColor(e) {
    this.setState({
      color: e.target.value,
    });
  }
  onCreatePhysician = () => {
    let str = this.state.choosenColor;
    str = str.slice(1);
    this.setState({
      nationalID: uuidv4(),
      CreatedBy: userid,
      CreatedOn: new Date(),
    });
    this.setState({ Email: this.state.Email.toLowerCase().replace(/\s/g, "") });
    this.setState({ phone: this.state.phone.replace(/\D/g, "") });
    if (
      this.state.phone.replace(/\D/g, "").length != 11 &&
      this.state.phone.replace(/\D/g, "").length != 12
    ) {
      this.setState({ validatePhone: true });
    } else {
      this.setState({ validatePhone: false });
    }
    let { validate } = this.state;
    if (
      !this.state.Name ||
      !this.state.Email ||
      !functions.validateEmail(this.state.Email) ||
      !functions.validateName(this.state.Name) ||
      !functions.validateDateOfBirth(this.state.dob) ||
      !functions.validateSpeciality(this.state.speciality) ||
      !functions.validateColor(this.state.choosenColor) ||
      !functions.validateEmployeCode(this.state.EmployeeCode) ||
      (this.state.phone.replace(/\D/g, "").length != 11 &&
        this.state.phone.replace(/\D/g, "").length != 12)
    ) {
      validate["Email"] = !this.state.Email
        ? false
        : functions.validateEmail(this.state.Email)
          ? true
          : false;
      validate["EC"] = !this.state.EmployeeCode
        ? false
        : functions.validateEmployeCode(this.state.EmployeeCode)
          ? true
          : false;
      validate["Name"] = !this.state.Name
        ? false
        : functions.validateName(this.state.Name)
          ? true
          : false;
      validate["LastName"] = !this.state.LastName
        ? false
        : functions.validateName(this.state.LastName)
          ? true
          : false;
      validate["dob"] = !this.state.dob
        ? false
        : functions.validateDateOfBirth(this.state.dob)
          ? true
          : false;
      validate["Color"] = !this.state.choosenColor
        ? false
        : functions.validateColor(this.state.choosenColor)
          ? true
          : false;
      validate["Speciality"] = !this.state.speciality
        ? false
        : functions.validateSpeciality(this.state.speciality)
          ? true
          : false;
      this.setState({ validate });
    } else {
      post("accounts/create", {
        feeShare: this.state.feeShare,
        email: this.state.Email,
        userName: this.state.Email,
        firstName: this.state.Name,
        roleName: this.state.Role,
        titles: this.state.titles,
        lastName: this.state.LastName,
        phoneNumber: this.state.phone,
        address: this.state.Address,
        EmployeeCode: this.state.EmployeeCode,
        identificationNo: this.state.identificationNo,
        colorCode: str,
        CreatedBy: userid,
        CreatedOn: new Date(),
        IsActive: true,
        ProfileImage: "cloudclinic_dummy.jpg",
        // FCMID_Web: userData.refreshToken,
        // FirebaseID_Web: userData.reloadUserInfo.localId,
      })
        .then((response) => {
          console.log(response.data);
          post("physician", {
            ...this.state,
            feeShare: this.state.feeShare,
            userID: response.data.id,
            colorCode: this.state.choosenColor,
            identificationNo: this.state.identificationNo,
            createdBy: userid,
            createdOn: new Date(),
            IsActive: true,
            ProfileImage: "cloudclinic_dummy.jpg",
          })
            .then((response) => {
              console.log(response);
              this.setState({
                alert: {
                  open: true,
                  severity: "success",
                  message: "Physician successfully added",
                  title: "Success",
                },
              });
              let fcmemail =
                localStorage.getItem("domain") + "-" + this.state.Email;
              const user = createUserWithEmailAndPassword(
                auth,
                fcmemail,
                fcmemail
              )
                .then((userCredential) => { })
                .catch((error) => { });
              console.log(user);
              setTimeout(() => {
                this.props.history.push("/physicians/Physicians");
              }, 2000);
            })
            .catch((error) => {
              if (error.response.status === 409) {
                this.setState({
                  alert: {
                    open: true,
                    severity: "error",
                    message: "Physician with same ID already exists",
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
          console.log(error.response.status);
          if (error.response.status == 400) {
            this.setState({
              alert: {
                open: true,
                severity: "error",
                message: error.response?.data.modelState[""][0],
                title: "Error",
              },
            });
          } else if (error.response.status == 403) {
            this.setState({
              alert: {
                open: true,
                severity: "error",
                message: error.response?.data,
                title: "Error",
              },
            });
          }
        });
    }

    // this.onCreatePhysician();
  };

  handleClose() {
    this.setState({ ...alert, open: false });
  }
  componentDidMount() {
    list(`colorcode`).then((response) => {
      this.setState({ color: response.data });

      console.log(response);
    });
  }
  render() {
    const { translate } = this.context;
    let { alert, color } = this.state;
    return (
      <>
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
                {translate("ADD_NEW_PHYSICIAN")}
              </p>
            </div>

            <div className="col-md-2 px-1">
              <NavLink
                className="w-100 border-0 shadow btn btn-md cc-btn"
                to={`/Physicians`}
              >
                {translate("BACK_TO_PHYSICIANS_LIST")}
              </NavLink>
            </div>
          </div>
          <div className="mt-1 py-3 px-2">
            <div className="row">
              <div className="col-md-1">
                <div className="input-container">
                  <FormControl fullWidth>
                    <InputLabel>Title</InputLabel>
                    <Select
                      id="titles"
                      onChange={(e) => {
                        this.setState({ titles: e.target.value });
                      }}
                    >
                      <MenuItem value="Dr">Dr</MenuItem>
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
                    id="EmployeeCode"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("EMPLOYEE_ID")}
                  />
                  {!this.state.validate.EC && (
                    <span className="text-danger">
                      Employee ID must be 4 - 12 characters
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-3">
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
                      Please Enter a valid First Name
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    fullWidth
                    required
                    id="LastName"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("LAST_NAME")}
                  />{" "}
                  {!this.state.validate.LastName && (
                    <span className="text-danger">
                      Please Enter a valid Last Name
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    id="Email"
                    type="email"
                    onChange={this.handleChange}
                    label={translate("EMAIL_ID")}
                  />
                  {!this.state.validate.Email && (
                    <span className="text-danger">
                      Please Enter a valid Email ID
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="identificationNo"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("NATIONAL_IDENTIFICATION_CODE")}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-container">
                  <FormControl fullWidth>
                    <InputLabel>{translate("GENDER")}</InputLabel>
                    <Select
                      id="gender"
                      onChange={(e) => {
                        this.setState({ gender: e.target.value });
                      }}
                    >
                      <MenuItem value="Female">{translate("FEMALE")}</MenuItem>
                      <MenuItem value="Male">{translate("MALE")}</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true, required: true }}
                    type="date"
                    onChange={this.handleChange}
                    id="dob"
                    value={this.state.dob}
                    label={translate("DATE_OF_BIRTH")}
                  />
                  {!this.state.validate.dob && (
                    <span className="text-danger">
                      Please enter a valid Date of Birth (age ≥ 22)
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <MuiPhoneNumber
                    className="col-md-12"
                    onlyCountries={["us", "pk"]}
                    // preferredCountries={['gb','us','in','cn','pk']}
                    value={this.state.phone}
                    autoFormat={true}
                    disableAreaCodes={true}
                    id="phone"
                    label={translate("MOBILE")}
                    defaultCountry={"pk"}
                    // regions={["america", "europe", "asia"]}
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
                    id="degree"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("DEGREE")}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="title"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("CURRENT_APPOINTMENT_IF_ANY")}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-container">
                  <FormControl fullWidth>
                    <InputLabel>{translate("SPECIALITY")}</InputLabel>
                    <Select
                      id="Speciality"
                      onChange={(e) => {
                        this.setState({ speciality: e.target.value });
                      }}
                    >
                      <MenuItem value="CARDIOLOGIST">Cardiologist</MenuItem>
                      <MenuItem value="FAMILY PHYSICIAN">
                        Family Physician
                      </MenuItem>
                      <MenuItem value="PEDIATRICIAN">Pediatrician</MenuItem>
                      <MenuItem value="PSYCHIATRIST">Psychiatrist</MenuItem>
                      <MenuItem value="GYNECOLOGIST">Gynecologist</MenuItem>
                      <MenuItem value="SURGEON">Surgeon</MenuItem>
                      <MenuItem value="PATHOLOGIST">Pathologist</MenuItem>
                      <MenuItem value="NEUROLOGIST">Neurologist</MenuItem>
                      <MenuItem value="UROLOGIST">Urologist</MenuItem>
                      <MenuItem value="DERMATOLOGIST">Dermatologist</MenuItem>
                      <MenuItem value="RADIOLOGIST">Radiologist</MenuItem>
                      <MenuItem value="Neuro-surgeon">Neuro-surgeon</MenuItem>
                      <MenuItem value="Orthopedic-surgeon">Orthopedic-surgeon</MenuItem>
                      <MenuItem value="Peads-surgeon">Peads-surgeon</MenuItem>
                      <MenuItem value="Pulmonologist">Pulmonologist</MenuItem>
                      <MenuItem value="Cuncologist">Cuncologist</MenuItem>
                      <MenuItem value="Geriatics">Geriatics</MenuItem>
                      <MenuItem value="Nephro-surgeon">Nephro-surgeon</MenuItem>
                      <MenuItem value="Orthodontist">Orthodontist</MenuItem>
                      <MenuItem value="Dentist">Dentist</MenuItem>
                      <MenuItem value="Gastroenterologist">Gastroenterologist</MenuItem>


                    </Select>
                  </FormControl>
                  {!this.state.validate.Speciality && (
                    <span className="text-danger">
                      Please Enter a validSpeciality
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <FormControl fullWidth>
                    <InputLabel>Calendar Color</InputLabel>
                    <Select
                      value={this.state.choosenColor}
                      id="Color"
                      ref="dropDownColor"
                      onChange={(e) => {
                        this.setState({ choosenColor: e.target.value });
                      }}
                    >
                      {color &&
                        color.length > 0 &&
                        color.map((items, index) => {
                          return (
                            <MenuItem value={items.colorHexaCode}>
                              <div
                                style={{
                                  backgroundColor: items.colorHexaCode,
                                  width: "100%",
                                  padding: "2px",
                                  borderRadius: "10px",
                                }}
                              >
                                {index} {items.speciality}
                              </div>
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  {!this.state.validate.Color && (
                    <span className="text-danger">
                      Please Enter a valid Color
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-2">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="healthCareLicenseID"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("ENTER_HEALTH_CARE_LISENCE_CODE")}
                  />
                </div>
              </div>
              <div className="col-md-1">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="feeShare"
                    type="number"
                    value={this.state.feeShare}
                    onChange={this.handleChange}
                    label={"Fee Share"}
                    min="0"
                    max="10"
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={this.state.healthCareLicenseValidDate}
                    onChange={this.handleChange}
                    id="healthCareLicenseValidDate"
                    label={translate("HEALTH_CARE_LICENSE_VALIDITY_DATE")}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="address"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("ADDRESS")}
                  />
                </div>
              </div>
            </div>

            <div className="row px-2 mt-1 d-flex justify-content-end">
              <div className="col-md-2 px-1">
                <button
                  onClick={() => {
                    this.onCreatePhysician();
                  }}
                  className="w-100 border-0 shadow btn btn-md cc-btn"
                >
                  {translate("SAVE")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
