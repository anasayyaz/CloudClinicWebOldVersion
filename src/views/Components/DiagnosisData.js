import { data } from "jquery";
import React, { useEffect, useState, useRef,useContext } from "react";
import TranslationContext from "../../context/translation";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

var roles = localStorage.getItem("roles");
const DiagnosisData = (props) => {
  const { translate } = useContext(TranslationContext)
  const authToken = useSelector((state) => state.userReducer.token);
  const [Diagnostic, SetDiagnostic] = useState("");
  const [diagnosticCount, setDiagnosticCount] = useState(false);

  const [allICD, SetallICD] = useState("");
  const [Role, setRole] = useState(true);
  const [isDeletedCheck, setIsDeletedCheck] = useState(true);

  const [incompleteForm, setIncompleteForm] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [localDiagnostic, setLocalDiagnostic] = useState([]);
  const [diagnosticDetails, setDiagnosticDetails] = useState("");
  const [diagnosticUpdated, setDiagnosticUpdated] = useState(false);
  const [UpdateIndex, setUpdateIndex] = useState(null);



 
  
  



 
  

  const getAllDiagnostic = async () => {
    const getAll = await fetch(
      `https://cloudclinicdevapi.azurewebsites.net/api/patientdiagnostic/patientDiagnosticsByVisit/${props.visitID}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: null,
      }
    );
    const response = await getAll.json();
    SetDiagnostic(response);
      
  
  };

 

 

 

  useEffect(() => {
    if (roles == "Nurse") {
      setRole(false);
    }
    getAllDiagnostic();
   
  }, []);

  return (
    <div className="col-md-12 p-0  ">
      <div className="row py-3 mx-2 d-flex justify-content-between">

      </div>
      <div className="form-group">
       
        <ul class="m-0 px-1 text-left">
      

          <div
            className="d-flex justify-content-between align-items-center bg-light text-left py-2 pl-3 pr-2 rounded-0 font-weight-bold m-0 w-100 "
           >
            <p className="m-0 ">Diagnoses</p>
            <p className="m-0 badge badge-info h5" style={{ color: "#FFFFFF" }}>
              {Diagnostic.length}
            </p>
          </div>
       
           
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
                    
                        <li
                          className={` d-block  align-items-center justify-content-between py-2 border shadow-sm px-2 py-2 w-100`}
                          key={index}
                        >
                            <div className="row">
                          <div className="col-md-5">
                            <p
                              // className="m-0 h5 cc-text-color font-weight-bold"
                              // style={{ color: "#277ad2" }}
                              className="text-dark font-weight-bold"
                            >
                              {data.code}{": "}{data.medicineName}
                            </p>
                            {/* <p className="m-0 text-info font-weight-bold">
                              Generic Name:{" "}
                              <span className="text-dark font-weight-bold">
                                {data.diseaseDiscription}
                              </span>
                            </p> */}
                            
                          </div>

                          <div className="col-md-4">
                            <p className="mb-1 text-info font-weight-bold">
                                {translate("DIAG_BY")}{" "}
                                <span className="text-dark font-weight-bold">
                                  {data.physicianName}
                                </span>
                              </p>
                             
                          
                         
                          </div>
                          
                          </div>
                          
                        </li>
                    
                    </React.Fragment>
                  ))}
              </React.Fragment>
           
          

         

        
         
        </ul>
       
      </div>

    </div>
  );
};
export default DiagnosisData;
