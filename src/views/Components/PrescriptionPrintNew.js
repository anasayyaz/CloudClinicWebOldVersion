import React from "react";

import "./PrescriptionPrint.css";
import { duration } from "moment";

const PrescriptionPrintNew = (props) => {
    return (
        <div id="printableArea" className="px-3">
            <div className="prescriptionBorder">
                <div className="bg-white ml-5">
                    <img
                        // src="https://media.istockphoto.com/vectors/rx-pharmacy-medicine-icon-on-white-background-flat-style-rx-symbol-vector-id896913162?k=20&amp;m=896913162&amp;s=612x612&amp;w=0&amp;h=9zdpw9WoUW9X8miCnd2HH56VdsAFdJdyLXzo8-Jrsac="
                        src="avatars/prescriptionIcon.png"
                        alt="RX"
                        className="prescription_rxImg"
                    />
                </div>
            </div>
            <div className="d-flex justify-content-around align-items-baseline bg-light p-3">
                <p className="h5 m-0 text-dark">Name: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{props.pname}</span></p>
                <p className="h5 m-0 text-dark">Age: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{props.age}</span></p>
                {/* <p className="h5 m-0 text-dark">Sex: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{props.gender}</span></p> */}
                <p className="h5 m-0 text-dark">Date: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{new Date().toLocaleString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                })}</span></p>
            </div>
            <React.Fragment>
                {props.P &&
                    props.P.map((data, index) => (
                      <div className="row">
                        {/* <div className="col-md-2 border-right mt-3 mb-3"></div> */}
                       
                        <div className="col-md-12   "> <React.Fragment key={index}>
                            <p className="m-0 text-white" style={{ fontSize: "0.1rem" }}>
                                <small>...</small>
                            </p>
                            {!data.isDeleted && (
                                <li
                                    className={`${data?.refilDetails ? "d-block" : "d-none"
                                        } align-items-center justify-content-between py-3 px-2 w-100 border-bottom`}
                                    key={index}
                                >
                                    <div className="row">
                                        <div className="col-md-12 section_01">
                                            <p
                                                className="m-0 h4 text-dark font-weight-bold"
                                                style={{ color: "#277ad2" }}
                                            >
                                                {data.medicineName}{" ("}{data.frequency}{")"}
                                            </p>

                                            {/* {" [ "}{data.medicineGenericName}{" ] "} */}
                                            <p className="m-0 text-info font-weight-bold">
                        <span className="text-info font-weight-bold">
                        {data.dose}{" "}{data.durationUnit}
                        {/* {" for "}{data.duration}{" starting: "}{data?.createdOn?.split("T")[0]} */}
                        </span>
                      </p>
                                            <p className="m-0 text-info font-weight-bold">
                        <span className="text-dark font-weight-bold">
                          {"Instructions: "}{data.dosageInstruction}
                        </span>
                      </p>
                                        </div>
                                        {/* <div className="col-md-2 section_02">
                      <p className="m-0 text-center font-weight-bold">
                        Dosage: <br />
                        <span
                          className="h4 font-weight-bold"
                          style={{ color: "rgb(39, 122, 210)" }}
                        >
                          {data.dosageInstruction}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-2 section_02">
                      <p className="mb-1 text-center font-weight-bold">
                        Quantity: <br />
                        <span
                          className="h4 font-weight-bold"
                          style={{ color: "rgb(39, 122, 210)" }}
                        >
                          {data.refilDetails}
                        </span>
                      </p>
                    </div> */}
                                        {/* <div className="col-md-2 section_02">
                      <p className="mb-1 text-center font-weight-bold">
                        Instructions: <br />
                        <span
                          className="h4 font-weight-bold"
                          style={{ color: "rgb(39, 122, 210)" }}
                        >
                          {data.dosageInstruction}
                        </span>
                      </p>
                    </div> */}
                                        {/* <div className="col-md-3 section_03">
                       <p className="mb-1 font-weight-bold">
                        {data?.createdOn?.split("T")[0]}
                      </p> 
                      <p className="mb-1 font-weight-bold">
                        Prescribed by <br />
                        <span
                          className="font-weight-bold h5"
                          style={{ color: "rgb(39, 122, 210)" }}
                        >
                          {data.physicianName}
                        </span>
                      </p>
                    </div> */}
                                    </div>
                                </li>
                            )}
                        </React.Fragment></div>
                       
                        </div>
                    ))}
            </React.Fragment>

            <div className="prescriptionBorderLight mt-5">
            </div>
        </div>
    );
};

export default PrescriptionPrintNew;
