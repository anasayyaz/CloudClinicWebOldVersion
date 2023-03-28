import React from 'react';
import { NavLink } from "react-router-dom";
import { post } from "../../_helper/api";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import TranslationContext from "../../context/translation";
let userid = JSON.parse(localStorage.getItem("user"));
export default class AddMedicine extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);

    this.validate = {
      name: true,
      genericName: true
    }

    this.alert = {
      open: false,
      severity: 'error',
      message: '',
      title: 'error'
    }

    this.state = {
      name: '',
      genericName: '',
      purpose: '',
      dosageForm: '',
      isDeleted: 'false',
      validate: this.validate,
      alert: this.alert
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let { validate } = this.state;
    if (!validate.genericName || !validate.name) {
      validate['genericName'] = !this.state.genericName ? false : true;
      validate['name'] = !this.state.name ? false : true;
      this.setState({ validate })
    }
    this.setState({ [event.target.id]: event.target.value });
  }

  onCreateMedicine = () => {
    let { validate } = this.state;
    if (!this.state.genericName || !this.state.name) {
      validate['genericName'] = !this.state.genericName ? false : true;
      validate['name'] = !this.state.name ? false : true;
      this.setState({ validate })
    } else {
      post('medicine', {
        name: this.state.name,
        genericName: this.state.genericName,
        purpose: this.state.purpose,
        dosageForm: this.state.dosageForm,
        CreatedBy: userid,
        CreatedOn: new Date(),
      }).then((response) => {
          this.setState({ alert: { open: true, severity: 'success', message: 'Medicine successfully added', title: 'Success' } })
          setTimeout(() => {
            this.props.history.push('/medicines')
          }, 1000);
        }).catch((error) => {
            this.setState({ alert: { open: true, severity: 'error', message: 'Something went wrong', title: 'Error' } })
        });
    }
  }
  handleClose() {
    this.setState({ alert:{...this.state.alert, open: false} })
  }

  render() {
    const { translate } = this.context;
    let { alert } = this.state;
    return (
      <>
        <Snackbar open={alert.open}                  
        autoHideDuration={2000}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} onClose={() => { this.handleClose() }}>
          <Alert onClose={() => { this.handleClose() }} severity={alert.severity}>
            <AlertTitle>{alert.title}</AlertTitle>
            <strong>{alert.message}</strong>
          </Alert>
        </Snackbar>

        <div className="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
          <div className="row w-100 d-flex justify-content-between m-0">
            <div className="d-flex align-items-center">
              <p className="m-0 cc-page-title text-uppercase pl-2">
              {translate("ADD_NEW_MEDICINE")}
            </p>
            </div>

            <div className="col-md-2 px-1">
              <NavLink
                className="w-100 border-0 shadow btn btn-md cc-btn"
                to={`/Medicines`} > {translate("VIEW_MEDICINES")}
              </NavLink>
            </div>
          </div>
          <div className="mt-1 py-3 px-2">
            <div className="row">

              <div className="col-md-6">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    id="name"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("NAME")}
                  />
                  {!this.state.validate.name && <span className="text-danger">Name is Mandatory</span>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    id="genericName"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("GENRIC_NAME")}
                  />
                  {!this.state.validate.genericName && <span className="text-danger">Generic Name is Mandatory</span>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="purpose"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("PURPOSE")}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="dosageForm"
                    type="text"
                    onChange={this.handleChange}
                    label={translate("DOSAGE_FORM")}
                  />
                </div>
              </div>
            </div>

            <div className="row px-2 mt-1 d-flex justify-content-end">
              <div className="col-md-2 px-1">
                <button onClick={() => { this.onCreateMedicine() }} className="w-100 border-0 shadow btn btn-md cc-btn">
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
