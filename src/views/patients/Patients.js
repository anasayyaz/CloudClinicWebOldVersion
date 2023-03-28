import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import "moment-timezone";
import moment from "moment";
import SchedulerService from "../appointments/SchedulerService.js";
import list, { put, post } from "../../_helper/api";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { parseJwt, formatDate } from "../../_helper/functions";
import PaginationTable from "../Components/PaginationTable";
import PatientProfileListing from "./PatientProfileListing";
import { Edit } from "@material-ui/icons";
import PopUp from "../Components/PopUp";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { val } from "@arction/lcjs";
import ProfileListing from "./PatientProfileListing";
import TextField from "@material-ui/core/TextField";
import DateTimePicker from "react-datetime-picker";
import TranslationContext from "../../context/translation";

let type = "All",
  patientType,
  calendar,
  cid,
  pid,
  physicianData,
  wardData,
  wardID,
  currentDate = new Date(),
  endDate = new Date(new Date().getTime() + 30 * 60000);

class Patients extends React.Component {

  static contextType = TranslationContext;
  
  constructor(props, context) {
    super(props, context);

    this.requestData = {
      pageNumber: 1,
      pageSize: 12,
      QuerySearch: "",
      InHospital: "",
      InWard: "",
    };
    this.alert = {
      open: false,
      severity: "success",
      message: "",
      title: "success",
    };
    this.state = {
      selectedFile: null,
      bulkUploadModal: false,
      newStartDatePicker: new Date(),
      newEndDatePicker: new Date(),
      wardShow: false,

      appointmentModal: false,
      requestData: this.requestData,
      alert: this.alert,
      language: this.context.language,
      columns: [
        {
          label: this.context.translate("NATIONAL_ID"),
          name: "identificationNo",
          sortable: true,

          filter: true,

          options: {
            customBodyRender: (val) => (
              <NavLink className="NavLink" to={`/EditPatient?Patient=${val}`}>
                {val}
              </NavLink>
            ),
          },
        },
        {
          label: "First Name",
          name: "name",
          sortable: true,
          filter: true,
        },
        {
          label: "Last Name",
          name: "lastName",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("MOBLIE_NUMBER"),
          name: "phone",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("ADDRESS"),
          name: "address",
          sortable: true,

          filter: true,
        },
        {
          label: this.context.translate("DATE_OF_BIRTH"),
          name: "dob",
        },
        {
          label: this.context.translate("IMAGE"),
          name: "",
          button: {
            show: true,
            value: "Image",
          },
        },
        {
          label: "ID",
          hide: true,
          name: "nationalID",
          button: {
            show: true,
            value: this.context.translate("PREVIOUS_VISITS"),
            operation: (val) =>
              this.props.history.push(`/patient/patientsVisits/${val}`),
          },
        },
        {
          label: "ID",
          hide: true,
          name: "nationalID",
          button: {
            show: true,
            value: "Edit",
            operation: (val) => this.props.history.push(`/EditPatient/${val}`),
            icon: Edit,
          },
        },
        {
          label: "ID",
          hide: true,
          name: "nationalID",
          button: {
            show: true,
            value: this.context.translate("CREATE_APPOINTMENT"),
            operation: (val) => this.needAppointment(val),
          },
        },
      ],
      rowSelection: "single",
      rowData: [],
    };
    this.handleSearchClick(null, this);
  }

  options = {
    filterType: "checkbox",
    selectableRows: false,
    responsive: "vertical",
  };
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  needAppointment(val) {
    pid = val;
    list(`patient/${val}`).then((response) => {
      patientType = response.data.inHospital;
    });

    setTimeout(() => {
      console.log(physicianData);

      if (!patientType) {
        put(`patient/updatePatientTag/${val}`, {
          IsAppointmentSchedule: true,
          tag: "NewAppointment",
        }).then((response) => {
          let { alert } = this.state;
          alert.open = true;
          alert.message = "Patient Added in appointments to be added list";
          this.setState({ alert });
          setTimeout(() => {
            this.props.history.push({
              pathname: `/appointments/Appointments/${val}`,
            });
          }, 500);
        });
      } else {
        this.setState({ appointmentModal: true });
      }
    }, 1000);
  }
  handleSearch(request, $class) {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  }

  handleBulkUpload = () => {
    const formData = new FormData();

    formData.append(
      "File",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    post("bulkupload/patientUpload", formData).then((response) => {
      window.location.reload();
    });
    this.setState({ bulkUploadModal: false });
  };

  handleSubmit = () => {
    var linkdata = new Date().getTime();

    let event = {
      Title: "Ward Meeting",
      Patient_NationalID: pid,
      Consultant_NationalID: cid,
      SummaryNotes: "Ward Meeting",
      StartDateTime: moment.parseZone(currentDate).format(), //StartDateTime.concat("T09:00:00-05:00"),
      EndDateTime: moment.parseZone(endDate).format(), //EndDateTime.concat("T10:00:00-05:00")
      meetinglink: linkdata,
      status: 1,
      meetingType: "Virtual",
      eventId: null,
      isConfirm: true,
    };
    this.createVisit(event);
    this.handleClose();
  };
  handleSearchClick(request, $class) {
    let requestData = request ? request : this.state.requestData;
    console.log(requestData);
    list(`/patient/patientsList`, requestData).then((response) => {
      let items = [];
      items = response?.data?.items.map((item) => {
        item.dob = formatDate(item.dob);
        return item;
      });
      response.data.items = items;
      $class.setState({ rowData: response.data });
    });
  }

  createVisit(event) {
    let id;
    console.log(event);
    post("visit", event).then((response) => {
      id = response.data.id;

      this.props.history.push(`/meeting/virtualpost?VisitID=${id}`);
    });
  }

  setWard(id) {
    wardID = id;
    {
      list(
        `/patient/patientsList?pageNumber=1&pageSize=10&QuerySearch=&InHospital=&WardID=${wardID}`
      ).then((response) => {
        let items = [];
        items = response?.data?.items.map((item) => {
          item.dob = formatDate(item.dob);
          return item;
        });
        response.data.items = items;
        this.setState({ rowData: response.data });
      });
    }
  }
  componentWillMount = () => {
    list("physician").then((response) => {
      physicianData = response.data;
    });

    list("ward").then((response) => {
      wardData = response.data;
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log(prevState);
    console.log(this.state.language);

    if (this.state.language !== this.context.language) {
      this.setState({
        language: this.context.language,
        columns: [
          {
            label: this.context.translate("NATIONAL_ID"),
            name: "identificationNo",
            sortable: true,

            filter: true,

            options: {
              customBodyRender: (val) => (
                <NavLink className="NavLink" to={`/EditPatient?Patient=${val}`}>
                  {val}
                </NavLink>
              ),
            },
          },
          {
            label: "First Name",
            name: "name",
            sortable: true,
            filter: true,
          },
          {
            label: "Last Name",
            name: "lastName",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("PHONE_NO"),
            name: "phone",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("ADDRESS"),
            name: "address",
            sortable: true,

            filter: true,
          },
          {
            label: this.context.translate("DATE_OF_BIRTH"),
            name: "dob",
          },
          {
            label: this.context.translate("IMAGE"),
            name: "",
            button: {
              show: true,
              value: "Image",
            },
          },
          {
            label: "ID",
            hide: true,
            name: "nationalID",
            button: {
              show: true,
              value: this.context.translate("PREVIOUS_VISITS"),
              operation: (val) =>
                this.props.history.push(`/patient/patientsVisits/${val}`),
            },
          },
          {
            label: "ID",
            hide: true,
            name: "nationalID",
            button: {
              show: true,
              value: "Edit",
              operation: (val) =>
                this.props.history.push(`/EditPatient/${val}`),
              icon: Edit,
            },
          },
          {
            label: "ID",
            hide: true,
            name: "nationalID",
            button: {
              show: true,
              value: this.context.translate("CREATE_APPOINTMENT"),
              operation: (val) => this.needAppointment(val),
            },
          },
        ],
      });
    }
  };
  setConsultant(id) {
    cid = id;
  }
  setcalendar(cld) {
    calendar = cld;
  }
  dataChange(event) {
    let [key, value] = [event.target.name, event.target.value];
    type = event.target.value;
    this.getLatest(type);
  }
  getLatest(type) {
    list("physician").then((response) => {
      physicianData = response.data;
      console.log(response.data);
    });

    if (type == "All") {
      list(
        "/patient/patientsList?pageNumber=1&pageSize=10&QuerySearch=&InHospital=&WardID="
      ).then((response) => {
        let items = [];
        items = response?.data?.items.map((item) => {
          item.dob = formatDate(item.dob);
          return item;
        });
        response.data.items = items;
        this.setState({ rowData: response.data });
      });
      this.setState({ wardShow: false });
    } else if (type == "Ward") {
      list(
        "/patient/patientsList?pageNumber=1&pageSize=10&QuerySearch=&InHospital=true&WardID="
      ).then((response) => {
        let items = [];
        items = response?.data?.items.map((item) => {
          item.dob = formatDate(item.dob);
          return item;
        });
        response.data.items = items;
        this.setState({ rowData: response.data });
      });
      this.setState({ wardShow: true });
    } else if (type == "notWard") {
      list(
        "/patient/patientsList?pageNumber=1&pageSize=10&QuerySearch=&InHospital=false&WardID="
      ).then((response) => {
        let items = [];
        items = response?.data?.items.map((item) => {
          item.dob = formatDate(item.dob);
          return item;
        });
        response.data.items = items;
        this.setState({ rowData: response.data });
      });
      this.setState({ wardShow: false });
    }
  }
  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push(
      "/EditPatient?.Patient=" + selectedRows[0].nationalID
    );
  };
  handleClose() {
    let { alert } = this.state;
    alert.open = false;
    this.setState({ alert });
  }
  render() {
    const { translate } = this.context;
    let {
      requestData,
      columns,
      rowData,
      alert,
      data,
      appointmentModal,
      bulkUploadModal,
    } = this.state;
    data = data?.items?.map((row) => {
      row.ImgPath =
        "https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.nbcnews-ux-2880-1000.jpg";
      return row;
    });
    return (
      <div className="tableWrapper">
        <PopUp
          $class={this}
          buttons={[
            {
              title: this.context.translate("CLOSE"),
              className: "btn btn-secondary",
              action: "setState",
            },
            {
              title: this.context.translate("SAVE"),
              className: "btn cc-btn",
              action: "handleBulkUpload",
            },
          ]}
          show={bulkUploadModal}
          width="750px"
          title="Upload Patients"
          name="bulkUploadModal"
          content={
            <React.Fragment>
              {/* {error && <h6 className="text-danger">{error}</h6>} */}
              <input
                type="file"
                className="form-control py-1 px-1"
                onChange={this.onFileChange}
              />

              <a
                className=" btn cc-btn float-left mt-1 float-right"
                href="avatars/PatientSampleFile.xlsx"
                download
              >
                {translate("DOWNLOAD_SAMPLE")}
              </a>
            </React.Fragment>
          }
        />
        <PopUp
          $class={this}
          buttons={[
            {
              title: this.context.translate("CANCEL"),
              className: "btn btn-secondary",
              action: "setState",
            },
            {
              title: this.context.translate("SAVE_CHANGES"),
              className: "btn cc-btn",
              action: "handleSubmit",
            },
          ]}
          show={appointmentModal}
          width="750px"
          title="Create Appointment"
          name="appointmentModal"
          content={
            <div className="modal-body pb-3 cc-bg-light-grey">
              <div className="card shadow">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="Consultant">{translate("PHYSICIAN")}</label>
                    <Autocomplete
                      options={physicianData}
                      getOptionLabel={(option) =>
                        `${option.name} - ${option.phone} - ${option.speciality}`
                      }
                      onChange={(event, selected) => {
                        this.setConsultant(selected?.nationalID || null);
                        let clndr = physicianData.filter(
                          (data) => data.nationalID == selected?.nationalID
                        );
                        this.setcalendar(clndr[0].calendarID);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" />
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="StartDateTime">Start Time</label>
                    <DateTimePicker
                      value={currentDate}
                      disabled={true}
                      format="MM-dd-yyyy hh:mm a"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
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
        <div
          style={{ marginTop: "0px", marginBottom: "10px", textAlign: "right" }}
        >
          <NavLink
            className="col-md-1 px-1 w-100 border-0 shadow btn btn-md cc-btn"
            to={`/AddPatient`}
          >
            {" "}
            {translate("ADD_NEW_PATIENT")}
          </NavLink>
          <div
            className="col-md-2 px-1 w-100 border-0 shadow btn btn-md cc-btn mx-2"
            onClick={() => {
              this.setState({ bulkUploadModal: true });
            }}
          >
            {" "}
            {translate("ADD_MULTIPLE_NEW_PATIENT")}
          </div>
        </div>
        <div className=" px-2 py-2">
          <div
            style={{ borderRadius: "1rem" }}
            className=" cc-btn col-md-2 px-2 py-2 w-100 border-0 shadow  float-right mb-3"
          >
            <select
              className="form-control font-weight-bold"
              value={type}
              id="typeofconsultation"
              name="referredTo"
              onChange={(e) => this.dataChange(e)}
            >
              <option value="All">All Patients</option>
              <option value="Ward">In-Hospital Patients</option>
              <option value="notWard">Outside-Hospital Patients</option>
            </select>
            {this.state.wardShow ? (
              <div className="col-md-12 px-1 w-100 border-0 py-2 px-2 ">
                <Autocomplete
                  className="font-weight-bold"
                  options={wardData}
                  getOptionLabel={(option) => `${option.name} - ${option.type}`}
                  onChange={(event, selected) => {
                    this.setWard(selected?.wardID || null);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" />
                  )}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <div className="tableWrapper">
            <PaginationTable
              title={translate("PATIENT_LIST")}
              columns={columns}
              data={rowData}
              options={this.options}
              onSelectionChanged={this.onSelectionChanged}
              rowSelection={this.rowSelection}
              // icon={{index:5, icon:Edit, link:"/EditPatient/", key:"nationalID"}}
              $class={this}
              search={true}
              handleSearchClick={this.handleSearchClick}
              requestData={requestData}

              // link={{key:"nationalID", link:"patient/patientsVisits"}}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, null)(Patients);
