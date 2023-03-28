/*eslint-disable*/
import React from "react";
import { withRouter } from "react-router-dom";
import { Search, Print as PrintIcon, Close } from "@material-ui/icons";
import { getMonthName, formatTime } from "../../_helper/functions";
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import DateTimePicker from "react-datetime-picker";
import TranslationContext from "../../context/translation";

class NotificationTable extends React.Component {
  static contextType = TranslationContext;
  constructor(props, context) {
    super(props, context);
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
          <a className="page-link" style={{ color: "#007bff" }}>
            {i}
          </a>
        </li>
      );
    }
    return pages;
  }
  disableButtons() {}
  confirmDelete() {
    this.props.deleteNotification();
    this.props.setCountToZero();
  }
  complete() {
    this.props.refreshNotification();
    // this.props.setNotificationPopup();
    this.props.setCountToZero();
  }
  render() {
    const { translate } = this.context;
    let {
      title,
      columns,
      data,
      data: { paginationMetadata },
      rowFontColor,
    } = this.props;

    paginationMetadata?.currentPage && this.disableButtons();
    return (
      <PrintProvider ref={(el) => (this.componentRef = el)}>
        <Print single name="foo">
          <div className="row w-100  justify-content-between m-0 ">
            {/* <h1 className="font-weight-light">{""}</h1> */}

            <div>
              <button
                onClick={() => {
                  this.complete();
                }}
                className="cc-btn btn flex-start"
                style={{
                  fontWeight: "bold",
                  textDecorationLine: "underline",
                  fontStyle: "italic",
                }}
              >
                Mark all as read
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  this.confirmDelete();
                }}
                className="cc-btnred btn"
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  textDecorationLine: "underline",
                }}
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="row">
            <div className=" col-md-12">
              <div style={{ overflowX: "auto" }}>
                <table className="patients-table table table-sm mb-0">
                  <thead>
                    <tr>
                      {columns?.map((column, index) => {
                        return column.hide ? (
                          <th
                            key={`th${index}`}
                            scope="col"
                            className="p-1 pl-3 border-0"
                          ></th>
                        ) : (
                          <th
                            key={`th${index}`}
                            scope="col"
                            className="p-1 pl-3 border-0"
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
                            style={{
                              backgroundColor:
                                row.status === "UnRead" ? "FFFFFF" : "#E0E0E0",
                            }}
                          >
                            {columns.map((column, i) => {
                              let data = row[column.name];
                              return (
                                <td
                                  key={`${index}td${i}`}
                                  className="align-middle font-weight-bold p-1"
                                  style={{
                                    border: "1px solid #D3D3D3",
                                    borderRadius: "10px",
                                  }}
                                >
                                  {row.status == "UnRead" ? (
                                    <a style={{ color: "#303030" }}>
                                      {/* {console.log("data is there 1 ", row)} */}

                                      {row.notificationtext}
                                    </a>
                                  ) : (
                                    <a style={{ color: "#303030" }}>
                                      {/* {console.log("data is there 2 ", row)} */}

                                      {row.notificationtext}
                                    </a>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })
                    ) : (
                      <tr>{translate("SORRY_NO_RECORD_FOUND")}</tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Print>
      </PrintProvider>
    );
  }
}

export default withRouter(NotificationTable);
