import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import { BiDotsVertical } from "react-icons/bi";
let domain = localStorage.getItem("domain");
const ProfileListing = (props) => {
  const history = useHistory();

  return (
   
    <React.Fragment>
      <h4>{props.title}</h4>
      <div className="row ">
     
        {props.data?.items?.map((data, index) => {
          return (
            <div className="col-md-3 pr-md-0">
              <Card className="shadow-sm bg-white rounded py-2 text-center">
                {/* <BiDotsVertical style={{ height: "2em", width: "32em" }} /> */}
                <Card.Img
                  class="rounded-circle mx-auto mt-3"
                  height="100px"
                  width="100px"
                  src={`https://cloudclinicdevapi.azurewebsites.net/media/${domain}/Profile/${data.profileImage}`}
                />
                <Card.Body>
                  <h4 className="">{data.titles}{" "}{data.name}</h4>
                  <h5>{data.title ? <div>{data.title} </div> : "N/A"}</h5>
                  <h5>{data.phone ? <div>{data.phone} </div> : "N/A"}</h5>
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
                  <button
                    className="btn cc-btn"
                    onClick={() =>
                      history.push(`/EditPhysician/${data.nationalID}`)
                    }
                  >
                    View Profile
                  </button>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};
export default ProfileListing;
