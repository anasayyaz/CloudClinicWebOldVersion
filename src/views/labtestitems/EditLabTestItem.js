import React from "react";
import { NavLink } from "react-router-dom";
import list, { put, del } from "../../_helper/api";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import TranslationContext from "../../context/translation";
import "../style/ccstyle.css";
import { ToastContainer, toast } from "react-toastify";
import PopUp from "../Components/PopUp";
let userid = JSON.parse(localStorage.getItem("user"));
export default class AddMedicine extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.validate = {
      name: true,
      genericName: true,
    };
    this.alert = {
      open: false,
      severity: "error",
      message: "",
      title: "error",
    };
    this.state = {
      labTestTypeID:"",
      test: "",
      code: "",
      type: "",
      category: "",
      rate: "",
      validate: this.validate,
      alert: this.alert,
      modalDelete: false,
      lastModifiedBy: "",
      lastModifiedOn: "",
      CreatedBy: "",
      CreatedOn: "",
      deletedOn: "",
      deletedBy: "",
      isActive:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    if (!validate.genericName) {
      validate["genericName"] = !this.state.genericName ? false : true;
      this.setState({ validate });
    }

    this.setState({
      [id]: value,
    });
  }

  componentDidMount() {
    list(`labtesttype/${this.props.match.params.id}`).then((response) => {
      this.setState({
        labTestTypeID:response.data.labTestTypeID,
        test: response.data.test,
        code: response.data.code,
        type: response.data.type,
        category: response.data.category,
        rate: response.data.rate,
        lastModifiedBy: userid,
        lastModifiedOn: new Date(),
        CreatedBy: response.data.createdBy,
        CreatedOn: response.data.createdOn,
      });
    });
  }
  handleSubmit(event) {
    let { validate } = this.state;
    // if (!this.state.name || !this.state.genericName) {
    //   validate["name"] = !this.state.name ? false : true;
    //   validate["genericName"] = !this.state.genericName ? false : true;
    //   this.setState({ validate });
    // } else {
      put(`labtesttype/${this.props.match.params.id}`, this.state)
        .then((response) => {
          this.setState({
            alert: {
              open: true,
              severity: "success",
              message: "Lab Test successfully updated",
              title: "Success",
            },
          });
          setTimeout(() => {
            this.props.history.push("/labtestitems");
          }, 1000);
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
    // }
  }
  close() {
    this.setState({ modalDelete: false });
  }
  deleteMedicine = () => {
    this.setState({ deletedBy: userid, deletedOn: new Date() });
    setTimeout(() => {
      del(`labtesttype/${this.props.match.params.id}`, this.state).then(
        (response) => {
          this.props.history.push("/labtestitems");
        }
      );
      this.setState({
        IsDeleted: true,
      });
      toast.success("Lab Test deleted successfully");
    }, 2000);
  };
  onDeleteMedicine = () => {
    this.setState({ modalDelete: true });
  };
  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }

  render() {
    const { translate } = this.context;
    let { alert, modalDelete } = this.state;
    return (
      <>
        <ToastContainer />
        <PopUp
          $class={this}
          buttons={[
            { title: "Close", className: "btn btn-secondary", action: "close" },
            {
              title: "Delete",
              className: "btn cc-btnred",
              action: "deleteMedicine",
            },
          ]}
          show={modalDelete}
          width="500px"
          title="Delete Confirmation"
          name="modalDelete"
          content={
            <>
              <h4>Are you sure you want to delete this lab test?</h4>
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

        {this.state.test && (
          <div className="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
            <div className="row w-100 d-flex justify-content-between m-0">
              <div className="d-flex align-items-center">
                <p className="m-0 cc-page-title text-uppercase pl-2">
                  {"Edit Lab Test"}
                </p>
              </div>

              <div className="col-md-2 px-1">
                <NavLink
                  className="w-100 border-0 shadow btn btn-md cc-btn"
                  to={`/labtestitems`}
                >
                  {" "}
                  {"View Lab Test Items"}
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
                      id="labtesttypeID"
                      type="text"
                      value={this.state.labTestTypeID}
                      onChange={this.handleChange}
                      label={"Lab Test ID"}
                    />
                    {/* {!this.state.validate.name && <span className="text-danger">Name is Mandatory</span>} */}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-container">
                    <TextField
                      required
                      fullWidth
                      id="test"
                      type="text"
                      value={this.state.test}
                      onChange={this.handleChange}
                      label={"Test"}
                    />
                    {/* {!this.state.validate.name && <span className="text-danger">Name is Mandatory</span>} */}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-container">
                    <TextField
                      required
                      fullWidth
                      id="code"
                      type="text"
                      value={this.state.code}
                      onChange={this.handleChange}
                      label={"Code"}
                    />
                    {/* {!this.state.validate.code && <span className="text-danger">Generic Name is Mandatory</span>} */}
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="type"
                      type="text"
                      value={this.state.type}
                      onChange={this.handleChange}
                      label={"Type"}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="category"
                      type="text"
                      onChange={this.handleChange}
                      label={"Category"}
                      value={this.state.category}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-container">
                    <TextField
                      fullWidth
                      id="rate"
                      type="number"
                      value={this.state.rate}
                      onChange={this.handleChange}
                      label={"Rate"}
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
                    onClick={this.onDeleteMedicine}
                    class="w-100 border-0 shadow btn  cc-btnred "
                  >
                    {translate("DELETE")}
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
