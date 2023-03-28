import React, { useContext } from "react";
import Logo from "../assets/images/logo.png";
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import navigation from "./_nav";
import TranslationContext from "../context/translation";
let image = localStorage.getItem("image");
let role = localStorage.getItem("role");
let name = JSON.parse(localStorage.getItem("user"));
let link = `https://cloudclinicdevapi.azurewebsites.net/images/${image}`;

const TheSidebar = (props) => {
  const { translate } = useContext(TranslationContext);

  return (
    <CSidebar
      // style={{background:'#2c3144'}}
      className="main-section"
      style={{ width: !props.show && "60px" }}
      // show={show}
    >
      {/* <CSidebarBrand
        className="d-md-down-none"
        to="/dashboard"
        style={{
          backgroundColor: "#3c4b64",
          borderColor: "#3c4b64",
          borderStyle: "solid",
          borderWidth: "thin",
          paddingTop: "3px",
        }}
      > */}
      {/* <CIcon className="c-sidebar-brand-full" name="" height={35} />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
          
        /> */}
      <div className="hamburger d-flex justify-content-end align-items-center mb-2">
        <img
          className="c-sidebar-brand-full py-1 px-2"
          style={{ height: "60px", width: "170px" }}
          src={link}
          alt="Dashboard"
        />
        <button
          className="openbtn cc-btn"
          onClick={() => {
            props.clickHandler();
          }}
        >
          ☰
        </button>
      </div>

      {/* </CSidebarBrand> */}
      <CSidebarNav
        onClick={() => {
          window.innerWidth < 992 && props.clickHandler();
        }}
      >
        <CCreateElement
          items={navigation(translate)}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
