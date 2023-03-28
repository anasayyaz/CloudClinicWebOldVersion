import React, { useEffect, useState } from "react";
import {BsClock} from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import VitalSigns from "../Components/VitalSigns";
import moment from 'moment';
import DummyImage from '../../assets/images/dummyimage.jpg';
import { ToastContainer, toast } from "react-toastify";
import {
  FormControlLabel, Switch
} from '@material-ui/core';
const UpcomingVisitsCard = (props) => {
  const [id, setId] = useState("");
  const history = useHistory();
  function formatDate (time) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time =  time.slice (1);
      time[5]  = +time[0] < 12 ? 'AM' : 'PM';
      time[0]  = +time[0] % 12 || 12;
    }
    return time.join ('');
  }
  function getDuration(startTime, endTime, lunchTime){
    var start = moment(startTime, "HH:mm");
    var end = moment(endTime, "HH:mm");
    var minutes = end.diff(start, 'minutes');
    var interval = moment().hour(0).minute(minutes);
    interval.subtract(lunchTime, 'minutes');
    return interval.format("HH:mm");
}
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];



  return (
    <div>

      {props.data?.items?.map((data, index) => {
        return (
         
          <div className="col-md-12">
            <div className="card shadow px-3 mt-3">
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-3 my-5 text-primary text-center">
                <FormControlLabel
                                control={
                                    <Switch
                                        checked={data.isConfirm ? true : false}
                                         onChange={(e) => props.setConfirm(data.id,data.isConfirm)}
                                        color="primary"
                                    />
                                }
                                 label={data.isConfirm == 1  ? ( <span>Confirmed</span> ) : (<span>Unconfirmed</span>)}
                            />
                  <h4 className="m-0">{days[(new Date(data.startDateTime)).getDay()]}</h4>
                  <h2 className="m-0">

                  {month[(new Date(data.startDateTime)).getMonth()]}{" "}{data?.startDateTime?.split("-")[2]?.split("T")[0]}
                  </h2>
                  <h4 className="m-0">{data?.startDateTime?.split("-")[0]}</h4>
                  <h4 className="m-0 pt-1 ">VisitID-{data.id}</h4>
                </div>
                <div className="col-lg-4 col-md-9 col-sm-9 my-3 border-left font-weight-bold">
                  <div>
                    <p className="text-dark font-weight-bold h4 m-0">
                      {" "}
                      {data.doctorName.split("/")[0]}
                    </p>
                    <p className="text-dark m-0 h5 font-weight-bold">
                      <BsClock viewBox="0 1 18 16" />
                      Arrive by {""}
                      {new Date(data.startDateTime).toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-info m-0">
                      Starts at{" "}
                      {" "}{new Date(data.startDateTime).toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                   
                      {" (" +
                        getDuration(
                          formatDate(data.startDateTime.split("T")[1]),
                          formatDate(data.endDateTime.split("T")[1]),
                          0
                        ).split(":")[0] +
                        "hours" +
                        " " +
                        getDuration(
                          formatDate(data.startDateTime.split("T")[1]),
                          formatDate(data.endDateTime.split("T")[1]),
                          0
                        ).split(":")[1] +
                        "minutes" +
                        ")"}
                    </p>
                  </div>
               
                  <img
                    src={`${process.env.REACT_APP_IMAGE_URL}${data.physicinProfilImage}`}
                    height="70px"
                    width="70px"
                    className="mt-3"
                    style={{ objectFit: "cover", borderRadius: "2rem" }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 my-3 border-left font-weight-bold">
                  <div>
                    <p className="text-dark font-weight-bold h4 m-0">
                      {data.title}
                    </p>
                    <p className="text-info h5 pt-2">{data.patient}{" ("}{data.patientPhone}{")"}</p>
                  </div>
                  <div className="d-flex align-items-center pt-3">
                    <div className="col-lg-5 col-md-6 col-sm-6">
                      <img
                        src={`${process.env.REACT_APP_IMAGE_URL}${data.patientProfilImage}`}
                        height="70px"
                        width="70px"
                        style={{ objectFit: "cover", borderRadius: "2rem" }}
                      />
                    </div>
                    <div className="col-lg-7 col-md-6 col-sm-6">
                    <div className="d-flex jusitfy-content-between mb-1">
                    <button
                        className={`w-100 btn cc-btn btn-sm btn-primary mb-1 mr-2 ${
                          data.historystatus == "Intake History filled"
                            ? "btn-secondary"
                            : "btn-primary"
                        }`}
                        onClick={() => history.push(`/EditHistory/${data.id}`)}
                        disabled={
                          data.historystatus == "Intake History filled"
                            ? true
                            : false
                        }
                      >
                        Intake History
                      </button>
                      <button
                        className="w-100 btn cc-btn btn-sm btn-primary mb-1"
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
                          data.vitalsignStatus == "VitalSigns filled" && "modal"
                        }
                        data-target={
                          data.vitalsignStatus == "VitalSigns filled" &&
                          "#vitalSignsModal"
                        }
                      >
                        Vital Signs
                      </button>
                  </div>
                  <div className="d-flex jusitfy-content-between mb-1">
                  <button
                      className="w-100 btn cc-btn btn-sm btn-primary mb-1 mr-2"
                      onClick={() => props.getDocuments(data.id)}
                    >
                      Imaging / Lab Reports
                    </button>
                    <button
                      className="w-100 btn cc-btn btn-sm btn-primary mb-1"
                      onClick={() => props.uploadDocuments(data.id)}
                    >
                      Upload Documents
                    </button>
                    </div>
                    </div>
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
                Vital Signs
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
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingVisitsCard;
