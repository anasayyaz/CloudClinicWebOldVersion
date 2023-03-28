import React, { useRef, useState, useEffect, useContext } from "react";



import "./PrescriptionPrint.css";

const ReportPrint = (props) => {

  useEffect(() => {
    // alert(props.VitalSignView)
  });
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
        <p className="h5 m-0 text-dark">
          Name:{" "}
          <span
            className="font-weight-bold"
            style={{ color: "rgb(39, 122, 210)" }}
          >
            {props.pname}
          </span>
        </p>
        <p className="h5 m-0 text-dark">
          Age:{" "}
          <span
            className="font-weight-bold"
            style={{ color: "rgb(39, 122, 210)" }}
          >
            {props.age}
          </span>
        </p>
        <p className="h5 m-0 text-dark">
          Sex:{" "}
          <span
            className="font-weight-bold"
            style={{ color: "rgb(39, 122, 210)" }}
          >
            {props.gender}
          </span>
        </p>
        <p className="h5 m-0 text-dark">
          Date:{" "}
          <span
            className="font-weight-bold"
            style={{ color: "rgb(39, 122, 210)" }}
          >
            {new Date().toLocaleString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </p>
      </div>
      <React.Fragment>
        <p
          className="pb-1 mb-1 mt-2 h3 font-weight-bold"
          style={{
            color: "rgb(39, 122, 210)",
            borderBottom: "2px solid rgb(39, 122, 210)",
            borderTop: "2px solid rgb(39, 122, 210)",
            paddingRight: "20px",
            textAlign: "center"
          }}
        >
          Assessment
        </p>
        <div className="row mt-3">
          <div className="col-md-12 section_01">
            <p
              className="m-0 h4 cc-text-color font-weight-bold"
              style={{ color: "#277ad2" }}
            >
              {/* {"Weight: "} */}

              <span className="text-dark font-weight-bold">

                {props.reportData.initialComplain}
              </span>
            </p>
          </div>



        </div>



      </React.Fragment>
      <React.Fragment>
        <p
          className="pb-1 mb-1 mt-2 h3 font-weight-bold text-align-center"
          style={{
            color: "rgb(39, 122, 210)",
            borderBottom: "2px solid rgb(39, 122, 210)",
            borderTop: "2px solid rgb(39, 122, 210)",
            paddingRight: "20px",
            textAlign: "center"
          }}
        >
          Prescription
        </p>
        {props.reportData.prescriptions &&
          props.reportData.prescriptions.map((data, index) => (
            <React.Fragment key={index}>
              <p className="m-0 text-white" style={{ fontSize: "0.1rem" }}>
                <small>...</small>
              </p>
              {!data.isDeleted && (
                <li
                  className={`${data?.refilDetails ? "d-block" : "d-none"
                    } align-items-center justify-content-between py-2 px-2 w-100 `}
                  key={index}
                >
                  <div className="row">
                    <div className="col-md-6 section_01">
                      <p
                        className="m-0 h4 cc-text-color font-weight-bold"
                        style={{ color: "#277ad2" }}
                      >
                        {data.medicineName}{" z"}
                        <span className="text-dark font-weight-bold">
                          {data.medicineGenericName}
                        </span>
                      </p>

                    </div>
                    <div className="col-md-3 section_02">
                      <p className="m-0 text-center font-weight-bold">
                        Dosage: {" "}
                        <span
                          className="h4 font-weight-bold"
                          style={{ color: "rgb(39, 122, 210)" }}
                        >
                          {data.dosageInstruction}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-3 section_02">
                      <p className="mb-1 text-center font-weight-bold">
                        Quantity: {" "}
                        <span
                          className="h4 font-weight-bold"
                          style={{ color: "rgb(39, 122, 210)" }}
                        >
                          {data.refilDetails}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              )}
            </React.Fragment>
          ))}
      </React.Fragment>
      <React.Fragment>
        <p
          className="pb-1 mb-1 mt-2 h3 font-weight-bold"
          style={{
            color: "rgb(39, 122, 210)",
            borderBottom: "2px solid rgb(39, 122, 210)",
            borderTop: "2px solid rgb(39, 122, 210)",
            paddingRight: "20px",
            textAlign: "center"
          }}
        >
          Lab Tests
        </p>
        {props.reportData.visitLabTests &&
          props.reportData.visitLabTests.map((data, index) => (
            <React.Fragment key={index}>
              <p className="m-0 text-white" style={{ fontSize: "0.1rem" }}>
                <small>...</small>
              </p>
              {!data.isDeleted && (
                <li
                  className={`${data?.labTestTypeID ? "d-block" : "d-none"
                    } align-items-center justify-content-between py-2 px-2 w-100 `}
                  key={index}
                >
                  <div className="row">
                    <div className="col-md-6 section_01">
                      <p
                        className="m-0 h4 cc-text-color font-weight-bold"
                        style={{ color: "#277ad2" }}
                      >
                        {data.type}
                        {"   ( "}
                        <span className="text-dark font-weight-bold">
                          {data.test}
                        </span>
                        {" )"}
                      </p>
                    </div>
                  </div>
                </li>
              )}
            </React.Fragment>
          ))}
      </React.Fragment>
      <React.Fragment>

        <p
          className="pb-1 mb-1 h3 mt-2 font-weight-bold"
          style={{
            color: "rgb(39, 122, 210)",
            borderBottom: "2px solid rgb(39, 122, 210)",
            borderTop: "2px solid rgb(39, 122, 210)",
            paddingRight: "20px",
            textAlign: "center"
          }}
        >
          Diagnosis
        </p>
        {props.reportData.diagnostics &&
          props.reportData.diagnostics.map((data, index) => (
            <React.Fragment key={index}>
              <p className="m-0 text-white" style={{ fontSize: "0.1rem" }}>
                <small>...</small>
              </p>
              {!data.isDeleted && (
                <li
                  className={`${data?.code ? "d-block" : "d-none"
                    } align-items-center justify-content-between py-2 px-2 w-100 `}
                  key={index}
                >
                  <div className="row">
                    <div className="col-md-12 section_01">
                      <p
                        className="m-0 h4 cc-text-color font-weight-bold"
                        style={{ color: "#277ad2" }}
                      >
                        {data.medicineName}
                        {"   ( "}
                        <span className="text-dark font-weight-bold">
                          {data.medicineGenericName}
                        </span>
                        {" )"}
                      </p>
                    </div>
                  </div>
                </li>
              )}
            </React.Fragment>
          ))}
      </React.Fragment>
      {/* <React.Fragment>
        {props.VitalSignView ?
          (
            <>
              <p
              className="pb-1 mb-1 mt-2 h3 font-weight-bold"
              style={{
                color: "rgb(39, 122, 210)",
                borderBottom: "2px solid rgb(39, 122, 210)",
                borderTop: "2px solid rgb(39, 122, 210)",
                paddingRight: "20px",
                textAlign: "center"
              }}
            >
              Vital Signs
            </p>
              <div className="row mt-3">
                <div className="col-md-3 section_01">
                  <p
                    className="m-0 h4 cc-text-color font-weight-bold"
                    style={{ color: "#277ad2" }}
                  >
                    {"Weight: "}

                    <span className="text-dark font-weight-bold">

                      {props.reportData.vitalsigns[0].weight}
                    </span>
                  </p>
                </div>
                <div className="col-md-3 section_01">
                  <p
                    className="m-0 h4 cc-text-color font-weight-bold"
                    style={{ color: "#277ad2" }}
                  >
                    {"Height: "}

                    <span className="text-dark font-weight-bold">
                      {props.reportData.vitalsigns[0].height}
                    </span>
                  </p>
                </div>
                <div className="col-md-3 section_01">
                  <p
                    className="m-0 h4 cc-text-color font-weight-bold"
                    style={{ color: "#277ad2" }}
                  >
                    {"Temperature °F: "}

                    <span className="text-dark font-weight-bold">
                      {props.reportData.vitalsigns[0].temp}
                    </span>
                  </p>
                </div>
                <div className="col-md-3 section_01">
                  <p
                    className="m-0 h4 cc-text-color font-weight-bold"
                    style={{ color: "#277ad2" }}
                  >
                    {"SPO2: "}

                    <span className="text-dark font-weight-bold">
                      {props.reportData.vitalsigns[0].spO2}
                    </span>
                  </p>
                </div>
              </div>{" "}
              <div className="row">
                <div className="col-md-3 section_01">
                  <p
                    className="m-0 h4 cc-text-color font-weight-bold"
                    style={{ color: "#277ad2" }}
                  >
                    {"Systolic: "}

                    <span className="text-dark font-weight-bold">
                      {props.reportData.vitalsigns[0].sys}
                    </span>
                  </p>
                </div>
                <div className="col-md-3 section_01">
                  <p
                    className="m-0 h4 cc-text-color font-weight-bold"
                    style={{ color: "#277ad2" }}
                  >
                    {"Diastolic: "}

                    <span className="text-dark font-weight-bold">
                      {props.reportData.vitalsigns[0].dia}
                    </span>
                  </p>
                </div>
                <div className="col-md-3 section_01">
                  <p
                    className="m-0 h4 cc-text-color font-weight-bold"
                    style={{ color: "#277ad2" }}
                  >
                    {"Perfusion Index: "}

                    <span className="text-dark font-weight-bold">
                      {props.reportData.vitalsigns[0].pi}
                    </span>
                  </p>
                </div>
                <div className="col-md-3 section_01">
                  <p
                    className="m-0 h4 cc-text-color font-weight-bold"
                    style={{ color: "#277ad2" }}
                  >
                    {"Pulse Rate: "}

                    <span className="text-dark font-weight-bold">
                      {props.reportData.vitalsigns[0].pr}
                    </span>
                  </p>
                </div>
              </div>
            
            </>
          ) : (<><p
            className="pb-1 pt-1 mb-1 mt-2 h6 font-weight-bold"
            style={{
              color: "rgb(39, 122, 210)",
              borderBottom: "2px solid rgb(39, 122, 210)",
              borderTop: "2px solid rgb(39, 122, 210)",
              paddingRight: "20px",
              textAlign: "center"
            }}
          >
            Vitals were not taken.
          </p></>)}

      </React.Fragment> */}
      <div className="prescriptionBorderLight mt-5"></div>
    </div>
  );
};

export default ReportPrint;
