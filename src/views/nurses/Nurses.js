import React from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
import "./style.css";
import list from "../../_helper/api";
import PaginationTable from "../Components/PaginationTable";
import { Edit } from "@material-ui/icons";
import PopUp from "../Components/PopUp";
import TranslationContext from "../../context/translation";

export default class Nurses extends React.Component {
  static contextType = TranslationContext;
  constructor(props, context) {
    super(props, context);
    this.requestData = {
      pageNumber: 1,
      pageSize: 10,
      QuerySearch: "",
    };
    this.state = {
      bulkUploadModal: false,
      requestData: this.requestData,
      columns: [
        {
          label: this.context.translate("NATIONAL_ID"),
          name: "nationalID",
          sortable: true,
          filter: true,
          options: {
            customBodyRender: (val) => (
              <NavLink className="NavLink" to={`/EditNurse?Nurse=${val}`}>
                {val}
              </NavLink>
            ),
          },
        },
        {
          label: this.context.translate("NAME"),
          name: "name",
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
          label: this.context.translate("ID"),
          hide: true,
          name: "nationalID",
          button: {
            show: true,
            value: "Edit",
            operation: (val) => this.props.history.push(`/EditNurse/${val}`),
            icon: Edit,
          },
        },
      ],
      rowSelection: "single",
      rowData: [],
    };
  }
  options = {
    filterType: "checkbox",
    selectableRows: false,
    responsive: "vertical",
  };

  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push("/EditNurse?.Nurse=" + selectedRows[0].nationalID);
  };

  handleSearch(request, $class) {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  }
  handleSearchClick(request, $class) {
    let requestData = request ? request : this.state.requestData;
    list("physician/NurseList", requestData).then((response) => {
      $class.setState({ rowData: response.data });
    });
  }
  componentDidMount() {
    this.handleSearchClick(null, this);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.language !== this.context.language) {
      this.setState({
        language: this.context.language,
        columns: [
          {
            label: this.context.translate("NATIONAL_ID"),
            name: "nationalID",
            sortable: true,
            filter: true,
            options: {
              customBodyRender: (val) => (
                <NavLink className="NavLink" to={`/EditNurse?Nurse=${val}`}>
                  {val}
                </NavLink>
              ),
            },
          },
          {
            label: this.context.translate("NAME"),
            name: "name",
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
            label: this.context.translate("ID"),
            hide: true,
            name: "nationalID",
            button: {
              show: true,
              value: "Edit",
              operation: (val) => this.props.history.push(`/EditNurse/${val}`),
              icon: Edit,
            },
          },
        ],
      });
    }
  };

  render() {
    const { translate } = this.context;
    let { requestData, bulkUploadModal } = this.state;
    return (
      <div className="tableWrapper">
        <div
          style={{ marginTop: "0px", marginBottom: "20px", textAlign: "right" }}
        >
          <NavLink
            className="col-md-1 px-1 w-100 border-0 shadow btn  cc-btn"
            to={`/AddNurse`}
          >
            {" "}
            {translate("ADD_NEW_NURSE")}
          </NavLink>
        </div>
        <PopUp
          $class={this}
          buttons={[
            {
              title: "Close",
              className: "btn btn-secondary",
              action: "setState",
            },
            { title: "Save", className: "btn cc-btn", action: "setState" },
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
                id="xls_input"
                className="form-control py-1 px-1"
                // onChange={(e) => readExcel(e.target.files[0])}
              />

              <a
                className=" btn cc-btn float-left mt-1 float-right"
                href="avatars/PhysicianSchedule.xlsx"
                download
              >
                Download Sample
              </a>
            </React.Fragment>
          }
        />
        <PaginationTable
          title={translate("NURSE_LIST")}
          columns={this.state.columns}
          data={this.state.rowData}
          options={this.options}
          onSelectionChanged={this.onSelectionChanged}
          rowSelection={this.rowSelection}
          $class={this}
          search={true}
          handleSearchClick={this.handleSearchClick}
          requestData={requestData}
        />
      </div>
    );
  }
}
