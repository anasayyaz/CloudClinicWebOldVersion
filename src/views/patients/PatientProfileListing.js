import React from "react";
import { Card, Button } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import { useHistory } from "react-router-dom";
const ProfileListing = (props) => {
  const history = useHistory();
  return (
    <div>
      <h4>{props.title}</h4>
      <div className="row ">
        {props.data?.items?.map((data, index) => {
          return (
            <div className="col-md-3 pr-md-0">
              <Card
                className="shadow-sm bg-white rounded text-center"
              >
                <Card.Img
                  class="rounded-circle mx-auto mt-3"
                  height="100px"
                  width="100px"
                  src={`https://cloudclinicdevapi.azurewebsites.net/Profile/${data.profileImage}`}
                />
                <Card.Body>
                  <h4>
                    {data.name ? (
                      <div>
                        {data.title} {data.name}{" "}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </h4>
                  <h6>{data.phone ? <div>{data.phone} </div> : "N/A"}</h6>
                  <h6>
                    {data.address ? (
                      <div>
                        <MdLocationOn viewBox="0 2.5 24 24" />
                        {data.address}{" "}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </h6>
                  <h6>{data.dob ? <div>{data.dob} </div> : "N/A"}</h6>
                  <button
                    className="btn btn-primary m-1"
                    onClick={() =>
                      history.push(`/patient/patientsVisits/${data.nationalID}`)
                    }
                  >
                    Previous Visits
                  </button>
                  <button
                    className="btn btn-primary m-1"
                    onClick={() =>
                      history.push(`/EditPatient/${data.nationalID}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary m-1"
                    onClick={() =>
                      history.push(
                        `/appointments/Appointments/${data.nationalID}`
                      )
                    }
                  >
                    Make an Appointments
                  </button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProfileListing;
