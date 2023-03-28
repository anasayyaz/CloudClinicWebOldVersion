import React from "react";
import "moment-timezone";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import list, { put, post } from "../../_helper/api";
import PaginationTable from "../Components/PaginationTable";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Radio from "@material-ui/core/Radio";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RadioGroup from "@material-ui/core/RadioGroup";
import PopUp from "../Components/PopUp";
import ModalCarousel from "../Components/ModalCarousel";
import TextField from "@material-ui/core/TextField";
import NewAppointmentCard from "./NewAppointmentCard";
let selectedValue = null;
let pid;
let choiceValue;
export default class UpcomingVisits extends React.Component {
  constructor(props) {
    super(props);
    this.requestData = {
      pageNumber: 1,
      pageSize: 10,
      QuerySearch: "",
    };

    this.state = {
      description: "",
      otherdescription: "",
      image: {},
      modalPatientFileUpload: false,
      viewFileUploadModal: false,
      viewModal: false,
      Status: "",
      requestData: this.requestData,
      columnsConsultant: [
        {
          label: "Timing",
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
          label: "Doctor Name / ID",
          name: "doctorName",
          sortable: true,
          filter: true,
        },
        {
          label: "Intake History",
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
          label: "Imaging / Lab Reports",
          name: "id",
          button: {
            show: true,
            value: "Edit",
            icon: PostAddIcon,
            operation: (val) => this.create(val),
          },
        },
        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "View Imaging / Lab Reports",
            operation: (val) => this.getUploadedFiles(val),
          },
        },
        {
          label: "ID",
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "Start Meeting",
            operation: (val) => this.start(val),
            disabled: true,
          },
        },
      ],
      rowSelectionConsultant: "single",
      rowDataConsultant: [],
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
    list(`/patient/patientsUpcomingVisits/${userId}`)
      .then((response) => {
        $class.setState({ rowDataConsultant: response.data });
      })
      .catch((error) => {
        toast.error("record not found");
      });
  }
  componentDidMount() {
    this.handleSearchClick(null, this);
  }
  start(val) {
    list(`visit/${val}`).then((response) => {
      this.props.history.push(`/PatientMeeting/${val}`);
    });
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
  create(val) {
    this.setState({ modalPatientFileUpload: true, id: val });
    this.state.image.url = null;
    this.state.image.name = null;
    this.state.description = null;
    this.state.otherdescription = null;
    selectedValue = null;
  }
  createUpload() {
    let { image } = this.state;
    let formData = new FormData();
    formData.append("body", image.file, image.name);
    console.log("formData", formData, image);
    post("UploadFile", formData).then(() => {
      this.SaveImageData();
    });
    this.showUpload();
  }

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
  addHistory(val) {
    list(`patient/visitById/${val}`).then((response) => {
      this.setState({ pid: response.data[0].patient_NationalID });
    });

    setTimeout(() => {
      this.move(val);
    }, 1000);
    //           alert(this.state.count);
    //  console.log(this.state.rData);
  }
  SaveImageData() {
    let { image, rowData, visitId } = this.state;

    list(`visit/${this.state.id}`).then((response) => {
      pid = response.data.patient_NationalID;
    });
    //  alert(this.state.description);

    // alert(this.state.otherdescription);

    if (this.state.description == "Other") {
      this.setState({ description: this.state.otherdescription });
    }
    setTimeout(() => {}, 1000);

    //  alert(this.state.description);

    // alert(this.state.otherdescription);
    //             alert(this.state.id);
    // alert(this.state.pid);
    post("LabTest", {
      isDeleted: false,
      imagePath: image.name,
      imageName: image.name,
      visitId: this.state.id,
      patientId: this.state.pid,
      description: this.state.description,
    }).then((response) => {
      this.setState({ modalPatientFileUpload: false });
    });
  }
  getUploadedFiles = (id) => {
    list(`patient/visitById/${id}`).then((response) => {
      pid = response.data[0].patient_NationalID;
      // alert(response.data[0].patient_NationalID);
    });
    list(`LabTest/visitsLabtests/${id}`)
      .then((response) => {
        this.setState({ images: response.data, viewFileUploadModal: true });
      })
      .catch((error) => {
        console.log(error);
        toast.info("Record not found");
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
  showUpload() {
    toast.info("Document Uploaded successfully!");
  }
  handleChange(event) {
    // alert(event.target.value);

    selectedValue = event.target.value;
  }

  reportType(event) {
    // alert(event.target.value);

    this.setState({ description: event.target.value });
    //  alert(type);
  }
  handleOtherChange(event) {
    // alert(event.target.value);

    this.setState({ otherdescription: event.target.value });
  }
  render() {
    let { image, modalPatientFileUpload, viewFileUploadModal, viewModal } =
      this.state;
    return (
      <div>
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
              className: "btn btn-primary",
              action: "createUpload",
            },
          ]}
          show={modalPatientFileUpload}
          width="750px"
          title="Upload Files"
          name="modalPatientFileUpload"
          content={
            <div>
              <ToastContainer />
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
                </div>
              </React.Fragment>
              <div className="col-sm-12" style={{ paddingTop: "15px" }}>
                {/* <textarea
                                            className="form-control border-0"
                                            rows={5}
                                            name="description"
                                            value={this.state.description}
                                            onChange={(e) => { this.handleChange(e) }}
                                        /> */}

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
            <div className="col-md-12">
              <hr></hr>
              <div class="row">
                <div class="col-md-9">X-Ray</div>
                <div
                  class="col-md-3"
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
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
              <hr></hr>
              <div class="row">
                <div class="col-md-9">CT Scan</div>
                <div
                  class="col-md-3"
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
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
              <hr></hr>
              <div class="row">
                <div class="col-md-9">MRI</div>
                <div
                  class="col-md-3"
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
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
              <hr></hr>
              <div class="row">
                <div class="col-md-9">Lab Test</div>
                <div
                  class="col-md-3"
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
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
              <hr></hr>
              <div class="row">
                <div class="col-md-9">Ultrasound</div>
                <div
                  class="col-md-3"
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
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
              <hr></hr>
              <div class="row">
                <div class="col-md-9">Other</div>
                <div
                  class="col-md-3"
                  style={{ width: "25px", height: "25px", cursor: "pointer" }}
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
              <hr></hr>
              {/* <div class="row">  
     <div class="col-md-9"  >   
           Ultrasound
           </div>
<div class="col-md-3"   style={{ width:"25px", height:"25px",cursor:'pointer' }}>  
<img  onClick={this.getSpecificFiles("Ultrasound")}  defaultThumbnailWidth="25px" defaultThumbnailHeight="25px"   src="avatars/ultrasound.png" />
</div>
   </div>
   <hr></hr> */}
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
        <div className="tableWrapper">
          {/* <PaginationTable
                        title="My Appointments"
                        columns={this.state.columnsConsultant}
                        data={this.state.rowDataConsultant}
                        options={this.options}
                        onSelectionChanged={this.onSelectionChangedConsultant}
                        rowSelection={this.rowSelectionConsultant}
                        $class={this}
                        handleSearchClick={this.handleSearchClick}
                        requestData={this.state.requestData}
                    /> */}
          <NewAppointmentCard
            title="My Appointments"
            data={this.state.rowDataConsultant}
            click={this.addHistory}
            uploadVitalSigns={this.showGuide}
            uploadDocuments={this.create}
            getDocuments={this.getUploadedFiles}
            showAge="false"
          />
        </div>
      </div>
    );
  }
}
