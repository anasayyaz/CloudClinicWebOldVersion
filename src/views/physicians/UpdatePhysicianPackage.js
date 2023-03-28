import React, { useState,useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePackage } from "../../redux/packages/actions";
import TranslationContext from "../../context/translation";

const UpdatePhysicianPackage = (props) => {
  const [packageDescription, setPackageDescription] = useState(props.feeID.desc);
  const [packageFee, setPackageFee] = useState(props.feeID.fee);
  const [error, setsetError] = useState();
  const [updateID, setUpdateID] = useState();
  const { translate } = useContext(TranslationContext)
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);


  const updatePhysicianPackageApi = async (e) => {
    e.preventDefault();
    const updateBody = {
      Consultant_NationalID: props.nationalID,
      Description: packageDescription,
      Fee: packageFee,
      FeeID: props.feeID.id,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}physicianFee/${props.feeID.id}`,
        {
          method: "PUT",
          body: JSON.stringify(updateBody),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        response.json().then((data) => {
          if (data) {
            dispatch(updatePackage(updateBody));
          }
        });
      });
      
      setPackageDescription("");
      setPackageFee("");
    } catch (err) {
      setsetError(err.message);
    }
    
    dispatch(updatePackage(updateBody));
  };

  return (
    <React.Fragment>
      {error && <h4>{error}</h4>}
      <form onSubmit={updatePhysicianPackageApi}>
        <div className="form-group">
          <label for="exampleInputEmail1">{translate("DESCRIPTION")}</label>
          <input
            required
            type="text"
            className="form-control"
            id="description"
            placeholder={translate("DESCRIPTION")}
            value={packageDescription}
            onChange={(event) => {
              setPackageDescription(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">{translate("FEE")}</label>
          <input
          required
            type="number"
            className="form-control"
            id="price"
            placeholder={translate("FEE")}
            value={packageFee}
            onChange={(event) => {
              setPackageFee(event.target.value);
            }}
          />
        </div>
        <button type="submit" className="border-0 btn btn-md cc-btn">
        {translate("SUBMIT")}
        </button>
      </form>
    </React.Fragment>
  );
};

export default UpdatePhysicianPackage;
