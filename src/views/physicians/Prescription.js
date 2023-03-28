import React, { useEffect, useState, createRef } from 'react';
import dateFormat from 'dateformat';
import list, {put} from "../../_helper/api";
import { connect } from "react-redux";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from "@material-ui/core";


class PrescriptionPhysician extends React.Component {

  constructor(props) {
    super(props);
  
   
    this.state = {
     
    };

  }

  

  componentDidMount() {

    const queryString = require('query-string');
    list(`patient/${this.state.nationalID}`).then((response)=>{
      this.setState({
        nationalID: response.data.nationalID,
        name: response.data.name,
        address: response.data.address,
        dob: dateFormat(response.data.dob, 'mm/dd/yyyy'),
        gender: response.data.gender,
        phone: response.data.phone,
        guardianName: response.data.guardianName,
        guardianPhone: response.data.guardianPhone,
        IsDeleted: false
      })
    })
  }

 
 
  render() {
   
    return (
     <div>p physcian</div>
      
    );
  }
}

