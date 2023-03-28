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
const TodayVisitsCard = (props) => {
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
    }).then((response) => {});
  }

  return (
    <div>
      {props.data?.items?.map((data, index) => {
        return (
          <div className="col-md-12">
            <div className="card shadow px-3 mt-3">
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-3 my-1 text-info text-center">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={data.isConfirm ? true : false}
                        onChange={(e) =>
                          props.setConfirm(data.id, data.isConfirm)
                        }
                        color="primary"
                      />
                    }
                    label={
                      data.isConfirm == 1 ? (
                        <span style={{fontSize: "12px"}}>Confirmed</span>
                      ) : (
                        <span style={{fontSize: "12px"}}>Unconfirmed</span>
                      )
                    }
                  />
                  <h4 className="m-0  font-weight-bold">
                    {translate("VISIT_ID")}-{data.id}
                  </h4>
                  <h4 className="m-0 font-weight-bold">
                    {days[new Date(data.startDateTime).getDay()]}
                  </h4>
                  <h2 className="m-0 font-weight-bold">
                    {month[new Date(data.startDateTime).getMonth()]}{" "}
                    {data?.startDateTime?.split("-")[2]?.split("T")[0]}
                  </h2>
                  <h4 className="m-0 font-weight-bold">
                    {data?.startDateTime?.split("-")[0]}
                  </h4>
                </div>
                <div className="col-lg-4 col-md-9 col-sm-9 my-1 border-left font-weight-bold">
                  <div>
                    <p className="text-dark font-weight-bold h4 m-0">
                      {" "}
                      {data.doctorName.split("/")[0]}
                    </p>
                    <p className="text-dark font-weight-bold h5 m-0">
                      {translate("VISIT_REASON")}: {data.title}
                    </p>
                  </div>

                  <img
                    src={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Profile/${data.physicinProfilImage}`}
                    height="70px"
                    width="70px"
                    className="mt-3"
                    style={{ objectFit: "cover", borderRadius: "2rem" }}
                  />
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3 my-1 border-left font-weight-bold">
                  <div>
                    <p className="text-dark m-0 h5 font-weight-bold">
                      <FcClock viewBox="0 0 50 50" />
                      {translate("ARRIVE_BY")} {""}
                      {new Date(data.startDateTime).toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-dark font-weight-bold h5 pt-2">
                      {data.patient}
                    </p>
                    <p className="text-dark font-weight-bold h5 ">
                      {translate("PHONE_NO")}: {data.patientPhone}
                    </p>
                    
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <img
                        src={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Profile/${data.patientProfilImage}`}
                        height="70px"
                        width="70px"
                        style={{
                          objectFit: "cover",
                          borderRadius: "2rem",
                          marginRight: "2px",
                        }}
                      />
                      <Button className="btn cc-btn">
                        {" "}
                        <img
                          src="avatars/sms.png"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </Button>
                      <Button
                        className="btn cc-btn ml-1"
                        onClick={() => {
                          sendEmail(data.id);
                        }}
                      >
                        {" "}
                        <img
                          src="avatars/email.png"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </Button>
                    </div>

                  </div>
                </div>
                
                <div className="col-lg-3 col-md-3 col-sm-3 my-4">
                    <button
                        className="w-100 btn cc-btn btn-primary mb-2 jusitfy-content-between"
                        onClick={() => goToMeeting(data.meetingtype, data.id)}
                        //    disabled={
                        //     data.isConfirm == 1 ? false : true
                        // }
                      >
                        {translate("START_MEETING")}
                      </button>
                      <div className="d-flex jusitfy-content-between mb-1">
                        <button
                          className={`w-100 btn cc-btn btn-sm btn-primary  mr-2 ${
                            data.historystatus == "Intake History filled"
                              ? "btn-secondary"
                              : "btn-primary"
                          }`}
                          onClick={() =>
                            history.push(`/EditHistory/${data.id}`)
                          }
                          disabled={
                            data.historystatus == "Intake History filled"
                              ? true
                              : false
                          }
                        >
                          {translate("INTAKE_HISTORY")}
                        </button>
                        <button
                          className="w-100 btn cc-btn btn-sm btn-primary"
                          onClick={() => {
                            {
                              data.vitalsignStatus != "VitalSigns filled" &&
                                toast.info(
                                  "Kindly Upload Vital Signs Using Tablet!"
                                );
                            }
                            setId(data.id);
                          }}
                          data-toggle={
                            data.vitalsignStatus == "VitalSigns filled" &&
                            "modal"
                          }
                          data-target={
                            data.vitalsignStatus == "VitalSigns filled" &&
                            "#vitalSignsModal"
                          }
                        >
                          {translate("VITAL_SIGNS")}
                        </button>
                      </div>
                    
                      <div className="d-flex jusitfy-content-between mb-1">
                        <button
                          className="w-100 btn cc-btn btn-sm btn-primary  mr-2"
                          onClick={() => props.getDocuments(data.id)}
                        >
                          {translate("IMAGE_LAB_REPORTS")}
                        </button>
                        <button
                          className="w-100 btn cc-btn btn-sm btn-primary "
                          onClick={() => props.uploadDocuments(data.id)}
                        >
                          {translate("UPLOAD_DOCUMENTS")}
                        </button>
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

export default TodayVisitsCard;
