import { data } from "jquery";
import React, { useEffect, useState, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import TranslationContext from "../../context/translation";

const PrescriptionData = (props) => {
  const { translate } = useContext(TranslationContext)
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
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

 
  

  

 

  const deleteLocalPrescriptionHandler = (Dindex) => {
    setLocalPrescription(
      localPrescription.filter((data, index) => index !== Dindex)
    );
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

  

  // const submitAllPrescriptionHandler = async () => {
  //   for (let i = 0; i < localPrescription.length; i++) {
  //     await createPrescription(
  //       localPrescription[i]?.medicine?.split(": ")[0],
  //       localPrescription[i].dosage,
  //       localPrescription[i].refil
  //     );
  //   }
  // };

 

  useEffect(() => {
    // alert(props.visitID)
    // alert(props.cname)
    // alert(props.consultantID)
    getAllPrescription();
  }, []);

  return (
    <div className="col-md-12 p-0  ">
      <div className="row py-3 mx-2 d-flex justify-content-between">
        <img
          src="https://cloudclinicdemo.azurewebsites.net/avatars/Logo.png"
          alt="Cloud Clinic Logo"
          className="cc_logo"
        />
        <div className="text-right">
          <div className="w-100 d-flex align-items-baseline col-md-6 mt-2 px-4">
            <p className="pb-2 pr-2 m-0 cc-form-label">Dr.</p>
            <h5 className="pt-2 cc-form-input">{props.cname}</h5>
          </div>
        </div>
      </div>
      <div className="form-group">
       
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
            <p className="m-0">Medications</p>
            <p
              className="m-0 badge badge-info h5"
              style={{ color: "#FFFFFF" }}
            >
            {prescriptionCount?.continued}

            </p>
          </button>
          <div className="collapse" id="collapseExample">
           
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
                              Generic Name:{" "}
                              <span className="text-dark font-weight-bold">
                                {data.medicineGenericName}
                              </span>
                            </p>
                              <p className="m-0 text-info font-weight-bold">{translate("DOSAGE")}:{" "}
                              <span className="text-dark font-weight-bold">{data.dosageInstruction}</span>       </p>
                          </div>

                          <div className="col-md-12 d-flex py-2">
                            <div className="col-md-6">
                              <p className="mb-1 font-weight-bold">
                                Prescription Details:{" "}
                              </p>
                              <p className="mb-1 text-info font-weight-bold">
                                Date:{" "}
                                <span className="text-dark font-weight-bold">
                                {month[(new Date(data.createdOn)).getMonth()]}{" , "}{data?.createdOn?.split("-")[2]?.split("T")[0]}{" 20"}{new Date(data.createdOn).toLocaleString('en-US', {  year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </p>
                              <p className="mb-1 text-info font-weight-bold">
                                Prescribed by{" "}
                                <span className="text-dark font-weight-bold">
                                  {data.physicianName}
                                </span>
                              </p>
                            </div>
                            <div className="col-md-6">
                              <p className="mb-1 font-weight-bold">
                                Refill Details:{" "}
                              </p>
                              <p className="mb-1 text-info font-weight-bold">
                                Quantity{" "}
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
           
          </div>


         
          

        

          <li className="d-flex align-items-center py-2 border-bottom w-100">
          
        
            <div className="pl-1 pr-0 col-md-1">
            
           
            </div>
          </li>
        </ul>
        
      </div>

      
    </div>
  );
};
export default PrescriptionData;
