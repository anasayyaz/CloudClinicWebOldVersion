import { data } from "jquery";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import TranslationContext from "../../context/translation";
let userid = JSON.parse(localStorage.getItem("user"));
let image = localStorage.getItem("image");
let role = localStorage.getItem("role");
let name = JSON.parse(localStorage.getItem("user"));
let link = `https://cloudclinicdevapi.azurewebsites.net/images/${image}`;
var roles = localStorage.getItem("roles");
const NewPrescriptionData = (props) => {

    const { translate } = useContext(TranslationContext)
    const authToken = useSelector((state) => state.userReducer.token);
    const [Prescription, SetPrescription] = useState("");
    const [prescriptionCount, setPrescriptionCount] = useState(false);

    const [allMedicine, SetallMedicine] = useState("");
    const [allRoute, SetallRoute] = useState("");
    const [allDirection, SetallDirection] = useState("");
    const [allFrequency, SetallFrequency] = useState("");
    const [allDuration, SetallDuration] = useState("");
    const [allDose, SetallDose] = useState("");
    const [allDoseUnit, SetallDoseUnit] = useState("");
    const [Role, setRole] = useState(true);
    const [dosageInstruction, setDosageInstruction] = useState("");
    const [dosageNum, setDosageNum] = useState("");
    const [refilDetails, setRefilDetails] = useState("");
    const [isDeletedCheck, setIsDeletedCheck] = useState(true);

    const [incompleteForm, setIncompleteForm] = useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [localPrescription, setLocalPrescription] = useState([]);
    const [prescriptionDetails, setPrescriptionDetails] = useState("");
    const [prescriptionUpdated, setPrescriptionUpdated] = useState(false);
    const [UpdateIndex, setUpdateIndex] = useState(null);

    let prescriptionObj = { medicine: "", duration: "", durationUnit: "", route: "", direction: "", frequency: "", dosage: "", doseNum: "" };
    const medicineRef = useRef();
    const durationRef = useRef();
    const durationUnitRef = useRef();
    const routeRef = useRef();
    const directionRef = useRef();
    const frequencyRef = useRef();
    const dosageRef = useRef();
    const dosageNumRef = useRef();


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
                lastModifiedBy: userid,
                lastModifiedOn: new Date(),
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
        if (event.target.id == "medicine-input") {
            prescriptionObj = {
                ...prescriptionObj,
                medicine: event.target.value,
            };
        } else if (event.target.id == "duration-input") {
            prescriptionObj = {
                ...prescriptionObj,
                duration: event.target.value,
            };
        }
        else if (event.target.id == "durationUnit-input") {
            prescriptionObj = {
                ...prescriptionObj,
                durationUnit: event.target.value,
            };
        } else if (event.target.id == "route-input") {
            prescriptionObj = {
                ...prescriptionObj,
                route: event.target.value,
            };
        } else if (event.target.id == "direction-input") {
            prescriptionObj = {
                ...prescriptionObj,
                direction: event.target.value,
            };
        } else if (event.target.id == "frequency-input") {
            prescriptionObj = {
                ...prescriptionObj,
                frequency: event.target.value,
            };
        }
        else if (event.target.id == "dosage") {
            prescriptionObj = {
                ...prescriptionObj,
                dosage: event.target.value,
            };
        }
        else if (event.target.id == "doseNum-input") {
            prescriptionObj = {
                ...prescriptionObj,
                doseNum: event.target.value,
            };
        }

    };

    const addToLocalFinalPrescriptionHandler = () => {
        console.log(prescriptionObj)
        // if (!checkFormValidity(prescriptionObj)) {
        //     setIncompleteForm("Please fill out the form first");
        //     return;
        // }
        setLocalPrescription([...localPrescription, prescriptionObj]);
        prescriptionObj = { medicine: "", duration: "", durationUnit: "", route: "", direction: "", frequency: "", dosage: "", doseNum: "" };
        medicineRef.current.value = "";
        dosageRef.current.value = "";
        durationRef.current.value = "";
        durationUnitRef.current.value = "";
        routeRef.current.value = "";
        directionRef.current.value = "";
        frequencyRef.current.value = "";
        dosageNumRef.current.value = ""
    };

    const deleteLocalPrescriptionHandler = (Dindex) => {
        setLocalPrescription(
            localPrescription.filter((data, index) => index !== Dindex)
        );
    };

    const getAllMedicine = async () => {
        setIsLoading(true);
        const getAll = await fetch(
            "https://cloudclinicdevapi.azurewebsites.net/api/medicine",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: null,
            }
        );

        const response = await getAll.json();

        SetallMedicine(response);
        const getAllRoute = await fetch(
            "https://cloudclinicdevapi.azurewebsites.net/api/SetupItem/GetByType/route",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: null,
            }
        );

        const responseRoute = await getAllRoute.json();

        SetallRoute(responseRoute);
        const getAllDirection = await fetch(
            "https://cloudclinicdevapi.azurewebsites.net/api/SetupItem/GetByType/direction",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: null,
            }
        );

        const responseDirection = await getAllDirection.json();

        SetallDirection(responseDirection);
        const getAllFrequency = await fetch(
            "https://cloudclinicdevapi.azurewebsites.net/api/SetupItem/GetByType/frequency",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: null,
            }
        );

        const responseFrequency = await getAllFrequency.json();

        SetallFrequency(responseFrequency);
        const getAllDuration = await fetch(
            "https://cloudclinicdevapi.azurewebsites.net/api/SetupItem/GetByType/duration",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: null,
            }
        );

        const responseDuration = await getAllDuration.json();

        SetallDuration(responseDuration);
        const getAllDoseUnit = await fetch(
            "https://cloudclinicdevapi.azurewebsites.net/api/SetupItem/GetByType/doseunit",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: null,
            }
        );

        const responseDoseUnit = await getAllDoseUnit.json();

        SetallDoseUnit(responseDoseUnit);
        setIsLoading(false);
    };

    const getAllPrescription = async () => {
        const getAll = await fetch(
            `https://cloudclinicdevapi.azurewebsites.net/api/prescription/GetPrescriptionByVisit/${props.visitID}`,
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
            localStorage.setItem('PrescriptionPrint', JSON.stringify(response));
            setPrescriptionCount(countDeletedPrescription(response));
        }
    };

    const deletePrescription = async (prescriptionId, index) => {
        try {

            const del = await fetch(
                `https://cloudclinicdevapi.azurewebsites.net/api/prescription/${prescriptionId}`,
                {
                    method: "DELETE",
                    data: {
                        "deletedBy": userid,
                        "deletedOn": new Date()
                    },
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },

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
                localPrescription[i].duration,
                localPrescription[i].durationUnit,
                localPrescription[i].route,
                localPrescription[i].direction,
                localPrescription[i].frequency,
                localPrescription[i].dosage,
                localPrescription[i].doseNum
            );
        }
        getAllPrescription();
    };

    const createPrescription = async (medicine, duration, durationUnit, route, direction, frequency, dosage, doseNum) => {

        try {
            const body = {

                MedicineID: medicine,
                DosageInstruction: "ddd",
                RefilDetails: "refil",
                medicineName: "Zostat 50Mg Tab 20 s",
                medicineGenericName: "Losartan",
                physicianName: "Dr Usman Bhatti",
                dose: doseNum,
                doseUnit: durationUnit,
                route: route,
                direction: direction,
                frequency: frequency,
                duration: duration,
                durationUnit: durationUnit,
                dosageInstruction: dosage,
                refilDetails: " refil",
                createdOn: new Date(),
                createdBy: userid,
                // "prescriptionId": 46,
                isDeleted: false,
                medicineID: medicine,
                VisitID: props.visitID,
                Patient_NationalID: props.patientID,
                Consultant_NationalID: props.consultantID,
                status: "Continued"

            };
            console.log(body)
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
        if (roles == "Nurse") {
            setRole(false);
        }
        getAllPrescription();
        getAllMedicine();
    }, []);

    return (
        <div className="col-md-12 p-0  ">
            <div className="row py-3 mx-2 d-flex justify-content-between">
                <img
                    src={link}
                    alt="Cloud Clinic Logo"
                    className="cc_logo"
                    style={{ height: "50px"}}
                />
                <div className="text-right">
                    <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-4">
                        <p className="pb-2 pr-2 m-0 cc-form-label">Dr.</p>
                        <h5 className="pt-2 cc-form-input">{props.cname}</h5>
                    </div>
                </div>
            </div>
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
                                                    className={`${data?.refilDetails ? "d-block" : "d-none"
                                                        } align-items-center justify-content-between py-2 border shadow-sm px-2 py-2 w-100`}
                                                    key={index}
                                                >



                                                    <div className="col-md-12 d-flex py-2">
                                                        <div className="col-md-6">
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
                                                                {" "}
                                                                {"Frequency"}:{" "}
                                                                <span className="text-dark font-weight-bold">
                                                                    {data.frequency}
                                                                </span>{" "}
                                                            </p>
                                                            <p className="m-0 text-info font-weight-bold">
                                                                {" "}
                                                                {"Route"}:{" "}
                                                                <span className="text-dark font-weight-bold">
                                                                    {data.route}
                                                                </span>{" "}
                                                            </p>
                                                            <p className="m-0 text-info font-weight-bold">
                                                                {" "}
                                                                {"Duration"}:{" "}
                                                                <span className="text-dark font-weight-bold">
                                                                    {data.duration}
                                                                </span>{" "}
                                                            </p>
                                                            <p className="m-0 text-info font-weight-bold">
                                                                {"Quantity"}:{" "}
                                                                <span className="text-dark font-weight-bold">
                                                                    {data.dose}
                                                                </span>
                                                            </p>
                                                            <p className="m-0 text-info font-weight-bold">
                                                                {"Unit"}:{" "}
                                                                <span className="text-dark font-weight-bold">
                                                                    {data.doseUnit}
                                                                </span>
                                                            </p>
                                                            <p className="m-0 text-info font-weight-bold">
                                                                {"Instructions"}:{" "}
                                                                <span className="text-dark font-weight-bold">
                                                                    {data.dosageInstruction}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <p className="mb-1 font-weight-bold">
                                                                {translate("PRESCRIPTION_DETAILS")}:{" "}
                                                            </p>
                                                            <p className="mb-1 text-info font-weight-bold">
                                                                {translate("PRESCRIBED")}{": "}
                                                                <span className="text-dark font-weight-bold">
                                                                    {data?.createdOn?.split("T")[0]}
                                                                </span>
                                                            </p>
                                                            <p className="mb-1 text-info font-weight-bold">
                                                                {translate("PRESCRIBED_BY")}{": "}
                                                                <span className="text-dark font-weight-bold">
                                                                    {data.physicianName}
                                                                </span>
                                                            </p>
                                                        </div>

                                                    </div>
                                                    <div className="text-right">
                                                        <button
                                                            className="btn btn-sm btn-danger rounded-pill"
                                                            onClick={() =>
                                                                deletePrescription(data.prescriptionId, index)
                                                            }
                                                        >
                                                            {translate("REMOVE")}
                                                        </button>
                                                    </div>
                                                </li>
                                            )}
                                        </React.Fragment>
                                    ))}
                            </React.Fragment>
                        ) : (
                            <h6 className="m-0 py-5 px-3">{translate("NO_CURRENT_MEDICATIONS")}</h6>
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
                                                    className={`${data?.refilDetails ? "d-block" : "d-none"
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
                                                            {" "}
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
                                                                {translate("PRESCRIBED")}{" "}
                                                                <span className="text-dark font-weight-bold">
                                                                    {data?.createdOn?.split("T")[0]}
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
                                                        <button
                                                            className="btn cc-btn btn-sm rounded-pill"
                                                            onClick={() => updateModalHandler(data, index)}
                                                            data-toggle="modal"
                                                            data-target="#updateModal"
                                                        >
                                                            {translate("MODIFY")}
                                                        </button>
                                                    </div>
                                                </li>
                                            )}
                                        </React.Fragment>
                                    ))}
                            </React.Fragment>
                        ) : (
                            <h6 className="m-0 py-2 px-3">{translate("NO_DISCONTINUED_PRESCRIPTION")}</h6>
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
                    {Role ? (
                        <>
                            {isLoading ? (
                                <li className="d-flex align-items-center py-2 border-bottom w-100 bg-light">
                                    <div className="d-flex align-items-center m-auto">
                                        <LoadingSpinner small color="secondary" />
                                    </div>
                                </li>
                            ) : (
                                <> <li className="align-items-center  border-bottom w-100">
                                    {/* <div className="pr-1 pl-0 font-weight-bold col-md-4">
                <input
                  list="medicine"
                  id="medicine-input"
                  className="form-control"
                  placeholder={translate("SELECT_MEDICINE")}
                  ref={medicineRef}
                  onChange={localPrescriptionHandler}
                />
                <datalist id="medicine" className="cutom-select">
                  {allMedicine &&
                    allMedicine.map((data, index) => (
                      <option
                        key={index}
                        value={data.medicineID + ": " + data.name+ "  (" + data.genericName + ") "}
                      />
                    ))}
                </datalist>
              </div>
              <div className="px-1 font-weight-bold col-md-4">
                <input
                  type="text"
                  id="dosage"
                  className="form-control"
                  placeholder={translate("DOSAGE_INSTRUCTIONS")}
                  ref={dosageRef}
                  onChange={localPrescriptionHandler}
                />
              </div>
              <div className="px-1 font-weight-bold col-md-3">
                <input
                  type="text"
                  id="refil"
                  className="form-control"
                  placeholder={translate("REFILL_DETAILS")}
                  ref={refilRef}
                  onChange={localPrescriptionHandler}
                />
              </div>*/}

                                    <div class="row py-1">


                                        <div className="font-weight-bold col-md-4">
                                            <input
                                                list="medicine"
                                                id="medicine-input"
                                                className="form-control"
                                                placeholder={"Drug Name"}
                                                ref={medicineRef}
                                                onChange={localPrescriptionHandler}
                                            />
                                            <datalist id="medicine" className="cutom-select">
                                                {allMedicine &&
                                                    allMedicine.map((data, index) => (
                                                        <option
                                                            key={index}
                                                            value={data.medicineID + ": " + data.name + "  (" + data.genericName + ") "}
                                                        />
                                                    ))}
                                            </datalist>
                                        </div>
                                        <div className="font-weight-bold col-md-4">
                                            <input
                                                list="frequency"
                                                id="frequency-input"
                                                className="form-control"
                                                placeholder={"Frequency"}
                                                onChange={localPrescriptionHandler}
                                                ref={frequencyRef}
                                            />
                                            <datalist id="frequency" className="cutom-select">
                                                {allFrequency &&
                                                    allFrequency.map((data, index) => (
                                                        <option
                                                            key={index}
                                                            value={data.value2}
                                                        />
                                                    ))}
                                            </datalist>
                                        </div>
                                        <div className="font-weight-bold col-md-4">
                                            <input
                                                list="route"
                                                id="route-input"
                                                className="form-control"
                                                placeholder={"Route"}
                                                onChange={localPrescriptionHandler}
                                                ref={routeRef}
                                            />
                                            <datalist id="route" className="cutom-select">
                                                {allRoute &&
                                                    allRoute.map((data, index) => (
                                                        <option
                                                            key={index}
                                                            value={data.title}
                                                        />
                                                    ))}
                                            </datalist>
                                        </div>

                                    </div>
                                    <div class="row py-1">






                                        <div className="font-weight-bold col-md-4">
                                            <input
                                                list="duration"
                                                id="duration-input"
                                                className="form-control"
                                                placeholder={"Duration"}
                                                onChange={localPrescriptionHandler}
                                                ref={durationRef}
                                            />
                                            <datalist id="duration" className="cutom-select">
                                                {allDuration &&
                                                    allDuration.map((data, index) => (
                                                        <option
                                                            key={index}
                                                            value={data.title}
                                                        />
                                                    ))}
                                            </datalist>
                                        </div>
                                        <div className="font-weight-bold col-md-2">
                                            <input
                                                list="doseUnit"
                                                id="durationUnit-input"
                                                className="form-control"
                                                placeholder={"Unit"}
                                                onChange={localPrescriptionHandler}
                                                ref={durationUnitRef}
                                            />
                                            <datalist id="doseUnit" className="cutom-select">
                                                {allDoseUnit &&
                                                    allDoseUnit.map((data, index) => (
                                                        <option
                                                            key={index}
                                                            value={data.title}
                                                        />
                                                    ))}
                                            </datalist>
                                        </div>
                                        <div className="font-weight-bold col-md-2">
                                            <input
                                                type="number"
                                                id="doseNum-input"
                                                className="form-control"
                                                placeholder={"Quantity"}
                                                ref={dosageNumRef}
                                                onChange={localPrescriptionHandler}
                                            />
                                            {/* <input
                                                type="text"
                                                id="dosage"
                                                className="form-control"
                                                placeholder={translate("DOSAGE_INSTRUCTIONS")}
                                                value={dosageInstruction}
                                                onChange={(e) => setDosageInstruction(e.target.value)}
                                            /> */}
                                            {/* <datalist id="doseUnit" className="cutom-select">
                                                {allDoseUnit &&
                                                    allDoseUnit.map((data, index) => (
                                                        <option
                                                            key={index}
                                                            value={data.title}
                                                        />
                                                    ))}
                                            </datalist> */}
                                        </div>
                                        <div className="font-weight-bold col-md-4">

                                            <input
                                                list="direction"
                                                id="direction-input"
                                                className="form-control"
                                                placeholder={"Direction"}
                                                onChange={localPrescriptionHandler}
                                                ref={directionRef}
                                            />
                                            <datalist id="direction" className="cutom-select">
                                                {allDirection &&
                                                    allDirection.map((data, index) => (
                                                        <option
                                                            key={index}
                                                            value={data.title}
                                                        />
                                                    ))}
                                            </datalist>
                                        </div>
                                        <div className="font-weight-bold col-md-12 mt-2">
                                            <input
                                                type="text"
                                                id="dosage"
                                                className="form-control"
                                                placeholder={translate("DOSAGE_INSTRUCTIONS")}
                                                ref={dosageRef}
                                                onChange={localPrescriptionHandler}
                                            />
                                            {/* <datalist id="doseUnit" className="cutom-select">
                                                {allDoseUnit &&
                                                    allDoseUnit.map((data, index) => (
                                                        <option
                                                            key={index}
                                                            value={data.title}
                                                        />
                                                    ))}
                                            </datalist> */}
                                        </div>
                                    </div>




                                </li>
                                    <div class="row py-1">
                                        <div className="pl-1 pr-0 col-md-2">
                                            <button
                                                className="border-0 btn btn-sm btn-danger w-100 cc-btn py-2 border-0 "
                                                onClick={addToLocalFinalPrescriptionHandler}
                                            >
                                                {translate("ADD")}
                                            </button>
                                        </div> </div></>


                            )}

                        </>
                    ) : null}
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
export default NewPrescriptionData;
