import React, { useEffect, useState, createRef } from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
import "./style.css";
import list from "../../_helper/api";

export default class Histories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          label: "Name",
          name: "patient",
          sortable: true,
          filter: true,
        },
        {
          label: "Current Medications",
          name: "currentMedications",
          sortable: true,
          filter: true,
        },

        {
          label: "Allergies",
          name: "allergies",
          sortable: true,
          filter: true,
        },
        {
          label: "Immunization",
          name: "immunization",
          sortable: true,
          filter: true,
        },
        {
          label: "Childhood Illness",
          name: "childhoodillness",
          sortable: true,
          filter: true,
        }, {
          label: "Blood Transfusion",
          name: "bloodtransfusion",
          sortable: true,
          filter: true,
        }, {
          label: "Smoking",
          name: "smoking",
          sortable: true,
          filter: true,
        }, {
          label: "Drinking",
          name: "drinking",
          sortable: true,
          filter: true,
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
  componentDidMount() {
    list("history/historyList").then((response)=>{
      this.setState({rowData:response.data})
    })
  }

  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
  };

  render() {
    return (
      <div className="tableWrapper">
        <div style={{ marginTop: "0px", marginBottom: "20px", textAlign: "right" }}>
          <NavLink
            className="viewButton"
            to={`/AddHistory`} > Add New History
               </NavLink>
        </div>
        <MUIDataTable
          title="Histories"
          columns={this.state.columns}
          data={this.state.rowData}
          options={this.options}
          onSelectionChanged={this.onSelectionChanged}
          rowSelection={this.rowSelection}
        />
      </div>
    );
  }
}


