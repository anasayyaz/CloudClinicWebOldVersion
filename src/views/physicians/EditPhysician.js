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
import AddPhysicianPackage from "./AddPhysicianPackage";
import PhysicianPackgaeList from "./PhysicianPackageList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MuiPhoneNumber from "material-ui-phone-number";
import TranslationContext from "../../context/translation";
import "../style/ccstyle.css";
import PopUp from "../Components/PopUp";
var roles = localStorage.getItem("roles");
let userid = JSON.parse(localStorage.getItem("user"));
export default class AddPhysician extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      name: true,
      nationalID: true,
      CalendarID: true,
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
      feeShare:"",
      identificationNo: "",
      EmployeeCode: " ",
      Role: false,
      nationalID: "",
      color: [],
      choosenColor: "",
      healthCareLicenseID: "",
      titles: "",
      name: "",
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      address: "",
      phone: "",
      healthCareLicenseValidDate: " ",
      speciality: " ",
      discriminator: " ",
      validate: this.validate,
      alert: this.alert,
      CalendarID: "",
      email: "",
      userID: "",
      title: "",
      degree: "",
      calendars: [],
      colorCode: "",
      packageModal: true,
      calendarID: "",
      modalDelete: false,
      deleteCount: 0,
      profileImage:"",
      IsActive: true,
      ProfileImage: "",
      lastModifiedBy: "",
      lastModifiedOn: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleChange(event) {
    let { validate } = this.state;
    if (!validate.name || !validate.CalendarID) {
      validate["name"] = !this.state.name ? false : true;
      validate["CalendarID"] = !this.state.CalendarID ? false : true;
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
    if (event.target.id === "email" && !validate.email) {
      validate["email"] = !this.state.email
        ? false
        : functions.validateEmail(event.target.value)
        ? true
        : false;
      this.setState({ validate });
    }
    this.setState({ [event.target.id]: event.target.value });
  }
  open = () => {
    this.setState({ modalDelete: true });
  };
  close() {
    this.setState({ modalDelete: false, deleteCount: 0 });
  }

  changeColor(e) {
    this.setState({
      color: e.target.value,
    });
  }
  handleSubmit(event) {
   
    let str = this.state.choosenColor;
    // str = str.slice(1);
    this.setState({ colorCode: str });
    this.setState({ phone: this.state.phone.replace(/\D/g, "") ,
    firstName:this.state.name,
    IsActive: true,
    ProfileImage: this.state.profileImage,
    lastModifiedBy: userid,
    lastModifiedOn: new Date()});
    this.setState({email: this.state.email.toLowerCase().replace(/\s/g, '')})
   
    // if (
    //   this.state.phone.replace(/\D/g, "").length != 11 &&
    //   this.state.phone.replace(/\D/g, "").length != 12
    // ) {
    //   this.setState({ validatePhone: true });
    // } else {
    //   this.setState({ validatePhone: false });
    // }
    setTimeout(() => {
      let { validate } = this.state;
      if (
        !this.state.name ||
        !this.state.email ||
        !functions.validateEmployeCode(this.state.EmployeeCode) ||
        !functions.validateEmail(this.state.email)
      ) {
        validate["name"] = !this.state.name ? false : true;
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
        put(`physician/${this.state.nationalID}`, this.state )
          .then((response) => {
            put(`accounts/user/${this.state.userID}`, this.state );
            this.setState({
              alert: {
                open: true,
                severity: "success",
                message: "Physician successfully updated",
                title: "Success",
              },
            });
            setTimeout(() => {
              this.props.history.push("/physicians/Physicians");
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
    }, 2000);
  }

  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }
  componentDidMount() {
    list(`colorcode`).then((response) => {
      this.setState({ color: response.data });

      console.log(response);
    });
    if (roles == "Admin") {
      this.setState({ Role: true });
    }

    this.setState({ Role: "Physician" });
    list(`physician/${this.props.match.params.id}`).then((response) => {
      this.setState({
        isActive:true,
        nationalID: response.data.nationalID,
        identificationNo: response.data.identificationNo,
        healthCareLicenseID: response.data.healthCareLicenseID,
        name: response.data.name,
        lastName: response.data.lastName,
        titles: response.data.titles,
        address: response.data.address,
        EmployeeCode: response.data.employeeCode,
        profileImage:response.data.profileImage,
        feeShare:response.data.feeShare,
        healthCareLicenseValidDate: new Date(
          response.data.healthCareLicenseValidDate
        ).toLocaleDateString("en-CA"),
        dob: new Date(response.data.dob).toLocaleDateString("en-CA"),
        gender: response.data.gender,
        phone: response.data.phone,
        speciality: response.data.speciality,
        discriminator: response.data.discriminator,
        IsDeleted: false,
        email: response.data.email,
        title: response.data.title,
        degree: response.data.degree,
        calendarID: response.data.calendarID,
        userID: response.data.userID,
        choosenColor: response.data.colorCode,
      });
      //   alert(this.state.choosenColor)
      // let str = "#" + this.state.choosenColor;

      //   alert(str)
      // this.setState({ choosenColor: str });
      //  alert(this.state.choosenColor)
    });
    let that = this;
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
  onDeletePhysician = () => {
    
    if (this.state.deleteCount == 0) {
      del(`physician/${this.props.match.params.id}`)
        .then((response) => {
          this.props.history.push("/physicians/Physicians");
        })
        .catch((error) => {
          toast.error(error.response.data + " ❕❕❕");
          this.setState({deleteCount: this.state.deleteCount+1})
          
        });
    }
    if(this.state.deleteCount == 1)
    {
      del(`physician/${this.props.match.params.id}?IsForceDelete=true`)
      .then((response) => {
        this.props.history.push("/physicians/Physicians");
      })
      .catch((error) => {
        toast.error(error.response.data + " ❕❕❕");
        
      });
    }
    // this.setState({
    //   IsDeleted: true,
    // });

  };

  render() {
    let { alert, calendars, color, modalDelete } =
      this.state;
    const { translate } = this.context;
    const openPackageModal = () => {
      console.log(this.state.packageModal);

      this.state.packageModal = true;
      console.log(this.state.packageModal);
    };

    const closePackageModal = () => {
      console.log(this.state.packageModal);

      this.state.packageModal = false;
      console.log(this.state.packageModal);
    };

    return (
      <>
        <PopUp
          $class={this}
          buttons={[
            { title: "Close", className: "btn btn-secondary", action: "close" },
            {
              title: "Delete",
              className: "btn cc-btnred",
              action: "onDeletePhysician",
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
        {this.state.nationalID && (
          <div className="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
            <div className="row w-100 d-flex justify-content-between m-0">
              <div className="d-flex align-items-center">
                <p className="m-0 cc-page-title text-uppercase pl-2">
                  {translate("EDIT_PHYSICIAN")}
                </p>
              </div>

              <div className="px-1">
                <div className="d-flex align-items-content w-100">
                  <button
                    className="border-0 shadow btn btn-md cc-btn"
                    onClick={this.openPackageModal}
                    data-toggle="modal"
                    data-target="#collapsePackageForm"
                  >
                    {translate("ADD_PACKAGE")}
                  </button>
                  <NavLink
                    className="border-0 shadow btn btn-md cc-btn ml-2"
                    to={`/Physicians`}
                  >
                    {translate("BACK_TO_PHYSICIANS_LIST")}
                  </NavLink>
                </div>
              </div>
            </div>

            <div
              class="modal col-12 offset-4 mt-5"
              tabIndex="-1"
              id="collapsePackageForm"
            >
              <div class="col-sm-4 modal-header">
                <h5 class="modal-title text-white">
                  {translate("ADD_NEW_PACKAGE")}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="card col-sm-4 ml-10 card-body bg-light">
                <AddPhysicianPackage nationalID={this.state.nationalID} />
              </div>
            </div>

            <div className="mt-1 py-3 px-2 border-bottom">
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
                      required
                      fullWidth
                      id="EmployeeCode"
                      type="text"
                      value={this.state.EmployeeCode}
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
                      id="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.handleChange}
                      required
                      label={translate("FIRST_NAME")}
                    />
                    {!this.state.validate.name && (
                      <span className="text-danger">
                        Physician First Name is Mandatory
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="lastName"
                      value={this.state.lastName}
                      type="text"
                      onChange={this.handleChange}
                      label={translate("LAST_NAME")}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-container">
                    <TextField
                      required
                      fullWidth
                      id="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      label={translate("EMAIL_ID")}
                    />
                    {!this.state.validate.email && (
                      <span className="text-danger">
                        Please Enter a Valid email ID
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
                      value={this.state.identificationNo}
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
                        value={this.state.gender}
                        onChange={(e) => {
                          this.setState({ gender: e.target.value });
                        }}
                      >
                        <MenuItem value="Female">
                          {translate("FEMALE")}
                        </MenuItem>
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
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-container">
                    <MuiPhoneNumber
                      className="col-md-12"
                      onlyCountries={["gb", "us", "in", "cn", "pk"]}
                      value={this.state.phone}
                      label={translate("MOBILE")}
                      defaultCountry={"pk"}
                      onChange={(phone) => this.setState({ phone })}
                    />
                    ,
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="degree"
                      type="text"
                      value={this.state.degree}
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
                      value={this.state.title}
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
                        id="speciality"
                        value={this.state.speciality}
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
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="input-container">
                    <FormControl fullWidth>
                      <InputLabel>Calendar Color</InputLabel>
                      <Select
                        value={this.state.choosenColor}
                        id="color"
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
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="input-container">
                    <TextField
                      required
                      fullWidth
                      type="date"
                      value={this.state.healthCareLicenseValidDate}
                      onChange={this.handleChange}
                      id="healthCareLicenseValidDate"
                      label={translate("HEALTH_CARE_LICENSE_VALIDITY_DATE")}
                    />
                  </div>
                </div>
                <div className="col-md-1">
                  <div className="input-container">
                    <TextField
                      required
                      fullWidth
                      type="text"
                      value={this.state.feeShare}
                      onChange={this.handleChange}
                      id="feeShare"
                      label={"Fee Share"}
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
                      label={translate("ENTER_HEALTH_CARE_LISENCE_CODE")}
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
                    {translate("DELETE")}
                  </button>
                </div>
              </div>
            </div>

            {/* <PhysicianPackgaeList nationalID={this.state.nationalID} /> */}
            
          </div>
        )}
      </>
    );
  }
}
