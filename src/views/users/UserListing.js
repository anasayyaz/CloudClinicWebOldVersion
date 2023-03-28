import React, { useRef, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { put } from "../../_helper/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TranslationContext from "../../context/translation";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControlLabel, Switch } from "@material-ui/core";
let userid = JSON.parse(localStorage.getItem("user"));
let domain = localStorage.getItem("domain");
let ev, idv, fullNamev, rolesv;
const UserListing = (props) => {
  const { translate } = useContext(TranslationContext);
  const history = useHistory();
  const [modalDelete, setIsOpenModalDelete] = useState(false);
  const [modalReset, setIsOpenModalReset] = useState(false);
  function change(e, id, fullName, roles) {
    ev = e;
    idv = id;
    fullNamev = fullName;
    rolesv = roles;

    setIsOpenModalDelete(true);
  }
  function handleReset(userID, name, email) {
    setIsOpenModalReset(true);
    ev = email;
    idv = userID;
    fullNamev = name;
  }
  function resetConfirm() {
    toast.info("New password sent to user " + fullNamev + " on email: " + ev);
    put(`accounts/resentPassword/${idv}`, {}).then((response) => {
      setIsOpenModalReset(false);
      history.push("/");
      history.replace("users/userslist");
    });
  }
  function changeConfirm() {
    if (rolesv == "Physician" || rolesv == "Nurse") {
      if (ev == 0) {
        toast.info(
          "User named: " + fullNamev + " with role: " + rolesv + " disabled"
        );
        put(`/physician/updateStatus/${idv}`, {
          IsActive: 0,
          lastmodifiedon: new Date(),
          lastmodifedby: userid,
        }).then((response) => {
          history.push("/");
          history.replace("users/userslist");
        });
      } else if (ev == 1) {
        toast.info(
          "User named: " + fullNamev + " with role: " + rolesv + " enabled"
        );
        put(`/physician/updateStatus/${idv}`, {
          IsActive: 1,
          lastmodifiedon: new Date(),
          lastmodifedby: userid,
        }).then((response) => {
          history.push("/");
          history.replace("users/userslist");
        });
      }
    } else if (rolesv == "Patient") {
      if (ev == 1) {
        toast.info(
          "User named: " + fullNamev + " with role: " + rolesv + " disabled"
        );
        put(`/patient/updateStatus/${idv}`, {
          IsActive: 1,
          lastmodifiedon: new Date(),
          lastmodifedby: userid,
        }).then((response) => {
          history.push("/");
          history.replace("users/userslist");
        });
      } else if (ev == 0) {
        toast.info(
          "User named: " + fullNamev + " with role: " + rolesv + " enabled"
        );
        put(`/patient/updateStatus/${idv}`, {
          IsActive: 0,
          lastmodifiedon: new Date(),
          lastmodifedby: userid,
        }).then((response) => {
          history.push("/");
          history.replace("users/userslist");
        });
      }
    } else {
      if (ev == 0) {
        toast.info(
          "User named: " + fullNamev + " with role: " + rolesv + " disabled"
        );
        put(`/accounts/updateUserStatus/${idv}`, {
          lockoutEnabled: 1,
        }).then((response) => {
          history.push("/");
          history.replace("users/userslist");
        });
      } else if (ev == 1) {
        toast.info(
          "User named: " + fullNamev + " with role: " + rolesv + " enabled"
        );
        put(`/accounts/updateUserStatus/${idv}`, {
          lockoutEnabled: 0,
        }).then((response) => {
          history.push("/");
          history.replace("users/userslist");
        });
      }
    }
  }
  const handleUpdate = () => {};
  return (
    <React.Fragment>
      <Dialog
        open={modalDelete}
        onClose={() => {
          setIsOpenModalDelete(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          Status
          <Button
            className="btn btn-secondary"
            onClick={() => {
              setIsOpenModalDelete(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
        </DialogTitle>
        <div style={{ width: "400px" }}>
          <DialogContent>
            {" "}
            <>
              <h4>
                Are you sure you want to change {rolesv}: " {fullNamev} "
                status?
              </h4>
            </>
          </DialogContent>
        </div>
        <DialogActions>
          <div className="modal-footer" style={{ width: "100%" }}>
            <div
              className="btn btn-secondary"
              onClick={() => {
                setIsOpenModalDelete(false);
              }}
            >
              No
            </div>
            <div
              className="btn cc-btn"
              onClick={() => {
                changeConfirm();
              }}
            >
              Yes
            </div>
          </div>
        </DialogActions>
      </Dialog>
      <Dialog
        open={modalReset}
        onClose={() => {
          setIsOpenModalReset(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="false"
      >
        <DialogTitle
          style={{ marginTop: "0px", color: "white", background: "#007bff" }}
          id="alert-dialog-title"
        >
          Reset Password
          <Button
            className="btn btn-secondary"
            onClick={() => {
              setIsOpenModalReset(false);
            }}
            style={{
              float: "right",
              background: "transparent",
              borderColor: "transparent",
              fontSize: "larger",
            }}
          >
            X
          </Button>
        </DialogTitle>
        <div style={{ width: "400px" }}>
          <DialogContent>
            {" "}
            <>
              <h4>
                Are you sure you want to reset {rolesv}: " {fullNamev} "
                password?
              </h4>
            </>
          </DialogContent>
        </div>
        <DialogActions>
          <div className="modal-footer" style={{ width: "100%" }}>
            <div
              className="btn btn-secondary"
              onClick={() => {
                setIsOpenModalReset(false);
              }}
            >
              No
            </div>
            <div
              className="btn cc-btn"
              onClick={() => {
                resetConfirm();
              }}
            >
              Yes
            </div>
          </div>
        </DialogActions>
      </Dialog>
      <h4>{props.title}</h4>
      <ToastContainer />
      <div className="row ">
        {props.data?.items?.map((data, index) => {
          return (
            <div className="col-md-3 pr-md-0">
              <Card className="shadow-sm bg-white rounded py-1 text-center">
                {/* <BiDotsVertical style={{ height: "2em", width: "32em" }} /> */}
                <Card.Img
                  class="rounded-circle mx-auto mt-3"
                  height="100px"
                  width="100px"
                  src={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Profile/${data.profileImage}`}
                />
                <Card.Body>
                  <h4 className="">
                    {data.titles} {data.firstName} {data.lastName}
                  </h4>
                  <h5>
                    {translate("ROLE")}:{data.roles}
                  </h5>
                  <h5>
                    {"Phone Number"}:{data.phoneNumber}
                  </h5>
                  <Button
                    onClick={() => {
                      handleReset(data.userId, data.fullName, data.username);
                    }}
                    className="btn cc-btn"
                  >
                    {translate("RESET_PASSWORD")}
                  </Button>
                  <hr></hr>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={data.lockoutEnabled ? false : true}
                        onChange={(e) =>
                          change(
                            data.lockoutEnabled,
                            data.userId,
                            data.fullName,
                            data.roles
                          )
                        }
                        name="data.lockoutEnabled"
                        color="primary"
                      />
                    }
                    label="Active"
                  />
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};
export default UserListing;
