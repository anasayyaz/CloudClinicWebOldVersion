import React from "react";
import "moment-timezone";
import list, { put, post } from "../../_helper/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopUp from "../Components/PopUp";
import ModalCarousel from "../Components/ModalCarousel";
import { Search, Print as PrintIcon, Close } from "@material-ui/icons";
import ReactToPrint from "react-to-print";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import NewAppointmentCardAdmin from "./NewAppointmentCardAdmin";
import NewAppointmentCardPhysician from "./NewAppointmentCardPhysician";
import { validate } from "uuid";
let filesubmitname, imageName;
let confirmStatus = null;
let selectedValue = null;
let pid;
let vid;
let choiceValue;
let descriptionType;
let role = localStorage.getItem("roles");
export default class PhysicianHome extends React.Component {
  constructor(props) {
    super(props);
    this.searchField = React.createRef();
    this.requestData = {
      pageNumber: 1,
      pageSize: 10,
      QuerySearch: "",
      isConfirm: "",
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
      pagination: [10, 15, 20],
      image: {},
      modalPatientFileUpload: false,
      viewFileUploadModal: false,
      viewModal: false,
      requestData: this.requestData,

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
    // console.log(localStorage.getItem("user"))
    list(`/visit/primaryCareVisitsList/${userId}`, requestData)
      .then((response) => {
        this.setState({ rowData: response.data });
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error during service worker registration:", error);
      });
  }

  handleChange(event) {
    selectedValue = event.target.value;
  }
  dataChange(event) {
    let [key, value] = [event.target.name, event.target.value];
    confirmStatus = event.target.value;

    if (confirmStatus == "All") {
      this.requestData["isConfirm"] = "";
    } else if (confirmStatus == "Confirmed") {
      this.requestData["isConfirm"] = true;
    } else if (confirmStatus == "Unconfirmed") {
      this.requestData["isConfirm"] = false;
    }

    this.getLatest(confirmStatus);
  }
  getLatest(confirmStatus) {
    let userId = JSON.parse(localStorage.getItem("user"));

    if (confirmStatus == "All") {
      list(`/visit/primaryCareVisitsList/${userId}`, this.requestData)
        .then((response) => {
          this.setState({ rowData: response.data });
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    } else if (confirmStatus == "Confirmed") {
      list(`/visit/primaryCareVisitsList/${userId}`, this.requestData)
        .then((response) => {
          this.setState({ rowData: response.data });
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    } else if (confirmStatus == "Unconfirmed") {
      list(`/visit/primaryCareVisitsList/${userId}`, this.requestData)
        .then((response) => {
          this.setState({ rowData: response.data });
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    }
  }

  setConfirm = (id, value) => {
    put(`/visit/confirmVisit/${id}`, {
      IsConfirm: !value,
    }).then((response) => {});

    let userId = JSON.parse(localStorage.getItem("user"));
    // console.log(localStorage.getItem("user"))
    list(
      `/visit/primaryCareVisitsList/${userId}?pageNumber=1&pageSize=10&QuerySearch=&isConfirm=`
    )
      .then((response) => {
        this.setState({ rowData: response.data });
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error during service worker registration:", error);
      });
  };

  handleOtherChange(event) {
    this.setState({ otherdescription: event.target.value });
  }
  componentDidMount() {
    //  alert( localStorage.getItem("username"));
    this.handleSearchClick(null, this);
    //  this.onload();
  }
  showGuide() {
    toast.info("Kindly Upload Vital Signs Using Tablet!");
  }
  showUpload() {
    toast.info("Document Uploaded successfully!");
  }
  start(val) {
    list(`visit/${val}`)
      .then((response) => {
        this.setState({
          Status: response.data.status,
        });
      })
      .catch((error) => {
        console.error("Error during service worker registration:", error);
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
  handleFileChange = (input) => {
    filesubmitname = input.target.files?.[0];
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
    console.log(image)
  };
  create = (val) => {
    vid = val;
    this.setState({ modalPatientFileUpload: true, id: val });
    this.state.image.url = null;
    this.state.image.name = null;
    this.state.description = null;
    this.state.otherdescription = null;
    selectedValue = null;
  };
  createUpload = () => {
    let userid = JSON.parse(localStorage.getItem("user"));
    let domain = localStorage.getItem("domain");
    let { image } = this.state;
    let formData = new FormData();
    let type = image.name.split(".").pop();
    imageName = userid + "_" + Date.now() + "_" + domain + "." + type;
    formData.append("body", filesubmitname, imageName);
    console.log("body" + filesubmitname + imageName);

    post("UploadFile", formData).then(() => {
      this.SaveImageData();
    });
    this.showUpload();
  };

  SaveImageData = () => {
    let { image, rowData, visitId } = this.state;

    list(`visit/${vid}`).then((response) => {
      pid = response.data.patient_NationalID;
    });

    //  alert(this.state.description);

    // alert(this.state.otherdescription);

    if (this.state.description == "Other") {
      this.setState({ description: this.state.otherdescription });
      descriptionType = "Other";
    } else {
      descriptionType = this.state.description;
    }
    setTimeout(() => {
      post("LabTest", {
        isDeleted: false,
        imagePath: imageName,
        imageName: imageName,
        visitId: this.state.id,
        patient_NationalID: pid,
        type: descriptionType,
        description: this.state.description,
      }).then((response) => {
        this.setState({ modalPatientFileUpload: false });
      });
    }, 3000);
  };
  getUploadedFiles = (val) => {
    list(`visit/${val}`).then((response) => {
      pid = response.data.patient_NationalID;

      list(`/LabTest/PatientLabtestsbyVisit/${val}/X-Ray`)
        .then((response) => {
          this.setState({ xray: true });
        })
        .catch((error) => {
          this.setState({ xray: false });
          // console.log(error);
          // alert(error.message);
        });

      list(
        `/LabTest/PatientLabtestsbyType/CT Scan/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ ctscan: true });
        })
        .catch((error) => {
          this.setState({ ctscan: false });
          // console.log(error);
          // alert(error.message);
        });

      list(
        `/LabTest/PatientLabtestsbyType/MRI/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ mri: true });
        })
        .catch((error) => {
          this.setState({ mri: false });
          // console.log(error);
          // alert(error.message);
        });

      list(
        `/LabTest/PatientLabtestsbyType/Lab Test/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ bloodtest: true });
        })
        .catch((error) => {
          this.setState({ bloodtest: false });
          // console.log(error);
          // alert(error.message);
        });

      list(
        `/LabTest/PatientLabtestsbyType/Ultrasound/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ ultrasound: true });
        })
        .catch((error) => {
          this.setState({ ultrasound: false });
        });

      list(
        `/LabTest/PatientLabtestsbyType/Other/${response.data.patient_NationalID}`
      )
        .then((response) => {
          this.setState({ others: true });
        })
        .catch((error) => {
          this.setState({ others: false });
        });
    });

    list(`patient/visitById/${val}`).then((response) => {
      pid = response.data[0].patient_NationalID;
      // alert(response.data[0].patient_NationalID);
    });

    list(`LabTest/visitsLabtests/${val}`)
      .then((response) => {
        this.setState({ images: response.data, viewFileUploadModal: true });
      })
      .catch((error) => {
        toast.info("No Record Found");
        // alert(error.message);
      });
  };

  getSpecificFiles(choice) {
    // alert(pid);
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
  move(val) {
    list(`patient/patientStats/${this.state.pid}`).then((response) => {
      this.setState({ count: response.data.patientmetadata.totalVisits });
    });
    setTimeout(() => {
      // alert(this.state.pid);
      //  alert(this.state.count);
      if (this.state.count == 1) {
        // alert(this.state.count)
        this.props.history.push(`/AddHistory/${val}`);
      } else {
        this.props.history.push(`/EditHistory/${val}`);
      }
    }, 1000);
  }

  reportType(event) {
    // alert(event.target.value);

    this.setState({ description: event.target.value });
    //  alert(type);
  }
  addHistory(val) {
    list(`patient/visitById/${val}`).then((response) => {
      pid = response.data[0].patient_NationalID;
    });

    setTimeout(() => {
      this.move(val);
    }, 1000);
  }
  render() {
    let {
      image,
      modalPatientFileUpload,
      viewFileUploadModal,
      viewModal,
      requestData,
      search,
      pagination,
      rowData: { paginationMetadata },
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
          title="Upload Imaging / Lab Reports"
          name="modalPatientFileUpload"
          content={
            <div>
              <React.Fragment>
                <div className="col-sm-12">
                  <img src={image.url} style={{ maxHeight: "300px" }} />
                  <h4>{image.name}</h4>
                  <p>{image.url}</p>
                </div>
                <div className="col-sm-12" style={{ overflow: "hidden" }}>
                  <input
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={this.handleFileChange}
                  />
                  {/* <input id="file-input" type="file" onChange={this.onChange} /> */}
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
          title="Imaging / Lab Reports"
          name="viewFileUploadModal"
          content={
            <div className="col-md-12 px-3 py-3 border">
              {this.state.xray ? (
                <div>
                  <div class="row ">
                    <div class="col-md-9">X-Ray's</div>
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
                    <div class="col-md-9">CT Scan's</div>
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
                    <div class="col-md-9">MRI's</div>
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
                    <div class="col-md-9">Lab Test's</div>
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
                    <div class="col-md-9">Ultrasound's</div>
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
                    <div class="col-md-9">Other's</div>
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
                <h5> No Imaging / Lab Reports Available </h5>
              ) : null}
              {/* <div class="row">
     <div class="col-md-9"} >
           Ultrasound
           </div>
<div class="col-md-3"   style={{ width:"25px", height:"25px",cursor:'pointer' }}>
<img  onClick={this.getSpecificFiles("Ultrasound")}  defaultThumbnailWidth="25px" defaultThumbnailHeight="25px"   src="avatars/ultrasound.png" />
</div>
   </div>
    */}
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
          show={viewModal}
          width="500px"
          height="1000px"
          title={choiceValue + " Imaging / Lab Reports"}
          name="viewModal"
          content={<ModalCarousel images={this.state.images} />}
        />
        <div className="d-flex justify-content-between">
          <h4 className="col-md-10 m-0">My Appointments</h4>
          <div className="d-flex justify-content-end">
            <div className="text-right">
              <div
                style={{ borderRadius: "1rem" }}
                className="cc-btn px-2 py-2 col-md-12  w-100 border-0 shadow  float-right"
              >
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

              <button className="btn btn-md mx-1">
                <span className="material-icons align-middle">
                  <Search
                    onClick={() => {
                      this.setState({ search: true }, () => {
                        this.searchField.current.focus();
                      });
                    }}
                  />
                </span>
              </button>

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
        </div>
        <NoPrint>
          {!search ? (
            <div>
              <h5 className="font-weight-light"></h5>
            </div>
          ) : (
            <div>
              <button className="btn btn-md mx-1">
                <span className="material-icons align-middle">
                  <Close
                    onClick={() => {
                      requestData["QuerySearch"] = "";
                      this.setState({ search: false, requestData });
                      this.handleSearchClick(requestData, this.$class);
                    }}
                  />
                </span>
              </button>
              <button className="btn btn-md mx-1">
                <span>
                  <input
                    aria-invalid="false"
                    type="text"
                    ref={this.searchField}
                    aria-label="Search"
                    className="MuiInputBase-input MuiInput-input"
                    value={requestData["QuerySearch"]}
                    onChange={(e) => {
                      requestData["QuerySearch"] = e.target.value;
                      this.setState({ requestData });
                    }}
                    style={{
                      border: "none",
                      borderBottom: "2PX solid rgb(31 134 219)",
                      width: "15rem",
                      background: "none",
                    }}
                  />
                </span>
              </button>
              <button
                className="startMeeting btn btn-sm btn-primary border-0 px-3"
                onClick={() => {
                  this.handleSearchClick(requestData, this.$class);
                }}
              >
                <span>Search</span>
              </button>
            </div>
          )}
        </NoPrint>

        <div className="tableWrapper">
          {role == "Admin" ? (
            <Print>
              <NewAppointmentCardAdmin
                title="My Appointments"
                data={this.state.rowData}
                click={this.addHistory}
                uploadVitalSigns={this.showGuide}
                uploadDocuments={this.create}
                getDocuments={this.getUploadedFiles}
                setConfirm={this.setConfirm}
                showAge="false"
              />
            </Print>
          ) : null}
          {role == "Physician" ? (
            <Print>
              <NewAppointmentCardPhysician
                // title={Translate("MY_APPOINTMENTS")}
                data={this.state.rowData}
                click={this.addHistory}
                uploadVitalSigns={this.showGuide}
                uploadDocuments={this.create}
                getDocuments={this.getUploadedFiles}
                setConfirm={this.setConfirm}
                showAge="false"
              />
            </Print>
          ) : null}
          <div className="row float-right pr-5 mt-3 pb-5">
            <label
              htmlFor="exampleFoFrmControlSelect1"
              className="pt-1 pr-2 m-0"
            >
              Rows per page:{" "}
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
