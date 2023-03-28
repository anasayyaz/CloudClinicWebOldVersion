import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import history from "../../../history";
import CIcon from "@coreui/icons-react";
import { connect } from "react-redux";
import list, {post} from '../../../_helper/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ForgotPassword = () => {
  // const [account, setAccount] = useState({user});
  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("");
  const [show,setShow]  = useState(false);
  // const [loggedin, setLoggedin] = useState(false);

  const handleLogin = () => {

    post('accounts/ForgetPassword', {"Email" : username , "Domain" : domain}).then((response)=>{
    
 toast.success(response.data+" ✔️");
 setTimeout(() => {
 
  history.push(`/changepassword/${domain}/${username}`);
}, 1000);

 
    }).catch((error)=>{
      toast.error(error.message+" ❌");
    });

   
  
    
  };

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
                    <h3>Find Your Account</h3>
                    <p className="text-muted">Please enter your email address</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-globe-alt" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        name="domain"
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="Domain"
                        autoComplete="domain"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4 mb-2"
                          onClick={handleLogin}
                        >
                          Submit
                        </CButton>
                      </CCol>
                     
                      {/* <CCol xs="12"> */}
                      {/* <CButton color="link" className="d-block"> */}
                      Already have an account ? &nbsp;
                      <Link style={{color: "#0b7adb", fontSize:  15,cursor: "pointer"}} to="/login">Login</Link>
                      {/* </CButton> */}
                      {/* </CCol> */}
                    </CRow>
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

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: () => dispatch(alert("")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
