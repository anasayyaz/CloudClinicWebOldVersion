import React from "react";
import { NavLink } from "react-router-dom";
import list, { put, del } from "../../_helper/api";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import SchedulerService from "../appointments/SchedulerService";
import * as functions from "../../_helper/functions";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MuiPhoneNumber from "material-ui-phone-number";
import TranslationContext from "../../context/translation";
import "../style/ccstyle.css";
import PopUp from "../Components/PopUp";
var roles = localStorage.getItem("roles");

export default class EditReceptionist extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      firstName: true,
      nationalID: true,
      email: true,
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
      modalDelete: false,
      Role: false,
      nationalID: "",
      healthCareLicenseID: "",
      titles: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      address: "",
      userID: "",
      phoneNumber: "",
      healthCareLicenseValidDate: " ",
      speciality: " ",
      discriminator: " ",
      validate: this.validate,
      alert: this.alert,
      CalendarID: "",
      email: "",
      title: "",
      degree: "",
      employeeCode: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    let { validate } = this.state;
    if (!validate.firstName) {
      validate["firstName"] = !this.state.firstName ? false : true;
      this.setState({ validate });
    }
    if (event.target.id === "employeeCode" && !validate.employeeCode) {
      validate["EC"] = !this.state.employeeCode
        ? false
        : functions.validateEmployeCode(event.target.value)
        ? true
        : false;
      this.setState({ validate });
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
  open = () => {
    this.setState({ modalDelete: true });
  };
  componentDidMount() {
    if (roles == "Admin") {
      this.setState({ Role: true });
    }

    list(`accounts/user/${this.props.match.params.id}`).then((response) => {
      this.setState({
        nationalID: response.data.nationalID,
        healthCareLicenseID: response.data.healthCareLicenseID,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        titles: response.data.titles,
        address: response.data.address,
        healthCareLicenseValidDate: new Date(
          response.data.healthCareLicenseValidDate
        ).toLocaleDateString("en-US"),
        dob: new Date(response.data.dob).toLocaleDateString("en-US"),
        gender: response.data.gender,
        phoneNumber: response.data.phoneNumber,
        speciality: response.data.speciality,
        discriminator: response.data.discriminator,
        IsDeleted: false,
        email: response.data.email,
        title: response.data.title,
        degree: response.data.degree,
        calendarID: response.data.calendarID,
        userID: response.data.userID,
        employeeCode: response.data.employeeCode,
      });
    });
  }
  onDeleteReceptionist = () => {
  
    del(`accounts/user/${this.props.match.params.id}`).then((response) => {
      this.props.history.push("/receptionists");
    });
  };
  handleSubmit(event) {
    // if (
    //   this.state.phone.replace(/\D/g, "").length != 11 &&
    //   this.state.phone.replace(/\D/g, "").length != 12
    // ) {
    //   this.setState({ validatePhone: true });
    // } else {
    //   this.setState({ validatePhone: false });
    // }
     this.setState({ phoneNumber: this.state.phoneNumber.replace(/\D/g, "") });
    this.setState({email: this.state.email.toLowerCase().replace(/\s/g, '')})
    let { validate } = this.state;
    if (
      !this.state.firstName ||
      !this.state.email ||
      !functions.validateEmployeCode(this.state.employeeCode) ||
      !functions.validateEmail(this.state.email)
    ) {
      validate["firstName"] = !this.state.firstName ? false : true;
      validate["email"] = !this.state.email
        ? false
        : functions.validateEmail(this.state.email)
        ? true
        : false;
      validate["EC"] = !this.state.employeeCode
        ? false
        : functions.validateEmployeCode(this.state.employeeCode)
        ? true
        : false;
      this.setState({ validate });
    } else {
      // put(`receptionist/${this.state.nationalID}`, this.state)
      //   .then((response) => {
      // put(`accounts/user/${this.props.match.params.id}`, {
      //   firstName: this.state.firstName,
      //   lastName: this.state.lastName,
      //   titles: this.state.titles,
      //   phoneNumber: this.state.phoneNumber,
      //   address: this.state.address,
      // });
      // this.setState({
      //   alert: {
      //     open: true,
      //     severity: "success",
      //     message: "Receptionist successfully updated",
      //     title: "Success",
      //   },
      // });
      put(`accounts/user/${this.props.match.params.id}`, this.state)
      .then((response) => {
        this.setState({
          alert: {
            open: true,
            severity: "success",
            message: "Receptionist successfully updated",
            title: "Success",
          },
        }) 
        setTimeout(() => {
          this.props.history.push("/receptionists");
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
      // })
      // .catch((error) => {
      //   this.setState({
      //     alert: {
      //       open: true,
      //       severity: "error",
      //       message: "Something went wrong",
      //       title: "Error",
      //     },
      //   });
      // });
    }
  }
  handleReset() {
    toast.info(
      "New password sent to user " +
        this.state.firstName +
        " on email: " +
        this.state.email
    );
    put(`accounts/resentPassword/${this.state.userID}`, {}).then(
      (response) => {}
    );
  }

  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }
  close() {
    this.setState({ modalDelete: false });
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
              action: "onDeleteReceptionist",
            },
          ]}
          show={modalDelete}
          width="500px"
          title="Delete Confirmation"
          name="modalDelete"
          content={
            <>
              <h4>Are you sure you want to delete this user?</h4>
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
        <ToastContainer />
        <div className="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
          <div className="row w-100 d-flex justify-content-between m-0">
            <div className="d-flex align-items-center">
              <p className="m-0 cc-page-title text-uppercase pl-2">
                {translate("EDIT_RECEPTIONIST")}
              </p>
            </div>

            <div className="col-md-2 px-1">
              <NavLink
                className="w-100 border-0 shadow btn btn-md cc-btn"
                to={`/receptionists`}
              >
                {" "}
                {translate("BACK_TO_RECEPTIONIST_LIST")}
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
              <div className="col-md-3">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    id="employeeCode"
                    type="text"
                    value={this.state.employeeCode}
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
                    value={this.state.firstName}
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
                  {/* <TextField
                    fullWidth
                    id="phoneNumber"
                    type="text"
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                    label="phone"
                  /> */}
                  <MuiPhoneNumber
                    className="col-md-12"
                    onlyCountries={["gb", "us", "in", "cn", "pk"]}
                    value={this.state.phoneNumber}
                    label={translate("MOBILE")}
                    defaultCountry={"pk"}
                    onChange={(phoneNumber) => this.setState({ phoneNumber})}
                  />
                  ,
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    id="email"
                    type=""
                    value={this.state.email}
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
                  class="w-100 border-0 shadow btn  cc-btnred"
                >
                  {translate("DELETE")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
