import React, { useState, useContext } from "react";
import { getToken } from "../../../firebaseInit";
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
import { Button, Col, Row, Table, ButtonToolbar } from "react-bootstrap";
import Cookies from "js-cookie";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
import { store } from "../../../store";
import "./style.css";
import Loader from "react-loader-spinner";
import history from "../../../history";
import CIcon from "@coreui/icons-react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { connect } from "react-redux";
import TranslationContext from "../../../context/translation";
import TheHeaderDropdownLang from "../../../containers/TheHeaderDropdownLang";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { post, put } from "../../../_helper/api";
import { parseJwt } from "../../../_helper/functions";
import { auth } from "../../../firebase-config";

const LoadingScreen = require("react-loading-screen");
const Login = () => {
  const { translate } = useContext(TranslationContext);
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const [username, setUsername] = useState("");
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [modalIsOpenFileUpload, setIsOpenFileUpload] = React.useState(false);
  const [alertPopup, setAlert] = useState({
    open: false,
    severity: "error",
    message: "",
    title: "Error",
  });
  const [showMain, setShowMain] = React.useState(true);
  const [showLoading, setShowLoading] = React.useState(false);
  const [type, setType] = React.useState(false);
  let dataToken;
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, username)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    // setShowMain(false);
    // setShowLoading(true);
    if (
      username.trim() === "" &&
      password.trim() === "" &&
      domain.trim() === ""
    ) {
      setAlert({
        ...alertPopup,
        open: true,
        message: "Please enter Username , Password & Domain",
      });
      // setShowMain(true);

      // setShowLoading(false);
      return;
    }
    if (password.trim() === "" && domain.trim() === "") {
      setAlert({
        ...alertPopup,
        open: true,
        message: "Please enter  Password & Domain",
      });
      // setShowMain(true);

      // setShowLoading(false);
      return;
    }
    if (username.trim() === "" && domain.trim() === "") {
      setAlert({
        ...alertPopup,
        open: true,
        message: "Please enter Username & Domain",
      });
      // setShowMain(true);

      // setShowLoading(false);
      return;
    }
    if (username.trim() === "" && password.trim() === "") {
      setAlert({
        ...alertPopup,
        open: true,
        message: "Please enter Username & Password",
      });
      // setShowMain(true);

      // setShowLoading(false);
      return;
    }

    if (username.trim() === "") {
      setAlert({
        ...alertPopup,
        open: true,
        message: "Please enter Username",
      });
      // setShowMain(true);

      // setShowLoading(false);
      return;
    }
    if (password.trim() === "") {
      setAlert({ ...alertPopup, open: true, message: "Please enter Password" });
      // setShowMain(true);

      // setShowLoading(false);
      return;
    }
    if (domain.trim() === "") {
      setAlert({ ...alertPopup, open: true, message: "Please enter Domain" });
      // setShowMain(true);

      // setShowLoading(false);
      return;
    }
    // for access token
    const qs = require("qs");

    Axios.post(
      "https://cloudclinicdevapi.azurewebsites.net/oauth/token",
      qs.stringify({
        UserName: username,
        Password: password,
        domain: domain,
        grant_type: "password",
      })
    )
      .then((res) => {
        let token = res.data.access_token;
        console.log(res);

        store.dispatch({
          type: "SET_TOKEN",
          payload: {
            token: res.data.access_token,
          },
        });

        let time = res.data.expires_in;
        localStorage.setItem("access_token", token);
        localStorage.setItem("expires_in", time);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("domain", domain);
        localStorage.setItem("calendar_email", parseJwt(token).CalendarEmail);
        localStorage.setItem(
          "intake_monitoring",
          parseJwt(token).IntakeMonitoring
        );
        localStorage.setItem("image", parseJwt(token).Image);

        let headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        Axios.post(
          `https://cloudclinicdevapi.azurewebsites.net/api/accounts/users/login?UserName=${username}&Password=${password}`,
          {},
          { headers }
        )
          .then((res) => {
            console.log(res.data[0].roles);

            if (res.data == "Email or Password is incorrect") {
              setAlert({
                ...alertPopup,
                open: true,
                message: "Email or Password is incorrect",
              });

              // setShowMain(true);
              // setShowLoading(false);
            } else {
              store.dispatch({
                type: "SET_USER",
                payload: {
                  user: res.data[0],
                },
              });
              store.dispatch({
                type: "SET_Role",
                payload: {
                  roles: res.data[0].roles,
                },
              });
              localStorage.setItem("roles", res.data[0].roles);
              localStorage.setItem("user", JSON.stringify(res.data[0].userId));
              localStorage.setItem("userFirstName", res.data[0].firstName);
              localStorage.setItem("userLastName", res.data[0].lastName);
              localStorage.setItem("userRole", res.data[0].roles);
              localStorage.setItem("profileImage", res.data[0].profileImage);
              console.log(res.data[0].profileImage);
              localStorage.setItem("loggedIn", true);

              let userid = JSON.parse(localStorage.getItem("user"));

              tokenFunc();
              async function tokenFunc() {
                dataToken = await getToken();

                if (dataToken) {
                  console.log("Token is", dataToken);

                  put(`accounts/updateUserFCM_Web/${userid}`, {
                    FCMID_Web: dataToken,
                    FirebaseID_Web: "",
                  });
                }
              }
             
              setAlert({
                ...alertPopup,
                open: true,
                severity: "success",
                message: "Login Successful",
                title: "Success",
              });
              setShowMain(false);
              setShowLoading(true);
              setTimeout(() => {
                if (res.data[0].roles == "Receptionist")
                window.location.assign("/#/ReceptionistDashboard");
              else if (res.data[0].roles == "Physician")
                window.location.assign("/#/PhysicianDashboard");
              else if (res.data[0].roles == "Consultant")
                window.location.assign("/#/ConsultantDashboard");
              else if (res.data[0].roles == "Admin")
                window.location.assign("/#/AdminDashboard");
              else if (res.data[0].roles == "Nurse")
                window.location.assign("/#/NurseDashboard");
              else if (res.data[0].roles == "Patient")
                window.location.assign("/#/PatientDashboard");
              }, 2000);
           
            }
          })
          .catch((error) => {
            console.log(error.message);
            setAlert({
              ...alertPopup,
              open: true,
              message: error?.response?.data,
            });
            // setShowMain(true);

            // setShowLoading(false);
          });
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.data.error_description == "Client Not Exists") {
          setAlert({
            ...alertPopup,
            open: true,
            message: "This Domain does not exist.",
          });
        }
        if (
          error.response.data.error_description ==
          "The user name or password is incorrect."
        ) {
          setAlert({
            ...alertPopup,
            open: true,
            message: "The Username or Password is incorrect.",
          });
        }
        // setShowMain(true);
        // setShowLoading(false);
      });
    // };
  };

  function handleClose() {
    setAlert({ ...alertPopup, open: false });
    Cookies.set("username", username);
    Cookies.set("password", password);
    Cookies.set("domain", domain);
  }
  return (
    <div>
      <Snackbar
        open={alertPopup.open}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => {
          handleClose();
        }}
      >
        <Alert
          onClose={() => {
            handleClose();
          }}
          severity={alertPopup.severity}
        >
          <AlertTitle>{alertPopup.title}</AlertTitle>
          <strong>{alertPopup.message}</strong>
        </Alert>
      </Snackbar>
      {showMain ? (
        <div
          className="login-body overflow-auto"
          style={{ overflowX: "hidden" }}
        >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8">
              <div className="row bg-light py-4 rounded shadow overflow-auto">
                <div className="col-md-7 border-right px-0 d-flex align-items-center justify-content-center">
                  <div className="col-md-12">
                    <img
                      style={{ cursor: "pointer" }}
                      id="logo"
                      src="https://cloudclinicdemo.azurewebsites.net/avatars/Logo.png"
                      className="mx-auto d-block col-md-6 mb-2"
                    />
                    <div
                      className="tab-content mt-2"
                      style={{ textAlign: "right" }}
                    >
                      <TheHeaderDropdownLang />
                    </div>
                    <div className="tab-content mt-2">
                      <div
                        id="login01"
                        className="tab-pane fade in active show"
                      >
                        <div className="p-4 rounded">
                          <form>
                            <div className="input-container">
                              <input
                                type="text"
                                id="username"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              <label>{translate("USERNAME")}</label>
                            </div>
                            <div className="input-container">
                              <input
                                type={passwordType}
                                id="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <label>{translate("PASSWORD")}</label>
                            </div>
                            <div className="d-flex justify-content-end">
                            {passwordType == "password" ? (
                              <Button
                              className="cc-btn"
                              onClick={togglePassword}
                              >
                                Show Password
                              </Button>
                            ) : (<Button
                              className="cc-btn"
                              onClick={togglePassword}
                              >
                                Hide Password
                              </Button>)}
                            </div>
                            <div className="input-container">
                              <input
                                type="text"
                                id="domain"
                                required
                                onChange={(e) => setDomain(e.target.value)}
                              />
                              <label>{translate("DOMAIN")}</label>
                            </div>
                            <div className="d-flex">
                              <button
                                type="button"
                                id="button"
                                className="btn cc-btn col-md-12 "
                                onClick={handleLogin}
                              >
                                <label
                                  style={{
                                    paddingTop: "10px",
                                    textDecorationStyle: "solid",
                                    fontWeight: "bold",
                                    letterSpacing: 3,
                                    fontSize: "20px",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {translate("LOGIN")}
                                </label>
                              </button>
                            </div>
                            <div className="d-flex justify-content-end my-1">
                              <Link
                                style={{
                                  color: "#0b7adb",
                                  fontSize: 15,
                                  cursor: "pointer",
                                }}
                                to="/forgotpassword"
                              >
                                Forgotten password?
                              </Link>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 border-right d-flex align-items-center justify-content-center">
                  <div className="align-items-center justify-content-center">
                    <img
                      src="avatars/login-vector-01.png"
                      className="col-md-12 h-100 border-bottom"
                      id="login-vector"
                    />
                    <div className="d-flex align-items-center justify-content-center mt-2">
                   
                      <div
                        className="col-md-6 "
                        onClick={() => {
                          setType(1)
                          setIsOpenFileUpload(true);
                        }}
                      >
                        <img
                          style={{
                            height: "60px",
                            width: "90%",
                          }}
                          src="avatars/anew.png"
                          id="login-vector"
                        />
                     
                      </div>
                      <div className="col-md-6 border-left"
                        onClick={() => {
                          setType(2)
                          setIsOpenFileUpload(true);
                        }}>
                        <img
                          style={{
                            height: "65px",
                            width: "100%",
                            paddingLeft: "25px",
                          }}
                          src="avatars/inew.png"
                          id="login-vector"
                        />
                       
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <div className=" justify-content-center">
                    <img
                      src="avatars/android.jpeg"
                      className="col-md-12 h-100"
                      id="login-vector"
                    />
                    <p className="align-items-center justify-content-center">Android</p>
                    <img
                      src="avatars/android.jpeg"
                      className="col-md-12 h-100"
                      id="login-vector"
                    />
                    <span>iOS</span>
                 
                  </div>
                 
                </div> */}
              </div>
            </div>
          </div>
          <Dialog
            open={modalIsOpenFileUpload}
            onClose={() => {
              setIsOpenFileUpload(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="false"
          >
            <DialogTitle
              style={{
                marginTop: "0px",
                color: "white",
                background: "#007bff",
              }}
              id="alert-dialog-title"
            >
            <p> Scan to get Mobile Application  <Button
                color="secondary"
                onClick={() => {
                  setIsOpenFileUpload(false);
                }}
                style={{
                  float: "right",
                  background: "transparent",
                  borderColor: "transparent",
                  fontSize: "larger",
                }}
              >
                X
              </Button></p>
            
            </DialogTitle>
            <div >
              <DialogContent>
              <div
             className="d-flex justify-content-center"
             style={{widht:"40vw" ,margin: "40px"}}
            >
                {type==1 ? (
                  <img
                          style={{
                            height: "350px",
                            width: "350px",
                          }}
                          src="avatars/android.jpeg"
                          id="login-vector"
                        />
                ) : (
                  <img
                          style={{
                            height: "350px",
                            width: "350px",
                          }}
                          src="avatars/ios.jpeg"
                          id="login-vector"
                        />
                )}
                </div>
              </DialogContent>
            </div>
          </Dialog>
        </div>
      ) : null}
      {showLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loader
            type="Grid"
            color="#0b7adb"
            secondaryColor="#64c0ff"
            height="75vm"
            width="75vm"
            timeout={20000} //3 secs
          />
        </div>
      ) : null}
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
    // setCalendar: (data) => dispatch(data),
    user: () => dispatch(alert("")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
