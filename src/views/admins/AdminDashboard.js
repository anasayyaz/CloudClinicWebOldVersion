import React from "react";
import "../style/ccstyle.css";
import list from "../../_helper/api";
import TranslationContext from "../../context/translation";

export default class AdminDashboard extends React.Component {
  static contextType = TranslationContext;

  constructor(props) {
    super(props);
    this.state = {
      totalCountpatients: "",
      totalCountphysicians: "",
      totalCountnurses: "",
      totalCountReceptionist: "",
      totalCounttodaysvisits: "",
      countTodayVirtualAppoinments: "",
      countTodayInpersonAppoinments: "",
      countTotalVisits: "",
      countTotalCancelVisits: "",
    };
    this.gotoPatients = this.gotoPatients.bind(this);
  }

  gotoPatients() {
    let path = "patients?Patients=";
    this.props.history.push(path);
  }

  onTodaysVisit = () => {
    this.props.history.push("/TodayVisits");
  };
  onPatients = () => {
    this.props.history.push("/Patients");
  };
  onPhysicians = () => {
    this.props.history.push("/Physicians");
  };
  onNurses = () => {
    this.props.history.push("/nurses");
  };
  onReceptionists = () => {
    this.props.history.push("/receptionists");
  };

  onAddPatients = () => {
    this.props.history.push("/AddPatient");
  };

  onAddPhysicians = () => {
    this.props.history.push("/AddPhysician");
  };

  onAddNurses = () => {
    this.props.history.push("/AddNurse");
  };

  onCancelList = () => {
    this.props.history.push("/cancelList");
  };
  onAddReceptionists = () => {
    this.props.history.push("/AddReceptionist");
  };
  componentDidMount() {
    list(`DashBoard/AdminDBStats`).then((response) => {
      this.setState({
        totalCountpatients: response.data.adminStats.totalCountpatients,
        totalCountphysicians: response.data.adminStats.totalCountphysicians,
        totalCountnurses: response.data.adminStats.totalCountnurses,
        totalCountReceptionist: response.data.adminStats.totalCountReceptionist,
        totalCounttodaysvisits: response.data.adminStats.totalCounttodaysvisits,
        countTodayVirtualAppoinments:
          response.data.adminStats.countTodayVirtualAppoinments,
        countTodayInpersonAppoinments:
          response.data.adminStats.countTodayInpersonAppoinments,
        countTotalVisits: response.data.adminStats.countTotalVisits,
        countTotalCancelVisits: response.data.adminStats.countTotalCancelVisits,
      });
    });

    setTimeout(() => {}, 1000);
  }
  render() {
    const { translate } = this.context;

    return (
      <div className="container px-4 col-12 m-0 h-100 pb-3 overflow-auto main-container">
        <div className="row">
          <div className="btn col-md-3 pr-md-0" onClick={this.onTodaysVisit}>
            <div className="cc-dashboard-tab cc-bg-img-dark rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> event </span>
                <h1 className="text-white">
                  {this.state.totalCounttodaysvisits}
                </h1>
              </div>
              <p>{translate("TODAY_VISIT")}</p>
            </div>
          </div>
          <div className="btn col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> event_busy </span>
                <h1 className="text-white">{this.state.countTodayVirtualAppoinments}</h1>
              </div>
              <p>{"Today Virtual Appointments"}</p>
            </div>
          </div>
          <div className="btn col-md-3 pr-md-0" >
            <div className="cc-dashboard-tab cc-bg-img-dark rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> event_busy </span>
                <h1 className="text-white">
                  {this.state.countTodayInpersonAppoinments}
                </h1>
              </div>
              <p>{"Today In-Person Appointments"}</p>
            </div>
          </div>
          <div className="btn col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> event_busy </span>
                <h1 className="text-white"> {this.state.countTotalCancelVisits}</h1>
              </div>
              <p>{translate("CANCELLED_APPOINTMENTS")}</p>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-4 px-2 pt-0">
            <div className="card shadow w-100 d-flex align-items-center justify-content-center" style={{height: '300px'}}>
              <h1 className="text-info">GRAPH DIV</h1>
                </div>
          </div>
          <div className="col-md-8 px-2 pt-0">
            <div className="card shadow w-100 d-flex align-items-center justify-content-center" style={{height: '300px'}}>
              <h1 className="text-info">GRAPH DIV</h1>
            </div>
          </div>
        </div> */}
        <div className="row ">
          <div className="col-md-3 pr-md-0" onClick={this.onAddPatients}>
            <a className="cc-dashboard-btn cc-bg-img rounded shadow d-flex justify-content-between align-items-center">
              <span className="material-icons pr-3 pl-2"> person_add </span>
              <p className="text-right border-left w-100">
              {translate("ADD_PATIENT")}
              </p>
            </a>
          </div>
          <div className="col-md-3 pr-md-0" onClick={this.onAddPhysicians}>
            <a className="cc-dashboard-btn cc-bg-img-dark rounded shadow d-flex justify-content-between align-items-center">
              <span className="material-icons pr-3 pl-2"> person_add </span>
              <p className="text-right border-left w-100">
              {translate("ADD_PHYSICIAN")}
              </p>
            </a>
          </div>
          <div className="col-md-3 pr-md-0" onClick={this.onAddReceptionists}>
            <a className="cc-dashboard-btn cc-bg-img rounded shadow d-flex justify-content-between align-items-center">
              <span className="material-icons pr-3 pl-2"> person_add</span>
              <p className="text-right border-left w-100">
              {translate("ADD_RECEPTIONIST")}
              </p>
            </a>
          </div>
          <div className="col-md-3 pr-md-0" onClick={this.onAddNurses}>
            <a className="cc-dashboard-btn cc-bg-img-dark rounded shadow d-flex justify-content-between align-items-center">
              <span className="material-icons pr-3 pl-2"> person_add </span>
              <p className="text-right border-left w-100">
              {translate("ADD_NURSE")}
              </p>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="btn col-md-3 pr-md-0">
            <div
              className="cc-dashboard-tab cc-bg-img rounded shadow"
              onClick={this.onPatients}
            >
              <div className="d-flex justify-content-between">
                <span className="material-icons" onClick={this.onAddPatients}>
                  {" "}
                  accessible{" "}
                </span>
                <h1 className="text-white">{this.state.totalCountpatients}</h1>
              </div>
              <p>{translate("PATIENTS")}</p>
            </div>
          </div>
          <div className="btn col-md-3 pr-md-0">
            <div
              className="cc-dashboard-tab cc-bg-img-dark  shadow"
              onClick={this.onPhysicians}
            >
              <div className="d-flex justify-content-between">
                <span className="material-icons" onClick={this.onAddPhysicians}>
                  {" "}
                  people{" "}
                </span>
                <h1 className="text-white">
                  {this.state.totalCountphysicians}
                </h1>
              </div>
              <p>{translate("PHYSICIANS")}</p>
            </div>
          </div>
          <div className="btn col-md-3 pr-md-0">
            <div
              className="cc-dashboard-tab cc-bg-img rounded shadow"
              onClick={this.onReceptionists}
            >
              <div className="d-flex justify-content-between">
                <span
                  className="material-icons"
                  onClick={this.onAddReceptionists}
                >
                  {" "}
                  support_agent{" "}
                </span>
                <h1 className="text-white">
                  {this.state.totalCountReceptionist}
                </h1>
              </div>
              <p>{translate("RECEPTIONISTS")}</p>
            </div>
          </div>
          <div className="btn col-md-3 pr-md-0">
            <div
              className="cc-dashboard-tab cc-bg-img-dark rounded shadow"
              onClick={this.onNurses}
            >
              <div className="d-flex justify-content-between">
                <span className="material-icons" onClick={this.onAddNurses}>
                  {" "}
                  people{" "}
                </span>
                <h1 className="text-white">{this.state.totalCountnurses}</h1>
              </div>
              <p>{translate("NURSES")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
