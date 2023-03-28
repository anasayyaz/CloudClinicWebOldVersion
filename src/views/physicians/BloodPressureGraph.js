import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CanvasJSReact from "../physicians/canvasjs.react";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BloodPressureGraph = (props) => {
  let sys_data = [];
  let dia_data = [];

  const [options, setOptions] = useState();
  const token = useSelector((state) => state.userReducer.token);
  const user_id = useSelector((state) => state.userReducer.users);
  const [errorText, setErrorText] = useState();
  const [sysData, setSysData] = useState([]);
  const [diaData, setDiaData] = useState([]);
  const [visitDate, setVisitDate] = useState([]);

  const getBloodPressureApi = async () => {
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
            setDiaData(data?.vitalsignGraph?.dia.split(","));
            setSysData(data?.vitalsignGraph?.sys.split(","));
            setVisitDate(data?.vitalsignGraph?.datetime.split(",")); 
          }
        });
      });
    } catch (err) {
      console.log(err);
      setErrorText(err);
    }
  };

  useEffect(() => {
    getBloodPressureApi();
  }, []);

  useEffect(() => {

    for (let i = 0; i < diaData.length; i++) {
      dia_data.push({ label: `${visitDate[i]}`, y: parseFloat(diaData[i]) });
      console.log("dia"+visitDate[i]);
      
    }

    for (let i = 0; i < diaData.length; i++) {
      sys_data.push({ label: `${visitDate[i]}`, y: parseFloat(sysData[i]) });
       console.log("sys"+visitDate[i]);
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
        labelAngle: 0,
        labelWrap :true,
        labelAutoFit:true,
       },
     
       axisY:{
        title: "mmHg",
    
       },
      data: [
        {
          showInLegend: true, 
          name: "sys",
          type: "column",
          dataPoints: sys_data,
        },
        {
          showInLegend: true, 
          name: "dia",
          type: "column",
          dataPoints: dia_data,
        },
      ],
    });
  }, [sysData, diaData, visitDate]);

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

export default BloodPressureGraph;
