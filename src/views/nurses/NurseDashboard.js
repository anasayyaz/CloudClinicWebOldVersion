import React, { lazy, useEffect, useState, createRef } from "react";
import list from "../../_helper/api";
import "./styles.css";
import TranslationContext from "../../context/translation";

export default class NurseDashboard extends React.Component {
  static contextType = TranslationContext;
    constructor(props) {
        super(props);
           this.state = {
           countNurseTodayAppoinments:'',
        countNurseTotalAppoinments:'',
        countNurseTodayVirtualAppoinments:'',
        countNurseTodayInpersonAppoinments:''
            };
        this.gotoPatients = this.gotoPatients.bind(this);
    }


    gotoPatients() {
        let path = 'patients?Patients=';
        this.props.history.push(path);
    }
onMyVisits = () => {
  
      this.props.history.push("/PhysicianHome")
  
   
  }
  onConsultantsVisits = () => {
  
      this.props.history.push("/ConsultantHome")
  
   
  }
  
  componentDidMount(request,$class)
  {
    let requestData = request ? request : this.state.requestData;
        let userId = JSON.parse(localStorage.getItem("user"));
      
         list(`DashBoard/NurseDBStats`, requestData).then((response) => {
            this.setState({ countNurseTodayAppoinments:response.data.physicianStats.countNurseTodayAppoinments,
        countNurseTotalAppoinments:response.data.physicianStats.countNurseTotalAppoinments,
        countNurseTodayVirtualAppoinments:response.data.physicianStats.countNurseTodayVirtualAppoinments,
        countNurseTodayInpersonAppoinments:response.data.physicianStats.countNurseTodayInpersonAppoinments })
           
        })


          setTimeout(() => {
      }, 1000);
  }
    render() {
      const { translate } = this.context;
        return (

         <div className="container px-4 col-12 m-0 h-100 overflow-auto">
        <div className="row">
          <div className="col-md-3 pr-md-0" onClick={this.onMyVisits}>
            <div className="cc-dashboard-tab cc-bg-img-dark rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">{this.state.countNurseTodayAppoinments}</h1>
              </div>
              <p>{translate("TODAY_APPOINTMENTS")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0" >
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today  </span>
                <h1 className="text-white">{this.state.countNurseTodayVirtualAppoinments}</h1>
              </div>
              <p>{translate("TODAY_VIRTUAL_APPOINTMENTS")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons">today  </span>
                <h1 className="text-white">{this.state.countNurseTodayInpersonAppoinments}</h1>
              </div>
              <p>{translate("TODAY_INPERSON_APPOINTMENTS")}</p>
            </div>
          </div>
          <div className="col-md-3 pr-md-0">
            <div className="cc-dashboard-tab cc-bg-img rounded shadow">
              <div className="d-flex justify-content-between">
                <span className="material-icons"> today </span>
                <h1 className="text-white">{this.state.countNurseTotalAppoinments}</h1>
              </div>
              <p>{translate("TOTAL_APPOINTMENTS")}</p>
            </div>
          </div>
        </div>
      </div>
        );
    }
}
