import React from 'react';
import { NavLink } from "react-router-dom";
import list, { put, del } from "../../_helper/api";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from "@material-ui/core";
import SchedulerService from "../appointments/SchedulerService";
import * as functions from '../../_helper/functions';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MuiPhoneNumber from "material-ui-phone-number";
import TranslationContext from "../../context/translation";

var roles = localStorage.getItem("roles");

export default class EditNurseProfile extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      name: true,
      nationalID: true,
      Email: true
    }
    this.alert = {
      open: false,
      severity: 'error',
      message: '',
      title: 'error'
    }
    this.SchedulerService = new SchedulerService();
    this.state = {
      Role:false,
      nationalID: '',
      healthCareLicenseID: '',
      titles: '',
      name: '',
      firstName: "",
      lastName: '',
      dob: '',
      gender: '',
      address: '',
      userID:'',
      phone: '',
      healthCareLicenseValidDate: ' ',
      speciality: ' ',
      discriminator: ' ',
      validate: this.validate,
      alert: this.alert,
      CalendarID: '',
      Email: '',
      title: '',
      degree: '',
      EmployeeCode:'',
      "isActive":true
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
    if (!validate.name) {
      validate['name'] = !this.state.name ? false : true;
      this.setState({ validate })
    }
    if (event.target.id === "email" && !validate.email) {
      validate['email'] = !this.state.email ? false : functions.validateEmail(event.target.value) ? true : false;
      this.setState({ validate })
    }

    this.setState({
      [id]: value
    });
  }


  componentDidMount() {
  
    if (roles == "Admin") {
      this.setState({Role:true});
     
    }
    this.setState({Role:'Nurse'});
    list(`physician/${this.props.match.params.id}`).then((response) => {
    
      this.setState({
        nationalID: response.data.nationalID,
        healthCareLicenseID: response.data.healthCareLicenseID,
        name: response.data.name,
        lastName: response.data.lastName,
        titles: response.data.titles,
        address: response.data.address,
        healthCareLicenseValidDate: new Date(response.data.healthCareLicenseValidDate).toLocaleDateString("en-US"),
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
        EmployeeCode:response.data.EmployeeCode,
      });
  
    })
  }
  handleSubmit(event) {
    this.setState({phone:this.state.phone.replace('-',''),
    firstName:this.state.name});
    setTimeout(() => {
    let { validate } = this.state;
    if (!this.state.name || !this.state.email || !functions.validateEmail(this.state.email)) {
      validate['name'] = !this.state.name ? false : true;
      validate['email'] = !this.state.email ? false : functions.validateEmail(this.state.email) ? true : false;
      this.setState({ validate })
    } else {
      put(`physician/${this.state.nationalID}`, this.state).then((response) => {
        put(`accounts/user/${this.state.userID}`, {firstName: this.state.name, lastName:this.state.lastName, titles:this.state.titles, phoneNumber: this.state.phone, address: this.state.address,email: this.state.email})
        this.setState({ alert: { open: true, severity: 'success', message: 'Nurse successfully updated', title: 'Success' } })
      }).catch((error) => {
        this.setState({ alert: { open: true, severity: 'error', message: 'Something went wrong', title: 'Error' } })
      });
    }
  }, 2000);
  }
  handleReset()
  {
    toast.info("New password sent to user "+this.state.name+" on email: "+this.state.email);
    put(`accounts/resentPassword/${this.state.userID}`, {
    
    }).then((response) => {
    
    });
    
  }
  onDeleteNurse = () => {
    del(`physician/${this.props.match.params.id}`).then((response) => {
      this.props.history.push("/nurses/Nurses")
    })
    this.setState({
      IsDeleted: true
    });
  }
  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } })
  }

  render() {
    let { alert } = this.state;
    const { translate } = this.context;
    return (
      <>
        <Snackbar open={alert.open}                  autoHideDuration={2000}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => { this.handleClose() }}>
          <Alert onClose={() => { this.handleClose() }} severity={alert.severity}>
            <AlertTitle>{alert.title}</AlertTitle>
            <strong>{alert.message}</strong>
          </Alert>
        </Snackbar>
        <ToastContainer />
        {this.state.nationalID && <div className="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
          <div className="row w-100 d-flex justify-content-between m-0">
            <div className="d-flex align-items-center">
              <p className="m-0 cc-page-title text-uppercase pl-2">
                
                {translate("ADD_NEW_NURSE")}
            </p>
            </div>

            <div className="col-md-2 px-1">
              <NavLink
                className="w-100 border-0 shadow btn btn-md cc-btn"
                to={`/Nurses`} > Back to Nurses List
              </NavLink>
            </div>
          </div>
          <div className="mt-1 py-3 px-2">
            <div className="row">

              <div className="col-md-2">
                <div className="input-container">


                  <FormControl fullWidth>
                    <InputLabel>Title</InputLabel>
                    <Select
                      id="titles"
                      value={this.state.titles}
                      onChange={(e) => { this.setState({ titles: e.target.value }) }}
                    >
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
                    onChange={this.handleChange}
                    label="Employee ID"
                  />
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
                  {!this.state.validate.name && <span className="text-danger">First Name is Mandatory</span>}
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

              <div className="col-md-6">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    disabled
                    id="nationalID"
                    type="text"
                    value={this.state.nationalID}
                    onChange={this.handleChange}
                    label="National Identification Code"
                  />
                  {!this.state.validate.nationalID && <span className="text-danger">National ID is Mandatory</span>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-container">
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      id="gender"
                      value={this.state.gender}
                      onChange={(e) => { this.setState({ gender: e.target.value }) }}
                    >
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-container">
                  {/* <TextField
                    fullWidth
                    id="phone"
                    type="text"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    label="phone"
                  /> */}
                   <MuiPhoneNumber className="col-md-12"  onlyCountries={['gb','us','in','cn','pk']}  value={this.state.phone} label="Mobile" defaultCountry={'pk'}  onChange={phone => this.setState({ phone })}/>,
             
                </div>
              </div>

              <div className="col-md-3" style={{ marginTop: '30px' }}>
                <div className="form-group">
                  <span style={{ fontSize: '16px', color: 'grey' }}>Date of Birth:</span>
                </div>
              </div>
              <div className="col-md-3" style={{ marginTop: '10px' }}>
                <div className="input-container">
                  <input type="text" value={this.state.dob} onChange={this.handleChange} id="dob" placeholder="Date of birth" />
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
                    label="Enter Health Care License Code"
                  />
                </div>
              </div>

              <div className="col-md-3" style={{ marginTop: '30px' }}>
                <div className="input-container">
                  <span style={{ fontSize: '16px', color: 'grey' }}>Health Care License Validity Date:</span>
                </div>
              </div>
              <div className="col-md-3" style={{ marginTop: '10px' }}>
                <div className="input-container">
                  <input type="text" value={this.state.healthCareLicenseValidDate} onChange={this.handleChange} id="healthCareLicenseValidDate" placeholder="Health Care License Validity Date" />
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
                    label="Address"
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
                    label="Email ID"
                  />
                  {!this.state.validate.Email && <span className="text-danger">Please Enter a Valid Email ID</span>}
                </div>
              </div>


            </div>

            <div className="form-group  row px-2 mt-1 d-flex justify-content-end">
              <label className="control-label col-md-5"></label>
              {this.state.Role ? (
   <div class="col-md-2 px-1">
   <button onClick={this.handleReset} class="w-100 border-0 shadow btn btn-info cc-btn" >Reset Password</button>
   </div>
                 ) : null}
              <div class="col-md-2 px-1">
<button  onClick={this.handleSubmit} class="w-100 border-0 shadow btn btn-info cc-btn" >Update</button>
</div>

<div class="col-md-2 px-1">
<button  onClick={this.onDeleteNurse} class="w-100 border-0 shadow btn-danger " >Delete</button>
              </div>
            </div>
          </div>
        </div>}
      </>

    );
  }
}
