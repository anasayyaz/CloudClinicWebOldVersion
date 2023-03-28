import React from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
// import "./style.css";
import "moment-timezone";
import { Alert, AlertTitle } from "@material-ui/lab";
import { connect } from "react-redux";
import { parseJwt, formatDate } from "../../_helper/functions";
import Table from "../Components/Table";
import PaginationTable from "../Components/PaginationTable";
import { Edit } from "@material-ui/icons";
import list, { put } from "../../_helper/api";
import TranslationContext from "../../context/translation";
import PopUp from "../Components/PopUp";
import ToBeAddedAppointmentModal from "./ToBeAddedAppointmentModal.js";
import { ToastContainer, toast } from "react-toastify";
let confirmStatus = "All";
let vid, pid, cid, type, pname, cname, ctype, specialityData;
class AppointmentsToBeCancelled extends React.Component {
  static contextType = TranslationContext;
  constructor(props, context) {
    super(props, context);
    this.requestData = {
      pageNumber: 1,
      pageSize: 10,
      QuerySearch: "",
      Action: "",
    };

    this.alert = {
      open: false,
      severity: "success",
      message: "",
      title: "success",
    };
    this.state = {
      viewModal: false,
      nid: "",
      pid: "",
      choice: "",
      alert: this.alert,
      requestData: this.requestData,
      paginationMetadata: {},
      rowSelection: "single",
      language: this.context.language,
      physicianData: [],
      columnsPCP: [
        {
          label: this.context.translate("ID"),
          name: "id",
        },
        {
          label: this.context.translate("PATIENT_NAME_ID"),
          name: "patientName",
          sortable: true,
          filter: true,
        },

        // {
        //   label: "Patient Phone Number ",
        //   name: "patientPhone",
        //   sortable: true,
        //   filter: true,
        // },
        // {
        //   label: "Patient Address ",
        //   name: "patientAddress",
        //   sortable: true,
        //   filter: true,
        // },
        {
          label: "Time",
          name: "startDateTime",
        },
        {
          label: "Doctor Name",
          name: "consultantName",
        },

        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "✘ Cancel Appointment",
            operation: (val) => this.needAppointment(val),
          },
        },
        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "✔ Continue Appointment",
            operation: (val) => this.continueAppointment(val),
          },
        },
      ],
      rowSelectionPCP: "single",
      rowDataPCP: [],
    };
  }
  options = {
    filterType: "checkbox",
    selectableRows: false,
    responsive: "vertical",
  };
  handleSearch(request, $class) {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  }
  handleSearchClick(request, $class) {
    let requestData = request ? request : this.state.requestData;
    list("patient/patientsList", requestData).then((response) => {
      let items = [];
      items = response?.data?.items.map((item) => {
        item.dob = formatDate(item.dob);
        return item;
      });
      response.data.items = items;
      $class.setState({ rowData: response.data });
    });
  }
  handlePCareSearch(request, $class) {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  }

  continueAppointment(val) {
    put(`visit/updateVisit/${val}`, {
      Id: val,
      Status: 1,
    }).then((response) => {
      list("/visit/cancelToBeVisitsList", this.state.requestData)
        .then((response) => {
          this.setState({ rowDataPCP: response.data });
        })
        .catch((error) => {
          if (error.response.data == "Record not found in system") {
            this.setState({ rowDataPCP: error.response.data });
          }
        });
      setTimeout(() => {
        toast.info("Appointment successfully continued");
      }, 2000);
    });
  }
  needAppointment(val) {
    put(`/visit/updateCancelVisitStatus/${val}`, {
      Id: val,
      Status: 10,
    }).then((response) => {
      list("/visit/cancelToBeVisitsList", this.state.requestData)
        .then((response) => {
          this.setState({ rowDataPCP: response.data });
        })
        .catch((error) => {
          if (error.response.data == "Record not found in system") {
            this.setState({ rowDataPCP: error.response.data });
          }
        });
      setTimeout(() => {
        toast.info("Appointment successfully cancelled");
      }, 2000);
    });
  }

  handlePCareSearchClick(request, $class) {
    let requestData = request ? request : this.state.requestData;
    list("/visit/cancelToBeVisitsList", requestData).then((response) => {
      $class.setState({ rowDataPCP: response.data });
    });
  }
  handleConsultantSearch(request, $class) {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  }
  handleFollowUpSearch(request, $class) {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  }
  handleConsultantSearchClick(request, $class) {
    let requestData = request ? request : this.state.requestData;
    list("/visit/consultantsReferedToList", requestData).then((response) => {
      $class.setState({ rowDataConsultant: response.data });
    });
  }
  dataChange(event) {
    let [key, value] = [event.target.name, event.target.value];
    confirmStatus = event.target.value;

    if (confirmStatus == "All") {
      this.requestData["Action"] = "  ";
    } else if (confirmStatus == "consultation") {
      this.requestData["Action"] = "consultation";
    } else if (confirmStatus == "followup") {
      this.requestData["Action"] = "followup";
    } else if (confirmStatus == "reschedule") {
      this.requestData["Action"] = "reschedule";
    } else if (confirmStatus == "new appointment request") {
      this.requestData["Action"] = "new appointment request";
    }

    this.getLatest(confirmStatus);
  }
  getLatest(confirmStatus) {
    console.log(this.requestData);
    this.requestData["Action"] = confirmStatus;
    this.requestData["pageNumber"] = 1;
    this.requestData["pageSize"] = 10;
    console.log(this.requestData);
    let userId = JSON.parse(localStorage.getItem("user"));

    if (confirmStatus == "All") {
      list(
        "patient/patientsAppointmentList/?pageNumber=1&pageSize=10&QuerySearch=&Action="
      )
        .then((response) => {
          this.setState({ rowDataPCP: response.data });
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    } else {
      list(`patient/patientsAppointmentList/`, this.requestData)
        .then((response) => {
          this.setState({ rowDataPCP: response.data });
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    }
  }
  handleFollowUpSearchClick(request, $class) {
    let requestData = request ? request : this.state.requestData;
    list("/visit/followupVisitList", requestData).then((response) => {
      $class.setState({ rowDataFollowUp: response.data });
    });
  }
  componentDidMount() {
    this.handleConsultantSearchClick(null, this);
    this.handlePCareSearchClick(null, this);
    this.handleFollowUpSearchClick(null, this);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.language !== this.context.language) {
      this.setState({
        language: this.context.language,
        columnsPCP: [
          {
            label: this.context.translate("ID"),
            name: "id",
          },
          {
            label: this.context.translate("PATIENT_NAME_ID"),
            name: "patientName",
            sortable: true,
            filter: true,
          },
          {
            label: "Patient Phone Number ",
            name: "patientPhone",
            sortable: true,
            filter: true,
          },
          {
            label: "Patient Address ",
            name: "patientAddress",
            sortable: true,
            filter: true,
          },
          {
            label: "Doctor Name",
            name: "doctorName",
          },

          {
            label: this.context.translate("REFRERRED_TO"),
            name: "refferedTo",
            sortable: true,
            filter: true,
          },
          {
            label: "Action",
            name: "action",
          },

          {
            label: "ID",
            hide: true,
            name: "id",
            button: {
              show: true,
              value: "Make an Appointment",
              operation: (val) => this.needAppointment(val),
            },
          },
        ],
      });
    }
  };

  close = () => {
    this.setState({ viewModal: false });
  };
  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push(
      "/EditPatient?.Patient=" + selectedRows[0].nationalID
    );
  };

  render() {
    const { translate } = this.context;
    let { requestData, viewModal, close, physicianData } = this.state;
    return (
      <div className="tableWrapper">
        <div>
          {/* <div
            style={{ borderRadius: "1rem" }}
            className="cc-btn px-2 py-2 col-md-3 mb-3  w-100 border-0 shadow  float-right"
          >
            <select
              className="form-control font-weight-bold"
              value={confirmStatus}
              id="typeofconsultation"
              name="referredTo"
              onChange={(e) => this.dataChange(e)}
            >
              <option value="All">All</option>
              <option value="consultation">Consultation</option>
              <option value="followup">Follow Up</option>
              <option value="reschedule">Reschedule</option>
              <option value="new appointment request">
                New Appointment Request
              </option>
            </select>
          </div> */}
          <div className="tableWrapper">
            <PaginationTable
              title={"Appointments to be cancelled"}
              columns={this.state.columnsPCP}
              data={this.state.rowDataPCP}
              options={this.options}
              onSelectionChanged={this.onSelectionChangedPCP}
              rowSelection={this.onSelectionChangedPCP}
              search={true}
              $class={this}
              handleSearchClick={this.handlePCareSearchClick}
              requestData={requestData}
              // rowFontColor = {{key:'meetingtype', value:'Virtual', value2:'In-Person', color1:'#000000', color2:'#189DF7'}}
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

export default connect(mapStateToProps, null)(AppointmentsToBeCancelled);
