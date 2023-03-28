import React, { useState, Component, useEffect, useContext } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./scss/style.scss";
import history from "./history";
import { connect } from "react-redux";
import { error } from "jquery";
import { onMessageListener } from "./firebaseInit";
import Notifications from "./components/Notifications/Notifications";
import ReactNotificationComponent from "./components/Notifications/ReactNotification";
import Text from "../src/components/Text/Text";
import Link from "../src/components/Link/Link";
import TranslationContext from "./context/translation";
import packageJson from "../package.json";
import {lazy} from 'react';


///testing
import { ToastContainer, toast } from "react-toastify";
import { render } from "enzyme";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const ForgotPassword = React.lazy(() =>
  import("./views/pages/forgetPassword/forgetPassword")
);
const ForgetSuccess = React.lazy(() =>
  import("./views/pages/forgetPassword/forgetSuccess")
);
const ChangePassword = React.lazy(() =>
  import("./views/pages/resetPassword/ChangePassword")
);
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const AtHome = React.lazy(() => import("./views/pages/login/AtHome"));
const MobileGraph = React.lazy(() => import("./views/mobile/MobileGraph"));

let showpopup = false,
  title = "",
  body = "";
function App(props) {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const { count, setCount } = useContext(TranslationContext);

  function showUpload(y) {
    setCount(count + 1);

    toast.info(y);
  }
  function caching  () {
    let version = localStorage.getItem('version');
    console.log(version)
        if(version!=packageJson.version)
        {
            if('caches' in window){
             caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach(name => {
                caches.delete(name);
            })
        });
    
        // Makes sure the page reloads. Changes are only visible after you refresh.
        window.location.reload(true);
    }
    
          // localStorage.clear();
          localStorage.setItem('version',packageJson.version);
        }
    };


    // const lazyWithRetry = (componentImport) =>
    // ;
  onMessageListener()
    .then((payload) => {
      showUpload(payload.notification.body);
      forceUpdate();
    })
    .catch((err) => console.log("failed: ", err));

  useEffect(() => {
      let r=localStorage.getItem("userRole")
    console.log(r);
    window.location.assign(`/#/${r}Dashboard`);
     caching();
   
    onMessageListener()
      .then((payload) => {
        showUpload(payload.notification.body);
        forceUpdate();
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  return (
    <div>
      <div>
        <HashRouter history={history}>
          <React.Suspense fallback={loading}>
            {props.userReducer?.token ? (
              <Switch>
                <Route
                  exact
                  path="/login"
                  name="Login Page"
                  render={(props) => <Login {...props} />}
                />

                <Route
                  exact
                  path="/register"
                  name="Register Page"
                  render={(props) => <Register {...props} />}
                />

                <Route
                  exact
                  path="/meeting/patientMeeting/:Visit/:Token"
                  name="Patient at Home Page"
                  render={(props) => <AtHome {...props} />}
                />
                <Route
                  exact
                  path="/mobilegraph/:type/:id/:token"
                  name="Mobile Graph"
                  render={(props) => <MobileGraph {...props} />}
                />
                <Route
                  exact
                  path="/404"
                  name="Page 404"
                  render={(props) => <Page404 {...props} />}
                />
                <Route
                  exact
                  path="/500"
                  name="Page 500"
                  render={(props) => <Page500 {...props} />}
                />
                <Route
                  path="/"
                  name="Home"
                  render={(props) => <TheLayout {...props} />}
                />
                <Redirect from="/" to="/login" />
              </Switch>
            ) : (
              <Switch>
                <Route
                  exact
                  path="/login"
                  name="Login Page"
                  render={(props) => <Login {...props} />}
                />
                <Route
                  exact
                  path="/register"
                  name="Register Page"
                  render={(props) => <Register {...props} />}
                />
                <Route
                  exact
                  path="/meeting/:date"
                  name="Patient at Home Page"
                  render={(props) => <AtHome {...props} />}
                />
                <Route
                  exact
                  path="/meeting/patientMeeting/:Visit/:Token"
                  name="Patient at Home Page"
                  render={(props) => <AtHome {...props} />}
                />
                <Route
                  exact
                  path="/mobilegraph/:type/:id/:token"
                  name="Mobile Graph"
                  render={(props) => <MobileGraph {...props} />}
                />
                <Route
                  exact
                  path="/forgotpassword"
                  name="ForgotPassword Page"
                  render={(props) => <ForgotPassword {...props} />}
                />
                <Route
                  path="/changepassword/:domain/:username"
                  name="ChangePassword Page"
                  render={(props) => <ChangePassword {...props} />}
                />
                <Route
                  path="/forgetSuccess"
                  name="Forget Success"
                  render={(props) => <ForgetSuccess {...props} />}
                />
                <Redirect from="/" to={"/login"} />
              </Switch>
            )}
          </React.Suspense>
        </HashRouter>
      </div>

      {show ? (
        <ReactNotificationComponent
          style={{ position: "absolute", zIndex: 1 }}
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}

      <ToastContainer />
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
