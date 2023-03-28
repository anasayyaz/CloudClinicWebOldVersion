import React, { useEffect, useState, createRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import list, { put, post } from "../../_helper/api";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Radio from "@material-ui/core/Radio";
import { timers } from "jquery";
import moment from "moment";
import TranslationContext from "../../context/translation";
let filesubmitname, imageName;
let selectedValue = null;
let pid;
let choiceValue;
let descriptionType;
export default class UploadImages extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);

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
      image: {},
    };
  }

  handleChange(event) {
    selectedValue = event.target.value;
  }

  handleOtherChange(event) {
    this.setState({ otherdescription: event.target.value });
  }
  reportType(event) {
    this.setState({ description: event.target.value });
  }

  handleFileChange = (input) => {
    filesubmitname = input.target.files?.[0];
    const file = input.target.files?.[0];
    let { image } = this.state;
    var date = new Date();
    date.setHours(date.getHours() + 5);

    if (file) {
      let n = file.name.lastIndexOf(".");
      let filename = file.name.substring(n + 1);
  

      image = {
        name: `${date.getTime() + "." + filename
  }`,
        file,
        url: URL.createObjectURL(file),
      };
      this.setState({ image });
    }
  };
  showGuide() {
    toast.info("Kindly Upload Vital Signs Using Tablet!");
  }
  showUpload() {
    toast.info("Document Uploaded successfully!");
  }
  componentDidMount = () => {};

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
    var date = new Date();
    date.setHours(date.getHours() + 5);
    var time = date.toISOString();

    let { image, rowData, visitId } = this.state;

    list(`visit/${this.props.id}`).then((response) => {
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
        CreatedOn: moment.parseZone(time).format(),
        isDeleted: false,
        imagePath: imageName,
        imageName: imageName,
        visitId: this.props.id,
        patient_NationalID: pid,
        type: descriptionType,
        description: this.state.description,
      }).then((response) => {
        this.setState({ modalPatientFileUpload: false });
      });
    }, 3000);
    // this.props.closeAll();
  };
  render() {
    const { translate } = this.context;
    let { image } = this.state;
    return (
      <>
        <ToastContainer />
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
              {translate("X_RAY")}
              <Radio
                type="radio"
                color="default"
                onChange={this.handleChange}
                checked={selectedValue === "CT Scan"}
                value="CT Scan"
                name="Report Type"
              />{" "}
              {translate("CT_SCAN")}
              <Radio
                type="radio"
                color="default"
                onChange={this.handleChange}
                checked={selectedValue === "MRI"}
                value="MRI"
                name="Report Type"
              />{" "}
              {translate("MRI")}
              <Radio
                type="radio"
                color="default"
                onChange={this.handleChange}
                checked={selectedValue === "Lab Test"}
                value="Lab Test"
                name="Report Type"
              />{" "}
              {translate("LAB_TEST")}
              <Radio
                type="radio"
                color="default"
                onChange={this.handleChange}
                checked={selectedValue === "Ultrasound"}
                value="Ultrasound"
                name="Report Type"
              />{" "}
              {translate("ULTRASOUND")}
              <Radio
                type="radio"
                color="default"
                onChange={this.handleChange}
                checked={selectedValue === "Other"}
                value="Other"
                name="Report Type"
              />{" "}
              {translate("OTHER")}
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
        <div
          class="row px-2 mt-1 d-flex justify-content-end"
          style={{ padding: "20px" }}
        >
         {/* <div class="col-md-4 px-1 ">
            <button
              onClick={() => {
                this.props.openQr(true);
              }}
              class="w-100 border-0 shadow btn btn-primary cc-btn"
            >
              {"Upload by QR code"}
            </button>
          </div> */}
          <div class="col-md-2 px-1 ">
            <button
              onClick={() => {
                this.createUpload(this.props.id);
              }}
              class="w-100 border-0 shadow btn btn-primary cc-btn"
            >
              {translate("UPLOAD")}
            </button>
          </div>
        </div>
      </>
    );
  }
}
