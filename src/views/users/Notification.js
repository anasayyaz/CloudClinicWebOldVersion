import React from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from "react-router-dom";
import list, { put, del } from "../../_helper/api";
import NotificationTable from '../Components/NotificationTable';
import {Edit} from '@material-ui/icons';
import PopUp from '../Components/PopUp';
import TranslationContext from "../../context/translation";
import App from "../../App"
import Notifications from "../../components/Notifications/Notifications";
import { ToastContainer, toast } from "react-toastify";
export default class Notification extends React.Component {
  static contextType = TranslationContext;
  constructor(props,context) {
    super(props,context);
    this.requestData={
      pageNumber : 1,
      pageSize:10,
      QuerySearch:""
  }
    this.state = {
      bulkUploadModal:false,
      requestData : this.requestData,
      columns: [
     
        {
          label: "",
          name: "notificationtext",
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

 

  deleteNotification = () =>
  {
    toast.info("All notifications deleted!")
    let userId = JSON.parse(localStorage.getItem("user"));
 
    del(`notification/deleteAll/${userId}`).then((response) => {
      list(`notification/notificationList/${userId}/Web/ALL/?pageNumber=1&pageSize=10&QuerySearch=`).then((response) => {
        this.setState({ rowData: response.data })
      });
      
      this.props.setNotificationPopup();
      
    });
   
  }

  
  refreshNotification = () =>
  {
    
    let userId = JSON.parse(localStorage.getItem("user"));
 
    
    list(`notification/notificationList/${userId}/Web/ALL/?pageNumber=1&pageSize=10&QuerySearch=`).then((response) => {
      this.setState({ rowData: response.data })
      
    });
    
  }

 
  componentDidMount() {
    let userId = JSON.parse(localStorage.getItem("user"));
 
    
    list(`notification/notificationList/${userId}/Web/ALL/`,this.requestData).then((response) => {
      this.setState({ rowData: response.data })
      
    });
  }


  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.language !== this.context.language) {
      this.setState({
        language: this.context.language,
        columns: [
         
          {
            label: "",
            name: "notificationtext",
            sortable: true,
            filter: true,
          },
         
         
        ],
      });
    }
  };

  render() {
    const { translate } = this.context;
    let {requestData} = this.state;
    return (
      <div className="tableWrapper">
            <ToastContainer />
        {0  ? (
          <>
     <App refreshNotification={this.refreshNotification}  deleteNotification={this.deleteNotification}/>
      <Notifications refreshNotification={this.refreshNotification}  deleteNotification={this.deleteNotification}/>
      </>
        ) :null}
        <NotificationTable 
              setCountToZero={this.props.setCountToZero}
              refreshNotification={this.refreshNotification}
              deleteNotification={this.deleteNotification}
              columns={this.state.columns}
              data={this.state.rowData}
              options={this.options}
              rowSelection={this.rowSelection}
              $class={this}
              setNotificationPopup={this.props.setNotificationPopup}
              search={true}
              handleSearchClick={this.handleSearchClick}
              requestData={requestData}
            />
      </div>
    );
  }
}