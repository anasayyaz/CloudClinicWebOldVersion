import { useDispatch } from "react-redux";
import history from "../history";
import Notification from "../views/users/Notification";
import Noty from "./Noty";
import React, { useEffect, useState, createContext, useContext } from "react";
import list, { post, put } from "../_helper/api";
import { Dialog, makeStyles } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Col, Row, Table, ButtonToolbar } from "react-bootstrap";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import Logo from "../assets/images/logocc.png";
import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";
import Modal from "react-bootstrap/Modal";
import { parseJwt } from "../_helper/functions";
import TheHeaderDropdownLang from "./TheHeaderDropdownLang";
import Notifications from "../components/Notifications/Notifications";
import TranslationContext from "../context/translation";
let userFirstName = localStorage.getItem("userFirstName");
let userLastName = localStorage.getItem("userLastName");
let userRoles = localStorage.getItem("userRole");

let userid = JSON.parse(localStorage.getItem("user"));
var countDetail;
const TheHeader = (props) => {
  const dispatch = useDispatch();
  const sidebarShow = false;
  const [notificationPopup, setNotificationPopup] = useState(false);
  const { translate, count, setCount } = useContext(TranslationContext);
  const useStyles = makeStyles({
    dialog: {
      position: "absolute",
      right: 5,
      top: 40,
    },
  });
  let image = localStorage.getItem("image");
  let role = localStorage.getItem("role");
  let name = JSON.parse(localStorage.getItem("user"));
  let link = `https://cloudclinicdevapi.azurewebsites.net/images/${image}`;

  const toggleSidebarMd = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
    let sidebars = document.getElementsByClassName("c-sidebar");
    sidebars[0].classList.toggle("c-sidebar-lg-show");
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    //debugger;
    dispatch({ type: "set", sidebarShow: val });
    let sidebars = document.getElementsByClassName("c-sidebar");
    sidebars[0].classList.toggle("c-sidebar-lg-show");
  };

  useEffect(() => {
    list(
      `notification/notificationList/${userid}/Web/Unread/?pageNumber=1&pageSize=100&QuerySearch=`
    )
      .then((response) => {
        setCount(response.data.paginationMetadata.totalCount);
        countDetail = response.data.paginationMetadata.totalCount;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const refreshCount = () => {
    setCount(count + 1);
  };
  function setCountToZero() {
    put(`notification/readAllNotification/${userid}`).then((response) => { });
    setCount(" ");
    countDetail = " ";
  }
  function setN() {

    setNotificationPopup(false);
  }
  const classes = useStyles();
  return (
    <CHeader withSubheader className="row py-2 pl-5 font-weight-bold">
      <Dialog
        open={notificationPopup}
        onClose={() => {
          setNotificationPopup(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
        classes={{
          paper: classes.dialog,
        }}
      >
        <div style={{ width: "20vw" }}>
          <DialogContent>
            <Notification
              setCountToZero={setCountToZero}
              setNotificationPopup={setN}
            />
          </DialogContent>
        </div>
      </Dialog>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={() => {
          toggleSidebarMobile();
        }}
      />
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none d-sm-none"
        onClick={toggleSidebarMd}
      />
      {!props.show ? (<img
        style={{ height: "50px" }}
        className="cc_logo"
        src={link}
        alt="Dashboard"
      />) : null}

      {/* <p className="text-align-center" >{userName}{"( "}{userRoles}{" )"}</p> */}

      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3"></CHeaderNavItem>
        <CHeaderNavItem className="px-3"></CHeaderNavItem>
        <CHeaderNavItem className="px-3"></CHeaderNavItem>
      </CHeaderNav>
      <CHeaderNav className="px-1">
        {/* <TheHeaderDropdownNotif />
        <TheHeaderDropdownTasks /> */}
        {/* <TheHeaderDropdownMssg /> */}
        <div
          style={{ borderRadius: "1rem" }}
          className="text-align-center cc-btn py-2 px-2"
        >
          {userFirstName} {userLastName}
          {" ( "}
          {userRoles}
          {" )"}
        </div>
        <div
          onClick={() => {
            // history.push("/user/read-notification");
            setNotificationPopup(true);
          }}
          style={{ borderRadius: "1rem" }}
          className="text-align-center btn  py-2 ml-2 px-2"
        >
          <Noty
            onClick={() => {
              setNotificationPopup(true);
            }}
            width={"30px"}
            color={"#0b7adb"}
            count={count}
          />
        </div>
        <TheHeaderDropdownLang />

        <TheHeaderDropdown />
      </CHeaderNav>
    </CHeader>
  );
};

export default TheHeader;
