import React, { useEffect, useState, createRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import list, { put, post } from "../../_helper/api";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

export default class AddVitalSigns extends React.Component {
  constructor(props) {
    super(props);
    this.alert = {
      open: false,
      severity: 'error',
      message: '',
      title: 'error'
    }
    this.state = {

      patient_NationalID: '',
      visitID: '',
      dateTime1: '',
      dateTime2: '',
      datetimeECG: '',
      datetimeBP: '',
      map: '',
      bpm: '',
      dia: '',
      sys: '',
      height: '',
      hr: '',
      pi: '',
      pr: '',
      prspO2: '',
      qrs: '',
      qt: '',
      qtc: '',
      spO2: '',
      temp: '',
      weight: '',


      alert: this.alert,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


  }
  onCreateVitalSigns = () => {

    var date = new Date();
    date.setHours(date.getHours() + 5);
    var time = date.toISOString();
    // var day = date.getDate();       // yields date
    // var month = date.getMonth() + 1;    // yields month (add one as '.getMonth()' is zero indexed)
    // var year = date.getFullYear();  // yields year
    // var hour = date.getHours();     // yields hours 
    // var minute = date.getMinutes(); // yields minutes
    // var second = date.getSeconds(); // yields seconds

    // // After this construct a string with the above results as below
    // var time = year + "-" + month + "-" + day + "T" + hour + ':' + minute + ':' + second+'.017'; 

    // DateTime.ParseExact(YourString, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
    this.setState({
      patient_NationalID: this.props.patientID,
      visitID: this.props.id,
      dateTime1: time,
      dateTime2: time,
      datetimeECG: time,
      datetimeBP: time,
      map: 35,
      spO2: this.state.spO2,
      bpm: this.state.pr,
      hr: this.state.pr,
      prspO2: this.state.spO2,
    })

    put(`patient/updatePatientTag/${this.props.id}`, { isVitalSignFilled: true })

    setTimeout(() => {
      console.log(this.state);
      post('vitalsign', this.state).then((response) => {

        this.setState({ alert: { open: true, severity: 'success', message: 'Vital Signs successfully added', title: 'Success' } })
        this.props.setting();
        setTimeout(() => {
          this.props.closeAll();
        }, 1000);
        // put(`patient/updatePatientTag/${this.state.id}`, {isVitalSignFilled: false})

      }).catch((error) => {
        if (error.response.status === 409) {
          this.setState({ alert: { open: true, severity: 'error', message: 'Vital Signs with same ID already exists', title: 'Error' } })
        } else {
          this.setState({ alert: { open: true, severity: 'error', message: 'Something went wrong', title: 'Error' } })
        }
      });

    }, 1000);

    //  setTimeout(() => {
    //     this.props.history.push('/dashboard')
    //   }, 1000);
  }




  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  componentDidMount = () => {


  }

  handleClose() {
    this.setState({ ...alert, open: false })
  }

  render() {

    let { alert } = this.state;
    return (

      <>
        <div>
          <Snackbar open={alert.open} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => { this.handleClose() }}>
            <Alert onClose={() => { this.handleClose() }} severity={alert.severity}>
              <AlertTitle>{alert.title}</AlertTitle>
              <strong>{alert.message}</strong>
            </Alert>
          </Snackbar>


          <div class="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
            <div className="form-group row">
              <h4 class="control-label col-sm-2" htmlFor="Patient">Patient Name:</h4>
              <h4 class="col-sm-3">
                {this.props.patientName}
              </h4>
              <h4 class="control-label col-sm-2" htmlFor="Patient">Patient ID:</h4>
              <h4 class="col-sm-3">
                {this.props.patientID}
              </h4>
            </div>



            <div>

              <hr></hr>
              <div class="row">
                <div className="col-md-3">
                  <div className="input-container">
                    <input
                      type="weight"
                      id="weight"
                      required
                      onChange={this.handleChange}
                    />
                    <label>Weight</label>
                  </div>
                </div>

                <div class="col-md-3">
                  <div className="input-container">
                    <input
                      type="height"
                      id="height"
                      required
                      onChange={this.handleChange}
                    />
                    <label>Height</label>   </div>
                </div>

                <div class="col-md-3">
                  <div className="input-container">
                    <input
                      type="temp"
                      id="temp"
                      required
                      onChange={this.handleChange}
                    />
                    <label>Temperature °F</label>      </div>
                </div>
                <div class="col-md-3">
                  <div className="input-container">
                    <input
                      type="spO2"
                      id="spO2"
                      required
                      onChange={this.handleChange}
                    />
                    <label>SPO2</label>    </div>
                </div>
              </div>
              <div class="row">
                <div className="col-md-3">
                  <div className="input-container">
                    <input
                      type="sys"
                      id="sys"
                      required
                      onChange={this.handleChange}
                    />
                    <label>Systolic</label>
                  </div>
                </div>

                <div class="col-md-3">
                  <div className="input-container">
                    <input
                      type="dia"
                      id="dia"
                      required
                      onChange={this.handleChange}
                    />
                    <label>Diastolic</label>   </div>
                </div>

                <div class="col-md-3">
                  <div className="input-container">
                    <input
                      type="pi"
                      id="pi"
                      required
                      onChange={this.handleChange}
                    />
                    <label>Perfusion Index</label>      </div>
                </div>
                <div class="col-md-3">
                  <div className="input-container">
                    <input
                      type="pr"
                      id="pr"
                      required
                      onChange={this.handleChange}
                    />
                    <label>Pulse Rate</label>    </div>
                </div>
              </div>
            </div>


          </div>
          <div class="row px-2 mt-1 d-flex justify-content-end" style={{ padding: "20px" }}>
            <div class="col-md-2 px-1 ">

              <button onClick={() => { this.onCreateVitalSigns() }} class="w-100 border-0 shadow btn btn-primary cc-btn" >Save</button>
            </div>
          </div>
        </div>

      </>
    );
  }
}

