import { types } from "./types";

export function getUserValues(users) {
  return {
    type: types.GET_USER_VALUES,
    payload: {
      users,
    },
  };
}

export function setToken(token) {
  return {
    type: types.SET_TOKEN,
    payload: {
      token,
    },
  };
}
export function setCalendar(calendar) {
  console.log('functation is called')
  return {
    type: types.SET_CALENDAR,
    payload: {
      calendar,
    },
  };
}
export function GET_nationalid(national_id) {
  console.log("visit id in dispatch",national_id)
  return {
    
    type: types.GET_nationalid,
    payload: {
      national_id,
    },
  };
}
export function GET_SET_Role(roles) {
  console.log("visit id in dispatch GET_SET_Role",roles)
  return {
    
    type: types.GET_SET_Role,
    payload: {
      roles,
    },
  };

}


