import React from "react";

import "./PrescriptionPrint.css";

const PaymentReportPrint = (props) => {
  return (
    <div id="printableArea" className="px-3">
      <div className="prescriptionBorder">
        <div className="bg-white ml-5">
          <img
            src="https://media.istockphoto.com/vectors/rx-pharmacy-medicine-icon-on-white-background-flat-style-rx-symbol-vector-id896913162?k=20&amp;m=896913162&amp;s=612x612&amp;w=0&amp;h=9zdpw9WoUW9X8miCnd2HH56VdsAFdJdyLXzo8-Jrsac="
            alt="RX"
            className="prescription_rxImg"
          />
        </div>
      </div>
      <div className="d-flex justify-content-around align-items-baseline bg-light p-3 border-bottom">
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
      </div>
      <React.Fragment>

        <React.Fragment >
          <p className="m-0 text-white" style={{ fontSize: "0.1rem" }}>
            <small>...</small>
          </p>


          <div className="row">
            <div className="col-md-6 section_01">
            <p className="mb-1 text-center font-weight-bold">
                Visit Reason: <br />
                <span
                  className="h4 font-weight-bold"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.Title}
                </span>
              </p>
            </div>
          
            <div className="col-md-3 section_02">
              <p className="mb-1 text-center font-weight-bold">
                Total Amount: <br />
                <span
                  className="h4 font-weight-bold"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {"Cash: "}{"3000"}
                </span>
              </p>
            </div>
            <div className="col-md-3 section_03">
              
              <p className="mb-1 text-center font-weight-bold">
               Doctor Name <br />
                <span
                  className="font-weight-bold h5"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {"demo physician"}
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

export default PaymentReportPrint;
