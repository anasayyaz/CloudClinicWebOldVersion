import React, { useState } from "react";
import { put } from "../../../_helper/api";
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
import Axios from "axios";
import { connect } from "react-redux";
import { store } from "../../../store";
import qs from "query-string";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = (props) => {
  // const [account, setAccount] = useState({user});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState(false);
  const [validateConfirmPassword, setValidateConfirmPassword] = useState(false);
  const [loggedin, setLoggedin] = useState(false);
  const [code, setCode] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleChangePassword = () => {
    let UserID = qs.parse(props.location.search)?.userId;
    // let code = qs.parse(props.location.search)?.code;
    //debugger;
    // code = encodeURIComponent(code);
    if (password.trim() === "" || password.length < 8) {
      setValidatePassword(true);
    }
    if (password !== confirmPassword) {
      setValidateConfirmPassword(true);
    } else {
      put("accounts/ResetPassword", {
        // UserID: encodeURIComponent(UserID),
        Email: props.match.params.username,
        NewPassword: password,
        code: code,
        domain: props.match.params.domain,
      })
        .then((res) => {
          if (res.data == "Invalid token or expired!") {
            toast.error(res.data + " ❌");
          } else {
            toast.success(res.data + " ✔️");
            setTimeout(() => {
              history.push("/forgetSuccess");
            }, 1000);
          }

          // console.log(res);
          // if (
          //   res.data.toLowerCase() ===
          //   "Password Reset Successfully".toLowerCase()
          // ) {
          //   alert(res.data);
          //   history.push("/login");
          // } else {
          //   alert("Something went wrong.");
          // }
        })
        .catch((error) => {
          // console.log(error);
          toast.error(error.message + " ❌");
        });
    }
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
                  <CForm className="needs-validation">
                    <h1>Reset Password</h1>
                    <p className="text-muted">Reset Password</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type={passwordType}
                        name="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (validatePassword && e.target.value.length >= 8) {
                            setValidatePassword(false);
                          }
                        }}
                        placeholder="New Password"
                        autoComplete="current-password"
                        invalid={validatePassword}
                      />
                      {validatePassword && (
                        <CInputGroupText className="invalid-feedback text-danger">
                          Password must be at least 8 characters
                        </CInputGroupText>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type={passwordType}
                        name="changepassword"
                        onChange={(e) => {
                          setconfirmPassword(e.target.value);
                          if (
                            validateConfirmPassword &&
                            e.target.value.length >= 8
                          ) {
                            setValidateConfirmPassword(false);
                          }
                        }}
                        placeholder="Confirm New Password"
                        invalid={validateConfirmPassword}
                      />
                      {validateConfirmPassword && (
                        <CInputGroupText className="invalid-feedback text-danger">
                          The passwords you entered do not match.
                        </CInputGroupText>
                      )}
                    </CInputGroup>

                    {passwordType == "password" ? (
                      <CButton
                        color="primary"
                        className="float-right mb-3"
                        onClick={togglePassword}
                      >
                        Show Password
                      </CButton>
                    ) : (
                      <CButton
                        color="primary"
                        className="float-right mb-3"
                        onClick={togglePassword}
                      >
                        Hide Password
                      </CButton>
                    )}

                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        name="otp"
                        onChange={(e) => {
                          setCode(e.target.value);
                        }}
                        placeholder="OTP"
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleChangePassword}
                        >
                          Submit
                        </CButton>
                      </CCol>
                      {/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
