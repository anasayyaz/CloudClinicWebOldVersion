import React, { useEffect, useContext } from "react";
import "./PrescriptionPrint.css";
import list, { put, post } from "../../_helper/api";
const ReceiptPrint = (props) => {
  const [token,setToken] = React.useState(0);
  useEffect(() => {
   
    list("patient/patientsTodayVisitsFilter", {
      pageNumber: 1,
      pageSize: 10,
      QuerySearch: "",
      StartDate: new Date(),
      EndDate: new Date(),
      isConfirm: "",
      locationID: "",
    })
      .then((response) => {
        setToken(response.data.paginationMetadata.totalCount+1);
        
      })
      .catch((error) => {
        console.error("Error during service worker registration:", error);
      });
  });


  return (
    <div id="printableArea" className="px-3" style={{height:"auto"}}>

      {/* <div className="bg-white ml-5">
          <img
            src="https://media.istockphoto.com/vectors/rx-pharmacy-medicine-icon-on-white-background-flat-style-rx-symbol-vector-id896913162?k=20&amp;m=896913162&amp;s=612x612&amp;w=0&amp;h=9zdpw9WoUW9X8miCnd2HH56VdsAFdJdyLXzo8-Jrsac="
            alt="RX"
            className="prescription_rxImg"
          />
        </div> */}

      {/* <div className="prescriptionBorderLight mt-5">
        </div> */}
      <div style={{ borderTop: "2px solid #000 ", marginLeft: 20, marginRight: 20 }}></div>

      {/* <div className="d-flex justify-content-around align-items-baseline bg-light p-3 ">
        <p className="h5 m-0 text-dark">Name: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{props.patientName}</span></p>

        <p className="h5 m-0 text-dark">Visit Timing: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{new Date(props.std).toLocaleString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}</span></p>
        <p className="h5 m-0 text-dark">#: <span className="font-weight-bold" style={{ color: "rgb(39, 122, 210)" }}>{props.id}</span></p>
      </div> */}
      <React.Fragment>

        <React.Fragment >
          <p className="m-0 text-white" style={{ fontSize: "0.1rem" }}>
            <small>...</small>
          </p>


          <div className=" justify-content-around align-items-baseline  p-3 ">
            <div className="row ml-1">
              <div className="col-md-6  ">
                <div className="row ">
                  <div className="col-md-4 ">
                    <h3 className="mb-1 text-center font-weight-bold  " style={{
                      width: 120,
                      height: 30,

                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: 'black',
                      borderStyle: 'solid',

                      justifyContent: 'center'
                    }}>
                      Token #:

                    </h3>
                  </div>
                  <div className="col-md-6 "> <h3 className="mb-1 text-center font-weight-bold" style={{
                      width: 120,
                      height: 30,

                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: 'black',
                      borderStyle: 'solid',

                      justifyContent: 'center'
                    }}>
                    {token}
                  </h3></div>
                </div></div></div>
            <div className="row ml-1">
              <div className="col-md-6  ">
                <div className="row">
                  <div className="col-md-4 ">
                    <p className="mb-1 text-left font-weight-bold">
                      Name:

                    </p>
                  </div>
                  <div className="col-md-6 "> <p className="mb-1 text-left font-weight-bold">
                    {props.patientName}
                  </p></div>
                </div></div></div>
            <div className="row ml-1">
              <div className="col-md-6  ">
                <div className="row">
                  <div className="col-md-4 ">
                    <p className="mb-1 text-left font-weight-bold">
                      Age / Gender:

                    </p>
                  </div>
                  <div className="col-md-6 "> <p className="mb-1 text-left font-weight-bold">
                    {props.age}{" / "}{props.gender}
                  </p></div>
                </div></div></div>
            <div className="row ml-1">
              <div className="col-md-6  ">
                <div className="row">
                  <div className="col-md-4 ">
                    <p className="mb-1 text-left font-weight-bold">
                      Conatct#:

                    </p>
                  </div>
                  <div className="col-md-6 "> <p className="mb-1 text-left font-weight-bold">
                    {props.phone}
                  </p></div>
                </div></div></div>
            <div className="row ml-1">
              <div className="col-md-6  ">
                <div className="row">
                  <div className="col-md-4 ">
                    <p className="mb-1 text-left font-weight-bold">
                      Doctor:

                    </p>
                  </div>
                  <div className="col-md-6 "> <p className="mb-1 text-left font-weight-bold">
                    {props.doctorName}
                  </p></div>
                </div></div></div> <div className="row ml-1">
              <div className="col-md-6  ">
                <div className="row">
                  <div className="col-md-4 ">
                    <p className="mb-1 text-left font-weight-bold">
                      Speciality

                    </p>
                  </div>
                  <div className="col-md-6 "> <p className="mb-1 text-left font-weight-bold">
                    {props.speciality}
                  </p></div>
                </div></div></div> <div className="row ml-1 mb-2">
              <div className="col-md-6  ">
                <div className="row">
                  <div className="col-md-4 ">
                    <p className="mb-1 text-left font-weight-bold">
                      Order Time:

                    </p>
                  </div>
                  <div className="col-md-6 "> <p className="mb-1 text-left font-weight-bold">
                    {new Date(props.std).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p></div>
                </div></div></div>

            <div style={{ borderTop: "2px solid #000 ", marginLeft: 20, marginRight: 20 }}></div>
            <div className="row ml-5 mt-2">   <div className="col-md-6  ">
              <p className="mb-1 text-left font-weight-bold">
                Profile /  Tests:

              </p>
            </div>
              <div className="col-md-6 ">
                <p className="mb-1 text-left font-weight-bold">
                  Amount:
                </p>
              </div></div>

            <div className="row ml-5">   <div className="col-md-6  ">
              <p className="mb-1 text-left font-weight-bold">


                Consultancy

              </p>
            </div>
              <div className="col-md-6 ">
                <p className="mb-1 text-left font-weight-bold">


                  {props.amount}

                </p>
              </div></div>
            <div style={{ borderTop: "2px solid #000 ", marginLeft: 20, marginRight: 20 }}></div>

            {/* <div className="col-md-2 section_01">
              <p className="mb-1 text-left font-weight-bold">
                ID: <br />
                <span
                  className="h4 font-weight-bold"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.id}
                </span>
              </p>
            </div>
            <div className="col-md-2 section_01">
              <p className="mb-1 text-left font-weight-bold">
                Visit Reason: <br />
                <span
                  className="h4 font-weight-bold"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.Title}
                </span>
              </p>
            </div>
            <div className="col-md-2 section_01">
              <p className="mb-1 text-left font-weight-bold">
                Visit Type: <br />
                <span
                  className="h4 font-weight-bold"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.meetingType}
                </span>
              </p>
            </div>
            <div className="col-md-2 section_02">
              <p className="mb-1 text-left font-weight-bold">
                Total Amount: <br />
                <span
                  className="h4 font-weight-bold"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.amount}
                </span>
              </p>
            </div>
            <div className="col-md-2 section_03">

              <p className="mb-1 text-left font-weight-bold">
                Doctor Name <br />
                <span
                  className="font-weight-bold h5"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.doctorName}
                </span>
              </p>
            </div>
            <div className="col-md-2 section_03">

              <p className="mb-1 text-left font-weight-bold">
                Speciality <br />
                <span
                  className="font-weight-bold h5"
                  style={{ color: "rgb(39, 122, 210)" }}
                >
                  {props.speciality}
                </span>
              </p>
            </div> */}


            <div className="row ml-5 mt-2">   <div className="col-md-6  ">

            </div>
              <div className="col-md-6  ">
                <div className="row">
                  <div className="col-md-6 ">
                    <p className="mb-1 text-left font-weight-bold">
                      Net Amount:

                    </p>
                  </div>
                  <div className="col-md-6 ">
                    <p className="mb-1 text-left font-weight-bold">{props.amount}</p>

                  </div>
                </div></div></div>
            {/* <div className="row ml-5">   <div className="col-md-6  ">

            </div>
              <div className="col-md-6  ">
                <div className="row">
                  <div className="col-md-6 ">
                    <p className="mb-1 text-left font-weight-bold">
                      Net Paid:

                    </p>
                  </div>
                  <div className="col-md-6 "> <p className="mb-1 text-left font-weight-bold">

                    1500
                  </p></div>
                </div></div></div> */}
            {/* <div className="row ml-5">   <div className="col-md-6  ">

            </div>
              <div className="col-md-6  ">
                <div className="row">
                  <div className="col-md-6 ">
                    <p className="mb-1 text-left font-weight-bold">
                      Net Concession:

                    </p>
                  </div>
                  <div className="col-md-6 "> <p className="mb-1 text-left font-weight-bold">
                    500
                  </p></div>
                </div></div></div> */}
            {/* <div className="row ml-5">   <div className="col-md-6  ">

            </div>
              <div className="col-md-6  ">
                <div className="row">
                  <div className="col-md-6 ">
                    <p className="mb-1 text-left font-weight-bold">
                      Final Balance:

                    </p>
                  </div>
                  <div className="col-md-6 "> <p className="mb-1 text-left font-weight-bold">
                    0
                  </p></div>
                </div></div>
                </div> */}


          </div>
          {/* <div className="prescriptionBorderLight mt-1">
          </div> */}


          <div style={{ borderTop: "2px solid #000 ", marginLeft: 20, marginRight: 20 }}></div>
        </React.Fragment>

      </React.Fragment>


    </div>
  );
};

export default ReceiptPrint;
