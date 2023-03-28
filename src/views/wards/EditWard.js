import React from "react";
import list, { put, del } from "../../_helper/api";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "react-toastify/dist/ReactToastify.css";
import TranslationContext from "../../context/translation";
import "../style/ccstyle.css";
import PopUp from "../Components/PopUp";
let userid=JSON.parse(localStorage.getItem("user"));
export default class EditWard extends React.Component {
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
      Type: "",
      wardID: "",
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
    this.setState({ wardID: this.props.match.params.id });

    list(`ward/${this.props.match.params.id}`).then((response) => {
      this.setState({
        Name: response.data.name,
        Type: response.data.type,
        lastModifiedBy: userid,
        lastModifiedOn: new Date(),
        CreatedBy: response.data.createdBy,
        CreatedOn: response.data.createdOn,
      });
    });
  }
  handleSubmit(event) {
    let { validate, modalDelete } = this.state;

    put(`ward/${this.props.match.params.id}`, this.state)
      .then((response) => {
        this.setState({
          alert: {
            open: true,
            severity: "success",
            message: "Ward successfully updated",
            title: "Success",
          },
        });
        setTimeout(() => {
          this.props.history.push("/wards");
        }, 2000);
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

  close() {
    this.setState({ modalDelete: false });
  }
  onDeleteWard = () => {
    this.setState({ modalDelete: true });
  };
  deleteWard = () => {
    this.setState({ deletedBy: userid, deletedOn: new Date() });
    setTimeout(() => {
    del(`ward/${this.props.match.params.id}`).then((response) => {
      this.props.history.push("/wards");
    });
    this.setState({
      IsDeleted: true,
    });
  }, 2000);
  };
  handleClose() {
    this.setState({ alert: { ...this.state.alert, open: false } });
  }

  render() {
    const { translate } = this.context;
    let { alert, modalDelete } = this.state;
    return (
      <>
        <PopUp
          $class={this}
          buttons={[
            { title: "Close", className: "btn btn-secondary", action: "close" },
            {
              title: "Delete",
              className: "btn cc-btnred",
              action: "deleteWard",
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
                    id="Type"
                    type="text"
                    value={this.state.Type}
                    onChange={this.handleChange}
                    label={translate("TYPE")}
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
                  onClick={this.onDeleteWard}
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
