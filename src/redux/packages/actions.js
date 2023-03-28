export const GET_PHYSICIAN_PACKAGES = "GET_PHYSICIAN_PACKAGES";
export const ADD_NEW_PACKAGE = "ADD_NEW_PACKAGE";
export const UPDATE_PACKAGE = "UPDATE_PACKAGE";
export const DELETE_PACKAGE = "DELETE_PACKAGE";

export function getPhysicianPackages(packages) {
  return {
    type: GET_PHYSICIAN_PACKAGES,
    payload: {
      packages,
    },
  };
}

export function addNewPackage(singlepackage) {
  return {
    type: ADD_NEW_PACKAGE,
    payload: {
      singlepackage,
    },
  };
}

export function deletePackage(deleteID) {
  console.log(deleteID)
  return {
    type: DELETE_PACKAGE,
    payload: {
      deleteID,
    },
  };
}

export function updatePackage(singlepackage) {
  console.log(singlepackage)
  return {
    type: UPDATE_PACKAGE,
    payload: {
      singlepackage,
    },
  };
}
