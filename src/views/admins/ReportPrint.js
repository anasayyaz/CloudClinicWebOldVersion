import React from "react";

import "./PrescriptionPrint.css";

const ReportPrint = (props) => {
  return (
    <div id="printableArea" className="px-3">
    <div className="prescriptionBorderLight mb-5">
      </div>
    
      {/* <div className="prescriptionBorder">
        <div className="bg-white ml-5">
          <img
            src="https://media.istockphoto.com/vectors/rx-pharmacy-medicine-icon-on-white-background-flat-style-rx-symbol-vector-id896913162?k=20&amp;m=896913162&amp;s=612x612&amp;w=0&amp;h=9zdpw9WoUW9X8miCnd2HH56VdsAFdJdyLXzo8-Jrsac="
            alt="RX"
            className="prescription_rxImg"
          />
        </div>
      </div> */}
      {/* <div className="d-flex justify-content-around align-items-baseline bg-light p-3 border-bottom">
        <p className="h5 m-0 text-dark">Name: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{"Demo Patient"}</span></p>
        <p className="h5 m-0 text-dark">Age: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{"27"}</span></p>
        <p className="h5 m-0 text-dark">Sex: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{"Male"}</span></p>
        <p className="h5 m-0 text-dark">Visit Timing: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{new Date(props.std).toLocaleString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}</span></p>
      </div> */}
      <React.Fragment>

        <React.Fragment >
          <p className="m-0 text-white" style={{ fontSize: "0.1rem" }}>
            <small>...</small>
          </p>
          <div className="col-md-12">
        <div className=" px-3 mt-1 "  style={{ backgroundColor: "rgb(39, 122, 210)" }}>
          <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-2 my-1">
              <div className="w-100 btn   jusitfy-content-between">
                <p className="text-light font-weight-bold h5 m-0">
                  {" "}
                  {"ID:"}
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
            <div className="col-lg-2 col-md-2 col-sm-2 my-1">
              <div className="w-100 btn   jusitfy-content-between">
                <p className="text-light font-weight-bold h5 m-0"> Fee</p>
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
                <div className="col-lg-2 col-md-2 col-sm-2  ">
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
                <div className="col-lg-2 col-md-2 col-sm-2  ">
                  <div className="w-100 btn font-weight-bold  jusitfy-content-between">
                    {data.amount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

          <div className="row">
            <div className="col-md-2 section_01">
            <p className="mb-1 text-center font-weight-bold">
                Total Appointments: <br />
                <span
                  className="h4 font-weight-bold"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.totalSum}
                </span>
              </p>
            </div>
          
            <div className="col-md-2 section_02">
              <p className="mb-1 text-center font-weight-bold">
                Virtual: <br />
                <span
                  className="h4 font-weight-bold"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.totalVirtual}
                </span>
              </p>
            </div>
            <div className="col-md-2 section_03">
              
              <p className="mb-1 text-center font-weight-bold">
               In-Person <br />
                <span
                  className="font-weight-bold h5"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.totalInPerson}
                </span>
              </p>
            </div>
            <div className="col-md-2 section_03">
              
              <p className="mb-1 text-center font-weight-bold">
               Total Amount <br />
                <span
                  className="font-weight-bold h5"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.sum}
                </span>
              </p>
            </div>
            <div className="col-md-2 section_03">
              
              <p className="mb-1 text-center font-weight-bold">
               Hospital Share <br />
                <span
                  className="font-weight-bold h5"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
            {props.sum-props.doctorSum}
                </span>
              </p>
            </div>  <div className="col-md-2 section_03">
              
              <p className="mb-1 text-center font-weight-bold">
               Physician Share <br />
                <span
                  className="font-weight-bold h5"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.doctorSum}
                </span>
              </p>
            </div>
          </div>

        </React.Fragment>

      </React.Fragment>

      <div className="prescriptionBorderLight mt-5">
      </div>
    </div>
  );
};

export default ReportPrint;
