import { data } from "jquery";
import React, { useEffect, useState, useRef, useContext } from "react";
import TranslationContext from "../../context/translation";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
let userid = JSON.parse(localStorage.getItem("user"));
let show;
var roles = localStorage.getItem("roles");
const PatientLabTestData = (props) => {
  const { translate } = useContext(TranslationContext);
  const authToken = useSelector((state) => state.userReducer.token);
  const [Diagnostic, SetDiagnostic] = useState("");
  const [diagnosticCount, setDiagnosticCount] = useState(0);

  const [allICD, SetallICD] = useState("");
  const [Role, setRole] = useState(true);
  const [isDeletedCheck, setIsDeletedCheck] = useState(true);

  const [incompleteForm, setIncompleteForm] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [localDiagnostic, setLocalDiagnostic] = useState([]);
  const [diagnosticDetails, setDiagnosticDetails] = useState("");
  const [diagnosticUpdated, setDiagnosticUpdated] = useState(false);
  const [UpdateIndex, setUpdateIndex] = useState(null);

  let diagnosticObj = { LabTestTypeID: "" };
  const icdRef = useRef();
  const countDeletedDiagnostic = (diagnosticArray) => {
    let continued = 0;
    let discontinue = 0;
    let balance;
    for (let i = 0; i < diagnosticArray.length; i++) {
      if (diagnosticArray[i].isDeleted) {
        if (discontinue > 10) {
          discontinue--;
        } else {
          discontinue++;
        }
      } else {
        continued++;
      }
    }

    return { continued, discontinue };
  };

  const updateModalHandler = (data, index) => {
    console.log(data + " aaa " + index);
    setDiagnosticDetails(data);
    setUpdateIndex(index);
    console.log(index);
  };

  const modifyDiagnostic = async () => {
    console.log(diagnosticDetails);

    try {
      const body = {
        id: diagnosticDetails.id,
        visitID: props.setVisitID,
        patient_NationalID: props.pid,
        consultant_NationalID: props.consultantID,
        code: diagnosticDetails.code,
        lastModifiedBy: userid,
        lastModifiedOn: new Date(),
        isDeleted: false,
        name: diagnosticDetails.name,
        patientName: diagnosticDetails.patientName,
        // patient_NationalID:diagnosticDetails.patient_NationalID,
        physicianName: diagnosticDetails.physicianName,
        visitID: diagnosticDetails.visitID,
      };

      const response = await fetch(
        `https://cloudclinicdevapi.azurewebsites.net/api/patientdiagnostic/${diagnosticDetails.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const responeJson = await response.json();

      if (!responeJson?.isDeleted) {
        setDiagnosticCount({
          ...diagnosticCount,
          discontinue: diagnosticCount.discontinue - 1,
          continued: diagnosticCount.continued + 1,
        });
      }
      setDiagnosticUpdated(true);
      SetDiagnostic([...Diagnostic, responeJson]);
      SetDiagnostic([
        ...Diagnostic,
        (Diagnostic[UpdateIndex].isDeleted = responeJson.isDeleted),
      ]);
      console.log(Diagnostic);
      console.log(UpdateIndex);
    } catch (err) {
      console.error(err.message);
    }
  };
  const checkFormValidity = (request) => {
    for (let key in request) {
      if (request[key] === "" || request[key] === null) return false;
    }
    return true;
  };

  const localDiagnosticHandler = (event, index) => {
    if (event.target.id == "LabTestTypeID-input") {
      diagnosticObj = {
        ...diagnosticObj,
        LabTestTypeID: event.target.value,
      };
    }
  };

  const addToLocalFinalDiagnosticHandler = () => {
    if (!checkFormValidity(diagnosticObj)) {
      setIncompleteForm("Please fill out the form first");
      return;
    }
    setLocalDiagnostic([...localDiagnostic, diagnosticObj]);
    diagnosticObj = { LabTestTypeID: "" };
    icdRef.current.value = "";
  };

  const deleteLocalDiagnosticHandler = (Dindex) => {
    setLocalDiagnostic(
      localDiagnostic.filter((data, index) => index !== Dindex)
    );
  };
  //done
  const getAllICD = async () => {
    setIsLoading(true);
    const getAll = await fetch(
      "https://cloudclinicdevapi.azurewebsites.net/api/LabTestType",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: null,
      }
    );

    const response = await getAll.json();

    SetallICD(response);
    setIsLoading(false);
  };

  const getAllDiagnostic = async () => {
    const getAll = await fetch(
      `https://cloudclinicdevapi.azurewebsites.net/api/VisitLabTest/GetByVisit/${props.visitID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: null,
      }
    );
    const noDiagnostic = "No Diagnostic found";
    const response = await getAll.json();

    if (response == "Record not found in system") {
      SetDiagnostic(null);
      setDiagnosticCount(0)
    } else {
      SetDiagnostic(response);
      setDiagnosticCount(countDeletedDiagnostic(response));
    }
  };

  const deleteDiagnostic = async (code, index) => {
    try {
      const del = await fetch(
        `https://cloudclinicdevapi.azurewebsites.net/api/patientdiagnostic/${code}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: null,
        }
      );
      SetDiagnostic([...Diagnostic, (Diagnostic[index].isDeleted = true)]);
      setDiagnosticCount({
        ...diagnosticCount,
        discontinue: diagnosticCount.discontinue + 1,
        continued: diagnosticCount.continued - 1,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const submitAllDiagnosticHandler = async () => {
    for (let i = 0; i < localDiagnostic.length; i++) {
      await createDiagnostic(localDiagnostic[i]?.LabTestTypeID?.split(": ")[0]);
      console.log(localDiagnostic[i]?.LabTestTypeID?.split(": ")[0]);
    }

    getAllDiagnostic();
  };

  const createDiagnostic = async (LabTestTypeID) => {
    try {
      const body = {
        VisitID: props.visitID,
        Patient_NationalID: props.patientID,
        Consultant_NationalID: props.consultantID,
        LabTestTypeID: LabTestTypeID,
      };

      const response = await fetch(
        "https://cloudclinicdevapi.azurewebsites.net/api/VisitLabTest",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const responeJson = await response.json();

      SetDiagnostic([...Diagnostic, responeJson]);
      setLocalDiagnostic([]);
      const list = Diagnostic;
      list.push(responeJson);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (roles == "Nurse") {
      setRole(false);
    }
    getAllDiagnostic();
    getAllICD();
  }, []);

  return (
    <div className="col-md-12 p-0  ">
      <div className="row py-3 mx-2 d-flex justify-content-between"></div>
      <div className="form-group">
        {diagnosticUpdated && (
          <div
            class="alert alert-success d-flex justify-content-between align-items-center"
            role="alert"
          >
            <p className="m-0">{translate("DIAG_UPDATED")}</p>
            <button
              className="btn p-0 m-0"
              onClick={() => setDiagnosticUpdated(false)}
            >
              &#10006;
            </button>
          </div>
        )}
        <ul class="m-0 px-1 text-left">
          {/* PRESCRIPTIONS FROM API */}

          <button
            className="d-flex justify-content-between align-items-center bg-light text-left py-2 pl-3 pr-2 rounded-0 font-weight-bold m-0 w-100 collapsed"
            style={{
              border: "none",
              borderBottom: "1px solid rgb(210 210 210)",
            }}
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <p className="m-0">Lab Tests</p>
            <p className="m-0 badge badge-info h5" style={{ color: "#FFFFFF" }}>
              {diagnosticCount?.continued}
            </p>
          </button>
          <div className="collapse" id="collapseExample">
            {diagnosticCount?.continued !== 0 ? (
              <React.Fragment>
                {Diagnostic &&
                  Diagnostic.map((data, index) => (
                    <React.Fragment key={index}>
                      <p
                        className="m-0 text-white"
                        style={{ fontSize: "0.1rem" }}
                      >
                        <small>...</small>
                      </p>
                      {/* {!data.isDeleted && ( */}
                      <li
                        className={`${data?.labTestTypeID ? "d-block" : "d-none"
                          } align-items-center justify-content-between py-2 border shadow-sm px-2 py-2 w-100`}
                        key={index}
                      >
                        <div className="row">
                          <div className="col-md-5">
                            <p
                              // className="m-0 h5 cc-text-color font-weight-bold"
                              // style={{ color: "#277ad2" }}
                              className="text-dark font-weight-bold"
                            >
                              {data.code}
                              {": "}
                              {data.type}
                            </p>
                            {/* <p className="m-0 text-info font-weight-bold">
                              Generic Name:{" "}
                              <span className="text-dark font-weight-bold">
                                {data.diseaseDiscription}
                              </span>
                            </p> */}
                          </div>

                          <div className="col-md-7">
                            <p className="mb-1 text-info font-weight-bold">
                              {"Recommended By: "}
                              <span className="text-dark font-weight-bold">
                                {data.physician}
                              </span>
                            </p>
                          </div>
                          {/* <div className="col-md-3">
                              <button
                                style={{ float: "right" }}
                                className="btn btn-sm btn-danger rounded-pill"
                                onClick={() => deleteDiagnostic(data.id, index)}
                              >
                                {translate("REMOVE")}
                              </button>
                            </div> */}
                        </div>
                      </li>
                      {/* )} */}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ) : (
              <h6 className="m-0 py-5 px-3">
                {translate("NO_CURRENT_DIAGNOSIS")}
              </h6>
            )}
          </div>

          {/*second collapse */}
          {/* <button
            className="d-flex justify-content-between align-items-center bg-light text-left py-2 pl-3 pr-2 rounded-0 font-weight-bold m-0 w-100 collapsed"
            style={{
              border: "none",
              borderBottom: "1px solid rgb(210 210 210)",
            }}
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample2"
            aria-expanded="false"
            aria-controls="collapseExample2"
          >
            <p className="m-0">Previous Diagnosis</p>
            <p className="m-0 badge badge-info h5" style={{ color: "#FFFFFF" }}>
              {diagnosticCount?.discontinue}
            </p>
          </button> */}
          <div className="collapse" id="collapseExample2">
            {diagnosticCount?.discontinue !== 0 ? (
              <React.Fragment>
                {Diagnostic &&
                  Diagnostic.map((data, index) => (
                    <React.Fragment key={index}>
                      {data.isDeleted && (
                        <li
                          className={`${data?.name ? "d-block" : "d-none"
                            } align-items-center justify-content-between py-2 border shadow-sm px-2 py-2 w-100`}
                          key={index}
                        >
                          <div className="row">
                            <div className="col-md-5">
                              <p className="text-dark font-weight-bold">
                                {data.code}
                                {": "}
                                {data.name}
                              </p>
                            </div>

                            <div className="col-md-4">
                              <p className="mb-1 text-info font-weight-bold">
                                {translate("DIAG_BY")}{" "}
                                <span className="text-dark font-weight-bold">
                                  {data.physicianName}
                                </span>
                              </p>
                            </div>
                            {/* <div className="col-md-1">
                            <button
                              className="btn btn-sm btn-danger rounded-pill"
                              onClick={() =>
                                deleteDiagnostic(data.code, index)
                              }
                            >
                              {translate("REMOVE")}
                            </button>
                          </div> */}
                            <div className="col-md-3 pr-o ">
                              <button
                                style={{ float: "right" }}
                                className="btn cc-btn btn-sm rounded-pill"
                                onClick={() => updateModalHandler(data, index)}
                                data-toggle="modal"
                                data-target="#updateModal"
                              >
                                {translate("MODIFY")}
                              </button>
                            </div>
                          </div>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ) : (
              <h6 className="m-0 py-2 px-3">
                {translate("NO_PREVIOUS_DIAGNOSIS")}
              </h6>
            )}
          </div>

          {/* PRESCRIPTIONS READY TO SENT TO API */}
          {localDiagnostic.length > 0 && (
            <li className="d-flex align-items-center bg-info justify-content-center py-3 border-bottom w-100">
              <h6 className="m-0">{translate("READY_FOR_SUBMIT")}</h6>
            </li>
          )}

          {localDiagnostic &&
            localDiagnostic.map((data, index) => (
              <li
                className="d-flex align-items-center justify-content-between py-2 border-bottom w-100"
                key={index}
              >
                <div className="pr-2 font-weight-bold">{index + 1}</div>
                <div className="pr-2 col-md-4">{data.LabTestTypeID}</div>
                <div className="col-md-2">
                  {/* <button className="border-0 btn btn-sm btn-primary cc-btn">
                    EDIT
                  </button> */}
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={() => deleteLocalDiagnosticHandler(index)}
                  >
                    {translate("DELETE")}
                  </button>
                </div>
              </li>
            ))}

          {/* NEW PRESCRIPTION */}
          {/* {Role ? (
            <>
              {isLoading ? (
                <li className="d-flex align-items-center py-2 border-bottom w-100 bg-light">
                  <div className="d-flex align-items-center m-auto">
                    <LoadingSpinner small color="secondary" />
                  </div>
                </li>
              ) : (
                <li className="d-flex align-items-center py-2 border-bottom w-100">
                  <div className="pr-1 pl-0 font-weight-bold col-md-10">
                    <input
                      list="LabTestTypeID"
                      id="LabTestTypeID-input"
                      className="form-control"
                      placeholder={"Select Lab Test"}
                      ref={icdRef}
                      onChange={localDiagnosticHandler}
                    />
                    <datalist
                      id="LabTestTypeID"
                      className="cutom-select px-2 py-5"
                    >
                      {allICD &&
                        allICD.map((data, index) => (
                          <option
                            key={index}
                            value={
                              data.labTestTypeID +
                              ": " +
                              data.type +
                              " `" +
                              data.test +
                              "`  (" +
                              data.code +
                              ") "
                            }
                          />
                        ))}
                    </datalist>
                  </div>

                  <div className="pl-1 pr-0 col-md-2">
                    <button
                      className="border-0 btn btn-sm btn-danger w-100 cc-btn py-2 border-0"
                      onClick={addToLocalFinalDiagnosticHandler}
                    >
                      {translate("ADD")}
                    </button>
                    <button
                className="border-0 btn btn-sm btn-danger cc-btn py-2 border-0"
                // onClick={() => createDiagnostic()}
              >
                Delete
              </button>
                  </div>
                </li>
              )}
            </>
          ) : null} */}
        </ul>
        <div className="d-flex align-items-center">
          {localDiagnostic.length > 0 && (
            <button
              type="button"
              class="w-10 border-0 shadow btn btn-primary cc-btn ml-3"
              onClick={submitAllDiagnosticHandler}
            >
              {translate("SUBMIT")}
            </button>
          )}
          {incompleteForm && (
            <h6 className="text-danger pl-3">{incompleteForm}</h6>
          )}
        </div>
      </div>

      <div
        class="modal fade"
        id="updateModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog shadow-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {translate("UPDATE_DIAGNOSTIC")}
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
              <div className="px-1 col-md-12">
                <p>
                  {translate("DIAGNOSIS")}:{" "}
                  <span className="font-weight-bold">
                    {diagnosticDetails.name}
                  </span>
                </p>
              </div>

              <div className="col-md-12">
                <div className="d-flex pt-2 pl-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={isDeletedCheck}
                    id="flexCheckDefault"
                    onChange={(e) => setIsDeletedCheck(!e.target.checked)}
                  />
                  <label>{translate("CONTINUE_DIAGNOSTIC")}</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-info" data-dismiss="modal">
                {translate("CLOSE")}
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={modifyDiagnostic}
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#updateResponseModal"
              >
                {translate("UPDATE")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PatientLabTestData;
