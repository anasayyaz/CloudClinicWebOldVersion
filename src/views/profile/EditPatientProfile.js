import React from 'react';
import { NavLink } from "react-router-dom";
import list, { del, put,post } from "../../_helper/api";
import * as functions from "../../_helper/functions";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import dateFormat from 'dateformat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPhoneInput from "react-phone-input-2";
import MuiPhoneNumber from "material-ui-phone-number";
import TranslationContext from "../../context/translation";

let userid=JSON.parse(localStorage.getItem("user"));
var roles = localStorage.getItem("roles");
let nid;
export default class EditPatientProfile extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      name: true,
      // nationalID: true,
      email: true
    }
    this.alert = {
      open: false,
      severity: 'error',
      message: '',
      title: 'error'
    }
    this.state = {
      MRNo:'',
      Role:false,
      identificationNo:'',
      nationalID: this.props.match.params.id,
      title: '',
      titles: '',
      name: '',
      lastName: '',
      DOB: '',
      gender: '',
      address: '',
      phone: '',
      guardianName: '',
      guardianPhone: '',
      accountNo:'',
      email: '',
      userID:'',
      validate: this.validate,
      alert: this.alert,
      IsConsultantAppointmentSchedule: false,
      IsAppointmentSchedule: true,
      isfollowup: false,
      AccountNo: '',
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

    list(`patient/getPatient/${userid}`).then((response) => {


      nid=response.data[0].nationalID;
      this.setState({Role:'Patient'});
      list(`patient/${nid}`).then((response) => {
      
      // alert(response.data.phone)
        this.setState({
          nationalID: response.data.nationalID,
          identificationNo:response.data.identificationNo,
          name: response.data.name,
          lastName: response.data.lastName,
          titles: response.data.titles,
          address: response.data.address,
          DOB: dateFormat(response.data.dob, 'mm/dd/yyyy'),
          gender: response.data.gender,
           phone: response.data.phone,
          email: response.data.email,
          guardianName: response.data.guardianName,
          guardianPhone: response.data.guardianPhone,
          accountNo:response.data.accountNo,
          IsDeleted: false,
          userID: response.data.userID,
          accountNo: response.data.accountNo,
          MRNo:response.data.MRNo,
        })
  
        
      })

    })


    
   
  }
  handleReset()
  {
    toast.info("New password sent to user "+this.state.name+" on email: "+this.state.email);
    put(`accounts/resentPassword/${this.state.userID}`, {
    
    }).then((response) => {
    
    });
    
  }
  handleSubmit(event) {

    this.setState({phone:this.state.phone.replace('-','')});
    let { validate } = this.state;
     if (!this.state.name || !this.state.email || !functions.validateEmail(this.state.email)) {
      validate['name'] = !this.state.name ? false : true;
      validate['email'] = !this.state.email ? false : functions.validateEmail(this.state.email) ? true : false;
      this.setState({ validate })
    } else {
      put(`patient/${this.state.nationalID}`, this.state).then((response) => {
        put(`accounts/user/${this.state.userID}`, {firstName: response.data.name, phoneNumber: response.data.phone, address: response.data.address, titles:response.data.titles, lastName:response.data.lastName, email:this.state.email})
        console.log({firstName: response.data.name, phoneNumber: response.data.phone, address: response.data.address, titles:response.data.titles, lastName:response.data.lastName, email:this.state.email})
  
        this.setState({ alert: { open: true, severity: 'success', message: 'Patient successfully updated', title: 'Success' } })
      }).catch((error) => {
        this.setState({ alert: { open: true, severity: 'error', message: 'Something went wrong', title: 'Error' } })
      });
    }
  }
  onDeletePatient = () => {
    del(`patient/${nid}`).then((response) => {
      console.log('patient');
      this.props.history.push("/patients/Patients")
    })
    this.setState({
      IsDeleted: true
    });
  }
  handleClose() {
    this.setState({ alert:{...this.state.alert, open: false} })
  }
  render() {
    const { translate } = this.context;
    let { alert } = this.state;
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
              {translate("EDIT_PATIENT")}
            </p>
            </div>
            {/* <div className="col-md-2 px-1">
              <NavLink
                className="w-100 border-0 shadow btn btn-md cc-btn"
                to={`/Patients`} > {translate("BACK_TO_PATIENT_LIST")}
              </NavLink>
            </div> */}
          </div>
          <div className="mt-1 py-3 px-2">

            <div className="row">

              <div className="col-md-4">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="identificationNo"
                    type="text"
                    disabled
                    value={this.state.identificationNo}
                    onChange={this.handleChange}
                    required
                    label={translate("NATIONAL_IDENTIFICATION_CODE")}
                  />
                  {/* {!this.state.validate.nationalID && <span className="text-danger">National ID is Mandatory</span>} */}
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="MRNo"
                    type="text"
                    disabled
                    value={this.state.MRNo}
                    onChange={this.handleChange}
                    required
                    label={translate("MEDICAL_RECORD_NUMBER")}
                  />
                 
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-container">
                  <FormControl fullWidth>
                    <InputLabel>{translate("GENDER")}</InputLabel>
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
              <div className="col-md-2">
                <div className="input-container">
                  <FormControl fullWidth>
                    <InputLabel>{translate("TITLE")}</InputLabel>
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

              <div className="col-md-5">
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
                  {!this.state.validate.name && <span className="text-danger">Patient First Name is Mandatory</span>}
                </div>
              </div>
              <div className="col-md-5">
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
                    id="DOB"
                    type="text"
                    value={this.state.DOB}
                    onChange={this.handleChange}
                    required
                    label={translate("DATE_OF_BIRTH")}
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
                  {!this.state.validate.email && <span className="text-danger">Please Enter a Valid Email ID</span>}
                </div>
              </div>

              <div className="col-md-3">
                <div className="input-container">
                     <MuiPhoneNumber className="col-md-12"  
                     onlyCountries={['gb','us','fr','cn','pk']}  
                     value={this.state.phone} 
                     label={translate("MOBILE")}
                     defaultCountry={'pk'}  
                     onChange={phone => this.setState({ phone })}/>,
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

              <div className="col-md-4">
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

              <div className="col-md-4">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="guardianPhone"
                    type="number"
                    value={this.state.guardianPhone}
                    onChange={this.handleChange}
                    label={translate("GUARDIAN_MOBILE")}
                  />
                </div>
              </div>

              {/* <div className="col-md-4">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="accountNo"
                    type="number"
                    value={this.state.accountNo}
                    onChange={this.handleChange}
                    label="Account No"
                  />
                </div>
              </div> */}

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
<button  onClick={this.onDeletePatient} class="w-100 border-0 shadow btn-danger " >{translate("DELETE")}</button>
              </div> */}
            </div>

          </div>
        </div>}
      </>
    );
  }
}