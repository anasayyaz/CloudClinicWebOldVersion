import {
  GET_PHYSICIAN_PACKAGES,
  ADD_NEW_PACKAGE,
  UPDATE_PACKAGE,
  DELETE_PACKAGE,
} from "./actions";

const initialState = {
  all_packages: [],
};

const packagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHYSICIAN_PACKAGES:
      return {
        all_packages: action.payload.packages,
      };
    case ADD_NEW_PACKAGE:
      state.all_packages = [
        ...state.all_packages,
        action.payload.singlepackage,
      ];
      return state;
    case UPDATE_PACKAGE:
      console.log(action.payload.singlepackage);
      state.all_packages.map((data) => {
        if (action.payload.singlepackage.FeeID == data.feeID) {
          console.log(action.payload.singlepackage.FeeID, " ", data.feeID);
          data.fee = action.payload.singlepackage.Fee
          data.description = action.payload.singlepackage.Description
        }
      });
    case DELETE_PACKAGE:
      let newArray = [];
      state.all_packages.map((data) => {
        if (action.payload.deleteID != data.feeID) {
          newArray.push(data);
        }
      });
      state.all_packages = newArray;
    default:
      return state;
  }
};

export default packagesReducer;
