import { data } from "jquery";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import TranslationContext from "../../context/translation";
let userId = JSON.parse(localStorage.getItem("user"));
const ConsultantPrescriptionData = (props) => {
  const { translate } = useContext(TranslationContext);
  const authToken = useSelector((state) => state.userReducer.token);
  const [Prescription, SetPrescription] = useState("");
  const [prescriptionCount, setPrescriptionCount] = useState(false);
  const [allMedicine, SetallMedicine] = useState("");

  const [dosageInstruction, setDosageInstruction] = useState("");
  const [refilDetails, setRefilDetails] = useState("");
  const [isDeletedCheck, setIsDeletedCheck] = useState(true);

  const [incompleteForm, setIncompleteForm] = useState("");
  const [localPrescription, setLocalPrescription] = useState([]);
  const [prescriptionDetails, setPrescriptionDetails] = useState("");
  const [prescriptionUpdated, setPrescriptionUpdated] = useState(false);
  const [UpdateIndex, setUpdateIndex] = useState(null);
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
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let prescriptionObj = { medicine: "", dosage: "", refil: "" };
  const medicineRef = useRef();
  const dosageRef = useRef();
  const refilRef = useRef();

  const countDeletedPrescription = (prescriptionArray) => {
    let continued = 0;
    let discontinue = 0;

    for (let i = 0; i < prescriptionArray.length; i++) {
      if (prescriptionArray[i].isDeleted) {
        discontinue++;
      } else {
        continued++;
      }
    }

    return { continued, discontinue };
  };

  const updateModalHandler = (data, index) => {
    setPrescriptionDetails(data);
    setDosageInstruction(data.dosageInstruction);
    setRefilDetails(data.refilDetails);
    setUpdateIndex(index);
    console.log(index);
  };

  const modifyPrescription = async () => {
    try {
      const body = {
        prescriptionId: prescriptionDetails.prescriptionId,
        DosageInstruction: dosageInstruction,
        RefilDetails: refilDetails,
        isDeleted: isDeletedCheck,
      };

      const response = await fetch(
        `https://cloudclinicdevapi.azurewebsites.net/api/prescription/updatePrescription/${prescriptionDetails.prescriptionId}`,
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
        setPrescriptionCount({
          ...prescriptionCount,
          discontinue: prescriptionCount.discontinue - 1,
          continued: prescriptionCount.continued + 1,
        });
      }
      setPrescriptionUpdated(true);
      SetPrescription([...Prescription, responeJson]);
      SetPrescription([
        ...Prescription,
        (Prescription[UpdateIndex].isDeleted = responeJson.isDeleted),
        (Prescription[UpdateIndex].dosageInstruction =
          responeJson.dosageInstruction),
        (Prescription[UpdateIndex].refilDetails = responeJson.refilDetails),
      ]);
      console.log(Prescription);
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

  const localPrescriptionHandler = (event, index) => {
    if (event.target.id == "dosage") {
      prescriptionObj = {
        ...prescriptionObj,
        dosage: event.target.value,
      };
    } else if (event.target.id == "refil") {
      prescriptionObj = {
        ...prescriptionObj,
        refil: event.target.value,
      };
    } else if (event.target.id == "medicine-input") {
      prescriptionObj = {
        ...prescriptionObj,
        medicine: event.target.value,
      };
    }
  };

  const addToLocalFinalPrescriptionHandler = () => {
    if (!checkFormValidity(prescriptionObj)) {
      setIncompleteForm("Please fill out the form first");
      return;
    }
    setLocalPrescription([...localPrescription, prescriptionObj]);
    prescriptionObj = { medicine: "", dosage: "", refil: "" };
    medicineRef.current.value = "";
    dosageRef.current.value = "";
    refilRef.current.value = "";
  };

  const deleteLocalPrescriptionHandler = (Dindex) => {
    setLocalPrescription(
      localPrescription.filter((data, index) => index !== Dindex)
    );
  };

  const getAllPrescription = async () => {
    const getAll = await fetch(
      `https://cloudclinicdevapi.azurewebsites.net/api/prescription/PrescriptionByUser/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: null,
      }
    );
    const noPrescription = "No Prescription found";
    const response = await getAll.json();
    if (response == noPrescription) {
      SetPrescription(null);
    } else {
      SetPrescription(response);
      setPrescriptionCount(countDeletedPrescription(response));
    }
  };

  const deletePrescription = async (prescriptionId, index) => {
    try {
      const del = await fetch(
        `https://cloudclinicdevapi.azurewebsites.net/api/prescription/${prescriptionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: null,
        }
      );
      SetPrescription([
        ...Prescription,
        (Prescription[index].isDeleted = true),
      ]);
      setPrescriptionCount({
        ...prescriptionCount,
        discontinue: prescriptionCount.discontinue + 1,
        continued: prescriptionCount.continued - 1,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const submitAllPrescriptionHandler = async () => {
    for (let i = 0; i < localPrescription.length; i++) {
      await createPrescription(
        localPrescription[i]?.medicine?.split(": ")[0],
        localPrescription[i].dosage,
        localPrescription[i].refil
      );
    }
  };

  const createPrescription = async (medicine, dosage, refil) => {
    try {
      const body = {
        VisitID: props.visitID,
        Patient_NationalID: props.patientID,
        Consultant_NationalID: props.consultantID,
        MedicineID: medicine,
        DosageInstruction: dosage,
        RefilDetails: refil,
      };

      const response = await fetch(
        "https://cloudclinicdevapi.azurewebsites.net/api/prescription",
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

      SetPrescription([...Prescription, responeJson]);
      setLocalPrescription([]);
      const list = Prescription;
      list.push(responeJson);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    // alert(props.patientID)
    getAllPrescription();
  }, []);

  return (
    <div className="col-md-12 p-0  ">
      <div className="form-group">
        {prescriptionUpdated && (
          <div
            class="alert alert-success d-flex justify-content-between align-items-center"
            role="alert"
          >
            <p className="m-0">{translate("PRESCRIPTION_UPDATED")}</p>
            <button
              className="btn p-0 m-0"
              onClick={() => setPrescriptionUpdated(false)}
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
            <p className="m-0">{translate("CURRENT_MEDICATION")}</p>
            <p className="m-0 badge badge-info h5" style={{ color: "#FFFFFF" }}>
              {prescriptionCount?.continued}
            </p>
          </button>
          <div className="collapse" id="collapseExample">
            {prescriptionCount?.continued !== 0 ? (
              <React.Fragment>
                {Prescription &&
                  Prescription.map((data, index) => (
                    <React.Fragment key={index}>
                      <p
                        className="m-0 text-white"
                        style={{ fontSize: "0.1rem" }}
                      >
                        <small>...</small>
                      </p>
                      {!data.isDeleted && (
                        <li
                          className={`${
                            data?.refilDetails ? "d-block" : "d-none"
                          } align-items-center justify-content-between py-2 border shadow-sm px-2 py-2 w-100`}
                          key={index}
                        >
                          <div className="pr-2 col-md-12 border-bottom py-2">
                            <p
                              className="m-0 h5 cc-text-color font-weight-bold"
                              style={{ color: "#277ad2" }}
                            >
                              {data.medicineName}
                            </p>
                            <p className="m-0 text-info font-weight-bold">
                              {translate("GENRIC_NAME")}:{" "}
                              <span className="text-dark font-weight-bold">
                                {data.medicineGenericName}
                              </span>
                            </p>
                            <p className="m-0 text-info font-weight-bold">
                              {translate("DOSAGE")}:{" "}
                              <span className="text-dark font-weight-bold">
                                {data.dosageInstruction}
                              </span>
                            </p>
                          </div>

                          <div className="col-md-12 d-flex py-2">
                            <div className="col-md-6">
                              <p className="mb-1 font-weight-bold">
                                {translate("PRESCRIPTION_DETAILS")}:{" "}
                              </p>
                              <p className="mb-1 text-info font-weight-bold">
                              {translate("PRESCRIBED")}{": "}
                                <span className="text-dark font-weight-bold">
                                  {month[new Date(data.createdOn).getMonth()]}
                                  {" , "}
                                  {
                                    data?.createdOn
                                      ?.split("-")[2]
                                      ?.split("T")[0]
                                  }
                                  {" 20"}
                                  {new Date(data.createdOn).toLocaleString(
                                    "en-US",
                                    {
                                      year: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </span>
                              </p>
                              <p className="mb-1 text-info font-weight-bold">
                                {translate("PRESCRIBED_BY")}{": "}
                                <span className="text-dark font-weight-bold">
                                  {data.physicianName}
                                </span>
                              </p>
                            </div>
                            <div className="col-md-6">
                              <p className="mb-1 font-weight-bold">
                                {translate("REFILL_DETAILS")}:{" "}
                              </p>
                              <p className="mb-1 text-info font-weight-bold">
                                {translate("QUANTITY")}{" "}
                                <span className="text-dark font-weight-bold">
                                  {data.refilDetails}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {/* <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                deletePrescription(data.prescriptionId, index)
                              }
                            >
                              Remove
                            </button> */}
                          </div>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ) : (
              <h6 className="m-0 py-5 px-3">
                {translate("NO_CURRENT_MEDICATIONS")}
              </h6>
            )}
          </div>

          {/*second collapse */}
          <button
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
            <p className="m-0">{translate("DISCOUNTINUED_MEDICATION")}</p>
            <p className="m-0 badge badge-info h5" style={{ color: "#FFFFFF" }}>
              {prescriptionCount?.discontinue}
            </p>
          </button>
          <div className="collapse" id="collapseExample2">
            {prescriptionCount?.discontinue !== 0 ? (
              <React.Fragment>
                {Prescription &&
                  Prescription.map((data, index) => (
                    <React.Fragment key={index}>
                      {data.isDeleted && (
                        <li
                          className={`${
                            data?.refilDetails ? "d-block" : "d-none"
                          } align-items-center justify-content-between py-2 border shadow-sm px-2 py-2 w-100`}
                          key={index}
                        >
                          <div className="pr-2 col-md-12 border-bottom py-2">
                            <p
                              className="m-0 h5 cc-text-color font-weight-bold"
                              style={{ color: "#277ad2" }}
                            >
                              {data.medicineName}
                            </p>
                            <p className="m-0 text-info font-weight-bold">
                              {translate("GENRIC_NAME")}:{" "}
                              <span className="text-dark font-weight-bold">
                                {data.medicineGenericName}
                              </span>
                            </p>
                            <p className="m-0 text-info font-weight-bold">
                              {translate("DOSAGE")}:{" "}
                              <span className="text-dark font-weight-bold">
                                {data.dosageInstruction}
                              </span>{" "}
                            </p>
                          </div>

                          <div className="col-md-12 d-flex py-2">
                            <div className="col-md-6">
                              <p className="mb-1 font-weight-bold">
                                {translate("PRESCRIPTION_DETAILS")}:{" "}
                              </p>
                              <p className="mb-1 text-info font-weight-bold">
                                {translate("DATE")}:{" "}
                                <span className="text-dark font-weight-bold">
                                  {month[new Date(data.createdOn).getMonth()]}{" "}
                                  {
                                    data?.createdOn
                                      ?.split("-")[2]
                                      ?.split("T")[0]
                                  }
                                  {" 20"}
                                  {new Date(data.createdOn).toLocaleString(
                                    "en-US",
                                    {
                                      year: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </span>
                              </p>
                              <p className="mb-1 text-info font-weight-bold">
                                {translate("PRESCRIBED_BY")}{" "}
                                <span className="text-dark font-weight-bold">
                                  {data.physicianName}
                                </span>
                              </p>
                            </div>
                            <div className="col-md-6">
                              <p className="mb-1 font-weight-bold">
                                {translate("REFILL_DETAILS")}{" "}
                              </p>
                              <p className="mb-1 text-info font-weight-bold">
                                {translate("QUANTITY")}{" "}
                                <span className="text-dark font-weight-bold">
                                  {data.refilDetails}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            {/* <button
                              className="btn btn-primary btn-sm"
                              onClick={() => updateModalHandler(data, index)}
                              data-toggle="modal"
                              data-target="#updateModal"
                            >
                              Modify
                            </button> */}
                          </div>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ) : (
              <h6 className="m-0 py-2 px-3">
                {translate("NO_DISCONTINUED_PRESCRIPTION")}
              </h6>
            )}
          </div>

          {/* PRESCRIPTIONS READY TO SENT TO API */}
          {localPrescription.length > 0 && (
            <li className="d-flex align-items-center bg-info justify-content-center py-3 border-bottom w-100">
              <h6 className="m-0">{translate("READY_FOR_SUBMIT")}</h6>
            </li>
          )}

          {localPrescription &&
            localPrescription.map((data, index) => (
              <li
                className="d-flex align-items-center justify-content-between py-2 border-bottom w-100"
                key={index}
              >
                <div className="pr-2 font-weight-bold">{index + 1}</div>
                <div className="pr-2 col-md-4">{data.medicine}</div>
                <div className="pr-2 col-md-4">{data.dosage}</div>
                <div className="pr-2 col-md-2 font-weight-bold">
                  {data.refil}
                </div>
                <div className="col-md-2">
                  {/* <button className="border-0 btn btn-sm btn-primary cc-btn">
                    EDIT
                  </button> */}
                  <button
                    className="btn btn-sm btn-danger ml-2"
                    onClick={() => deleteLocalPrescriptionHandler(index)}
                  >
                    {translate("DELETE")}
                  </button>
                </div>
              </li>
            ))}

          {/* NEW PRESCRIPTION */}

          <li className="d-flex align-items-center py-2 border-bottom w-100">
            {/* <div className="pr-1 pl-0 font-weight-bold col-md-4">
              <input
                list="medicine"
                id="medicine-input"
                className="form-control"
                placeholder="Select Medicine"
                ref={medicineRef}
                onChange={localPrescriptionHandler}
              />
              <datalist id="medicine" className="cutom-select">
                {allMedicine &&
                  allMedicine.map((data, index) => (
                    <option
                      key={index}
                      value={data.medicineID + ": " + data.name}
                    />
                  ))}
              </datalist>
            </div> */}
            {/* <div className="px-1 font-weight-bold col-md-4">
              <input
                type="text"
                id="dosage"
                className="form-control"
                placeholder="Dosage Instructions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           "
                ref={dosageRef}
                onChange={localPrescriptionHandler}
              />
            </div> */}
            {/* <div className="px-1 font-weight-bold col-md-3">
              <input
                type="text"
                id="refil"
                className="form-control"
                placeholder="Refil Details"
                ref={refilRef}
                onChange={localPrescriptionHandler}
              />
            </div> */}
            <div className="pl-1 pr-0 col-md-1">
              {/* <button
                className="border-0 btn btn-sm btn-danger w-100 cc-btn py-2 border-0"
                onClick={addToLocalFinalPrescriptionHandler}
              >
                Add
              </button> */}
              {/* <button
                className="border-0 btn btn-sm btn-danger cc-btn py-2 border-0"
                // onClick={() => createPrescription()}
              >
                Delete
              </button> */}
            </div>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          {localPrescription.length > 0 && (
            <button
              type="button"
              class="w-10 border-0 shadow btn btn-primary cc-btn ml-3"
              onClick={submitAllPrescriptionHandler}
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
                {translate("UPDATE_PRESCRIPTION")}
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
                  {translate("MEDICINE_NAME")}:{" "}
                  <span className="font-weight-bold">
                    {prescriptionDetails.medicineName}
                  </span>
                </p>
                <p>
                  {translate("PHYSICIAN")}:{" "}
                  <span className="font-weight-bold">
                    {prescriptionDetails.physicianName}
                  </span>
                </p>
              </div>
              <div className="d-flex">
                <div className="px-1 col-md-6">
                  <input
                    type="text"
                    id="dosage"
                    className="form-control"
                    placeholder={translate("DOSAGE_INSTRUCTIONS")}
                    value={dosageInstruction}
                    onChange={(e) => setDosageInstruction(e.target.value)}
                  />
                </div>
                <div className="px-1 col-md-6">
                  <input
                    type="text"
                    id="refil"
                    className="form-control"
                    placeholder={translate("REFILL_DETAILS")}
                    value={refilDetails}
                    onChange={(e) => setRefilDetails(e.target.value)}
                  />
                </div>
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
                  <label>{translate("CONTINUE_PRESCRIPTION")}</label>
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
                onClick={modifyPrescription}
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
export default ConsultantPrescriptionData;
