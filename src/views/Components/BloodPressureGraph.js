import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CanvasJSReact from "../physicians/canvasjs.react";
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BloodPressureGraph = (props) => {
  let sys_data = [];
  let dia_data = [];
let h,w;
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
 
     h=300;
    if(window.innerWidth>=2133 && window.innerHeight>=1076)
    {
      w=420;
        h=350;
    }
    else if(window.innerWidth>=1920 && window.innerHeight>=969)
    {
      w=400;
    }
     else if(window.innerWidth>=1745 && window.innerHeight>=881)
    {
      w=350;
    }
     else if(window.innerWidth>=1536 && window.innerHeight>=775)
    {
      w=300;
    }
       else if( window.innerWidth>1000 && window.innerWidth<=1500)
    {
      w=380;
    }
      else if( window.innerWidth<=1000)
    {
      w=500;
    }

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
       width:w,//in pixels
       height:h,//in pixels
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
    <div className={"my-modal-custom-class"}>
      {options && (
        <CanvasJSChart
          options={options}
        />
      )}
    </div>
  );
};

export default BloodPressureGraph;
