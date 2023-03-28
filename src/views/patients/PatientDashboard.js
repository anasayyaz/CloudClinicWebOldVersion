import React from "react";
import "./styles.css";
import list from "../../_helper/api";
import PopUp from '../Components/PopUp';
import TranslationContext from "../../context/translation";
import ToBeAddedAppointmentModal from "./ToBeAddedAppointmentModal.js";
import { ToastContainer, toast } from "react-toastify";
let specialityData,ctype,pname,pid;
export default class PatientDashboard extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.state = {
      totalCounttodaysAppoinments: "",
      totalCountfutureAppoinments: "",
      totalAppointments: "",
      viewModal:false,
      physicianData:[]
    };
    this.gotoPatients = this.gotoPatients.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  gotoPatients() {
    this.props.history.push("/UpcomingVisits");
  }


  onCreate = () => 
    {

      toast.info("Getting things ready!");
      list(`physician`).then((response) => {
        this.setState({physicianData: response.data});
      });
     
      setTimeout(() => {
 
       
        
            this.setState({ viewModal:true})
      }, 1000);

  }
  close= () =>
  {
    this.setState({viewModal: false});
  }
  componentDidMount(request, $class) {
    let requestData = request ? request : this.state.requestData;
    let userId = JSON.parse(localStorage.getItem("user"));
  
  pname=  localStorage.getItem("userFirstName")+" "+localStorage.getItem("userLastName");

    list(`DashBoard/PatientDBStats/${userId}`, requestData).then((response) => {
      this.setState({
        totalCounttodaysAppoinments:
          response.data.patientStats.totalCounttodaysAppoinments,
        totalCountfutureAppoinments:
          response.data.patientStats.totalCountfutureAppoinments,
        totalAppointments: response.data.patientStats.totalAppointments,
      });
    });

    setTimeout(() => {}, 1000);
  }
  render() {
    const { translate } = this.context;
    let { viewModal,close,physicianData } = this.state;
    return (

      <>    <PopUp
        
      $class = {this}
      buttons = {[
          // {title:'Cancel', className:"btn btn-secondary", action:"setState"},
          // {title:'Upload', className:"btn cc-btn", action:"createUpload"},
      ]}
      show={viewModal}
      title="Request Appointment"
      name="viewModal"
      width="450px"
      content={
  
          <ToBeAddedAppointmentModal pname={pname} viewModal={viewModal} specialityData={physicianData} ctype={ctype}  close={close}  />
      }
    />
      <div className="container px-4 col-12 m-0 h-100 overflow-auto">
   
        <div className="row">
        <div className="col-md-3 pr-md-0" onClick={this.onCreate}>
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> send </span>
              </div>
              {/* <h1 className="text-white">
                  Click here to request an appointment
                </h1> */}
              <p>    Click here to request an appointment</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0" onClick={this.onMyVisits}>
            <div className="cc-dashboard-tab cc-bg-img-dark rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">
                  {this.state.totalCountfutureAppoinments}
                </h1>
              </div>
              <p>{translate("MY_FUTURE_APPOINTMENTS")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0" onClick={this.onMyVisits}>
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">
                  {this.state.totalCounttodaysAppoinments}
                </h1>
              </div>
              <p>{translate("TODAY_APPOINTMENTS")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0" onClick={this.onMyVisits}>
            <div className="cc-dashboard-tab cc-bg-img-dark rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">{this.state.totalAppointments}</h1>
              </div>
              <p>{translate("TOTAL_APPOINTMENTS")}</p>
            </div>
          </div>
         
        </div>
      </div>
      </>
    );
  }
}
