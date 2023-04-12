import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import "moment-timezone";
import list, { put } from "../../_helper/api";
import { connect } from "react-redux";
import { parseJwt, formatDate } from "../../_helper/functions";
import PaginationTable from "../Components/PaginationTable";
import { Edit } from "@material-ui/icons";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { val } from "@arction/lcjs";


class PatientsList extends React.Component {
  constructor(props) {
    
    super(props);
    this.requestData = {
      pageNumber: 1,
      pageSize: 10,
      QuerySearch: "",
    };
    this.alert = {
      open: false,
      severity: "success",
      message: "",
      title: "success",
    };
    this.state = {
      requestData: this.requestData,
      alert: this.alert,
      columns: [
        {
          label: "National ID",
          name: "patientIdentificationNo",
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
          name: "patientFirstName",
          sortable: true,
          filter: true,
        },
        {
          label: "Last Name",
          name: "patientLastName",
          sortable: true,
          filter: true,
        },
        {
          label: "Phone Number",
          name: "patientPhone",
          sortable: true,
          filter: true,
        },
        {
          label: "Address",
          name: "patientAddress",
          filter: true,
        },
        
        
        {
          label: "ID",
          hide: true,
          name: "patient_NationalID",
          button: {
            show: true,
            value: "All Visits",
            operation: (val) =>
              this.props.history.push(`/physicians/PatientsVisitsList?id=${val}`),
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


  handleSearch(request, $class) {
  
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  }
  handleSearchClick(request, $class) {
    let pid=JSON.parse(localStorage.getItem("user"));
    // alert(pid);
    let requestData = request ? request : this.state.requestData;
    list(`/physician/physicianPatients/${pid}`, requestData).then((response) => {
      let items = [];
      items = response?.data?.items.map((item) => {
        item.dob = formatDate(item.dob);
        return item;
      });
      response.data.items = items;
      $class.setState({ rowData: response.data });
    });
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
   
    let { requestData, columns, rowData, alert ,data} = this.state;
    data = data?.items?.map((row) => {
      row.ImgPath = "https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.nbcnews-ux-2880-1000.jpg";
      return row;
    });
    return (
      <div className="tableWrapper">
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
          style={{ marginTop: "0px", marginBottom: "20px", textAlign: "right" }}
        >
          <NavLink
            className="col-md-2 px-1 w-100 border-0 shadow btn  cc-btn"
            to={`/AddPatient`}
          >
            {" "}
            Add New Patient
          </NavLink>
          <a className=" btn cc-btn ml-3 " href="avatars/PhysicianSchedule.xlsx" download>Download Sample</a>
        </div>
        <div>
          <div className="tableWrapper">
            <PaginationTable
              title="Patients List"
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

export default connect(mapStateToProps, null)(PatientsList);
