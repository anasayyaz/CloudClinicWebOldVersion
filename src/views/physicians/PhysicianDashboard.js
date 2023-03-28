import React, { lazy, useEffect, useState, createRef } from "react";
import UpcomingList from "./UpcomingList";
import list from "../../_helper/api";
import "./styles.css";
import OverflowScrolling from "react-overflow-scrolling";
import TranslationContext from "../../context/translation";

export default class PhysicianDashboard extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.state = {
      countGPTodayAppoinments: "",
      countGPTotalAppoinments: "",
      countGPTodayVirtualAppoinments: "",
      countGPTodayInpersonAppoinments: "",
      rowData: [],
    };
    this.gotoPatients = this.gotoPatients.bind(this);
  }

  gotoPatients() {
    let path = "patients?Patients=";
    this.props.history.push(path);
  }
  onMyVisits = () => {
    this.props.history.push("/PhysicianHome");
  };
  onConsultantsVisits = () => {
    this.props.history.push("/ConsultantHome");
  };

  componentDidMount(request, $class) {
    let d = new Date();
    let requestData = request ? request : this.state.requestData;
    let userId = JSON.parse(localStorage.getItem("user"));

    list(`DashBoard/PhysicianDBStats/${userId}`, requestData).then(
      (response) => {
        this.setState({
          countGPTodayAppoinments:
            response.data.physicianStats.countGPTodayAppoinments,
          countGPTotalAppoinments:
            response.data.physicianStats.countGPTotalAppoinments,
          countGPTodayVirtualAppoinments:
            response.data.physicianStats.countGPTodayVirtualAppoinments,
          countGPTodayInpersonAppoinments:
            response.data.physicianStats.countGPTodayInpersonAppoinments,
        });
      }
    );

    list(`/physician/physicianUpcomingVisits/${userId}`)
      .then((response) => {
        this.setState({ rowData: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error during service worker registration:", error);
      });
  }
  render() {
    const { translate } = this.context;
    return (
      <div className="container px-4 col-12 m-0 h-100">
        <div className="row">
          <div className="col-md-3 pr-md-0" onClick={this.onMyVisits}>
            <div className="cc-dashboard-tab cc-bg-img-dark rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">
                  {this.state.countGPTodayAppoinments}
                </h1>
              </div>
              <p>{translate("TODAY_APPOINTMENTS")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">
                  {this.state.countGPTodayVirtualAppoinments}
                </h1>
              </div>
              <p>{translate("TODAY_VIRTUAL_APPOINTMENTS")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons">today </span>
                <h1 className="text-white">
                  {this.state.countGPTodayInpersonAppoinments}
                </h1>
              </div>
              <p>{translate("TODAY_INPERSON_APPOINTMENTS")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">
                  {this.state.countGPTotalAppoinments}
                </h1>
              </div>
              <p>{translate("TOTAL_APPOINTMENTS")}</p>
            </div>
          </div>
        </div>
        <hr></hr>
        <h4 className="cc-bg-img-dark mt-2 mb-0  py-2 px-2 text-white rounded shadow">
          Upcoming Appointments:
        </h4>
        <div class="row  ">
          <div
            className="col-md-12 pr-md-0 overflow-auto "
            style={{ height: "50vh" }}
          >
            <UpcomingList data={this.state.rowData} />
          </div>
        </div>
      </div>
    );
  }
}
