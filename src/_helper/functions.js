import Axios from "axios";
import { func } from "prop-types";
import { store } from "../store";
const qs = require("qs");
Date.prototype.myMet = function () {
  if (this.getMonth() == 0) {
    this.myProp = "Jan";
  }
  if (this.getMonth() == 1) {
    this.myProp = "Feb";
  }
  if (this.getMonth() == 2) {
    this.myProp = "Mar";
  }
  if (this.getMonth() == 3) {
    this.myProp = "Apr";
  }
  if (this.getMonth() == 4) {
    this.myProp = "May";
  }
  if (this.getMonth() == 5) {
    this.myProp = "Jun";
  }
  if (this.getMonth() == 6) {
    this.myProp = "Jul";
  }
  if (this.getMonth() == 7) {
    this.myProp = "Aug";
  }
  if (this.getMonth() == 8) {
    this.myProp = "Sep";
  }
  if (this.getMonth() == 9) {
    this.myProp = "Oct";
  }
  if (this.getMonth() == 10) {
    this.myProp = "Nov";
  }
  if (this.getMonth() == 11) {
    this.myProp = "Dec";
  }
};
export function getMonthName(date) {
  var d = new Date(date);
  d.myMet();
  var monthname = d.myProp;
  return monthname;
}
export function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function startEndDate(date, string) {
  let d = new Date();
  var selectedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    d.getHours(),
    d.getMinutes()
  );
  return string
    ? formatDate(date) + "T" + d.getHours() + ":" + (d.getMinutes() + 1)
    : selectedDate.getTime();
}
export function endDate(date) {
  let d = new Date();
  var selectedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    d.getHours(),
    d.getMinutes()
  );
  var selectedDate2 = selectedDate.getTime() + 30 * 60 * 1000;
  let endDate = new Date(selectedDate2);
  return (
    formatDate(endDate) +
    "T" +
    endDate.getHours() +
    ":" +
    (endDate.getMinutes() + 1)
  );
}
export function defaultDate(date) {
  let selectedDate = new Date(date);
  let minutes = selectedDate.getMinutes();
  let hours = selectedDate.getHours();
  let response = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  response = response + ":" + minutes;
  response = formatDate(selectedDate) + "T" + response;
  return response;
}

export function checkIsPast(date, endDate) {
  var now = new Date();
  var selectedDate = new Date(date);
  var selectedEndDate = new Date(endDate);
  if (!endDate) {
    if (selectedDate.getTime() < now.getTime()) {
      return true;
    } else {
      return false;
    }
  } else {
    if (selectedDate.getTime() < selectedEndDate.getTime()) {
      return false;
    } else {
      return true;
    }
  }
}

export function parseJwt() {
  let token = localStorage.getItem("access_token");
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function validateNationalID(NationalID) {
  const re = /^[0-9]{5}-?[0-9]{7}-?[0-9]$/;

  return re.test(String(NationalID));
}
export function validateColor(Color) {
  if (Color.length == 7) return true;
  else return false;
}
export function validateName(Name) {
  const re = /^[a-z ,.'-]+$/i;

  return re.test(String(Name));
}

export function validateLastName(Name) {
  const re = /^[a-z ,.'-]+$/i;

  return re.test(String(Name));
}
export function validateSpeciality(Speciality) {
  if (Speciality.length != 1) return true;
  else return false;
}
export function validateEmployeCode(Speciality) {
  if (Speciality.length > 3 && Speciality.length < 13) return true;
  else return false;
}
export function validateDateOfBirth(d) {
  var e = new Date(),
    month = "" + (e.getMonth() + 1),
    day = "" + e.getDate(),
    year = e.getFullYear() - 22;

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  e = [year, month, day].join("-");

  if (d < e) {
    return true;
  } else {
    return false;
  }
}

export function validateAccessToken() {
  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");
  let domain = localStorage.getItem("domain");

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
      store.dispatch({
        type: "SET_TOKEN",
        payload: {
          token: res.data.access_token,
        },
      });
      let token = res.data.access_token;
      let time = res.data.expires_in;
      localStorage.setItem("access_token", token);
      localStorage.setItem("expires_in", time);

      window.location.reload();
    })
    .catch((error) => {});
}
