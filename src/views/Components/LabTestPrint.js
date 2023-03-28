import React from "react";

import "./PrescriptionPrint.css";

const LabTestPrint = (props) => {
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
    <div className="d-flex justify-content-around align-items-baseline bg-light p-3">
      <p className="h5 m-0 text-dark">Name: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{props.pname}</span></p>
      <p className="h5 m-0 text-dark">Age: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{props.age}</span></p>
      <p className="h5 m-0 text-dark">Sex: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{props.gender}</span></p>
      <p className="h5 m-0 text-dark">Visit Timing: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{new Date(props.std).toLocaleString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}</span></p>
    </div>
    <p className="m-0 text-left font-weight-bold">
                      
                      <span
                        className="h2 font-weight-bold"
                        style={{ color: "rgb(39, 122, 210)" }}
                      >
                        Recommended Lab Tests:
                      </span>
                    </p>
    <React.Fragment>
      {
        props.labTestData.map((data, index) => (
          <React.Fragment key={index}>
            <p className="m-0 text-white" style={{ fontSize: "0.1rem" }}>
              <small>...</small>
            </p>
            {!data.isDeleted && (
              <li
                className={`align-items-center justify-content-between py-3 px-2 w-100 border-bottom`}
                key={index}
              >
                <div className="row">
                  <div className="col-md-4 section_01">
                  <p className="mb-1 text-left font-weight-bold">
                      Name <br />
                      <span
                        className="h4 font-weight-bold"
                        style={{ color: "rgb(39, 122, 210)" }}
                      >
                        {data.test}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-3 section_02">
                    <p className="m-0 text-left font-weight-bold">
                      Type <br />
                      <span
                        className="h4 font-weight-bold"
                        style={{ color: "rgb(39, 122, 210)" }}
                      >
                        {data.type}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-2 section_02">
                    <p className="mb-1 text-left font-weight-bold">
                      Notes <br />
                      <span
                        className="h4 font-weight-bold"
                        style={{ color: "rgb(39, 122, 210)" }}
                      >
                        {data.notes}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-3 section_02">
                    <p className="mb-1 text-left font-weight-bold">
                      Doctor <br />
                      <span
                        className="h4 font-weight-bold"
                        style={{ color: "rgb(39, 122, 210)" }}
                      >
                        {data.physician}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            )}
          </React.Fragment>
        ))}
    </React.Fragment>

    <div className="prescriptionBorderLight mt-5">
    </div>
  </div>
  );
};

export default LabTestPrint;
