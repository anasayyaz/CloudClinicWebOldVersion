import React, { useState,useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewPackage } from "../../redux/packages/actions";
import TranslationContext from "../../context/translation";

const AddPhysicianPackage = (props) => {
  const [packageDescription, setPackageDescription] = useState();
  const [packageFee, setPackageFee] = useState();
  const [error, setsetError] = useState();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);
  const { translate } = useContext(TranslationContext)

  const postPhysicianPackageApi = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}physicianFee`,
        {
          method: "POST",
          body: JSON.stringify({
            Consultant_NationalID: props.nationalID,
            Description: packageDescription,
            Fee: packageFee,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        response.json().then((data) => {
          if (data) {
            dispatch(addNewPackage(data));
          }
        });
      });

      setPackageDescription("");
      setPackageFee("");
    } catch (err) {
      setsetError(err.message);
    }
  };

  return (
    <React.Fragment>
      {error && <h4>{error}</h4>}
      <form onSubmit={postPhysicianPackageApi}>
        <div className="form-group">
          <label for="exampleInputEmail1">{translate("DESCRIPTION")}</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder={translate("DESCRIPTION")}
            value={packageDescription}
            onChange={(event) => {
              setPackageDescription(event.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">{translate("FEE")}</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder={translate("FEE")}
            value={packageFee}
            onChange={(event) => {
              setPackageFee(event.target.value);
            }}
            required
          />
        </div>
        <button type="submit" className="border-0 btn btn-md cc-btn">
        {translate("SUBMIT")}
        </button>
        <button type="close" className="border-0 btn btn-md cc-btn ml-3" data-dismiss="modal">
        {translate("CLOSE")}
        </button>
      </form>
    </React.Fragment>
  );
};

export default AddPhysicianPackage;
