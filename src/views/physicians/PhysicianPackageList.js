import React, { useState, useEffect,useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "react-bootstrap";
import UpdatePhysicianPackage from "./UpdatePhysicianPackage";
import TranslationContext from "../../context/translation";

import {
  getPhysicianPackages,
  deletePackage,
} from "../../redux/packages/actions";
import { SetLeftFeature } from "ag-grid-community";

const PhysicianPackgaeList = (props) => {
  const { translate } = useContext(TranslationContext)
  const [packageList, setPackageList] = useState();
  const [error, setsetError] = useState();
  const [updatePackageModal, setUpdatePackageModal] = useState();
  const [deletePackageModal, setDeletePackageModal] = useState();
  const [updatedID, setUpdatedID] = useState();
  const [deleteID, setDeleteID] = useState();
  const [show,setShow]=useState();
  const token = useSelector((state) => state.userReducer.token);
  const packageState = useSelector(
    (state) => state.packagesReducer.all_packages
  );
  const dispatch = useDispatch();

  const updatePackageOpen = (id, desc, fee) => {
    setUpdatePackageModal((prevMode) => !prevMode);
    setUpdatedID({id,desc,fee});
  };

  const updatePackageClose = () => {
    setUpdatePackageModal((prevMode) => !prevMode);
  };

  const deletePackageHandler = () => {
    setDeletePackageModal((prevMode) => !prevMode);
  };

  const confirmDeleteApi = async () => {

    try {
      const response = await fetch(
        
        `${process.env.REACT_APP_API_URL}physicianFee/${deleteID}`,
        {
          method: "DELETE",
          body: null,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        response.json().then((data) => {
          if (data) {
            dispatch(deletePackage(deleteID));
          }
        });
      });
      response.json();
    } catch (err) {
      setsetError(err.message);
    }
    setDeletePackageModal(false);
  };

  const getPhysicianPackageList = async () => {
 
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}physicianFee/getPhysicianFee/${props.nationalID}`,
        {
          method: "GET",
          body: null,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        response.json().then((data) => {
          if (data) {
            if ((data == "Record not found in system"))
            {
              dispatch(getPhysicianPackages([]));
         
            }
             
            else {
              dispatch(getPhysicianPackages(data));
            }
          }
        });
      });

      response.json();
    } catch (err) {
      setsetError(err.message);
    }
  };

  useEffect(() => {
    getPhysicianPackageList();
  }, []);

  return (
    <React.Fragment>
      <div class="pb-4">
        <p className="m-0 cc-page-title text-uppercase pl-2 pt-2 pb-3">
          {translate("PHYSICIAN_PACKAGE_LIST")}
        </p>
        {packageState?.map((data, index) => (
          <div className="d-flex align-items-center mt-2 bg-light border py-2 rounded">
            <p className="col-md-4 m-0">{data.description}</p>
            <p className="col-md-4 m-0 font-weight-bold">{data.fee}</p>
            <p className="col-md-4 m-0 text-right">
              <button
                className="border-0 btn btn-sm cc-btn"
                onClick={() => updatePackageOpen(data.feeID , data.description, data.fee)}
              >
                {translate("UPDATE")}
              </button>
              <button
                className="btn btn-sm border-0 ml-2 btn-danger"
                onClick={() => {
                  setDeleteID(data.feeID);
                  deletePackageHandler();
                }}
              >
                {translate("DELETE")}
              </button>
            </p>
          </div>
        ))}
      </div>

      <Dialog
        open={deletePackageModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogContent>
          <h4>Are you sure you want to delete this package?</h4>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={deletePackageHandler}>
          {translate("CANCEL")}
          </Button>
          <Button color="primary" onClick={confirmDeleteApi}>
          {translate("CONFIRM")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={updatePackageModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          {translate("UPDATE_PACKAGE")}
        </DialogTitle>
        <DialogContent>
          <UpdatePhysicianPackage
            feeID={updatedID}
            nationalID={props.nationalID}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={updatePackageClose}>
          {translate("CLOSE")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default PhysicianPackgaeList;


