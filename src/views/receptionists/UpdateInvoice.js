import React, { useEffect, useState,useContext } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import TranslationContext from "../../context/translation";

const UpdateInvoice = (props) => {
  const { translate } = useContext(TranslationContext)
  const history = useHistory();
  const [visitData, setVisitData] = useState();
  const [physicianPackages, setPhysicianPackages] = useState();
  const [newDiscount, setNewDiscount] = useState(null);
  const [newAmount, setNewAmount] = useState(null);
  const [newNetAmount, setNewNetAmount] = useState(null);
  const [newDiscamount, setNewDiscamount] = useState(null);
  const [newDiscountper, setNewDiscountper] = useState(null);
  const [showList, setShowList] = useState(null);
  const [showButton,setShowButton] = useState(null);
  const [newInvoiceNo, setNewInvoiceNo] = useState(null);
  const [newInvoiceDate, setNewInvoiceDate] = useState(null);
  const [cid, setid] = useState(null);
  const [newPackage, setNewPackage] = useState(null);
  const [newInvoiceStatus, setNewInvoiceStatus] = useState(null);

  const [selectPackage, setSelectPackage] = useState("null");
  const [invoiceDiscount, setInvoiceDiscount] = useState("null");
  const [error, setError] = useState();

  const token = useSelector((state) => state.userReducer.token);

  const getNetAmount = (fee, discount) => {
    let onePercent = fee / 100;
    let totalDiscount = onePercent * discount;
    return fee - totalDiscount;
  };

  const updateInvoiceApi = async (e) => {
    e.preventDefault();
    if (
      selectPackage == "null" ||
      invoiceDiscount == "null" ||
      invoiceDiscount == ""
    ) {
   
      setError("Plz Complete the form");
      return;
    }

    const selected_package = JSON.parse(selectPackage);

    const invoiceBody = {
      IsPaid: "true",
      InvoiceNo: 0,
      InvoiceDate: new Date(),
      Amount: selected_package.fee,
      DiscountPerc: invoiceDiscount,
      NetAmount: getNetAmount(selected_package.fee, invoiceDiscount),
      FeeID: selected_package.feeID,
    };

 

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}visit/updateInvoice/${props.visitID}`,
        {
          method: "PUT",
          body: JSON.stringify(invoiceBody),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        response.json().then((data) => {
   
          setInvoiceDiscount("");
          setNewNetAmount(invoiceBody.NetAmount);
          setNewDiscount(invoiceBody.discountAmount);
          setNewAmount(invoiceBody.Amount);
          setNewDiscountper(invoiceBody.discountPerc);
          setNewInvoiceNo(invoiceBody.InvoiceNo);
          setNewInvoiceDate(invoiceBody.InvoiceDate);
          setNewPackage(invoiceBody.package);
          setNewInvoiceStatus(invoiceBody.invoiceStatus);
        });
      });
      response.json();
    } catch (err) {
      setError(err.message);
    }
  };

  const getPhysicianPackageList = async (id) => {
    
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}physicianFee/getPhysicianFee/${id}`,
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
                setShowList(false);
                setShowButton(true);

              toast.info("No record found in system , kindly add packages")}
         
            else {
          
          
              setShowList(true);
              setShowButton(false);
              setPhysicianPackages(data);
           
            }
          }
        });
      });
      response.json();
    } catch (err) {
      setError(err.message);
    }
      
 
  };

  const getPatientVisitApi = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}visit/getVisitforInvoice/${props.visitID}`,
        {
          method: "GET",
          body: null,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        response.json().then((data) => {

          setid(data?.consultant_NationalID);
          if (data) {
            setVisitData(data);
          
            getPhysicianPackageList(data?.consultant_NationalID);
            
          }
        });
      });
    } catch (err) {
      setError(err.message);
    }
  };

  function  goToEdit  ()  {

    history.push(
      `/EditPhysician/${cid}`
    );
  
}
  useEffect(() => {
    
  }, [selectPackage]);

  useEffect(() => {
    getPatientVisitApi();
  }, []);

 
  return (
    <React.Fragment>
    <ToastContainer />
      {/* {error && <h4>{error}</h4>} */}
      <h4 className="text-left border-bottom pb-2">Update invoice</h4>
      <form className="pt-3">
      
      <div className="row my-2">
          <div className="col-md-3 text-left">
            <p className="m-0">{translate("VISIT_ID")}:</p>
            <h5>{`${visitData?.id}`}</h5>
          </div>
          <div className="col-md-3 text-left">
            <p className="m-0">{translate("PHYSICIAN")}:</p>
            <h5>{`${visitData?.consultant}`}</h5>
          </div>

          <div className="col-md-3 text-left">
            <p className="m-0">{translate("PATIENT_NAME")}:</p>
            <h5>{`${visitData?.patient}`}</h5>
          </div>
          <div className="col-md-3 text-left">
            <p className="m-0">{translate("PATIENT_ID")}:</p>
            <h5>{visitData?.patient_NationalID}</h5>
          </div>
        </div>

        <div className="row my-2">
          <div className="col-md-3 text-left">
            <p className="m-0">{translate("INVOICE_NO")}:</p>
            <h5>{`${newInvoiceNo || visitData?.invoiceNo}`}</h5>
          </div>
          <div className="col-md-6 text-left">
            <p className="m-0">{translate("INVOICE_DATE")}:</p>
            <h5>
            {new Date(`${visitData?.invoiceDate}`).toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</h5>
          </div>
          <div className="col-md-3 text-left">
            <p className="m-0">{translate("INVOICE_STATUS")}:</p>
            <h5>{`${newInvoiceStatus || visitData?.invoiceStatus}`}</h5>
          </div>
        </div>

        <div className="row my-2">
          <div className="col-md-6 text-left">
            <p className="m-0">{translate("DATE_OF_VISIT")}:</p>
            {/* <h5>{`${visitData?.startDateTime.split("T")[0]} ${
              visitData?.startDateTime.split("T")[1]
            }`}</h5> */}
            <h5>
            {new Date(`${visitData?.startDateTime}`).toLocaleString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
          
            </h5>
          </div>
          <div className="col-md-6 text-left">
            <p className="m-0">{translate("VISIT_DESCRIPTION")}:</p>
            <h5>{`${visitData?.initialComplain}`}</h5>
          </div>
        </div>



        <div className="row my-2">
        <div className="col-md-3 text-left">
        <h5><p className="m-0">{translate("PACKAGE")}:</p></h5>
          </div>
          <div className="col-md-3 text-left">
          <h5>{`${newPackage || visitData?.package}`}</h5>
          </div>
        <div className="col-md-3 text-left">
        <h5><p className="m-0">{translate("AMOUNT")}:</p></h5>
        <h5><p className="m-0">{translate("DISCOUNT")} %:</p></h5>
        <h5><p className="m-0">{translate("DISCOUNT")}:</p></h5>
        <h5><p className="m-0">{translate("NET_AMOUNT")}:</p></h5>
          </div>
          <div className="col-md-3 text-left">
            <h5>{newAmount|| visitData?.amount}</h5>
            <h5>{newDiscountper || visitData?.discountPerc}</h5>
            <h5>{newDiscamount || visitData?.discountAmount}</h5>
            <h5>{newNetAmount || visitData?.netAmount}</h5>
          </div>

        </div>
        <div style={{borderTop: "2px solid #b3b6b9"}}></div>
        <div className="row my-2">
        
        <div className="col-md-6 text-left">
        {showList ? (
   <div>
   
            <label>{translate("SELECT_PACKAGE")}:</label>
            <select
              className="form-select w-100 py-2 rounded"
              onChange={(e) => setSelectPackage(e.target.value)}
              aria-label="Default select example"
            >
              <option selected value="null">
              {translate("SELECT_PACKAGE")}
              </option>
              {physicianPackages &&
                physicianPackages.map((data, index) => (
                  <option key={data.feeID} value={JSON.stringify(data)}>
                    {data.description} / {data.fee}
                  </option>
                ))}
               
    );
            </select>
            </div>
            ) : null}
             {showButton ? (
<div>
<label>{translate("NO_PACKAGE_AVAILABLE")}:</label>
<button class="w-100 border-0  shadow btn cc-btn" onClick={goToEdit}>
          {translate("ADD_PACKAGE")}
        </button>
  </div>

) : null}
          </div>

          <div className="col-md-6 text-left">
            <label>{translate("DISCOUNT_PERC")}:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder={translate("DISCOUNT_PERC")}
              value={invoiceDiscount}
              onChange={(event) => {
                setInvoiceDiscount(event.target.value);
              }}
            />
          </div>


        </div>
        <button className="btn cc-btn mt-3 px-4 w-100" onClick={updateInvoiceApi}>
        {translate("UPDATE")}
        </button>
      </form>
    </React.Fragment>
  );
};

export default UpdateInvoice;
