import React from "react";
import list from "../../_helper/api";
import RescheduleList from "./RescheduleList";
import TranslationContext from "../../context/translation";

export default class ReceptionistDashboard extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.state = {
      totalCountpatients: "",
      totalCountphysicians: "",
      totalCounttodaysvisits: "",
      CountTodayVirtualAppoinments: "",
      CountTodayInpersonAppoinments: "",
      rowData: [],
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
    this.props.history.push("/Nurses");
  };
  componentDidMount() {
    list(`DashBoard/ReceptionistDBStats`).then((response) => {
      this.setState({
        totalCountpatients: response.data.receptionistStats.totalCountpatients,
        totalCountphysicians:
          response.data.receptionistStats.totalCountphysicians,
        totalCountnurses: response.data.receptionistStats.totalCountnurses,
        totalCounttodaysvisits:
          response.data.receptionistStats.totalCounttodaysvisits,
        CountTodayVirtualAppoinments:
          response.data.receptionistStats.countTodayVirtualAppoinments,
        CountTodayInpersonAppoinments:
          response.data.receptionistStats.countTodayInpersonAppoinments,
      });
    });
    list(
      `/visit/rescheduleVisitsList?pageNumber=1&pageSize=10&QuerySearch=`
    ).then((response) => {
      this.setState({ rowData: response.data });
    });

    setTimeout(() => {}, 1000);
  }
  render() {
    const { translate } = this.context;
    return (
      <div className="container px-4 col-12 m-0 h-100">
        <div className="row">
          <div className="btn col-md-3 pr-md-0" onClick={this.onTodaysVisit}>
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">
                  {this.state.totalCounttodaysvisits}
                </h1>
              </div>
              <p>{translate("TODAY_VISIT")}</p>
            </div>
          </div>
          <div className="btn col-md-3 pr-md-0" onClick={this.onPatients}>
            <div className="cc-dashboard-tab cc-bg-img-dark rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> people </span>
                <h1 className="text-white">{this.state.totalCountpatients}</h1>
              </div>
              <p>{translate("PATIENTS")}</p>
            </div>
          </div>
          <div className="btn col-md-3 pr-md-0" onClick={this.onPhysicians}>
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> people </span>
                <h1 className="text-white">
                  {this.state.totalCountphysicians}
                </h1>
              </div>
              <p>{translate("PHYSICIANS")}</p>
            </div>
          </div>

          <div className="btn col-md-3 pr-md-0" onClick={this.onNurses}>
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">{this.state.totalCountnurses}</h1>
              </div>
              <p>{translate("NURSES")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">
                  {this.state.CountTodayVirtualAppoinments}
                </h1>
              </div>
              <p>{translate("TODAY_VIRTUAL_APPOINTMENTS")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img-dark rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">
                  {this.state.CountTodayInpersonAppoinments}
                </h1>
              </div>
              <p>{translate("TODAY_INPERSON_APPOINTMENTS")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> ... </span>
                <h1 className="text-white">...</h1>
              </div>
              <p>{translate("COMING_SOON")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img-dark rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> ... </span>
                <h1 className="text-white">...</h1>
              </div>
              <p>{translate("COMING_SOON")}</p>
            </div>
          </div>
        </div>
        <hr></hr>
        <h4 className="cc-bg-img-dark mt-2 mb-0  py-2 px-2 text-white rounded shadow">
          {translate("APPOINTMENTS_TO_BE_RESCHEDULDED")}:
        </h4>
        <div class="row  ">
          <div
            className="col-md-12 pr-md-0 overflow-auto "
            style={{ height: "50vh" }}
          >
            <RescheduleList data={this.state.rowData} />
          </div>
        </div>
      </div>
    );
  }
}
