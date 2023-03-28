import React from 'react';
import { NavLink } from "react-router-dom";
import { post } from "../../_helper/api";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from "@material-ui/core";
import * as functions from "../../_helper/functions";
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiPhoneNumber from "material-ui-phone-number";
import TranslationContext from "../../context/translation";
let userid=JSON.parse(localStorage.getItem("user"));
export default class AddLocation extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      Name: true,
      Type: true
    }
    this.alert = {
      open: false,
      severity: 'error',
      message: '',
      title: 'error'
    }
    this.state = {
      Name:'',
      Address:'',
      validate: this.validate,
      alert: this.alert,
      createdOn: new Date(),
      createdBy: userid
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let { validate } = this.state;
    this.setState({ [event.target.id]: event.target.value });
  }

  onCreateLocation = () => {

    let { validate } = this.state;
      post('location ', this.state).then((response) => {
        this.setState({ alert: { open: true, severity: 'success', message: 'Location successfully added', title: 'Success' } })
        setTimeout(() => {
          this.props.history.push('/locations')
        }, 1000);
      }).catch((error) => {
        this.setState({
          alert: {
            open: true,
            severity: 'error',
            message: error.response?.data?.modelState[""][0],
            title: 'Error'
          }
        })
      })
    // }
  }
  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } })
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
        <div className="row">
          <div className="col-md-10">
            <h4>Add Location</h4>
          </div>
          <div className="col-md-2 px-1">
            <NavLink
              className="w-100 border-0 shadow btn btn-md cc-btn"
              to={`locations`} > {translate("VIEW_LOCATIONS")}
              </NavLink>
          </div>
        </div>
        <div className="form-horizontal">
          <div className="form-body">
            <div className="row">
      
              <div className="col-md-6">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    id="Name"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("NAME")}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="Address"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("ADDRESS")}
                  />
                </div>
              </div>

            
           
             
            </div>

            <div className="row px-2 mt-1 d-flex justify-content-end">
              <div className="col-md-2 px-1">
                <button onClick={this.onCreateLocation} className="w-100 border-0 shadow btn btn-md cc-btn">{translate("SAVE")}</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}