import React from "react";
import { NavLink } from "react-router-dom";
import PaginationTable from "../Components/PaginationTable";
import "moment-timezone";
import date from "date-and-time";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import PopUp from "../Components/PopUp";
import ModalCarousel from "../Components/ModalCarousel";
import PersonIcon from "@material-ui/icons/Person";
import list, { put, post } from "../../_helper/api";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Search, Print as PrintIcon, Close } from "@material-ui/icons";
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";
import PostAddIcon from "@material-ui/icons/PostAdd";
import NewAppointmentCard from "./NewAppointmentCard";
import TranslationContext from "../../context/translation";

const pattern = date.compile("MMM D YYYY h:m:s A");
let confirmStatus;
let selectedValue = null;
let pid;
let choiceValue;
let descriptionType;

export default class NurseHome extends React.Component {
  static contextType = TranslationContext;
  constructor(props,context) {
    super(props, context);
    this.requestData = {
      pageNumber: 1,
      pageSize: 10,
      QuerySearch: "",
      isConfirm:'',
    };
    this.state = {
      id: "",
      description: "",
      otherdescription: "",
      mri: true,
      bloodtest: true,
      xray: true,
      ctscan: true,
      ultrasound: true,
      others: true,
      language: this.context.language,
      image: {},
      modalPatientFileUpload: false,
      viewFileUploadModal: false,
      viewModal: false,
      requestData: this.requestData,
      pagination: [10, 15, 20],
      search: false,
      
      columnsPatient: [
        {
          label: "Visit ID",
          name: "id",
        },

        {
          label: "Patient Name",
          name: "patientName",
          sortable: true,
          filter: true,
        },
        {
          label: "Start Time",
          name: "startDateTime",
          options: {
            customBodyRender: (val) => (
              <span>
                {new Date(val).toLocaleString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            ),
          },
        },
        {
          label: "Doctor Name",
          name: "consultantName",
        },
        {
          // label: "Intake History",
          label:this.context.translate("INTAKE_HISTORY"),
          name: "id",
          button: {
            show: true,
            value: "Edit",
            operation: (val) => this.addHistory(val),
            icon: AddCircleIcon,
            disabled: { key: "historystatus", value: "Intake History filled" },
          },
        },

        {
          //label: "Vital Signs",
          label:this.context.translate("VITAL_SIGNS"),
          name: "vitalsignStatus",
          button: {
            show: true,
            value: "Edit",
            operation: (val) => this.showGuide(),
            icon: CloudUploadIcon,
            disabled: { key: "vitalsignStatus", value: "VitalSigns filled" },
          },
        },
        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "View Documents",
            operation: (val) => this.getUploadedFiles(val),
          },
        },
        {
          label: "Meeting Type",
          name: "meetingtype",
        },
        {
          label: "",
          name: "meetingStatus",
        },

        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "Start Meeting",
            operation: (val) => this.start(val),
            disabled: { key: "meetingInitiate", value: "false" },
          },
        },
      ],
      rowSelectionPatient: "single",
      rowData: [],
    };
  }
  options = {
    filterType: "checkbox",
    selectableRows: false,
    responsive: "vertical",
  };
  handleSearch(request, $class) {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  }
  handleSearchClick(request, $class) {
    let requestData = request ? request : this.state.requestData;
    let userId = JSON.parse(localStorage.getItem("user"));
    console.log(requestData)
    // console.log("api/visit/NurseVisitsList/1b59b1d8-2d5f-4bbe-a953-6f322ade0184?pageNumber=1&pageSize=10&QuerySearch=&IsConfirm=false");
    // console.log(`visit/NurseVisitsList/${userId}` + requestData + `&IsConfirm=false`);
    list(`/visit/NurseVisitsList`,requestData).then((response) => {
     
      this.setState({ rowData: response.data });
           console.log(response.data);
    });
  }
  showUpload() {
    toast.info("Document Uploaded successfully!");
  }
  setConfirm(id,value)
  {
  
 
    let userId = JSON.parse(localStorage.getItem("user"));

    put(`/visit/confirmVisit/${id}`, {
      IsConfirm: !(value)
    }).then((response)=>{
        // toast.success("appointment number "+id+ " updated")
    })

  


   
    setTimeout(() => {
    //  this.getLatest("All");
    // list(`/visit/NurseVisitsList?pageNumber=1&pageSize=10&QuerySearch=&IsConfirm=`).then((response) => {
     
    //   this.setState({ rowData: response.data });
    //        console.log(response.data);
    // });
    window.location.reload();
}, 2000);

  }
  getLatest(confirmStatus)
  {

    let userId = JSON.parse(localStorage.getItem("user"));
   
    if(confirmStatus=="All")
    {
      list(`visit/primaryCareVisitsList/${userId}?pageNumber=1&pageSize=10&QuerySearch=&IsConfirm=`).then((response) => {
        this.setState({ rowData: response.data })
        console.log(response.data);
   
    }) 
    }
    else if(confirmStatus=="Confirmed")
   { list(`visit/primaryCareVisitsList/${userId}?pageNumber=1&pageSize=10&QuerySearch=&IsConfirm=true`).then((response) => {
    this.setState({ rowData: response.data })
    console.log(response.data);

}) 
  }
    else if(confirmStatus=="Unconfirmed")
    {
      list(`/visit/primaryCareVisitsList/${userId}?pageNumber=1&pageSize=10&QuerySearch=&IsConfirm=false`).then((response) => {
        this.setState({ rowData: response.data })
        console.log(response.data);
    
    }) 
    }
    
  }
  dataChange(event) {


    
    let [key, value] = [
      event.target.name,
      event.target.value,
     
    ];
   confirmStatus=event.target.value;

   this.getLatest(confirmStatus);
  }
  handleChange(event) {


    selectedValue = event.target.value;
  }

  handleOtherChange(event) {
  

    this.setState({ otherdescription: event.target.value });
  }
  componentDidMount() {
    this.handleSearchClick(null, this);
    //  this.onload();
  }
  showGuide() {
    toast.info("Kindly Upload Vital Signs Using Tablet!");
  }
  handleFileChange = (input) => {
    const file = input.target.files?.[0];
    let { image } = this.state;
    var d = new Date();
    if (file) {
      let n = file.name.lastIndexOf(".");
      let filename = file.name.substring(n + 1);
  
      image = {
        name: `${d.getTime() + "." + filename
  }`,
        file,
        url: URL.createObjectURL(file),
      };
      this.setState({ image });
    }
  };

  create = (val) => {
  
    this.setState({ modalPatientFileUpload: true, id: val });
    this.state.image.url = null;
    this.state.image.name = null;
    this.state.description = null;
    this.state.otherdescription = null;
    selectedValue = null;
  };
  createUpload = () => {
    let { image } = this.state;
    let formData = new FormData();
    formData.append("body", image.file, image.name);
    console.log("formData", formData, image);
    post("UploadFile", formData).then(() => {
      this.SaveImageData();
    });
    this.showUpload();
  }

  SaveImageData = () => {
    
    let { image, rowData, visitId } = this.state;

    list(`visit/${this.state.id}`).then((response) => {
      pid = response.data.patient_NationalID;
    });

  

    if (this.state.description == "Other") {
      this.setState({ description: this.state.otherdescription });
      descriptionType = "Other";
    } else {
      descriptionType = this.state.description;
    }
    setTimeout(() => {
   

      post("LabTest", {
        isDeleted: false,
        imagePath: image.name,
        imageName: image.name,
        visitId: this.state.id,
        patient_NationalID: pid,
        type: descriptionType,
        description: this.state.description,
      }).then((response) => {
        this.setState({ modalPatientFileUpload: false });
      });
    }, 3000);
  }
  getUploadedFiles = (val) => {
    list(`visit/${val}`).then((response) => {
      pid = response.data.patient_NationalID;

      list(
        `/LabTest/PatientLabtestsbyType/X-Ray/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ xray: true });
        })
        .catch((error) => {
          this.setState({ xray: false });
          console.log(error);
      
        });

      list(
        `/LabTest/PatientLabtestsbyType/CT Scan/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ ctscan: true });
        })
        .catch((error) => {
          this.setState({ ctscan: false });
          console.log(error);
         
        });

      list(
        `/LabTest/PatientLabtestsbyType/MRI/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ mri: true });
        })
        .catch((error) => {
          this.setState({ mri: false });
          console.log(error);
     
          
        });

      list(
        `/LabTest/PatientLabtestsbyType/Lab Test/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ bloodtest: true });
        })
        .catch((error) => {
          this.setState({ bloodtest: false });
          console.log(error);
   
        });

      list(
        `/LabTest/PatientLabtestsbyType/Ultrasound/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ ultrasound: true });
        })
        .catch((error) => {
          this.setState({ ultrasound: false });
          console.log(error);

        });

      list(
        `/LabTest/PatientLabtestsbyType/Other/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ others: true });
        })
        .catch((error) => {
          this.setState({ others: false });
          console.log(error);
    
        });
    });

    list(`patient/visitById/${val}`).then((response) => {
      pid = response.data[0].patient_NationalID;
    
    });
    list(`LabTest/visitsLabtests/${val}`)
      .then((response) => {
        this.setState({ images: response.data, viewFileUploadModal: true });
      })
      .catch((error) => {
        toast.info("No Record Found");
  
      });
  };

  getSpecificFiles(choice) {

    choiceValue = choice;
    if (choice == "X-Ray") {
      list(`/LabTest/PatientLabtestsbyType/X-Ray/${pid}`).then((response) => {
        this.setState({ images: response.data, viewModal: true });
      });
    } else if (choice == "CT Scan") {
      list(`/LabTest/PatientLabtestsbyType/CT Scan/${pid}`).then((response) => {
        this.setState({ images: response.data, viewModal: true });
      });
    } else if (choice == "MRI") {
      list(`/LabTest/PatientLabtestsbyType/MRI/${pid}`).then((response) => {
        this.setState({ images: response.data, viewModal: true });
      });
    } else if (choice == "Lab Test") {
      list(`/LabTest/PatientLabtestsbyType/Lab Test/${pid}`).then(
        (response) => {
          this.setState({ images: response.data, viewModal: true });
        }
      );
    } else if (choice == "Ultrasound") {
      list(`/LabTest/PatientLabtestsbyType/Ultrasound/${pid}`).then(
        (response) => {
          this.setState({ images: response.data, viewModal: true });
        }
      );
    } else if (choice == "Other") {
      list(`/LabTest/PatientLabtestsbyType/Other/${pid}`).then((response) => {
        this.setState({ images: response.data, viewModal: true });
      });
    }
  }
  move(val) {
    list(`patient/patientStats/${this.state.pid}`).then((response) => {
      this.setState({ count: response.data.patientmetadata.totalVisits });
    });
    setTimeout(() => {
   
      if (this.state.count == 1) {

        this.props.history.push(`/AddHistory/${val}`);
      } else {
        this.props.history.push(`/EditHistory/${val}`);
      }
    }, 1000);
  }
  addHistory(val) {
    list(`patient/visitById/${val}`).then((response) => {
      this.setState({ pid: response.data[0].patient_NationalID });
    });

    setTimeout(() => {
      this.move(val);
    }, 1000);

  }
  start(val) {
    list(`visit/${val}`).then((response) => {
      this.setState({
        Status: response.data.status,
      });
    });
    setTimeout(() => {
      if (this.state.Status == 0) {
        this.props.history.push(`physician/meeting/${val}`);
      } else if (this.state.Status == 3) {
        this.props.history.push(`/meeting/npmeeting?VisitID=${val}`);
      } else if (this.state.Status == 1) {
        this.props.history.push(`/meeting/virtual?VisitID=${val}`);
      } else if (this.state.Status == 2) {
        this.props.history.push(`physician/meeting/${val}`);
      }
    }, 1000);

    put(`/visit/updateVisitMeetingStatus/${val}`, { inProgress: true });
  }
  reportType(event) {
 

    this.setState({ description: event.target.value });
    
  }
  onload() {
    // alert("loading");
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  }
  allPages = () => {
    let [
      {
        rowData: { paginationMetadata },
        requestData,
      },
      pages,
    ] = [this.state, []];
    for (let i = 1; i <= paginationMetadata.totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={
            paginationMetadata.currentPage === i
              ? "page-item disabled_button"
              : "page-item"
          }
          onClick={() => {
            requestData["pageNumber"] = i;
            this.setState({ requestData });
            this.handleSearchClick(requestData, this.$class);
          }}
        >
          <a className="page-link" style={{ color: "#007bff" }}>
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };
  disableButtons() {
    let { paginationMetadata } = this.state.rowData;
    let nextBtn = document.getElementById("nextButton");
    let prevBtn = document.getElementById("previousButton");
    if (paginationMetadata.nextPage !== "Yes") {
      nextBtn.classList.add("disabled_button");
    } else {
      nextBtn.classList.remove("disabled_button");
    }
    if (paginationMetadata.previousPage !== "No") {
      prevBtn.classList.remove("disabled_button");
    } else {
      prevBtn.classList.add("disabled_button");
    }
  }
  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push(
      "/EditPhysician?.Physician=" + selectedRows[0].nationalID
    );
  };
  render() {
    const { translate } = this.context;
    let {
      image,
      modalPatientFileUpload,
      viewFileUploadModal,
      viewModal,
    } = this.state;
    window.onload = function () {
      //considering there aren't any hashes in the urls already
      if (!window.location.hash) {
        //setting window location
        window.location = window.location + "#loaded";
        //using reload() method to reload web page
        window.location.reload();
      }
    };
    let {
      requestData,
      search,
      pagination,
      rowData,
      rowData: { paginationMetadata },
    } = this.state;

    paginationMetadata?.currentPage && this.disableButtons();
    return (
      <PrintProvider ref={(el) => (this.componentRef = el)}>
        <ToastContainer />
        <PopUp
          $class={this}
          buttons={[
            {
              title: "Cancel",
              className: "btn btn-secondary",
              action: "setState",
            },
            {
              title: "Upload",
              className: "btn cc-btn",
              action: "createUpload",
            },
          ]}
          show={modalPatientFileUpload}
          width="750px"
          title="Upload Files"
          name="modalPatientFileUpload"
          content={
            <div>
              <React.Fragment>
                <div className="col-sm-12">
                  <img src={image.url} style={{ maxHeight: "300px" }} />
                  <h4>{image.name}</h4>
                  <p>{image.url}</p>
                </div>
                <div className="col-sm-3" style={{ overflow: "hidden" }}>
                  <input
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={this.handleFileChange}
                  />
                </div>
              </React.Fragment>
              <div className="col-sm-12" style={{ paddingTop: "15px" }}>
                <div onChange={(e) => this.reportType(e)}>
                  <Radio
                    type="radio"
                    color="default"
                    onChange={this.handleChange}
                    checked={selectedValue === "X-Ray"}
                    value="X-Ray"
                    name="Report Type"
                  />{" "}
                  X-Ray
                  <Radio
                    type="radio"
                    color="default"
                    onChange={this.handleChange}
                    checked={selectedValue === "CT Scan"}
                    value="CT Scan"
                    name="Report Type"
                  />{" "}
                  CT Scan
                  <Radio
                    type="radio"
                    color="default"
                    onChange={this.handleChange}
                    checked={selectedValue === "MRI"}
                    value="MRI"
                    name="Report Type"
                  />{" "}
                  MRI
                  <Radio
                    type="radio"
                    color="default"
                    onChange={this.handleChange}
                    checked={selectedValue === "Lab Test"}
                    value="Lab Test"
                    name="Report Type"
                  />{" "}
                  Lab Test
                  <Radio
                    type="radio"
                    color="default"
                    onChange={this.handleChange}
                    checked={selectedValue === "Ultrasound"}
                    value="Ultrasound"
                    name="Report Type"
                  />{" "}
                  Ultrasound
                  <Radio
                    type="radio"
                    color="default"
                    onChange={this.handleChange}
                    checked={selectedValue === "Other"}
                    value="Other"
                    name="Report Type"
                  />{" "}
                  Other
                </div>
                {selectedValue === "Other" ? (
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    className="form-control border-0"
                    rows={5}
                    name="otherdescription"
                    value={this.state.otherdescription}
                    onChange={(e) => {
                      this.handleOtherChange(e);
                    }}
                  />
                ) : null}
              </div>
            </div>
          }
        />
        <PopUp
          $class={this}
          buttons={[
            {
              title: "Close",
              className: "btn btn-secondary",
              action: "setState",
            },
          ]}
          show={viewFileUploadModal}
          width="400px"
          height="1000px"
          title={translate("IMAGE_LAB_REPORTS")}
          name="viewFileUploadModal"
          content={
            <div className="col-md-12">
              {this.state.xray ? (
                <div>
                  <hr></hr>
                  <div class="row">
                    <div class="col-md-9">X-Ray</div>
                    <div
                      class="col-md-3"
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        onClick={() => {
                          this.getSpecificFiles("X-Ray");
                        }}
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        src="avatars/xray.png"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.ctscan ? (
                <div>
                  <hr></hr>
                  <div class="row">
                    <div class="col-md-9">CT Scan</div>
                    <div
                      class="col-md-3"
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        onClick={() => {
                          this.getSpecificFiles("CT Scan");
                        }}
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        src="avatars/ctscan.png"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.mri ? (
                <div>
                  <hr></hr>
                  <div class="row">
                    <div class="col-md-9">MRI</div>
                    <div
                      class="col-md-3"
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        onClick={() => {
                          this.getSpecificFiles("MRI");
                        }}
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        src="avatars/mri.png"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.bloodtest ? (
                <div>
                  <hr></hr>
                  <div class="row">
                    <div class="col-md-9">{translate("LAB_TEST")}</div>
                    <div
                      class="col-md-3"
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        onClick={() => {
                          this.getSpecificFiles("Lab Test");
                        }}
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        src="avatars/bloodtest.png"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.ultrasound ? (
                <div>
                  <hr></hr>
                  <div class="row">
                    <div class="col-md-9">{translate("ULTRASOUND")}</div>
                    <div
                      class="col-md-3"
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        onClick={() => {
                          this.getSpecificFiles("Ultrasound");
                        }}
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        src="avatars/ultrasound.png"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.others ? (
                <div>
                  <hr></hr>
                  <div class="row">
                    <div class="col-md-9">{translate("OTHER")}</div>
                    <div
                      class="col-md-3"
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        onClick={() => {
                          this.getSpecificFiles("Other");
                        }}
                        defaultThumbnailWidth="25px"
                        defaultThumbnailHeight="25px"
                        src="avatars/others.png"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {this.state.xray == false &&
              this.state.bloodtest == false &&
              this.state.ctscan == false &&
              this.state.mri == false &&
              this.state.others == false &&
              this.state.ultrasound == false ? (
                <h5> {translate("NO_IMAGING_LAB_REPORTS_AVAILABLE")} </h5>
              ) : null}
            </div>
          }
        />
        <PopUp
          $class={this}
          buttons={[
            {
              title: this.context.translate("CLOSE"),
              className: "btn btn-secondary",
              action: "setState",
            },
          ]}
          show={viewModal}
          width="500px"
          height="1000px"
          title={choiceValue + "ImagING / Lab Reports"}
          name="viewModal"
          content={<ModalCarousel images={this.state.images} />}
        />
        <div className="d-flex justify-content-between">
          <h4 className="m-0">{translate("MY_APPOINTMENTS")}</h4>
          <div className="text-right">
          <div       style={{  borderRadius: "1rem" }} className="cc-btn px-2 py-2 col-md-12  w-100 border-0 shadow  float-right">
        <select
                    className="form-control font-weight-bold"
                    value={confirmStatus}
                    id="typeofconsultation"
                    name="referredTo"
                    onChange={(e) => this.dataChange(e)}
                  >
                    <option value="All">All</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Unconfirmed">Unconfirmed</option>
                    
                  </select>
               
                  </div>
            <ReactToPrint
              trigger={() => (
                <button className="btn btn-md mx-1">
                  <span className="material-icons align-middle">
                    <PrintIcon />
                  </span>
                </button>
              )}
              content={() => this.componentRef}
              bodyClass={"physicians-table"}
            />
          </div>
        </div>
        <div className="tableWrapper">
          <Print>
            <NewAppointmentCard
              title={translate("MY_APPOINTMENTS")}
              data={rowData}
              click={this.addHistory}
              uploadVitalSigns={this.showGuide}
              uploadDocuments={this.create}
              getDocuments={this.getUploadedFiles}
              showAge="false"
              setConfirm={this.setConfirm}
            />
          </Print>
          <div className="row float-right pr-5 mt-3 pb-5">
            <label
              htmlFor="exampleFoFrmControlSelect1"
              className="pt-1 pr-2 m-0"
            >
              {translate("ROW_PER_PAGE")}:{" "}
            </label>
            <>
              <div className="form-group mr-3">
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onClick={(e) => {
                    requestData["pageSize"] = e.target.value;
                    this.setState({ requestData });
                    this.handleSearchClick(requestData, this.$class);
                  }}
                >
                  {pagination.map((length, index) => {
                    return <option key={`option${index}`}>{length}</option>;
                  })}
                </select>
              </div>
            </>
            <ul className="pagination text-dark">
              <li
                id="previousButton"
                className="page-item text-dark"
                onClick={() => {
                  requestData["pageNumber"] =
                    paginationMetadata.currentPage - 1;
                  this.setState({ requestData });
                  this.handleSearchClick(requestData, this.$class);
                }}
              >
                <a className="page-link" style={{ color: "#007bff" }}>
                  Previous
                </a>
              </li>
              {paginationMetadata?.currentPage && this.allPages()}
              <li
                id="nextButton"
                className={"page-item"}
                onClick={() => {
                  requestData["pageNumber"] =
                    paginationMetadata.currentPage + 1;
                  this.setState({ requestData });
                  this.handleSearchClick(requestData, this.$class);
                }}
              >
                <a className="page-link" style={{ color: "#007bff" }}>
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </PrintProvider>
    );
  }
}
