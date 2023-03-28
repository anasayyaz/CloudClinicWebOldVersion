import React from "react";
import { NavLink } from "react-router-dom";
import list, { del, put, post } from "../../_helper/api";
import * as functions from "../../_helper/functions";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import dateFormat from "dateformat";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPhoneInput from "react-phone-input-2";
import MuiPhoneNumber from "material-ui-phone-number";
import TranslationContext from "../../context/translation";
import "../style/ccstyle.css";
import PopUp from "../Components/PopUp";
import { alertTitleClasses } from "@mui/material";
import { ErrorTwoTone } from "@material-ui/icons";
let userid = JSON.parse(localStorage.getItem("user"));
var roles = localStorage.getItem("roles");
export default class AddPatient extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      name: true,
      // nationalID: true,
      email: true,
      DOB: true,
    };
    this.alert = {
      open: false,
      severity: "error",
      message: "",
      title: "error",
    };
    this.state = {
      modalDelete: false,
      validatePhone: false,
      mrNumber: "",
      Role: false,
      identificationNo: "",
      nationalID: this.props.match.params.id,
      title: "",
      titles: "",
      name: "",
      lastName: "",
      DOB: "",
      gender: "",
      address: "",
      phone: "",
      age: "",
      guardianName: "",
      guardianPhone: "",
      accountNo: "",
      email: "",
      userID: "",
      profileImage: "",
      validate: this.validate,
      alert: this.alert,
      IsConsultantAppointmentSchedule: false,
      IsAppointmentSchedule: true,
      isfollowup: false,
      AccountNo: "",
      deleteCount: 0,
      IsActive: true,
      profileImage: "",
      lastModifiedBy: "",
      lastModifiedOn: "",
      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  open = () => {
    this.setState({ modalDelete: true });
  };
  close() {
    this.setState({ modalDelete: false, deleteCount: 0 });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    let { validate } = this.state;
    if (!validate.name) {
      validate["name"] = !this.state.name ? false : true;
      this.setState({ validate });
    }
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
    if (event.target.id === "email" && !validate.email) {
      validate["email"] = !this.state.email
        ? false
        : functions.validateEmail(event.target.value)
        ? true
        : false;
      this.setState({ validate });
    }
    this.setState({
      [id]: value,
    });
  }
  getDate(d) {
    return (
      d.getFullYear() +
      "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + d.getDate()).slice(-2)
    );
  }
  componentDidMount() {
    if (roles == "Admin") {
      this.setState({ Role: true });
    }
    this.setState({ Role: "Patient" });
    list(`patient/${this.state.nationalID}`).then((response) => {
      // alert(response.data.phone)
      this.setState({
        nationalID: response.data.nationalID,
        profileImage:response.data.profileImage,
        identificationNo: response.data.identificationNo,
        name: response.data.name,
        lastName: response.data.lastName,
        titles: response.data.titles,
        address: response.data.address,
        DOB: new Date(response.data.dob).toLocaleDateString("en-CA"),
        gender: response.data.gender,
        phone: response.data.phone,
        email: response.data.email,
        guardianName: response.data.guardianName,
        guardianPhone: response.data.guardianPhone,
        accountNo: response.data.accountNo,
        IsDeleted: false,
        userID: response.data.userID,
        accountNo: response.data.accountNo,
        mrNumber: response.data.mrNumber,
      });
      let x = response.data.dob;
      let y = x.split("-")[0];
      let a = new Date().getFullYear();

      let b = a - y;

      this.setState({ age: b });
    });
  }
  handleReset() {
    toast.info(
      "New password sent to user " +
        this.state.name +
        " on email: " +
        this.state.email
    );
    put(`accounts/resentPassword/${this.state.userID}`, {}).then(
      (response) => {}
    );
  }
  handleSubmit() {
    this.setState({ phone: this.state.phone.replace(/\D/g, "") 
    
    ,
    IsActive: true,
    profileImage: this.state.profileImage,
    lastModifiedBy: userid,
    lastModifiedOn: new Date()}
  );
  this.setState({email: this.state.email.toLowerCase().replace(/\s/g, '')})
  setTimeout(() => {
    if (
      this.state.phone.replace(/\D/g, "").length != 11 &&
      this.state.phone.replace(/\D/g, "").length != 12
    ) {
      this.setState({ validatePhone: true });
    } else {
      this.setState({ validatePhone: false });
    }

    let { validate } = this.state;
    if(!this.state.email)
    {
      let domain = localStorage.getItem("domain"); 
       this.setState({   email:  domain+"-"+this.state.name+"-"+this.state.nationalID+"@dummy.com"  });
         
    }
     setTimeout(() => {
               
    if (
      !this.state.name ||
      !this.state.email ||
      !functions.validateEmail(this.state.email)
    ) {
      validate["name"] = !this.state.name ? false : true;
      validate["email"] = !this.state.email
        ? false
        : functions.validateEmail(this.state.email)
        ? true
        : false;
      this.setState({ validate });
    } else {
      put(`patient/${this.state.nationalID}`, this.state)
        .then((response) => {
          put(`accounts/user/${this.state.userID}`, this.state);
          console.log(this.state);

          this.setState({
            alert: {
              open: true,
              severity: "success",
              message: "Patient successfully updated",
              title: "Success",
            },
          });
          setTimeout(() => {
            this.props.history.push("/patients/Patients");
          }, 2000);
        })
        .catch((error) => {
          this.setState({
            alert: {
              open: true,
              severity: "error",
              message: error.response.data,
              title: "Error",
            },
          });
        });
    }
    this.props.history.push("/patients/Patients");
  }, 2000);
  }, 2000);
  }
  onDeletePatient = () => {
    if (this.state.deleteCount == 0) {
      del(`patient/${this.props.match.params.id}`)
        .then((response) => {
          console.log("patient");
          this.props.history.push("/patients/Patients");
        })
        .catch((error) => {
          toast.error(error.response.data + " ❕❕❕");
          this.setState({ deleteCount: this.state.deleteCount + 1 });
          // alert(this.state.deleteCount)
        });
    }
    if (this.state.deleteCount == 1) {
      del(`patient/${this.props.match.params.id}?IsForceDelete=true`)
        .then((response) => {
          console.log("patient");
          this.props.history.push("/patients/Patients");
        })
        .catch((error) => {
          toast.error(error.response.data + " ❕❕❕");
        });
    }
  };

  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }
  render() {
    const { translate } = this.context;
    let { alert, modalDelete } = this.state;
    return (
      <>
        <PopUp
          $class={this}
          buttons={[
            { title: "Close", className: "btn btn-secondary", action: "close" },
            {
              title: "Delete",
              className: "btn cc-btnred",
              action: "onDeletePatient",
            },
          ]}
          show={modalDelete}
          width="500px"
          title="Delete Confirmation"
          name="modalDelete"
          content={
            <>
              {this.state.deleteCount == 0 ? (
                <h4>Are you sure you want to delete this user?</h4>
              ) : (
                <>
                  <h3>Important Data is present against this user!</h3>
                  <h4>Are you sure you want to delete?</h4>
                  <h4>Press "delete" again to delete record permanently</h4>
                </>
              )}
            </>
          }
        />

        <ToastContainer />
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
        <ToastContainer />
        {this.state.nationalID && (
          <div className="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
            <div className="row w-100 d-flex justify-content-between m-0">
              <div className="d-flex align-items-center">
                <p className="m-0 cc-page-title text-uppercase pl-2">
                  {translate("EDIT_PATIENT")}
                </p>
              </div>
              <div className="col-md-2 px-1">
                <NavLink
                  className="w-100 border-0 shadow btn btn-md cc-btn"
                  to={`/Patients`}
                >
                  {" "}
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
                        value={this.state.titles}
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
                      id="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.handleChange}
                      required
                      label={translate("FIRST_NAME")}
                    />
                    {!this.state.validate.name && (
                      <span className="text-danger">
                        Patient First Name is Mandatory
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="lastName"
                      type="text"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      label={translate("LAST_NAME")}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="identificationNo"
                      type="text"
                      value={this.state.identificationNo}
                      onChange={this.handleChange}
                      required
                      label={translate("NATIONAL_IDENTIFICATION_CODE")}
                    />
                    {/* {!this.state.validate.nationalID && <span className="text-danger">National ID is Mandatory</span>} */}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="mrNumber"
                      type="text"
                      value={this.state.mrNumber}
                      onChange={this.handleChange}
                      required
                      label={translate("MEDICAL_RECORD_NUMBER")}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="input-container">
                    <FormControl fullWidth>
                      <InputLabel>{translate("GENDER")}</InputLabel>
                      <Select
                        id="gender"
                        value={this.state.gender}
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

                <div className="col-md-2">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="DOB"
                      type="date"
                      InputLabelProps={{ shrink: true, required: true }}
                      value={this.state.DOB}
                      onChange={this.handleChange}
                      age
                      required
                      label={translate("DATE_OF_BIRTH")}
                    />
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
                      id="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                      label={translate("EMAIL_ID")}
                    />
                    {!this.state.validate.email && (
                      <span className="text-danger">
                        Please Enter a Valid Email ID
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-container">
                    <MuiPhoneNumber
                      className="col-md-12"
                      onlyCountries={["gb", "us", "fr", "cn", "pk"]}
                      value={this.state.phone}
                      label={translate("MOBILE")}
                      defaultCountry={"pk"}
                      onChange={(phone) => this.setState({ phone })}
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="guardianName"
                      type="text"
                      value={this.state.guardianName}
                      onChange={this.handleChange}
                      label={translate("GUARDIAN_NAME")}
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-container">
                    <MuiPhoneNumber
                      fullWidth
                      value={this.state.guardianPhone}
                      label={translate("GUARDIAN_MOBILE")}
                      className="col-md-12"
                      onlyCountries={["gb", "us", "fr", "cn", "pk"]}
                      defaultCountry={"pk"}
                      onChange={(guardianPhone) =>
                        this.setState({ guardianPhone })
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="address"
                      type="text"
                      value={this.state.address}
                      onChange={this.handleChange}
                      label={translate("ADDRESS")}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group  row px-2 mt-1 d-flex justify-content-end">
                <label className="control-label col-md-5"></label>
                {this.state.Role ? (
                  <div class="col-md-2 px-1">
                    <button
                      onClick={this.handleReset}
                      class="w-100 border-0 shadow btn btn-info cc-btn"
                    >
                      {translate("RESET_PASSWORD")}
                    </button>
                  </div>
                ) : null}
                <div class="col-md-2 px-1">
                  <button
                    onClick={this.handleSubmit}
                    class="w-100 border-0 shadow btn btn-info cc-btn"
                  >
                    {translate("UPDATE")}
                  </button>
                </div>

                <div class="col-md-2 px-1">
                  <button
                    onClick={this.open}
                    class="w-100 border-0 shadow btn  cc-btnred "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
