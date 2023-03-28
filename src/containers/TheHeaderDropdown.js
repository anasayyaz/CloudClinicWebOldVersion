import React, { useEffect, useState } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  ti,
} from "@coreui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Link } from "react-router-dom";
import history from "../history";
import { connect } from "react-redux";
import { store } from "../store";
import { ArrowDropDown, ExitToApp, Lock, Person } from "@material-ui/icons";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { put } from "../_helper/api";
import TranslationContext from "../context/translation";
import { auth } from "../firebase-config";
import { Navigate } from "react-big-calendar";
var roles = localStorage.getItem("roles");
let userid = JSON.parse(localStorage.getItem("user"));
let domain = localStorage.getItem("domain");
class TheHeaderDropdown extends React.Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    e.preventDefault();
    const formData = new FormData();
    let type = e.target.files[0].name.split(".").pop();
    let imageName = userid + "_" + Date.now() + "_" + domain + "." + type;
    formData.append("profileImage", e.target.files[0], imageName);
    console.log("profileImage", e.target.files[0], imageName);

    if (roles == "Physician" || roles == "Nurse") {
      put(`physician/profileImage/${userid}`, formData)
        .then((response) => {
          // let user = JSON.parse(localStorage.getItem("user"));
          // user["profileImage"] = response.data;
          // window.localStorage.setItem("user", JSON.stringify(user));
          // this.setState({ user });
          localStorage.setItem("profileImage", response.data);
          window.location.reload();
        })
        .catch((error) => {});
    } else if (roles == "Patient") {
      put(`patient/profileImage/${userid}`, formData)
        .then((response) => {
          // let user = JSON.parse(localStorage.getItem("user"));
          // user["profileImage"] = response.data;
          // window.localStorage.setItem("user", JSON.stringify(user));
          // this.setState({ user });
          localStorage.setItem("profileImage", response.data);
          window.location.reload();
        })
        .catch((error) => {});
    } else if (roles == "Admin" || roles == "Receptionist") {
      put(`accounts/profileImage/${userid}`, formData)
        .then((response) => {
          // let user = JSON.parse(localStorage.getItem("user"));
          // user["profileImage"] = response.data;
          // window.localStorage.setItem("user", JSON.stringify(user));
          // this.setState({ user });
          localStorage.setItem("profileImage", response.data);
          window.location.reload();
        })
        .catch((error) => {});
    }
  }

  navigate() {
    if (roles == "Admin") {
      history.push("/user/profile");
    } else if (roles == "Receptionist") {
      history.push("/user/editreceptionist");
    } else if (roles == "Nurse") {
      history.push("/user/editnurse");
    } else if (roles == "Patient") {
      history.push("/user/editpatient");
    } else if (roles == "Physician") {
      history.push("/user/editphysician");
    }
  }
  componentDidMount() {
    console.log(
      "my: " +
        `https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Profile/${localStorage.getItem(
          "profileImage"
        )}`
    );
    console.log(
      "other:" +
        "https://cloudclinicdevapi.azurewebsites.net/media/clinic/Profile/f46c6dc6-13ab-475f-9aab-27a86bdc31a6_1670949879701_clinic.png"
    );
    let user = JSON.parse(localStorage.getItem("user"));

    this.setState({ user });
  }
  render() {
    const { translate } = this.context;
    let { user } = this.state;
    return (
      <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="w-100 c-avatar mr-4">
            <img
              src={
                `https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Profile/${localStorage.getItem(
                  "profileImage"
                )}`
                // process.env.REACT_APP_IMAGE_URL +
                // localStorage.getItem("profileImage")
              }
              style={{
                float: "right",
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />

            {user.fullName}
            <ArrowDropDown />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <div className="image-upload">
            <img
              src={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Profile/${localStorage.getItem(
                "profileImage"
              )}`}
            />
            <label htmlFor="file-input">
              <AddAPhotoIcon style={{ cursor: "pointer" }} />
            </label>
            <input id="file-input" type="file" onChange={this.onChange} />
          </div>
          <CDropdownItem
            style={{ cursor: "default !important" }}
            disabled={true}
          >
            <span className="btn btn-light-primary font-weight-bold">
              {user.email}
            </span>
          </CDropdownItem>
          <CDropdownItem
            onClick={() => {
              this.navigate();
            }}
          >
            <Person />
            <span className="btn btn-light-primary font-weight-bold">
              {translate("PROFILE")}
            </span>
          </CDropdownItem>
          <CDropdownItem
            onClick={() => {
              history.push("/user/change-password");
            }}
          >
            <Lock />
            <span className="btn btn-light-primary font-weight-bold">
              {translate("CHANGE_PASSWORD")}
            </span>
          </CDropdownItem>
          <CDropdownItem
            onClick={() => {
              store.dispatch({
                type: "SET_TOKEN",
                payload: {
                  token: null,
                },
              });
              localStorage.clear();
              localStorage.setItem("loggedIn", false);
              signOut(auth);
              window.location.reload();
            }}
          >
            <ExitToApp />
            <span className="btn btn-light-primary font-weight-bold">
              {translate("LOGOUT")}
            </span>
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(TheHeaderDropdown);
