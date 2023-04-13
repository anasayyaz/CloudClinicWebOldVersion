import React from "react";

const loggedIn = localStorage.getItem("loggedIn");
const Medicines = React.lazy(() => import('./views/medicines/Medicines'));
const AddMedicine = React.lazy(() => import('./views/medicines/AddMedicine'));
const EditMedicine = React.lazy(() => import('./views/medicines/EditMedicine'));
const LabTestItems = React.lazy(() => import('./views/labtestitems/LabTestItems'));
const AddLabTestItem = React.lazy(() => import('./views/labtestitems/AddLabTestItem'));
const Patients = React.lazy(() => import('./views/patients/Patients'));
const AtHome = React.lazy(() => import('./views/pages/login/AtHome'));
const MobileGraph = React.lazy(() => import("./views/mobile/MobileGraph"))
const PreviousVisits = React.lazy(() => import('./views/patients/PreviousVisits'));
const UpcomingVisits = React.lazy(() => import('./views/patients/UpcomingVisits'));
const UpcomingVisitsPhysicians = React.lazy(() => import('./views/physicians/UpcomingVisits'));
const AddPatient = React.lazy(() => import('./views/patients/AddPatient'));
const EditPatient = React.lazy(() => import('./views/patients/EditPatient'));
const EditReceptionist = React.lazy(() => import('./views/receptionists/EditReceptionist'));
const PatientDashboard = React.lazy(() => import('./views/patients/PatientDashboard'));
const TestResult = React.lazy(() => import('./views/patients/TestResult'));
const Medicine = React.lazy(() => import('./views/patients/Medicine'));
const PhysicianDashboard = React.lazy(() => import('./views/physicians/PhysicianDashboard'));

const ReceptionistDashboard = React.lazy(() => import('./views/receptionists/ReceptionistDashboard'));
const InvoicesList = React.lazy(() => import('./views/receptionists/InvoicesList'));
const UpdateInvoice = React.lazy(() => import('./views/receptionists/UpdateInvoice'));
const AdminDashboard = React.lazy(() => import('./views/admins/AdminDashboard'));
const Configuration = React.lazy(() => import('./views/admins/Configuration'));
const NurseDashboard = React.lazy(() => import('./views/nurses/NurseDashboard'));
const Physicians = React.lazy(() => import('./views/physicians/Physicians'));
const AddPhysician = React.lazy(() => import('./views/physicians/AddPhysician'));
const EditPhysician = React.lazy(() => import('./views/physicians/EditPhysician'));
const PatientList = React.lazy(() => import('./views/physicians/PatientsList'));
const PatientsVisitsList = React.lazy(() => import('./views/physicians/PatientsVisitsList'));
const Nurses = React.lazy(() => import('./views/nurses/Nurses'));
const AddNurse = React.lazy(() => import('./views/nurses/AddNurse'));
const EditNurse = React.lazy(() => import('./views/nurses/EditNurse'));
const EditWard = React.lazy(() => import('./views/wards/EditWard'));
const EditLocation = React.lazy(() => import('./views/locations/EditLocation'));
const PatientDocuments = React.lazy(() => import("./views/patients/patientDocuments"));
const AddDocuments = React.lazy(() => import("./views/patients/fileUploading"));
const VisitPatient = React.lazy(() => import("./views/patients/patientVisits"));
const EditPhysicianProfile = React.lazy(() => import('./views/profile/EditPhysicianProfile'));
const EditNurseProfile = React.lazy(() => import('./views/profile/EditNurseProfile'));
const EditPatientProfile = React.lazy(() => import('./views/profile/EditPatientProfile'));
const EditReceptionistProfile = React.lazy(() => import('./views/profile/EditReceptionistProfile'));


const Appointments = React.lazy(() =>
  import("./views/appointments/Appointments")
);
const Completed = React.lazy(() =>
  import("./views/appointments/Completed")
);
const Payments = React.lazy(() =>
  import("./views/admins/Payments")
);

const AppointmentsSlot = React.lazy(() =>
  import("./views/appointments/AppointmentsSlot")
);
const Receptionists = React.lazy(() =>
  import("./views/receptionists/Receptionists")
);
const AddReceptionist = React.lazy(() =>
  import("./views/receptionists/AddReceptionist")
);
const AddWard = React.lazy(() =>
  import("./views/wards/AddWard")
);
const AddLocation = React.lazy(() =>
  import("./views/locations/AddLocation")
);
const AppointmentsToBeAdded = React.lazy(() =>
  import("./views/appointments/AppointmentsToBeAdded")
);
const AppointmentsToBeCancelled = React.lazy(() =>
  import("./views/appointments/AppointmentsToBeCancelled")
);
const VirtualMeeting = React.lazy(() =>
  import("./views/meetings/VirtualMeeting")
);
const VirtualMeetingPost = React.lazy(() =>
  import("./views/meetings/VirtualMeetingPost")
);
const InPersonMeeting = React.lazy(() =>
  import("./views/meetings/InPersonMeeting")
);
const InPersonMeetingPost = React.lazy(() =>
  import("./views/meetings/InPersonMeetingPost")
);
const HostMeeting = React.lazy(() => import("./views/meetings/HostMeeting"));

;
const PhysicianHome = React.lazy(() =>
  import("./views/physicians/PhysicianHome")
);
const PhysicianAccounts = React.lazy(() =>
  import("./views/physicians/Accounts")
);
const AdminAccounts = React.lazy(() =>
  import("./views/admins/Accounts")
);
const NurseHome = React.lazy(() => import("./views/nurses/NurseHome"));
const Histories = React.lazy(() => import("./views/history/Histories"));
const AddHistory = React.lazy(() => import("./views/history/AddHistory"));
const PreviousHistory = React.lazy(() =>
  import("./views/history/PreviousHistory")
);
const EditHistory = React.lazy(() => import("./views/history/EditHistory"));

const Wards = React.lazy(() => import("./views/wards/Wards"));
const Locations = React.lazy(() => import("./views/locations/Locations"));
const UsersList = React.lazy(() => import("./views/users/UsersList"));
const ChangePassword = React.lazy(() => import("./views/users/ChangePassword"));
const  ResetPassword = React.lazy(() => import("./views/pages/resetPassword/ChangePassword"));
const Notification = React.lazy(() => import("./views/users/Notification"));
const Profile = React.lazy(() => import("./views/users/Profile"));
const TodayVisits = React.lazy(() =>
  import("./views/receptionists/TodayVisits")
);
const CancelList = React.lazy(() =>
  import("./views/receptionists/CancelList")
);

const routes = [
  { path: "/dashboard", exact: true, name: "Home" },
  { path: "/cancelList", exact: true, name: "CancelList",component: CancelList },
  { path: "/TodayVisits", name: "Today Visits", component: TodayVisits },
  { path: "/UpcomingVisitsPhysicians", name: "Today Visits", component: UpcomingVisitsPhysicians },
  { path: "/accountsPhysician", name: "Physician Accounts", component: PhysicianAccounts },
  { path: "/accountsAdmin", name: "Admin Accounts", component: AdminAccounts },
  {
    path: "/PreviousHistory/:id",
    name: "Previous History",
    component: PreviousHistory,
  },
  { path: "/EditHistory/:id", name: "Edit History", component: EditHistory },
  { path: "/patients", name: "Patients", component: Patients, exact: true },
  {
    path: "/PreviousVisits",
    name: "Patients",
    component: PreviousVisits,
    exact: true,
  },
  {
    path: "/AppointmentsToBeAdded",
    name: "Appointments to be added",
    component: AppointmentsToBeAdded,
  },
  {
    path: "/Completed",
    name: "Appointments completed",
    component: Completed,
  },
  {
    path: "/Payments",
    name: "Payments",
    component: Payments,
  },
  {
    path: "/AppointmentsToBeCancelled",
    name: "Appointments to be cancelled",
    component: AppointmentsToBeCancelled,
  },
  {
    path: "/meeting/patientMeeting/:Visit/:Token",
    name: "AtHome",
    component: AtHome,
  },
  {
    path: "/mobilegraph/:type/:id/:token",
    name: "Mobile Graph",
    component: MobileGraph,
  },
  {
    path: "/UpcomingVisits",
    name: "Patients",
    component: UpcomingVisits,
    exact: true,
  },
  {
    path: "/EditPatient/:id",
    exact: true,
    name: "Update Patients",
    component: EditPatient,
  },
  {
    path: "/EditReceptionist/:id",
    name: "Update Receptionists",
    component: EditReceptionist,
  },
  {
    path: "/AddReceptionist",
    name: "Update Receptionists",
    component: AddReceptionist,
  },
  {
    path: "/AddLocation",
    name: "Update Locations",
    component: AddLocation,
  },
  {
    path: "/AddWard",
    name: "Update Wards",
    component: AddWard,
  },
  {
    path: "/patient/patientsVisits/:id",
    name: "Patient Visits",
    component: VisitPatient,
  },
  {
    path: "/labtestitems",
    name: "LabTestItems",
    component: LabTestItems,
  },
  {
    path: "/configuration",
    name: "Configuration",
    component: Configuration,
  },
  {
    path: "/medicines",
    name: "Medicines",
    component: Medicines,
  },
  {
    path: "/AddMedicine",
    name: "AddMedicine",
    component: AddMedicine,
  },
  {
    path: "/AddLabTestItem",
    name: "AddLabTestItem",
    component: AddLabTestItem,
  },
  {
    path: "/EditMedicine/:id",
    name: "EditMedicine",
    component: EditMedicine,
  },
  
 
 
 

  // { path: "/EditVitalSign", name: "Update Vital Signs", component: EditVitalSign },

  {
    path: "/LabTest/visitLabTest/:id",
    name: "Patient Documents",
    component: PatientDocuments,
  },
  {
    path: "/Fileuploading/:id",
    name: "Add Documents",
    component: AddDocuments,
  },
  {
    path: "/physicians",
    name: "Physicians",
    component: Physicians,
    exact: true,
  },
  {
    path: "/physicians/Physicians",
    name: "View Physicians",
    component: Physicians,
  },
 
  { path: "/AddPhysician", name: "Add Physicians", component: AddPhysician },
  { path: "/nurses", name: "Nurses", component: Nurses, exact: true },
  { path: "/AddNurse", name: "Add Nurses", component: AddNurse },
  {
    path: "/EditNurse/:id",
    exact: true,
    name: "Update Nurses",
    component: EditNurse,
  },
  {
    path: "/EditWard/:id",
    exact: true,
    name: "Update Wards",
    component: EditWard,
  },
  {
    path: "/EditLocation/:id",
    exact: true,
    name: "Update Locations",
    component: EditLocation,
  },
   {
    path: "/receptionists",
    name: "Receptionists",
    component: Receptionists,
  },
  {
    path: "/InvoicesList",
    name: "InvoicesList",
    component: InvoicesList,
  },
  {
    path: "/UpdateInvoice",
    name: "UpdateInvoice",
    component: UpdateInvoice,
  },
   {
    path: "/meeting/virtual",
    name: "nc Meeting",
    component: VirtualMeeting,
  },
  {
    path: "/meeting/virtualpost",
    name: "nc post Meeting",
    component: VirtualMeetingPost,
  },
  {
    path: "/meeting/inperson",
    name: "nc Meeting",
    component: InPersonMeeting,
  },
  {
    path: "/meeting/inpersonpost",
    name: "nc post Meeting",
    component: InPersonMeetingPost,
  },

 
  {
    path: "/meeting/HostMeeting",
    name: "Host Meeting",
    component: HostMeeting,
  },

 
  {
    path: "/wards",
    name: "Wards",
    component: Wards,
  },
  {
    path: "/locations",
    name: "Locations",
    component: Locations,
  },
 
  //Physician
  {
    path: "/PhysicianHome",
    name: "Physician Queue",
    component: PhysicianHome,
  },
  {
    path: "/NurseHome",
    name: "Nurse Queue",
    component: NurseHome,
  },


  //dashboards
  {
    path: "/PatientDashboard",
    name: "Patient Dashboard",
    component: PatientDashboard,
  },
  {
    path: "/ReceptionistDashboard",
    name: "Receptionist Dashboard",
    component: ReceptionistDashboard,
  },
  
  {
    path: "/PhysicianDashboard",
    name: "Physician Dashboard",
    component: PhysicianDashboard,
  },
  {
    path: "/AdminDashboard",
    name: "Admin Dashboard",
    component: AdminDashboard,
  },
  {
    path: "/NurseDashboard",
    name: "Nurse Dashboard",
    component: NurseDashboard,
  },

  { path: "/history", name: "Histories", component: Histories, exact: true },
  { path: "/history/Histories", name: "View Histories", component: Histories },
  { path: "/AddHistory/:id", name: "Add History", component: AddHistory },

  
  

  


  
 
  { path: "/users/userslist", exact: true, name: "Users List", component: UsersList },
  {
    path: "/user/change-password",
    exact: true,
    name: "Change Password",
    component: ChangePassword,
  },


  {
    path: "/user/reset-password",
    exact: true,
    name: "Change Password",
    component: ResetPassword,
  },
  {
    path: "/user/editreceptionist",
    exact: true,
    name: "Edit Receptionist",
    component: EditReceptionistProfile,
  },
  {
    path: "/user/editnurse",
    exact: true,
    name: "Edit Nurse",
    component: EditNurseProfile,
  },{
    path: "/user/editphysician",
    exact: true,
    name: "Edit Physician",
    component: EditPhysicianProfile,
  },{
    path: "/user/editpatient",
    exact: true,
    name: "Edit Patient",
    component: EditPatientProfile,
  },

  {
    path: "/user/read-notification",
    exact: true,
    name: "Notification",
    component: Notification,
  },
  { path: "/user/profile", exact: true, name: "Profile", component: Profile },
 
  { path: "/", exact: true, name: "Home" },
  


  { path: "/patients", name: "Patients", component: Patients, exact: true },
  {
    path: "/patients/Patients",
    exact: true,
    name: "View Patients",
    component: Patients,
  },

  {
    path: "/patients/VitalSigns",
    name: "View Vital Signs",
    component: Patients,
  },
  { path: "/AddPatient", name: "Add Patients", component: AddPatient },
  { path: "/TestResult", name: "Test Result", component: TestResult },
  { path: "/Medicine", name: "Medicine", component: Medicine },
 

  {
    path: "/physicians",
    name: "Physicians",
    component: Physicians,
    exact: true,
  },
  {
    path: "/physicians/Physicians",
    name: "View Physicians",
    component: Physicians,
  },
  {
    path: "/physicians/PatientsList",
    name: "Patients List",
    component: PatientList,
  },
  {
    path: "/physicians/PatientsVisitsList",
    name: "Patients Visits List",
    component: PatientsVisitsList,
  },
  { path: "/AddPhysician", name: "Add Physicians", component: AddPhysician },
  {
    path: "/EditPhysician/:id",
    exact: true,
    name: "Update Physicians",
    component: EditPhysician,
  },
  { path: "/nurses", name: "Nurses", component: Nurses, exact: true },
  { path: "/nurses/Nurses", name: "View Nurses", component: Nurses },
  { path: "/AddNurse", name: "Add Nurses", component: AddNurse },
  {
    path: "/EditNurse/:id",
    exact: true,
    name: "Update Nurses",
    component: EditNurse,
  },

  {
    path: "/appointments",
    name: "Appointments",
    component: Appointments,
    exact: true,
  },
  {
    path: "/appointments/AppointmentsSlot",
    name: "Appointments Slot 333",
    component: AppointmentsSlot,
  },
  {
    path: "/appointments/Appointments",
    name: "View Appointments",
    component: Appointments,
  },
  {
    path: "/appointments",
    name: "Receptionists",
    component: Receptionists,
    exact: true,
  },
  {
    path: "Receptionists",
    name: "View Receptionists",
    component: Receptionists,
  },
  {
    path: "/meetings/HostMeeting",
    name: "Host Meeting",
    component: HostMeeting,
  },

  { path: "/history", name: "Histories", component: Histories, exact: true },
  { path: "/history/Histories", name: "View Histories", component: Histories },
  { path: "/AddHistory", name: "Add History", component: AddHistory },

];

export default routes;
