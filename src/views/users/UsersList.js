import React from "react";
import { NavLink } from "react-router-dom";
import {
  Search,
  Print as PrintIcon,
  Close,
  LayersTwoTone,
} from "@material-ui/icons";
import list from "../../_helper/api";
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import { Edit } from "@material-ui/icons";
import UserListing from "./UserListing";
import TranslationContext from "../../context/translation";
import { ToastContainer, toast } from "react-toastify";
export default class UsersList extends React.Component {
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
      confirmStatus: "All",
      requestData: this.requestData,
      pagination: [8, 16, 20],
      search: false,
      columns: [
        {
          label: this.context.translate("NATIONAL_ID"),
          name: "id",
          sortable: true,
          filter: true,
          options: {
            customBodyRender: (val) => (
              <NavLink
                className="NavLink"
                to={`/EditPhysician?Physician=${val}`}
              >
                {val}
              </NavLink>
            ),
          },
        },
        {
          label: this.context.translate("NAME"),
          name: "fullName",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("ROLE"),
          name: "roles",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("ALLOW"),
          name: "lockoutEnabled",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("ID"),
          hide: true,
          name: "id",
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
  dataChange = (event) => {
    let [key, value] = [event.target.name, event.target.value];
    this.requestData["pageNumber"] = 1;
    this.requestData["pageSize"] = 10;
    this.setState({ confirmStatus: event.target.value });
    if (event.target.value == "All") {
      this.getLatest("All");
    } else if (event.target.value == "physician") {
      this.requestData["roleName"] = "physician";
      this.getLatest("physician");
    } else if (event.target.value == "patient") {
      this.requestData["roleName"] = "patient";
      this.getLatest("patient");
    } else if (event.target.value == "nurse") {
      this.requestData["roleName"] = "nurse";
      this.getLatest("nurse");
    } else if (event.target.value == "receptionist") {
      this.requestData["roleName"] = "receptionist";
      this.getLatest("receptionist");
    }
  };
  getLatest(confirmStatus) {
    if (confirmStatus == "All") {
      list(
        "/accounts/getAllUsers/users?pageNumber=1&pageSize=8&QuerySearch="
      ).then((response) => {
        this.setState({ rowData: response.data });
      }).catch((error) => {
        this.setState({ rowData: error.response.data  });
        toast.error(error.response.data)
      });
    } else {
      console.log(this.requestData);
      this.requestData["roleName"] = confirmStatus;
      console.log(this.requestData);
      let userId = JSON.parse(localStorage.getItem("user"));
      list(
        `/accounts/getAllUsers/users`,
        this.state.requestData,
        `roleName=${confirmStatus}`
      ).then((response) => {
        this.setState({ rowData: response.data });
      }).catch((error) => {
        toast.error(error.response.data)
        this.setState({ rowData: error.response.data });
      });
    }
  }
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
    list("/accounts/getAllUsers/users", requestData).then((response) => {
      this.setState({ rowData: response.data });
    }).catch((error) => {
      toast.error(error.response.data)
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.language !== this.context.language) {
      this.setState({
        language: this.context.language,
        columns: [
          {
            label: this.context.translate("NATIONAL_ID"),
            name: "id",
            sortable: true,
            filter: true,
            options: {
              customBodyRender: (val) => (
                <NavLink
                  className="NavLink"
                  to={`/EditPhysician?Physician=${val}`}
                >
                  {val}
                </NavLink>
              ),
            },
          },
          {
            label: this.context.translate("NAME"),
            name: "fullName",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("ROLE"),
            name: "roles",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("ALLOW"),
            name: "lockoutEnabled",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("ID"),
            hide: true,
            name: "id",
            button: {
              show: true,
              value: "Edit",
              operation: (val) =>
                this.props.history.push(`/EditPhysician/${val}`),
              icon: Edit,
            },
          },
        ],
      });
    }
  };

  render() {
    let {
      requestData,
      search,
      pagination,
      rowData: { paginationMetadata },
    } = this.state;
    const { translate } = this.context;
    paginationMetadata?.currentPage && this.disableButtons();
    return (
      <><ToastContainer />
      <PrintProvider
        ref={(el) => (this.componentRef = el)}
        className="tableWrapper"
      >
        <NoPrint>
          <div className="  col-md-2 mb-3    float-left">
            <select
              className="form-control font-weight-bold"
              value={this.state.confirmStatus}
              id="typeofconsultation"
              name="referredTo"
              onChange={(e) => this.dataChange(e)}
            >
              <option value="All">All</option>
              <option value="physician">Physician</option>
              <option value="patient">Patient</option>
              <option value="receptionist">Receptionist</option>
              <option value="nurse">Nurse</option>
            </select>
          </div>
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
              bodyClass={"users-table"}
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
                    aria-label={translate("SEARCH")}
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
        <Print>
        
          <UserListing
            className="users-table"
            title={translate("USERS_LIST")}
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
          <NoPrint>
            <div className="row float-right pr-5 mt-3 pb-5">
              <label
                htmlFor="exampleFoFrmControlSelect1"
                className="pt-1 pr-2 m-0"
              >
                {"Rows per page"}:{" "}
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
      </>
    );
  }
}
