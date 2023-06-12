import React from "react";
import { NavLink } from "react-router-dom";
import { Search, Print as PrintIcon, Close } from "@material-ui/icons";
import "./style.css";
import list, { put, post } from "../../_helper/api";
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import { Edit } from "@material-ui/icons";
import ProfileListing from "./ProfileListing";
import PopUp from "../Components/PopUp";
import TranslationContext from "../../context/translation";

export default class Physicians extends React.Component {
  static contextType = TranslationContext;
  constructor(props, context) {
    super(props, context);

    this.searchField = React.createRef();
    this.requestData = {
      pageNumber: 1,
      pageSize: 8,
      QuerySearch: "",
    };
    this.state = {
      selectedFile: null,
      bulkUploadModal: false,
      requestData: this.requestData,
      pagination: [8, 16, 20],
      search: false,
      language: this.context.language,
      columns: [
        {
          label: this.context.translate("NATIONAL_ID"),
          name: "nationalID",
          sortable: true,
          filter: true,
          options: {
            customBodyRender: (val) => (
              <NavLink
                className="NavLink"
                to={`physicians/EditPhysician?Physician=${val}`}
              >
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
          label: this.context.translate("SPECIALITY"),
          name: "speciality",
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
            operation: (val) =>
              this.props.history.push(`/EditPhysician/${val}`),
            icon: Edit,
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
  allPages = () => {
    let [
      {
        rowData: { paginationMetadata },
        requestData,
      },
      pages,
    ] = [this.state, []];
    for (let i = 1; i <= paginationMetadata.totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={
            paginationMetadata.currentPage === i
              ? "page-item disabled_button"
              : "page-item"
          }
          onClick={() => {
            requestData["pageNumber"] = i;
            this.setState({ requestData });
            this.handleSearchClick(requestData, this.$class);
          }}
        >
          <a className="page-link" style={{ color: "#007bff" }}>
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  disableButtons() {
    let { paginationMetadata } = this.state.rowData;
    let nextBtn = document.getElementById("nextButton");
    let prevBtn = document.getElementById("previousButton");
    if (paginationMetadata.nextPage !== "Yes") {
      nextBtn.classList.add("disabled_button");
    } else {
      nextBtn.classList.remove("disabled_button");
    }
    if (paginationMetadata.previousPage !== "No") {
      prevBtn.classList.remove("disabled_button");
    } else {
      prevBtn.classList.add("disabled_button");
    }
  }

  handleBulkUpload = () => {
    const formData = new FormData();

    formData.append(
      "File",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    post("bulkupload/physicianUpload", formData).then((response) => {
      window.location.reload();
    });
    this.setState({ bulkUploadModal: false });
  };
  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push(
      "/EditPhysician?.Physician=" + selectedRows[0].nationalID
    );
  };

  handleSearch = (request, $class) => {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  };
  handleSearchClick = (request, $class) => {
    let requestData = request ? request : this.state.requestData;
    list("physician/physicianList", requestData).then((response) => {
      this.setState({ rowData: response.data });
    });
  };

  render() {
    const { translate } = this.context;
    let {
      requestData,
      search,
      pagination,
      rowData: { paginationMetadata },
      bulkUploadModal,
    } = this.state;

    paginationMetadata?.currentPage && this.disableButtons();
    return (
      <PrintProvider
        ref={(el) => (this.componentRef = el)}
        className="tableWrapper"
      >
        <NoPrint>
          <div
            style={{
              marginTop: "0px",
              marginBottom: "20px",
              textAlign: "right",
            }}
          >
            <NavLink
              className="col-md-1 px-1 w-100 border-0 shadow btn cc-btn"
              to={`/AddPhysician`}
            >
              {" "}
              {translate("ADD_NEW_PHYSICIAN")}
            </NavLink>

            <div
              className="col-md-2 px-1 w-100 border-0 shadow btn btn-md cc-btn mx-2"
              onClick={() => {
                this.setState({ bulkUploadModal: true });
              }}
            >
              {" "}
              {translate("ADD_MULTIPLE_NEW_PHYSICIAN")}
            </div>
          </div>
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
            title={translate("UPLOAD_PHYSICIANS")}
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
                  href="avatars/PhysicianSampleFile.xlsx"
                  download
                >
                  {translate("DOWNLOAD_SAMPLE")}
                </a>
              </React.Fragment>
            }
          />
          <div className="mt-3" style={{ textAlign: "right" }}>
            <button className="btn btn-md mx-1">
              <span className="material-icons align-middle">
                <Search
                  onClick={() => {
                    this.setState({ search: true }, () => {
                      this.searchField.current.focus();
                    });
                  }}
                />
              </span>
            </button>
            <ReactToPrint
              trigger={() => (
                <button className="btn btn-md mx-1">
                  <span className="material-icons align-middle">
                    <PrintIcon />
                  </span>
                </button>
              )}
              content={() => this.componentRef}
              bodyClass={"physicians-table"}
            />
          </div>
        </NoPrint>
        <NoPrint>
          {!search ? (
            <div>
              <h5 className="font-weight-light"></h5>
            </div>
          ) : (
            <div>
              <button className="btn btn-md mx-1">
                <span className="material-icons align-middle">
                  <Close
                    onClick={() => {
                      requestData["QuerySearch"] = "";
                      this.setState({ search: false, requestData });
                      this.handleSearchClick(requestData, this.$class);
                    }}
                  />
                </span>
              </button>
              <button className="btn btn-md mx-1">
                <span>
                  <input
                    aria-invalid="false"
                    type="text"
                    ref={this.searchField}
                    aria-label="Search"
                    className="MuiInputBase-input MuiInput-input"
                    value={requestData["QuerySearch"]}
                    onChange={(e) => {
                      requestData["QuerySearch"] = e.target.value;
                      this.setState({ requestData });
                    }}
                    style={{
                      border: "none",
                      borderBottom: "2PX solid rgb(31 134 219)",
                      width: "15rem",
                      background: "none",
                    }}
                  />
                </span>
              </button>
              <button
                className="startMeeting btn btn-sm btn-primary border-0 px-3"
                onClick={() => {
                  this.handleSearchClick(requestData, this.$class);
                }}
              >
                <span>{translate("SEARCH")}</span>
              </button>
            </div>
          )}
        </NoPrint>
        <Print>    <ProfileListing
            className="physicians-table"
            title={translate("PHYSICIANS_LIST")}
            columns={this.state.columns}
            data={this.state.rowData}
            options={this.options}
            onSelectionChanged={this.onSelectionChanged}
            rowSelection={this.rowSelection}
            $class={this}
            search={true}
            handleSearchClick={this.handleSearchClick}
            requestData={requestData}
            // icon={{index:4, icon:Edit, link:"/EditPhysician/", key:"nationalID"}}
          />
      
          <NoPrint>
            <div className="row float-right pr-5 mt-3 pb-5">
              <label
                htmlFor="exampleFoFrmControlSelect1"
                className="pt-1 pr-2 m-0"
              >
                {translate("ROW_PER_PAGE")}:{" "}
              </label>
              <>
                <div className="form-group mr-3">
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onClick={(e) => {
                      requestData["pageSize"] = e.target.value;
                      this.setState({ requestData });
                      this.handleSearchClick(requestData, this.$class);
                    }}
                  >
                    {pagination.map((length, index) => {
                      return <option key={`option${index}`}>{length}</option>;
                    })}
                  </select>
                </div>
              </>
              <ul className="pagination text-dark">
                <li
                  id="previousButton"
                  className="page-item text-dark"
                  onClick={() => {
                    requestData["pageNumber"] =
                      paginationMetadata.currentPage - 1;
                    this.setState({ requestData });
                    this.handleSearchClick(requestData, this.$class);
                  }}
                >
                  <a className="page-link" style={{ color: "#007bff" }}>
                    {translate("PREVIOUS")}
                  </a>
                </li>
                {paginationMetadata?.currentPage && this.allPages()}
                <li
                  id="nextButton"
                  className={"page-item"}
                  onClick={() => {
                    requestData["pageNumber"] =
                      paginationMetadata.currentPage + 1;
                    this.setState({ requestData });
                    this.handleSearchClick(requestData, this.$class);
                  }}
                >
                  <a className="page-link" style={{ color: "#007bff" }}>
                    {translate("NEXT")}
                  </a>
                </li>
              </ul>
            </div>
          </NoPrint>
        </Print>
      </PrintProvider>
    );
  }
}
