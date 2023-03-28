import React from "react";
import { NavLink } from "react-router-dom";
import { post } from "../../_helper/api";
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
import TranslationContext from "../../context/translation";
import DatePicker from "react-date-picker";
let userid = JSON.parse(localStorage.getItem("user"));
export default class AddNurse extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      Name: true,
      NationalID: true,
      Email: true,
      LastName: true,
      DOB: true,
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
      EmployeeCode: "",
      NationalID: "",
      healthCareLicenseID: "",
      titles: "",
      Name: "",
      LastName: "",
      DOB: "",
      gender: "",
      address: "",
      phone: "",
      healthCareLicenseValidDate: " ",

      validate: this.validate,
      alert: this.alert,
      Email: "",
      Role: "Nurse",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let { validate } = this.state;
    if (!validate.DOB) {
      validate["DOB"] = !this.state.dob ? false : true;

      this.setState({ validate });
    }

    if (event.target.id === "NationalID" && !validate.NationalID) {
      validate["NationalID"] = !this.state.NationalID
        ? false
        : functions.validateNationalID(event.target.value)
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
    if (!validate.DOB && event.target.id === "DOB") {
      validate["DOB"] = !this.state.Name
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

  onCreateNurse = () => {
    if (
      this.state.phone.replace(/\D/g, "").length != 11 &&
      this.state.phone.replace(/\D/g, "").length != 12
    ) {
      this.setState({ validatePhone: true });
    } else {
      this.setState({ validatePhone: false });
    }
    this.setState({ phone: this.state.phone.replace(/\D/g, "") });
    this.setState({ Email: this.state.Email.toLowerCase().replace(/\s/g, "") });
    let { validate } = this.state;
    if (
      !this.state.NationalID ||
      !this.state.Name ||
      !this.state.Email ||
      !functions.validateEmail(this.state.Email) ||
      !functions.validateEmployeCode(this.state.EmployeeCode)
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
      validate["NationalID"] = !this.state.NationalID
        ? false
        : functions.validateNationalID(this.state.NationalID)
        ? true
        : false;
      validate["Name"] = !this.state.Name
        ? false
        : functions.validateName(this.state.Name)
        ? true
        : false;
      validate["LastName"] = !this.state.Name
        ? false
        : functions.validateName(this.state.Name)
        ? true
        : false;
      validate["DOB"] = !this.state.DOB
        ? false
        : functions.validateDateOfBirth(this.state.DOB)
        ? true
        : false;
      // validate['DOB'] = !this.state.DOB ? false : true;
      this.setState({ validate });
    } else {
      post("accounts/create", {
        email: this.state.Email,
        userName: this.state.Email,
        firstName: this.state.Name,
        roleName: this.state.Role,
        phone: this.state.phone.replace(/\D/g, ""),
        address: this.state.Address,
        titles: this.state.titles,
        lastName: this.state.LastName,
        employeeCode: this.state.EmployeeCode,
        IsActive: true,
        ProfileImage: "cloudclinic_dummy.jpg",
        CreatedBy: userid,
        CreatedOn: new Date(),
      })
        .then((response) => {
          post("physician", {
            ...this.state,
            userID: response.data.id,
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
                  message: "Nurse successfully added",
                  title: "Success",
                },
              });
              setTimeout(() => {
                this.props.history.push("/nurses");
              }, 2000);
            })
            .catch((error) => {
              if (error.response.status === 409) {
                this.setState({
                  alert: {
                    open: true,
                    severity: "error",
                    message: "Nurse with same ID already exists",
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
          this.setState({
            alert: {
              open: true,
              severity: "error",
              message: error.response?.data?.modelState[""][0],
              title: "Error",
            },
          });
        });
    }
  };
  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }

  render() {
    let { alert } = this.state;
    const { translate } = this.context;
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
                {translate("ADD_NEW_NURSE")}
              </p>
            </div>

            <div className="col-md-2 px-1">
              <NavLink
                className="w-100 border-0 shadow btn btn-md cc-btn"
                to={`/Nurses`}
              >
                {" "}
                {translate("BACK_TO_NURSE_LIST")}
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
                    required
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
                    required
                    fullWidth
                    id="Name"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("FIRST_NAME")}
                  />
                  {!this.state.validate.Name && (
                    <span className="text-danger">
                      Please Enter a Valid First Name
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    fullWidth
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
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    id="NationalID"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("NATIONAL_IDENTIFICATION_CODE")}
                  />
                  {!this.state.validate.NationalID && (
                    <span className="text-danger">
                      Please Enter a Valid National ID
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
                      {translate("PLEASE_ENTER_A_VALID_EMAIL_ID")}
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-container">
                  <MuiPhoneNumber
                    className="col-md-12"
                    onlyCountries={["us", "pk"]}
                    value={this.state.phone}
                    autoFormat={true}
                    disableAreaCodes={true}
                    label={translate("MOBILE")}
                    defaultCountry={"pk"}
                    onChange={(phone) => this.setState({ phone })}
                  />
                  {this.state.validatePhone && (
                    <span className="text-danger">
                      Please Enter a Valid Mobile Number
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <TextField
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true, required: true }}
                    onChange={this.handleChange}
                    id="DOB"
                    value={this.state.dob}
                    label={translate("DATE_OF_BIRTH")}
                  />
                  {/* <DatePicker
                    fullWidth
                    id="DOB"
                    dayAriaLabel="Day"
                    format="MM-dd-yyyy"
                    className="form-control"
                    // onChange={this.handleChange}
                    value={this.state.dob}
                    onChange={(e) => {
                      this.handleChange(e);
              }}
                   
                  /> */}
                  {!this.state.validate.DOB && (
                    <span className="text-danger">
                      Please Enter a Valid Date of Birth
                    </span>
                  )}
                </div>
              </div>

              <div className="col-md-3">
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

              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true, required: true }}
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
                    this.onCreateNurse();
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
