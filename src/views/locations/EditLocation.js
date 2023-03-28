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
let userid=JSON.parse(localStorage.getItem("user"));
export default class EditLocation extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      name: true,
      nationalID: true,
      Email: true,
    };
    this.alert = {
      open: false,
      severity: "error",
      message: "",
      title: "error",
    };

    this.state = {
      Name: "",
      Address: "",
      locationID: "",
      isDeleted: false,
      alert: this.alert,
      modalDelete: false,
      lastModifiedBy: "",
      lastModifiedOn: "",
      CreatedBy: "",
      CreatedOn: "",
      deletedOn: "",
      deletedBy: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    let { validate } = this.state;
    this.setState({
      [id]: value,
    });
  }

  componentDidMount() {
    this.setState({ locationID: this.props.match.params.id });

    list(`location/${this.props.match.params.id}`).then((response) => {
      this.setState({
        Name: response.data.name,
        Address: response.data.address,
        lastModifiedBy: userid,
        lastModifiedOn: new Date(),
        CreatedBy: response.data.createdBy,
        CreatedOn: response.data.createdOn,
      });
    });
  }
  handleSubmit(event) {
    let { validate } = this.state;
    console.log(this.state);
    put(`location/${this.props.match.params.id}`, this.state)
      .then((response) => {
        this.setState({
          alert: {
            open: true,
            severity: "success",
            message: "Location successfully updated",
            title: "Success",
          },
        });
        this.props.history.push("/locations");
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
  
  onDeleteLocation = () => {
    this.setState({ modalDelete: true });
  };
  deleteLocation = () => {
    this.setState({ deletedBy: userid, deletedOn: new Date() });
    setTimeout(() => {
    del(`location/${this.props.match.params.id}`).then((response) => {
      this.props.history.push("/locations");
    });
    this.setState({
      IsDeleted: true,
    });
  }, 2000);
  };
  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }
  close() {
    this.setState({ modalDelete: false });
  }
  render() {
    const { translate } = this.context;
    let { alert , modalDelete } = this.state;
    return (
      <>
      <PopUp
          $class={this}
          buttons={[
            { title: "Close", className: "btn btn-secondary", action: "close" },
            {
              title: "Delete",
              className: "btn cc-btnred",
              action: "deleteLocation",
            },
          ]}
          show={modalDelete}
          width="500px"
          title="Delete Confirmation"
          name="modalDelete"
          content={
            <>
              <h4>Are you sure you want to delete this medicine?</h4>
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
          <div className="row w-100 d-flex justify-content-between m-0"></div>
          <div className="mt-1 py-3 px-2">
            <div className="row">
              <div className="col-md-5">
                <div className="input-container">
                  <TextField
                    required
                    fullWidth
                    id="Name"
                    type="text"
                    value={this.state.Name}
                    onChange={this.handleChange}
                    label={translate("NAME")}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="Address"
                    type="text"
                    value={this.state.Address}
                    onChange={this.handleChange}
                    label={translate("ADDRESS")}
                  />
                </div>
              </div>
            </div>

            <div className="form-group  row px-2 mt-1 d-flex justify-content-end">
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
                  onClick={this.onDeleteLocation}
                  class="w-100 border-0 shadow btn  cc-btnred "
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
