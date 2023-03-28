import React, { useEffect, useState, useContext } from "react";
import { FcClock } from "react-icons/fc";
import { useHistory } from "react-router-dom";
import VitalSigns from "../Components/VitalSigns";
import moment from "moment";
import DummyImage from "../../assets/images/dummyimage.jpg";
import { ToastContainer, toast } from "react-toastify";
import list, { put, post } from "../../_helper/api";
import { Button, Col, Row, Table, ButtonToolbar } from "react-bootstrap";
import TranslationContext from "../../context/translation";
import { FormControlLabel, Switch } from "@material-ui/core";
let domain = localStorage.getItem("domain");
var intake_monitoring = localStorage.getItem("intake_monitoring");
const PaymentsCard = (props) => {
  const { translate } = useContext(TranslationContext);
  const [id, setId] = useState("");
  const history = useHistory();
  function formatDate(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? "AM" : "PM";
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }
  function getDuration(startTime, endTime, lunchTime) {
    var start = moment(startTime, "HH:mm");
    var end = moment(endTime, "HH:mm");
    var minutes = end.diff(start, "minutes");
    var interval = moment().hour(0).minute(minutes);
    interval.subtract(lunchTime, "minutes");
    return interval.format("HH:mm");
  }
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function goToMeeting(type, id) {
    // alert(type);
    // alert(intake_monitoring);
    if (intake_monitoring == "PreMonitoring") {
      // alert("PRE");
      if (type == "Virtual") {
        history.push(`/meeting/virtual?VisitID=${id}`);
      } else {
        history.push(`/meeting/inperson?VisitID=${id}`);
      }
    } else if (intake_monitoring == "PostMonitoring") {
      // alert("POST");
      if (type == "Virtual") {
        history.push(`/meeting/virtualpost?VisitID=${id}`);
      } else {
        history.push(`/meeting/inpersonpost?VisitID=${id}`);
      }
    }
  }
  function sendEmail(id) {
    toast.info("Email sent to Patient");
    post("/visit/sendLinkEmailToPatient", {
      tag: "Email",
      VisitID: id,
    }).then((response) => { });
  }

  return (
    <div>
      <div className="col-md-12">
        <div className="card shadow px-3 mt-1 cc-btn">
          <div className="row">
            <div className="col-lg-1 col-md-1 col-sm-1 my-1">
              <div className="w-100 btn   jusitfy-content-between">
                <p className="text-light font-weight-bold h5 m-0">
                  {" "}
                  {translate("VISIT_ID")}
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 my-1">
              <div className="w-100 btn   jusitfy-content-between">
                <p className="text-light font-weight-bold h5 m-0">Title</p>
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-sm-2 my-1">
              <div className="w-100 btn   jusitfy-content-between">
                <p className="text-light font-weight-bold h5 m-0">
                  {" "}
                  Physician Name
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 my-1">
              <div className="w-100 btn   jusitfy-content-between">
                <p className="text-light font-weight-bold h5 m-0"> Status</p>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 my-1">
              <div className="w-100 btn   jusitfy-content-between">
                <p className="text-light font-weight-bold h5 m-0"> Date</p>
              </div>
            </div>
            <div className="col-lg-1 col-md-1 col-sm-1 my-1">
              <div className="w-100 btn   jusitfy-content-between">
                <p className="text-light font-weight-bold h5 m-0"> Fee</p>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 my-1">
              <div className="w-100 btn   jusitfy-content-between">
                <p className="text-light font-weight-bold h5 m-0"> Type</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.data?.map((data, index) => {
        return (
          <div className="col-md-12">
            <div className="card shadow px-1 mt-1">
              <div className="row">
                <div className="col-lg-1 col-md-1 col-sm-1  ">
                  <div className="w-100 btn font-weight-bold  jusitfy-content-between">
                    {data.id}
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2  ">
                  <div className="w-100 btn   jusitfy-content-between">
                    <p className="text-dark font-weight-bold h5 m-0">
                      {data.title}
                    </p>
                  </div>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-2  ">
                  <div className="w-100 btn   jusitfy-content-between">
                    <p className="text-dark font-weight-bold h5 m-0">
                      {data.consultantName}
                    </p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2  ">
                  <div className="w-100 btn   jusitfy-content-between">
                    <p className="text-dark font-weight-bold h5 m-0">
                      {data.paymentStatus}
                    </p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2  ">
                  <div className="w-100 btn   jusitfy-content-between">
                    <p className="text-dark font-weight-bold h5 m-0">
                      {" "}
                      {new Date(data.startDateTime).toLocaleString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}

                    </p>
                  </div>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1  ">
                  <div className="w-100 btn font-weight-bold  jusitfy-content-between">
                    {data.amount}
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2  ">
                  <div className="w-100 btn font-weight-bold  jusitfy-content-between">
                    {data.meetingtype}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div
        class="modal fade"
        id="vitalSignsModal"
        tabindex="-1          "
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {translate("VITAL_SIGNS")}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <VitalSigns consultant={id} />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                {translate("CLOSE")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsCard;
