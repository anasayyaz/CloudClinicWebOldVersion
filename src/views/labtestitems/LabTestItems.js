import React from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
import "./style.css";
import list from "../../_helper/api";
import PaginationLabTestItem from '../Components/PaginationLabTestItem';
import { Edit } from '@material-ui/icons';
import DataTable, { createTheme } from 'react-data-table-component';
import TranslationContext from "../../context/translation";

createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});
export default class LabTestItems extends React.Component {
  static contextType = TranslationContext;
  constructor(prop, context) {
    super(prop, context);
    this.requestData = {
      pageNumber: 1,
      pageSize: 1000,
      QuerySearch: ""
    }
    this.state = {
      requestData: this.requestData,
      language: this.context.language,
      columns: [

        // {
        //   label: this.context.translate("MEDICINE_ID"),
        //   name: "labTestTypeID",
        //   sortable: true,
        //   filter: true,
        //   options: {
        //     customBodyRender: (val) => (
        //       <NavLink className="NavLink" to={`/EditMedicine?Medicine=${val}`}>
        //         {val}
        //       </NavLink>
        //     ),
        //   },
        // },
        {
          label: "ID",
          name: "labTestTypeID",
          sortable: true,
          filter: true,
        },

        {
          label: "Test",
          name: "test",
          sortable: true,
          filter: true,
        },
        {
          label: "Code",
          name: "code",
          sortable: true,
          filter: true,
        },
        {
          label: "Type",
          name: "type",
          sortable: true,
          filter: true,
        },
        {
          label: "Category",
          name: "category",
          sortable: true,
          filter: true,
        },
        {
          label: "Rate",
          name: "rate",
          sortable: true,
          filter: true,
        },
        // {
        //   label: this.context.translate("ID"),
        //   hide:true,
        //   name: "labTestTypeID",
        //   button:{show:true, value:'Edit', operation: (val) => (this.props.history.push(`/EditMedicine/${val}`)), icon:Edit},
        // },

      ],
      rowSelection: "single",
      rowData: [],
    };
  }
  options = {
    filterType: "checkbox", selectableRows: false,
    responsive: "vertical",
  };

  onSelectionChanged = () => {
    var selectedRows = this.gridApi.getSelectedRows();
    this.props.history.push(
      "/EditMedicine?.Medicine=" + selectedRows[0].nationalID
    );
  };

  handleSearch(request, $class) {
    $class.setState({ requestData: request }, () => {
      $class.handleSearchClick();
    })
  }
  handleSearchClick(request, $class) {

    let requestData = request ? request : this.state.requestData;
    list("LabTestType/LabTestList", requestData).then((response) => {
      $class.setState({ rowData: response.data })

    })

  }
  componentDidMount() {
    this.handleSearchClick(null, this);

  }


  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.language !== this.context.language) {
      this.setState({
        language: this.context.language,
        columns: [

          // {
          //   label: this.context.translate("MEDICINE_ID"),
          //   name: "labTestTypeID",
          //   sortable: true,
          //   filter: true,
          //   options: {
          //     customBodyRender: (val) => (
          //       <NavLink className="NavLink" to={`/EditMedicine?Medicine=${val}`}>
          //         {val}
          //       </NavLink>
          //     ),
          //   },
          // },
          {
            label: "ID",
            name: "labTestTypeID",
            sortable: true,
            filter: true,
          },

          {
            label: "Test",
            name: "test",
            sortable: true,
            filter: true,
          },
          {
            label: "Code",
            name: "code",
            sortable: true,
            filter: true,
          },
          {
            label: "Type",
            name: "type",
            sortable: true,
            filter: true,
          },
          {
            label: "Category",
            name: "category",
            sortable: true,
            filter: true,
          },
          {
            label: "Rate",
            name: "rate",
            sortable: true,
            filter: true,
          },
          // {
          //   label: this.context.translate("ID"),
          //   hide:true,
          //   name: "labTestTypeID",
          //   button:{show:true, value:'Edit', operation: (val) => (this.props.history.push(`/EditMedicine/${val}`)), icon:Edit},
          // },

        ],
      });
    }
  };

  render() {
    const { translate } = this.context;
    return (
      <div className="tableWrapper">
        <div style={{ marginTop: "0px", marginBottom: "20px", textAlign: "right" }}>
          {/* <NavLink
             className="col-md-2 px-1 w-100 border-0 shadow btn btn-md cc-btn"
            to={`/AddMedicine`} > {translate("ADD_NEW_MEDICINE")}
              </NavLink> */}
        </div>
        <PaginationLabTestItem
          title={"Lab Tests"}
          columns={this.state.columns}
          data={this.state.rowData}
          options={this.options}
          onSelectionChanged={this.onSelectionChangedConsultant}
          rowSelection={this.rowSelectionConsultant}
          $class={this}
          search={true}
          handleSearchClick={this.handleSearchClick}
          requestData={this.state.requestData}
        />

      </div>
    );
  }
}
