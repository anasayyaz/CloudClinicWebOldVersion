import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CanvasJSReact from "../physicians/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const QTCGraph = (props) => {
  let graphData = [];

  const [options, setOptions] = useState();
  const token = useSelector((state) => state.userReducer.token);
  const user_id = useSelector((state) => state.userReducer.users);
  const [errorText, setErrorText] = useState();
  const [data, setData] = useState([]);
  const [visitDate, setVisitDate] = useState([]);

  const getQTCValueApi = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}VitalSign/getPatienttemp/${props.patient_id}`,
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
            setVisitDate(data?.vitalsignGraph?.datetime.split(","));
            setData(data?.vitalsignGraph?.qtc.split(","));
          }
        });
      });
    } catch (err) {
      console.log(err);
      setErrorText(err);
    }
  };

  useEffect(() => {
    getQTCValueApi();
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(visitDate);

    for (let i = 0; i < data.length; i++) {
      graphData.push({ label: `${visitDate[i]}`, y: parseFloat(data[i]) });
    }

    setOptions({
       width:400,//in pixels
      height:350,//in pixels
       legend: {
     horizontalAlign: "center", // left, center ,right 
     verticalAlign: "top",  // top, center, bottom
   },
      dataPointMaxWidth: 20,
      axisX:{
        // title: "Visit Date",
            labelAngle: 0,
        labelWrap :true,
        labelAutoFit:true,
       },
       axisY:{
        title: "milliseconds"
        
       },
      data: [
             {
          type: "column",
          color:"#36a9f7",
          dataPoints: graphData,
        },
      ],
    });

  }, [data, visitDate]);

  return (
    <div className="w-100">
      {options && (
        <CanvasJSChart
          options={options}
        />
      )}
    </div>
  );
};

export default QTCGraph;
