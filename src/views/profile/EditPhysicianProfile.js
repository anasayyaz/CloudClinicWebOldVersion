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
// import AddPhysicianPackage from "./AddPhysicianPackage";
// import PhysicianPackgaeList from "./PhysicianPackageList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MuiPhoneNumber from "material-ui-phone-number";
import TranslationContext from "../../context/translation";
let userid=JSON.parse(localStorage.getItem("user"));
var roles = localStorage.getItem("roles");
let nid;
export default class EditPhysicianProfile extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      name: true,
      nationalID: true,
      CalendarID: true,
      Email: true,
    };
    this.alert = {
      open: false,
      severity: "error",
      message: "",
      title: "error",
    };
    this.SchedulerService = new SchedulerService();
    this.state = {
      identificationNo:'',
      EmployeeCode:'',
      Role:false,
      nationalID: "",
      color:[],
      choosenColor:'',
      healthCareLicenseID: "",
      titles: "",
      name: "",
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
      Email: "",
      userID:'',
      title: "",
      degree: "",
      calendars: [],
      colorCode:'',
      packageModal: true,
      calendarID:'',
      "isActive":true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleChange(event) {

    let { validate } = this.state;
    if ( !validate.name || !validate.CalendarID) {
      validate["name"] = !this.state.name ? false : true;
      validate["CalendarID"] = !this.state.CalendarID ? false : true;
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
            color: e.target.value
        })
    }
  handleSubmit(event) 
  {
    let str = this.state.choosenColor;
    str = str.slice(1);
    this.setState({colorCode:str})
 this.setState({phone:this.state.phone.replace('-','')});
 
 setTimeout(() => {


    let { validate } = this.state;
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

      put(`physician/${this.state.nationalID}`, this.state )
        .then((response) => {
          put(`accounts/user/${this.state.userID}`, {
            firstName: this.state.name,
            phoneNumber: this.state.phone,
            address: this.state.address,
            titles: this.state.titles,
            lastName: this.state.lastName,
            EmployeeCode:this.state.EmployeeCode,
            colorCode:str,
            email:this.state.email
          });
          this.setState({
            alert: {
              open: true,
              severity: "success",
              message: "Physician successfully updated",
              title: "Success",
            },
          });
        })
        .catch((error) => {
          this.setState({
            alert: {
              open: true,
              severity: "error",
              message: "Something went wrong",
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


    list(`physician/getPhysician/${userid}`).then((response) => {


     nid=response.data[0].nationalID;
     list(
      `colorcode`
    ).then((response) => {
      this.setState(({color:response.data}))

     console.log(response)
    })
    if (roles == "Admin") {
      this.setState({Role:true});
    }

    this.setState({Role:'Physician'});
    list(`physician/${nid}`).then((response) => {

      this.setState({
        nationalID: response.data.nationalID,
        identificationNo:response.data.identificationNo,
        healthCareLicenseID: response.data.healthCareLicenseID,
        name: response.data.name,
        lastName: response.data.lastName,
        titles: response.data.titles,
        address: response.data.address,
        EmployeeCode:response.data.employeeCode,
        healthCareLicenseValidDate: new Date(
          response.data.healthCareLicenseValidDate
        ).toLocaleDateString("en-US"),
        dob: new Date(response.data.dob).toLocaleDateString("en-US"),
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
        choosenColor:response.data.colorCode,

      });
      //  alert(this.state.choosenColor)
      let str = "#" + this.state.choosenColor;
      
      //  alert(str)
      this.setState({choosenColor:str})
      //  alert(this.state.choosenColor)

      
   
    });
    })

   
    let that = this;
    
  }

  handleReset()
  {
    toast.info("New password sent to user "+this.state.name+" on email: "+this.state.email);
    put(`accounts/resentPassword/${this.state.userID}`, {
    
    }).then((response) => {
    
    });
    
  }
  onDeletePhsician = () => {
   
    del(`physician/${nid}`).then((response) => {
      this.props.history.push("/physicians/Physicians");
    });
    this.setState({
      IsDeleted: true,
    });
  };
  render() {
    let { alert, calendars,color } = this.state;
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
                {translate("ADD_NEW_PHYSICIAN")}
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
                <h5 class="modal-title text-white">{translate("ADD_NEW_PACKAGE")}</h5>
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
                {/* <AddPhysicianPackage nationalID={this.state.nationalID} /> */}
              </div>
            </div>

            <div className="mt-1 py-3 px-2 border-bottom">
              <div className="row">
                <div className="col-md-2">
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
                <div className="col-md-4">
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

                <div className="col-md-6">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      disabled
                      id="identificationNo"
                      type="text"
                      value={this.state.identificationNo}
                      onChange={this.handleChange}
                      label={translate("NATIONAL_IDENTIFICATION_CODE")}
                    />
                  </div>
                </div>

                <div className="col-md-6">
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
                        <MenuItem value="Female">{translate("FEMALE")}</MenuItem>
                        <MenuItem value="Male">{translate("MALE")}</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="input-container">
                      <MuiPhoneNumber className="col-md-12"  onlyCountries={['gb','us','in','cn','pk']}  
                      value={this.state.phone} 
                      label={translate("MOBILE")} 
                      defaultCountry={'pk'}  
                      onChange={phone => this.setState({ phone })}/>,
             
                  </div>
                </div>

                <div className="col-md-3" style={{ marginTop: "30px" }}>
                  <div className="form-group">
                    <span style={{ fontSize: "16px", color: "grey" }}>
                    {translate("DATE_OF_BIRTH")}
                    </span>
                  </div>
                </div>
                <div className="col-md-3" style={{ marginTop: "10px" }}>
                  <div className="input-container">
                    <input
                      type="text"
                      value={this.state.dob}
                      onChange={this.handleChange}
                      id="dob"
                      placeholder={translate("DATE_OF_BIRTH")}
                    />
                  </div>
                </div>

                <div className="col-md-6">
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

                <div className="col-md-3" style={{ marginTop: "30px" }}>
                  <div className="input-container">
                    <span style={{ fontSize: "16px", color: "grey" }}>
                    {translate("HEALTH_CARE_LICENSE_VALIDITY_DATE")}:
                    </span>
                  </div>
                </div>
                <div className="col-md-3" style={{ marginTop: "10px" }}>
                  <div className="input-container">
                    <input
                      type="text"
                      value={this.state.healthCareLicenseValidDate}
                      onChange={this.handleChange}
                      id="healthCareLicenseValidDate"
                      placeholder={translate("HEALTH_CARE_LICENSE_VALIDITY_DATE")}
                    />
                  </div>
                </div>

                <div className="col-md-12">
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

                <div className="col-md-6">
                  <div className="input-container">
                    <TextField
                      required
                      fullWidth
                      id="Email"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      label={translate("EMAIL_ID")}
                    />
                    {!this.state.validate.Email && (
                      <span className="text-danger">
                        Please Enter a Valid Email ID
                      </span>
                    )}
                  </div>
                </div>
                {/* <div className="col-md-6">
              <div className="input-container">
              <FormControl fullWidth>
                    <InputLabel>Calendar Color</InputLabel>
              <Select
              value={this.state.choosenColor}
                      id="color"
                      ref="dropDownColor"
                      onChange={(e) => { this.setState({ choosenColor: e.target.value }) }}
                    >{color &&
                      color.length > 0 &&
                      color.map((items, index) => {
                        return <MenuItem value={items.colorHexaCode}><div style={{backgroundColor:items.colorHexaCode , width: "100%" ,padding: "2px", borderRadius:"10px"}}>{index}{" "}{items.speciality}</div></MenuItem>
                      })}
                    </Select>
           </FormControl>
              </div>
                </div> */}
                

                <div className="col-md-6">
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
                        <MenuItem value="CARDIOLOGIST">CARDIOLOGIST</MenuItem>
                        <MenuItem value="FAMILY PHYSICIAN"> PHYSICIAN</MenuItem>
                        <MenuItem value="PEDIATRICIAN">PEDIATRICIAN</MenuItem>
                        <MenuItem value="PSYCHIATRIST">PSYCHIATRIST</MenuItem>
                        <MenuItem value="GYNECOLOGIST">GYNECOLOGIST</MenuItem>
                        <MenuItem value="SURGEON">SURGEON</MenuItem>
                        <MenuItem value="PATHOLOGIST">PATHOLOGIST</MenuItem>
                        <MenuItem value="NEUROLOGIST">NEUROLOGIST</MenuItem>
                        <MenuItem value="UROLOGIST">UROLOGIST</MenuItem>
                        <MenuItem value="DERMATOLOGIST">DERMATOLOGIST</MenuItem>
                        <MenuItem value="RADIOLOGIST">RADIOLOGIST</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-md-4">
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

                <div className="col-md-4">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="title"
                      type="text"
                      value={this.state.title}
                      onChange={this.handleChange}
                      label={translate("TITLE")}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group  row px-2 mt-1 d-flex justify-content-end">
              <label className="control-label col-md-5"></label>
              {this.state.Role ? (
   <div class="col-md-2 px-1">
   <button onClick={this.handleReset} class="w-100 border-0 shadow btn btn-info cc-btn" >{translate("RESET_PASSWORD")}</button>
   </div>
                 ) : null}
              <div class="col-md-2 px-1">
<button  onClick={this.handleSubmit} class="w-100 border-0 shadow btn btn-info cc-btn" >{translate("UPDATE")}</button>
</div>

{/* <div class="col-md-2 px-1">
<button  onClick={this.onDeletePhsician} class="w-100 border-0 shadow btn-danger " >{translate("DELETE")}</button>
              </div> */}
            </div>
            </div>

            {/* <PhysicianPackgaeList nationalID={this.state.nationalID} /> */}
          </div>
        )}
      </>
    );
  }
}
