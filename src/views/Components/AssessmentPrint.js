
import React, { useEffect, useState, createRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import list, {put, post} from "../../_helper/api";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

export default class EditVitalSigns extends React.Component {
  constructor(props) {
    super(props);
   
  
  
  }
  
 

 




  render() {

    
    return (

      <>
 
{this.props.assessment}
      </>
    );
  }
}
