import React from "react";
import { NavLink } from "react-router-dom";
import { post } from "../../_helper/api";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import TranslationContext from "../../context/translation";
let userid=JSON.parse(localStorage.getItem("user"));
export default class AddWard extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      Speciality: true,
      ColorCode: true,
    };
    this.alert = {
      open: false,
      severity: "error",
      message: "",
      title: "error",
    };
    this.state = {
      Speciality: "",
      ColorCode: "",
      validate: this.validate,
      alert: this.alert,    
      createdOn: new Date(),
      createdBy: userid
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  onCreateWard = () => {
    post("ward", this.state)
      .then((response) => {
        this.setState({
          alert: {
            open: true,
            severity: "success",
            message: "Ward successfully added",
            title: "Success",
          },
        });
        setTimeout(() => {
          this.props.history.push("/wards");
        }, 1000);
      })
      .catch((error) => {
        this.setState({
          alert: {
            open: true,
            severity: "error",
            message: error.response?.data?.modelState[""][0],
            title: "Error",
          },
        });
      });
    // }
  };
  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }
  render() {
    const { translate } = this.context;
    let { alert } = this.state;
    return (
      <>
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
        <div className="row">
          <div className="col-md-10">
            <h4>Add Speciality</h4>
          </div>
          <div className="col-md-2 px-1">
            <NavLink
              className="w-100 border-0 shadow btn btn-md cc-btn"
              to={`wards`}
            >
              {" "}
              {translate("VIEW_WARDS")}
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
                    id="Speciality"
                    type="text"
                    onChange={this.handleChange}
                    label={"Speciality"}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="input-container">
                  <TextField
                    fullWidth
                    id="ColorCode"
                    type="text"
                    onChange={this.handleChange}
                    label={"COlor Code"}
                  />
                </div>
              </div>
            </div>

            <div className="row px-2 mt-1 d-flex justify-content-end">
              <div className="col-md-2 px-1">
                <button
                  onClick={this.onCreateWard}
                  className="w-100 border-0 shadow btn btn-md cc-btn"
                >
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
