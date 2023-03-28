import React from "react";
import "./styles.css";
import list from "../../_helper/api";
import "./ccstyles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Col, Row, Table } from "react-bootstrap";
import ConsultantPrescriptionData from "./ConsultantPrescriptionData";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

export default class Medicine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      show: false,
      vid: "",
      pid: "",
      cid: "",
    };
  }
  componentDidMount(request, $class) {
    let requestData = request ? request : this.state.requestData;
    let userId = JSON.parse(localStorage.getItem("user"));

    list(`prescription/PrescriptionByUser/${userId}`, requestData)
      .then((response) => {
        let rows = [];
        this.setState({ vid: response.data[0].visitID });
        this.setState({ pid: response.data[0].patient_NationalID });
        this.setState({ cid: response.data[0].consultant_NationalID });

        //  alert(vid)
        //   alert(pid)
        //   alert(cid)

        response.data.map((row) => {
          rows.push(
            this.createData(
              row.physicianName,
              row.medicineName,
              row.medicineForm,
              row.medicineDosage,
              row.refilDetails,
              row.dosageInstruction
            )
          );
        });
        this.setState({ rows });
        this.setState({ show: true });
      })
      .catch((err) => toast.error("No Medicines prescribed"));

    setTimeout(() => {}, 1000);
  }
  createData(
    physicianName,
    medicineName,
    medicineForm,
    medicineDosage,
    refilDetails,
    dosageInstruction
  ) {
    return {
      physicianName,
      medicineName,
      medicineForm,
      medicineDosage,
      refilDetails,
      dosageInstruction,
    };
  }
  render() {
    let { rows } = this.state;
    return (
      <div className="container px-4 col-12 m-0 pt-4 h-100 overflow-auto">
        <ToastContainer />
        {this.state.show ? (
          <>
            
          

            <ConsultantPrescriptionData
              visitID={this.state.vid}
              patientID={this.state.pid}
              consultantID={this.state.cid}
            />
          </>
        ) : null}
      </div>
    );
  }
}
