import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
import PopUp from "../Components/PopUp";
import list from "../../_helper/api";
import PaginationTable from "../Components/PaginationTable";
import { Edit } from "@material-ui/icons";
import UpdateInvoice from "./UpdateInvoice";
import Modal from "react-modal";
import TranslationContext from "../../context/translation";



const customStylesECG = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "580px",
    width: "730px",
    marginRight: "-50%",
    zIndex: 999,
    transform: "translate(-50%, -50%)",
  },
};


export default class InvoiceList extends React.Component {
  static contextType = TranslationContext;
  constructor(props,context) {
    super(props,context);
    this.requestData = {
      pageNumber: 1,
      pageSize: 10,
      QuerySearch: "",
    };
    this.state = {
      requestData: this.requestData,
      invoiceModal: false,
      invoiceID: "",
      language: this.context.language,
      columns: [
        {
          label: this.context.translate("PATIENT_NAME"),
          name: "patientName",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("PHYSICIAN"),
          name: "consultantName",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("VISIT_DATE_TIME"),
          name: "startDateTime",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("NOTES"),
          name: "notes",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("INVOICE_STATUS"),
          name: "invoiceStatus",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("ID"),
          hide: true,
          name: "id",
          button: {
            show: true,
            value: "Edit",
            operation: (val) =>
              this.setState({ invoiceModal: true, invoiceID: val }),
            icon: Edit,
          },
        },
      ],
      rowSelection: "single",
      rowData: [],
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ invoiceModal: true });
  };

  hideModal = () => {
    this.setState({ invoiceModal: false });
  };

  options = {
    filterType: "checkbox",
    selectableRows: false,
    responsive: "vertical",
  };

  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push(
      "/EditPhysician?.Physician=" + selectedRows[0].nationalID
    );
  };

  handleSearch(request, $class) {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    });
  }
  handleSearchClick(request, $class) {
    let requestData = request ? request : this.state.requestData;
    list("Visit/InvoiceVisitsList", requestData).then((response) => {
      $class.setState({ rowData: response.data });
    });
  }
  componentDidMount() {
    this.handleSearchClick(null, this);
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.language !== this.context.language) {
      this.setState({
        language: this.context.language,
        columns: [
          
          {
            label: this.context.translate("PATIENT_NAME"),
            name: "patientName",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("PHYSICIAN"),
            name: "consultantName",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("VISIT_DATE_TIME"),
            name: "startDateTime",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("NOTES"),
            name: "notes",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("INVOICE_STATUS"),
            name: "invoiceStatus",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("ID"),
            hide: true,
            name: "id",
            button: {
              show: true,
              value: "Edit",
              operation: (val) =>
                this.setState({ invoiceModal: true, invoiceID: val }),
              icon: Edit,
            },
          },
          
        ],
      });
    }
  };

  render() {
    const { translate } = this.context;
    let { requestData } = this.state;
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.invoiceModal}
          onRequestClose={this.hideModal}
          style={customStylesECG}
          contentLabel="Example Modal"
        >
          <UpdateInvoice visitID={this.state.invoiceID} />
        </Modal>

        <div className="tableWrapper">
          <div
            style={{
              marginTop: "0px",
              marginBottom: "20px",
              textAlign: "right",
            }}
          >
            <div class={`collapse`} id="invoiceCollapse">
              <p className="m-0 text-white">...</p>
              <div class="card card-body bg-light">
              </div>
            </div>
          </div>
          <PaginationTable
            title={translate("INVOICE_LIST")}
            columns={this.state.columns}
            data={this.state.rowData}
            options={this.options}
            onSelectionChanged={this.onSelectionChanged}
            rowSelection={this.rowSelection}
            $class={this}
            search={true}
            handleSearchClick={this.handleSearchClick}
            requestData={requestData}
          />
        </div>
      </React.Fragment>
    );
  }
}
