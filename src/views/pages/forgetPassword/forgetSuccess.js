import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
} from "@coreui/react";
import history from "../../../history";
import CIcon from "@coreui/icons-react";
import Axios from "axios";
import { connect } from "react-redux";
import { store } from "../../../store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ForgotPasswordSuccess = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
     <ToastContainer />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h3>Email Sent</h3>
                    <p className="text-muted">
                      Your password has been changed successfully. Use your new password to log in &nbsp;
                      <Link style={{color: "#0b7adb", fontSize:  15,cursor: "pointer"}} to="/login">Login</Link>
                    </p>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ForgotPasswordSuccess;
