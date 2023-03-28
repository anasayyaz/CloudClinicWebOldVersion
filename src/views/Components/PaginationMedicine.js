/*eslint-disable*/
import React from "react";
import { withRouter } from "react-router-dom";
import { Search, Print as PrintIcon, Close } from "@material-ui/icons";
import { getMonthName, formatTime } from "../../_helper/functions";
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import DateTimePicker from "react-datetime-picker";

class PaginationMedicine extends React.Component {
  constructor(props) {
    super(props);
    this.searchField = React.createRef();
    this.requestData = props.requestData;
    this.state = {
      search: false,
      requestData: this.requestData,
      pagination: [10, 15, 20],
    };
  }

  allPages() {
    let [
      {
        data: { paginationMetadata },
        requestData,
      },
      pages,
    ] = [this.props, []];
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
            this.props.handleSearchClick(requestData, this.props.$class);
          }}
        >
          {/* <a className="page-link" style={{ color: "#007bff" }}>
            {i}
          </a> */}
          
        </li>
      );
    }
    return pages;
  }
  disableButtons() {
    let { paginationMetadata } = this.props.data;
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
  render() {
    let {
      title,
      columns,
      data,
      data: { paginationMetadata },
      rowFontColor,
    } = this.props;
    let { search, requestData, pagination } = this.state;
    let currentDate = new Date();
    paginationMetadata?.currentPage && this.disableButtons();
    return (
      <PrintProvider ref={(el) => (this.componentRef = el)}>
        {rowFontColor && (
          <div className="mb-4">
            <span className="m-3">
              <FormatColorFillIcon style={{ color: rowFontColor.color1 }} />{" "}
              {`Indicates ${rowFontColor.value}`}
            </span>
            <span className="m-3">
              <FormatColorFillIcon style={{ color: rowFontColor.color2 }} />{" "}
              {`Indicates ${rowFontColor.value2}`}
            </span>
          </div>
        )}
        <Print single name="foo">
          <div className="row w-100 d-flex justify-content-between m-0">
            <Print printOnly>
              <h1 className="font-weight-light">{title}</h1>
            </Print>
            <NoPrint>
              {!search ? (
                <div>
                  <h5 className="font-weight-light">{title}</h5>
                </div>
              ) : (
                <div>
                  <button className="btn cc-btn btn-md mx-1">
                    <span className="material-icons align-middle">
                      <Close
                        onClick={() => {
                          requestData["QuerySearch"] = "";
                          this.setState({ search: false, requestData });
                          this.props.handleSearchClick(
                            requestData,
                            this.props.$class
                          );
                        }}
                      />
                    </span>
                  </button>
                  <button className="btn  btn-md mx-1">
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
                    className="startMeeting btn btn-sm cc-btn border-0 px-3"
                    onClick={() => {
                      this.props.handleSearchClick(
                        requestData,
                        this.props.$class
                      );
                    }}
                  >
                    <span>Search</span>
                  </button>
                </div>
              )}
            </NoPrint>
            <NoPrint>
              <div>
                {this.props.dateFilters && (
                  <div className="d-flex">
                    <div className="mr-3">
                      <span>Start Date </span>
                      <DateTimePicker
                        value={requestData["StartDate"]}
                        format="MM-dd-yyyy"
                        className="form-control"
                        onChange={(event) => {
                          requestData["StartDate"] = event;
                          this.setState({ requestData });
                        }}
                      />
                    </div>
                    <div className="mr-3">
                      <span>End Date </span>
                      <DateTimePicker
                        value={requestData["EndDate"]}
                        format="MM-dd-yyyy"
                        className="form-control"
                        onChange={(event) => {
                          requestData["EndDate"] = event;
                          this.setState({ requestData });
                          this.props.handleSearchClick(
                            requestData,
                            this.props.$class
                          );
                        }}
                      />
                    </div>
                  </div>
                )}
                {this.props.search && (
                  <button className="btn btn-md cc-btn mx-1">
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
                )}
                <ReactToPrint
                  trigger={() => (
                    <button className="btn btn-md cc-btn mx-1">
                      <span className="material-icons align-middle">
                        <PrintIcon />
                      </span>
                    </button>
                  )}
                  documentTitle={title}
                  content={() => this.componentRef}
                  bodyClass={"patients-table"}
                />
              </div>
            </NoPrint>
          </div>
          <div className="row">
            <div className="table-section col-md-12">
              <div
                className="table-section-inner"
                style={{ overflowX: "auto" }}
              >
                <table className="patients-table table table-sm mb-0">
                  <thead>
                    <tr className="shadow">
                      {columns?.map((column, index) => {
                        return column.hide ? (
                          <th
                            key={`th${index}`}
                            scope="col"
                            className="p-2 pl-3 border-0"
                          ></th>
                        ) : (
                          <th
                            key={`th${index}`}
                            scope="col"
                            className="p-2 pl-3 border-0"
                          >
                            {column.label}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.items ? (
                      data.items.map((row, index) => {
                        console.log("row data is", row);
                        return (
                          <tr
                            key={`tr${index}`}
                            className="shadow"
                            style={{
                              color: rowFontColor
                                ? row[rowFontColor.key] === rowFontColor.value
                                  ? rowFontColor.color1
                                  : rowFontColor.color2
                                : "#000000",
                            }}
                          >
                            {columns.map((column, i) => {
                              let data =
                                column.name === "startDateTime" || column?.name === "endDateTime"
                                  ? new Date(row[column.name])
                                  : row[column.name];
                              return (
                                <td
                                  key={`${index}td${i}`}
                                  className="align-middle font-weight-bold p-2"
                                >
                                  {column?.button?.show ? (
                                    <div
                                      style={{
                                        marginTop: "0px",
                                        marginBottom: "0px",
                                        textAlign: "left",
                                      }}
                                    >
                                      <button
                                        className={`btn btn-md cc-btn w-20 border-0 shadow ${
                                          column?.button?.value == "Image" &&
                                          "d-none"
                                        }`}
                                        id={column?.button?.value}
                                        onClick={() => {
                                          column.button.operation(
                                            row[column.name]
                                          );
                                        }}
                                        style={{
                                          cursor:
                                            column.button?.disabled &&
                                            row[
                                              column.button?.disabled?.key
                                            ] ===
                                              column.button?.disabled?.value &&
                                            "default",
                                          background:
                                            column.button?.disabled &&
                                            row[
                                              column.button?.disabled?.key
                                            ] ===
                                              column.button?.disabled?.value &&
                                            "gray",
                                        }}
                                        disabled={
                                          column.button?.disabled &&
                                          row[column.button?.disabled?.key] ===
                                            column.button?.disabled?.value
                                            ? true
                                            : false
                                        }
                                      >
                                        {column?.button?.value === "Edit" ? (
                                          <column.button.icon />
                                        ) : (
                                          column?.button?.value 
                                        )}
                                      </button>

                                      {column?.button?.value === "Image" ? (
                                        <img
                                          height="60px"
                                          width="60px"
                                          style={{ borderRadius: "2rem" }}
                                          src={`${process.env.REACT_APP_IMAGE_URL}${row.profileImage}`}
                                        />
                                      ) : null}
                                    </div>
                                  ) : (
                                    <a>
                                      {/* {console.log("data is there ", row)} */}
                                      {/* {column?.name === "startDateTime" || column?.name === "endDateTime"
                                        ? `${
                                            getMonthName(data) +
                                            " " +
                                            data.getDate() +
                                            ", " +
                                            data.getFullYear()
                                          } ${formatTime(data)}`
                                        : data} */}

                                        { data== "NULL"
                                        ? 
                                       ""
                                        : data}
                                      {/* {data} */}
                                    </a>
                                  )}
                                </td>
                              );
                            })}
                            {/* {row. == "Edit" ? (
                              <td>
                                <img
                                  height="70px"
                                  width="70px"
                                  src={`${process.env.REACT_APP_IMAGE_URL}${row.profileImage}`}
                                />
                              </td>
                            ) : null} */}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>Sorry No Record Found</tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <NoPrint>
            <div className="row float-right pr-5 mt-3 pb-5">
              <label
                htmlFor="exampleFoFrmControlSelect1"
                className="pt-1 pr-2 m-0"
              >
                Rows per page:{" "}
              </label>
              <>
                <div className="form-group mr-3">
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onClick={(e) => {
                      requestData["pageSize"] = e.target.value;
                      this.setState({ requestData });
                      this.props.handleSearchClick(
                        requestData,
                        this.props.$class
                      );
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
                    this.props.handleSearchClick(
                      requestData,
                      this.props.$class
                    );
                  }}
                >
                  <a className="page-link" style={{ color: "#007bff" }}>
                    Previous
                  </a>
                </li>
            
                <p className=" text-info d-inline-flex  p-2">{requestData["pageNumber"]}</p>
                {paginationMetadata?.currentPage && this.allPages()}
                <li
                  id="nextButton"
                  className={"page-item"}
                  onClick={() => {
                    requestData["pageNumber"] =
                      paginationMetadata.currentPage + 1;
                    this.setState({ requestData });
                    this.props.handleSearchClick(
                      requestData,
                      this.props.$class
                    );
                  }}
                >
                  <a className="page-link" style={{ color: "#007bff" }}>
                    Next
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

export default withRouter(PaginationMedicine);
