import { CIcon } from "@coreui/icons-react";
import React, { useContext } from "react";
import TranslationContext from "../context/translation";

import {
  FaBeer,
  FaPencilAlt,
  FaCalendarTimes,
  FaPersonBooth,
} from "react-icons/fa";

var roles = localStorage.getItem("roles");
// roles= JSON.stringify(roles)
var _default = (translate) => [
  {
    _tag: "CSidebarNavItem",
    name: translate("DASHBOARD"),
    to: "/AdminDashboard",
    icon: { name: "cil-view-quilt", size: "2xl" },
  },

  {
    _tag: "CSidebarNavDropdown",
    name: translate("APPOINTMENTS"),
    route: "/appointments/Appointments",
    icon: { name: "cil-calendar-check", size: "2xl" },

    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "⦿ Add / Edit",
        to: "/appointments/Appointments",
      },
      {
        _tag: "CSidebarNavItem",
        name: "⦿ To Be Added",
        to: "/AppointmentsToBeAdded",
      },
      {
        _tag: "CSidebarNavItem",
        name: "⦿ To Be Cancelled",
        to: "/AppointmentsToBeCancelled",
      },
      {
        _tag: "CSidebarNavItem",
        name: "⦿ Available Slots",
        to: "/appointments/AppointmentsSlot",
      },
      {
        _tag: "CSidebarNavItem",
        name: "⦿ Completed",
        to: "/Completed",
      },
      {
        _tag: "CSidebarNavItem",
        name: "⦿ List",
        to: "/PhysicianHome",
      },

      {
        _tag: "CSidebarNavItem",
        name: "⦿ Cancelled",
        to: "/cancelList",
      },
    ],
  },

  {
    _tag: "CSidebarNavItem",
    name: translate("USERS"),
    to: "/users/userslist",
    icon: { name: "cil-people", size: "2xl" },
  },

  {
    _tag: "CSidebarNavItem",
    name: translate("UPCOMING_VISITS"),
    to: "/TodayVisits",
    icon: { name: "cil-calendar-check", size: "2xl" },
  },
 
 
  {
    _tag: "CSidebarNavItem",
    name: translate("PHYSICIANS"),
    to: "/physicians/Physicians",
    icon: { name: "cil-people", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("PATIENTS"),
    to: "/patients/Patients",
    icon: { name: "cil-disabled", size: "2xl" },
  },

  {
    _tag: "CSidebarNavItem",
    name: translate("NURSES"),
    to: "/nurses",
    icon: { name: "cil-people", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("RECEPTIONISTS"),
    to: "/receptionists",
    icon: { name: "cil-user-follow", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("MEDICINES"),
    to: "/medicines",
    icon: { name: "cil-medical-cross", size: "2xl" },
  },

  {
    _tag: "CSidebarNavItem",
    name: "Lab Tests",
    to: "/labtestitems",
    icon: { name: "cil-medical-cross", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("WARDS"),
    to: "/wards",
    icon: { name: "cil-medical-cross", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("LOCATIONS"),
    to: "/locations",
    icon: { name: "cil-medical-cross", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Payments",
    to: "/Payments",
    icon: { name: "cil-medical-cross", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Configuration",
    to: "/configuration",
    icon: { name: "cil-medical-cross", size: "2xl" },
  },

  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Accounts",
  //   to: "/accountsAdmin",
  //   icon: { name: "cil-people", size: "2xl" },
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: translate("INVOICE_LIST"),
  //   to: "/InvoicesList",
  //   icon: { name: "cil-money", size: "2xl" },
  // },
];
var _default1 = (translate) => [
  {
    _tag: "CSidebarNavItem",
    name: translate("DASHBOARD"),
    to: "/dashboard",
    icon: { name: "cil-view-quilt", size: "2xl" },
    badge: {
      color: "info",
      text: "NEW",
    },
  },
];
var _default_Nurse = (translate) => [
  {
    _tag: "CSidebarNavItem",
    name: translate("DASHBOARD"),
    to: "/NurseDashboard",
    icon: { name: "cil-view-quilt", size: "2xl" },
  },

  {
    _tag: "CSidebarNavItem",
    name: translate("MY_APPOINTMENTS"),
    to: "/NurseHome",
    icon: { name: "cil-calendar", size: "2xl" },
  },
];

var _default_Physician = (translate) => [
  {
    _tag: "CSidebarNavItem",
    name: translate("DASHBOARD"),
    to: "/PhysicianDashboard",
    icon: { name: "cil-view-quilt", size: "2xl" },
  },

  {
    _tag: "CSidebarNavItem",
    name: "Appointments List",
    to: "/PhysicianHome",
    icon: { name: "cil-calendar", size: "2xl" },
  },

  {
    _tag: "CSidebarNavItem",
    name: translate("MY_PATIENTS"),
    to: "/physicians/PatientsList",
    icon: { name: "cil-people", size: "2xl" },
  },

  {
    _tag: "CSidebarNavItem",
    name: "Accounts",
    to: "/accountsPhysician",
    icon: { name: "cil-people", size: "2xl" },
  },
];

var _default_Patient = (translate) => [
  {
    _tag: "CSidebarNavItem",
    name: translate("DASHBOARD"),
    to: "/PatientDashboard",
    icon: { name: "cil-view-quilt", size: "2xl" },
  },

  {
    _tag: "CSidebarNavItem",
    name: translate("UPCOMING_VISITS"),
    to: "/UpcomingVisits",
    icon: { name: "cil-calendar", size: "2xl" },
  },

  {
    _tag: "CSidebarNavItem",
    name: translate("IMAGE_LAB_REPORTS"),
    to: "/TestResult",
    icon: { name: "cil-file", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("MEDICINES"),
    to: "/Medicine",
    icon: { name: "cil-medical-cross", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("PREVIOUS_VISITS"),
    to: "/PreviousVisits",
    icon: { name: "cil-history", size: "2xl" },
  },
];

var _default_Receptionist = (translate) => [
  {
    _tag: "CSidebarNavItem",
    name: translate("DASHBOARD"),
    to: "/ReceptionistDashboard",
    icon: { name: "cil-view-quilt", size: "2xl" },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: translate("APPOINTMENTS"),
    route: "/appointments/Appointments",
    icon: { name: "cil-calendar-check", size: "2xl" },

    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Add / Edit",
        to: "/appointments/Appointments",
      },
      {
        _tag: "CSidebarNavItem",
        name: "To Be Added",
        to: "/AppointmentsToBeAdded",
      },
      {
        _tag: "CSidebarNavItem",
        name: "To Be Cancelled",
        to: "/AppointmentsToBeCancelled",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Available Slots",
        to: "/appointments/AppointmentsSlot",
      },

      {
        _tag: "CSidebarNavItem",
        name: "List",
        to: "/PhysicianHome",
      },

      {
        _tag: "CSidebarNavItem",
        name: "Cancelled",
        to: "/cancelList",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("PATIENTS"),
    to: "/patients/Patients",
    icon: { name: "cil-disabled", size: "2xl" },
  },

  {
    _tag: "CSidebarNavItem",
    name: translate("PHYSICIANS"),
    to: "/physicians/Physicians",
    icon: { name: "cil-people", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("NURSES"),
    to: "/nurses",
    icon: { name: "cil-people", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("WARDS"),
    to: "/wards",
    icon: { name: "cil-medical-cross", size: "2xl" },
  },
  {
    _tag: "CSidebarNavItem",
    name: translate("UPCOMING_VISITS"),
    to: "/TodayVisits",
    icon: { name: "cil-calendar-check", size: "2xl" },
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: translate("INVOICE_LIST"),
  //   to: "/InvoicesList",
  //   icon: { name: "cil-money", size: "2xl" },
  // },
];
var roles_side = (translate) =>
  roles == "Admin"
    ? _default(translate)
    : roles == "Nurse"
    ? _default_Nurse(translate)
    : roles == "Patient"
    ? _default_Patient(translate)
    : roles == "Physician"
    ? _default_Physician(translate)
    : roles == "Receptionist"
    ? _default_Receptionist(translate)
    : _default1(translate);

export default roles_side;
