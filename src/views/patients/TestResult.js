import React from "react";
import "./styles.css";
import "./ccstyles.css";
import TranslationContext from "../../context/translation";
import list, { put, post } from "../../_helper/api";
import ModalC from "../Components/ModalC";
import Delay from "react-delay-render";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
let selectedValue = null,
  userId;
let result,
  val = false;

export default class TestResult extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      pid: "",
      image: {},
    };
  }
  componentDidMount(request, $class) {
    let requestData = request ? request : this.state.requestData;
    userId = JSON.parse(localStorage.getItem("user"));

    list(`LabTest/LabtestsbyUser/${userId}`).then((response) => {
      this.setState({ images: response.data });
    });

    //        list(`prescription/PrescriptionByUser/${userId}`, requestData).then((response) => {
    //            let result = response.data.map(({ patient_NationalID }) => patient_NationalID)
    //             this.setState({

    //  pid:result[0]
    //             })

    //         })

    setTimeout(() => {
      val = true;
    }, 2000);
  }

  create(val) {
    this.setState({ modalPatientFileUpload: true, id: val });
    this.state.image.url = null;
    this.state.image.name = null;
    this.state.description = null;
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

  render() {
    const { translate } = this.context;
    return (
      <div className="border py-3 px-3 card">
        <p className="m-0 cc-page-title text-uppercase mb-3 ">
          {translate("IMAGE_LAB_REPORTS")}
        </p>
        <hr></hr>
        <ModalC images={this.state.images} />
      </div>
    );
  }
}
