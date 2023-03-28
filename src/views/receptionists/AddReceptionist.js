import React from "react";
import { NavLink } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import * as functions from "../../_helper/functions";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MuiPhoneNumber from "material-ui-phone-number";
import list, { put, post } from "../../_helper/api";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TranslationContext from "../../context/translation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase-config";
let locationData;
let userData;
export default class AddPatient extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      firstName: true,
      email: true,
      EC: true,
    };
    this.alert = {
      open: false,
      severity: "error",
      message: "",
      title: "error",
    };
    this.state = {
      validatePhone: false,
      EmployeeCode: "",
      locationShow: false,
      titles: "",
      firstName: "",
      LastName: "",
      address: "",
      phoneNumber: "",
      email: "",
      userName: "",
      roleName: "Receptionist",
      validate: this.validate,
      locationID: "",
      alert: this.alert,
      FirebaseID_Web: "",
      FCMID_Web: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let { validate } = this.state;
    if (!validate.firstName) {
      validate["firstName"] = !this.state.firstName ? false : true;
      this.setState({ validate });
    }
    if (event.target.id === "email" && !validate.email) {
      validate["email"] = !this.state.email
        ? false
        : functions.validateEmail(event.target.value)
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
    if (event.target.id === "email") {
      this.setState({ userName: event.target.value });
    }
    this.setState({ [event.target.id]: event.target.value });
  }
  componentDidMount() {
    list("location").then((response) => {
      locationData = response.data;
      this.setState({ locationShow: true });
    });
  }

  onCreateReceptionist = () => {
    if (
      this.state.phoneNumber.replace(/\D/g, "").length != 11 &&
      this.state.phoneNumber.replace(/\D/g, "").length != 12
    ) {
      this.setState({ validatePhone: true });
    } else {
      this.setState({ validatePhone: false });
    }
    this.setState({email: this.state.email.toLowerCase().replace(/\s/g, '')})
    this.setState({ phoneNumber: this.state.phoneNumber.replace(/\D/g, "") });
    let { validate } = this.state;
    if (
      !this.state.firstName ||
      !this.state.email ||
      !functions.validateEmployeCode(this.state.EmployeeCode) ||
      !functions.validateEmail(this.state.email)
    ) {
      validate["firstName"] = !this.state.firstName ? false : true;
      validate["email"] = !this.state.email
        ? false
        : functions.validateEmail(this.state.email)
        ? true
        : false;
        validate["EC"] = !this.state.EmployeeCode
        ? false
        : functions.validateEmployeCode(this.state.EmployeeCode)
        ? true
        : false;
      this.setState({ validate });
    } else {
      post("accounts/create", this.state)
        .then((response) => {
          this.setState({
            alert: {
              open: true,
              severity: "success",
              message: "Receptionist successfully added",
              title: "Success",
            },
          });
          setTimeout(() => {
            this.props.history.push("/receptionists");
          }, 2000);
        })
        .catch((error) => {
          this.setState({
            alert: {
              open: true,
              severity: "error",
              message: error.response.data.modelState[""][0],
              title: "Error",
            },
          });
        });
    }

    let fcmemail = localStorage.getItem("domain") + "-" + this.state.email;
    const user = createUserWithEmailAndPassword(auth, fcmemail, fcmemail)
      // .then((userCredential) => {
      //   // Signed in
      //   userData = userCredential.user;

      //   this.setState({ FirebaseID_Web: userData.reloadUserInfo.localId });
      //   this.setState({ FCMID_Web: userData.refreshToken });
      // })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }
  setLocation(id) {
    //  alert(id);
    this.setState({ locationID: id });
  }
  render() {
    const { translate } = this.context;
    let { alert } = this.state;
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
        <div className="row">
          <div className="col-md-10">
            <h4>Add Receptionist</h4>
          </div>
          <div className="col-md-2 px-1">
            <NavLink
              className="w-100 border-0 shadow btn btn-md cc-btn"
              to={`receptionists/Receptionists`}
            >
              {" "}
              {translate("BACK_TO_RECEPTIONIST_LIST")}
            </NavLink>
          </div>
        </div>
        <div className="form-horizontal">
          <div className="form-body">
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
              <div className="col-md-3">
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
              <div className="col-md-4">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    id="firstName"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("FIRST_NAME")}
                  />
                  {!this.state.validate.firstName && (
                    <span className="text-danger">First Name is Mandatory</span>
                  )}
                </div>
              </div>

              <div className="col-md-4">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="LastName"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("LAST_NAME")}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="input-container">
                  <MuiPhoneNumber
                    className="col-md-12"
                    //  onlyCountries={['gb','us','in','cn','pk']}
                    // preferredCountries={['gb','us','in','cn','pk']}
                    value={this.state.phoneNumber}
                    autoFormat={true}
                    label={translate("MOBILE") + " (3XX-XXXXXXX)"}
                    defaultCountry={"pk"}
                    regions={["america", "europe", "asia"]}
                    onChange={(phoneNumber) => this.setState({ phoneNumber })}
                  />
                </div>
                {this.state.validatePhone && (
                  <span className="text-danger">
                    Please Enter a Valid Mobile Number 
                  </span>
                )}
              </div>
              <div className="col-md-4">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    id="email"
                    type="email"
                    onChange={this.handleChange}
                    label={translate("EMAIL_ID")}
                  />
                  {!this.state.validate.email && (
                    <span className="text-danger">
                      {translate("PLEASE_ENTER_A_VALID_EMAIL_ID")}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-4">
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
              <div className="col-md-4">
                <div className="input-contaier">
                  {this.state.locationShow ? (
                    <>
                      <p className="cc-page-title">Location</p>
                      <Autocomplete
                        className="font-weight-bold"
                        options={locationData}
                        getOptionLabel={(option) =>
                          `${option.name} - ${option.address}`
                        }
                        onChange={(event, selected) => {
                          this.setLocation(selected?.locationID || null);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} variant="outlined" />
                        )}
                      />
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="row px-2 mt-1 d-flex justify-content-end">
              <div className="col-md-2 px-1">
                <button
                  onClick={() => {
                    this.onCreateReceptionist();
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
