import React, { useEffect, useState, createRef } from "react";
import MUIDataTable from "mui-datatables";
import { Link, NavLink } from "react-router-dom";
import "./style.css";
import { Button } from "react-bootstrap";
import { ServerImagePath } from "../../utils/constants";
import list from "../../_helper/api";
import TranslationContext from "../../context/translation";
import { Translate } from "@material-ui/icons";

export default class ViewPatientsDocuments extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Image Name",
          name: "imageName",
        },
        {
          label: "Image",
          name: "imageName",
          options: {
            customBodyRender: (val) => (
              <img
                src={ServerImagePath + "/" + val}
                alt=""
                style={{ width: "100px" }}
                onClick={() => window.open(ServerImagePath + "/" + val)}
              />
            ),
          },
        },
      ],
      rowSelection: "single",
      rowData: [],
    };
  }
  options = {
    filterType: "checkbox", selectableRows: false,
    responsive: "vertical",
  };

  handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response;
  }
  componentDidMount() {
    list(`LabTest/visitLabTest/${this.props.match.params.id}`).then((response)=>{
      if (typeof response.data == typeof "abc") {
      } else {
        this.setState({ rowData : response.data });
      }
    })
  }
  componentDidUpdate() {
    list(`LabTest/visitLabTest/${this.props.match.params.id}`).then((response)=>{
      if (typeof response.data == typeof "abc") {
      } else {
        this.setState({ rowData : response.data });
      }
    })
  }
  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push(
      "/EditPatient?.Patient=" + selectedRows[0].nationalID
    );
  };

  render() {
    const { translate } = this.context;
    return (
      <div className="tableWrapper">
        <div style={{ marginTop: "0px", marginBottom: "20px", textAlign: "right" }}><NavLink
          className="viewButton"
          to={`/Fileuploading/${this.props.match.params.id}`}>
                             {Translate("ADD_DOCUMENTS")}
              </NavLink>
        </div>
        <div>
          <MUIDataTable
            title={translate("PATIENT_VISITS")}
            columns={this.state.columns}
            data={this.state.rowData}
            options={this.options}
            onSelectionChanged={this.onSelectionChanged}
            rowSelection={this.rowSelection}
          />
        </div>
      </div>
    );
  }
}
