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
let userid = JSON.parse(localStorage.getItem("user"));
export default class EditNurse extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      name: true,
      nationalID: true,
      Email: true,
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
      profileImage: "",
      modalDelete: false,
      validatePhone: false,
      Role: false,
      nationalID: "",
      healthCareLicenseID: "",
      titles: "",
      name: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      address: "",
      userID: "",
      phone: "",
      healthCareLicenseValidDate: " ",
      speciality: " ",
      discriminator: " ",
      validate: this.validate,
      alert: this.alert,
      CalendarID: "",
      Email: "",
      title: "",
      degree: "",
      EmployeeCode: "",
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
    this.setState({ modalDelete: false });
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
    if (event.target.id === "EmployeeCode" && !validate.EmployeeCode) {
      validate["EC"] = !this.state.EmployeeCode
        ? false
        : functions.validateEmployeCode(event.target.value)
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

    this.setState({
      [id]: value,
    });
  }

  componentDidMount() {
    if (roles == "Admin") {
      this.setState({ Role: true });
    }
    this.setState({ Role: "Nurse" });
    list(`physician/${this.props.match.params.id}`).then((response) => {
      this.setState({
        nationalID: response.data.nationalID,
        healthCareLicenseID: response.data.healthCareLicenseID,
        profileImage: response.data.profileImage,
        name: response.data.name,
        lastName: response.data.lastName,
        titles: response.data.titles,
        address: response.data.address,
        healthCareLicenseValidDate: new Date(
          response.data.healthCareLicenseValidDate
        ).toLocaleDateString("en-CA"),
        dob: new Date(response.data.dob).toLocaleDateString("en-CA"),
        gender: response.data.gender,
        phone: response.data.phone,
        speciality: response.data.speciality,
        discriminator: response.data.discriminator,
        IsDeleted: false,
        Email: response.data.email,
        title: response.data.title,
        degree: response.data.degree,
        calendarID: response.data.calendarID,
        userID: response.data.userID,
        EmployeeCode: response.data.employeeCode,
      });
    });
  }
  handleSubmit(event) {
    if (
      this.state.phone.replace(/\D/g, "").length != 11 &&
      this.state.phone.replace(/\D/g, "").length != 12
    ) {
      this.setState({ validatePhone: true });
    } else {
      this.setState({ validatePhone: false });
    }

    this.setState({
      phone: this.state.phone.replace(/\D/g, ""),
      firstName: this.state.name,
    });

    this.setState({
      IsActive: true,
      profileImage: this.state.profileImage,
      lastModifiedBy: userid,
      lastModifiedOn: new Date(),
    });
    this.setState({ Email: this.state.Email.toLowerCase().replace(/\s/g, "") });
    setTimeout(() => {
      let { validate } = this.state;
      if (
        !this.state.name ||
        !this.state.Email ||
        !functions.validateEmail(this.state.Email) ||
        !functions.validateEmployeCode(this.state.EmployeeCode)
      ) {
        validate["name"] = !this.state.name ? false : true;
        validate["EC"] = !this.state.EmployeeCode
          ? false
          : functions.validateEmployeCode(this.state.EmployeeCode)
            ? true
            : false;
        validate["Email"] = !this.state.Email
          ? false
          : functions.validateEmail(this.state.Email)
            ? true
            : false;
        this.setState({ validate });
      } else {
        console.log(this.state);
        put(`physician/${this.state.nationalID}`, this.state)
          .then((response) => {
            put(`accounts/user/${this.state.userID}`, this.state);
            this.setState({
              alert: {
                open: true,
                severity: "success",
                message: "Nurse successfully updated",
                title: "Success",
              },
            });
            setTimeout(() => {
              this.props.history.push("/nurses");
            }, 2000);
          })
          .catch((error) => {

            if ("Employee ID already exists!") {
              this.setState({
                alert: {
                  open: true,
                  severity: "success",
                  message: "Nurse successfully updated",
                  title: "Success",
                },
              });
            }
            else {
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
      }
    }, 2000);
  }
  handleReset() {
    toast.info(
      "New password sent to user " +
      this.state.name +
      " on Email: " +
      this.state.Email
    );
    put(`accounts/resentPassword/${this.state.userID}`, {}).then(
      (response) => { }
    );
  }
  onDeleteNurse = () => {
    del(`physician/${this.props.match.params.id}`).then((response) => {
      this.props.history.push("/nurses/Nurses");
    });
    this.setState({
      IsDeleted: true,
    });
  };
  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }

  render() {
    let { alert, modalDelete } = this.state;
    const { translate } = this.context;
    return (
      <>
        <PopUp
          $class={this}
          buttons={[
            { title: "Close", className: "btn btn-secondary", action: "close" },
            {
              title: "Delete",
              className: "btn cc-btnred",
              action: "onDeleteNurse",
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
        {this.state.nationalID && (
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
                  Back to Nurses List
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
                      required
                      fullWidth
                      disabled
                      id="EmployeeCode"
                      type="text"
                      value={this.state.EmployeeCode}
                      onChange={this.handleChange}
                      label="Employee ID"
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
                      id="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.handleChange}
                      label="First Name"
                    />
                    {!this.state.validate.name && (
                      <span className="text-danger">
                        First Name is Mandatory
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="lastName"
                      type="text"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      label="Last Name"
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-container">
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
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
                <div className="col-md-3">
                  <div className="input-container">
                    <TextField
                      required
                      fullWidth
                      id="nationalID"
                      type="text"
                      value={this.state.nationalID}
                      onChange={this.handleChange}
                      label="National Identification Code"
                    />
                    {!this.state.validate.nationalID && (
                      <span className="text-danger">
                        National ID is Mandatory
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
                      type=""
                      value={this.state.Email}
                      onChange={this.handleChange}
                      label="Email ID"
                    />
                    {!this.state.validate.Email && (
                      <span className="text-danger">
                        Please Enter a Valid Email ID
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-container">
                    {/* <TextField
                    fullWidth
                    id="phone"
                    type="text"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    label="phone"
                  /> */}
                    <MuiPhoneNumber
                      className="col-md-12"
                      onlyCountries={["gb", "us", "in", "cn", "pk"]}
                      value={this.state.phone}
                      label="Mobile"
                      defaultCountry={"pk"}
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
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true, required: true }}
                      type="date"
                      onChange={this.handleChange}
                      id="dob"
                      value={this.state.dob}
                      label={translate("DATE_OF_BIRTH")}
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="healthCareLicenseID"
                      type="text"
                      value={this.state.healthCareLicenseID}
                      onChange={this.handleChange}
                      label="Enter Health Care License Code"
                    />
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
                      value={this.state.healthCareLicenseValidDate}
                      id="healthCareLicenseValidDate"
                      label="Health Care License Validity Date"
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
                      label="Address"
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
                      Reset Password
                    </button>
                  </div>
                ) : null}
                <div class="col-md-2 px-1">
                  <button
                    onClick={this.handleSubmit}
                    class="w-100 border-0 shadow btn btn-info cc-btn"
                  >
                    Update
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
