import React from "react";
import { NavLink } from "react-router-dom";
// import "./style.css";
import "moment-timezone";
import list, { put } from "../../_helper/api";
import { connect } from "react-redux";
import { parseJwt, formatDate } from "../../_helper/functions";
import PaginationTable from "../Components/PaginationTable";
import { Edit, Translate } from "@material-ui/icons";
import { Alert, AlertTitle, Pagination } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { val } from "@arction/lcjs";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import PopUp from '../Components/PopUp';
import EditLocation from './EditLocation';
import TranslationContext from "../../context/translation";

let id;
class Locations extends React.Component {
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
          label: this.context.translate("LOCATION"),
          name: "name",
          sortable: true,
          filter: true,
        },
       
        {
          label: this.context.translate("ADDRESS"),
          name: "address",
          sortable: true,
          filter: true,
        },
        {
          label: this.context.translate("ID"),
          hide: true,
          name: "locationID",
          button: {
            show: true,
            value: "Edit",
            operation: (val) => this.props.history.push(`/EditLocation/${val}`),
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
    console.log(requestData);
    list(`/location`,requestData).then((response) => {
   
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
            label: this.context.translate("LOCATION"),
            name: "name",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("ADDRESS"),
            name: "address",
            sortable: true,
            filter: true,
          },
          {
            label: this.context.translate("ID"),
            hide: true,
            name: "locationID",
            button: {
              show: true,
              value: "Edit",
              operation: (val) => this.props.history.push(`/EditLocation/${val}`),
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
    data = data?.items?.map((row) => {
      row.ImgPath = "https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.nbcnews-ux-2880-1000.jpg";
      return row;
    });
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
            to={`/AddLocation`}
          >
            {" "}
            {translate("ADD_NEW_LOCATION")}
          </NavLink>
        </div>
        <div>
          <div className="tableWrapper">
            <PaginationTable
              title={translate("LOCATION_LIST")}
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

export default connect(mapStateToProps, null)(Locations);
