import React from "react";
import { NavLink } from "react-router-dom";
import "moment-timezone";
import list from "../../_helper/api";
import { connect } from "react-redux";
import PaginationTable from "../Components/PaginationTable";
import { Edit } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

import TranslationContext from "../../context/translation";


class Wards extends React.Component {
  static contextType = TranslationContext;
  constructor(props,context) {
    
    super(props,context);
    this.requestData = {
      pageNumber: 1,
      pageSize: 10,
      QuerySearch: "",
    };
    this.alert = {
      open: false,
      severity: "success",
      message: "",
      title: "success",
    };
    this.state = {
      requestData: this.requestData,
      alert: this.alert,
      viewEdit:false,
      language: this.context.language,

      columns: [
        
        {
          label: this.context.translate("WARD"),
          name: "name",
          sortable: true,
          filter: true,
        },
       
        {
          label: this.context.translate("TYPE"),
          name: "type",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("ID"),
          hide: true,
          name: "wardID",
          button: {
            show: true,
            value: "Edit",
            operation: (val) => this.props.history.push(`/EditWard/${val}`),
            icon: Edit,
          },
        },
      
       
      
      ],
      rowSelection: "single",
      rowData: [],
    };
    this.handleSearchClick(null, this);
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
   
  
    list(`ward`,requestData).then((response) => {
   
      let items = [];
      items = response?.data?.map((item) => {
       
        return item;
      });
      response.data.items = items;
      $class.setState({ rowData: response.data });
    });
  }

 close()
{
  this.setState({viewEdit:false});
}

  handleClose() {
    let { alert } = this.state;
    alert.open = false;
    this.setState({ alert });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.language !== this.context.language) {
      this.setState({
        language: this.context.language,
        columns: [
          
          {
            label: this.context.translate("WARD"),
            name: "name",
            sortable: true,
            filter: true,
          },
         
          {
            label: this.context.translate("TYPE"),
            name: "type",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("ID"),
            hide: true,
            name: "wardID",
            button: {
              show: true,
              value: "Edit",
              operation: (val) => this.props.history.push(`/EditWard/${val}`),
              icon: Edit,
            },
          },
          
        ],
      });
    }
  };

  render() {
    const { translate } = this.context;
    let { requestData, columns, rowData, alert ,data,viewEdit} = this.state;
   
    return (
      <div className="tableWrapper">
        
        <Snackbar
          open={alert.open}
                           autoHideDuration={2000}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={() => {
            this.handleClose();
          }}
        >
          <Alert
            onClose={() => {
              this.handleClose();
            }}
            severity={alert.severity}
          >
            <AlertTitle>{alert.title}</AlertTitle>
            <strong>{alert.message}</strong>
          </Alert>
        </Snackbar>
        <div
          style={{ marginTop: "0px", marginBottom: "20px", textAlign: "right" }}
        >
          <NavLink
            className="col-md-2 px-1 w-100 border-0 shadow btn btn-md cc-btn"
            to={`/AddWard`}
          >
            {" "}
            {translate("ADD_NEW_WARD")}
          </NavLink>
        </div>
        <div>
          <div className="tableWrapper">
            <PaginationTable
              title={translate("WARDS")}
              columns={columns}
              data={rowData}
              options={this.options}
              onSelectionChanged={this.onSelectionChanged}
              rowSelection={this.rowSelection}
              $class={this}
              search={true}
              handleSearchClick={this.handleSearchClick}
              requestData={requestData}
         
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, null)(Wards);
