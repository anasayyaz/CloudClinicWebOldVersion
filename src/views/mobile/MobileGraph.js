import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CanvasJSReact from "../physicians/canvasjs.react";
import Dimensions from 'react-dimensions';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MobileGraph = (props) => {
  let graphData = [];

  const [options, setOptions] = useState();
//   const token = useSelector((state) => state.userReducer.token);
  const user_id = useSelector((state) => state.userReducer.users);
  const [errorText, setErrorText] = useState();
  const [data, setData] = useState([]);
  const [visitDate, setVisitDate] = useState([]);

  const getQTValueApi = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}VitalSign/getPatienttemp/${props.match.params.id}`,
        {
          method: "GET",
          body: null,
          headers: {
            Authorization: `Bearer ${props.match.params.token}`,
          },
        }
      ).then((response) => {
        response.json().then((data) => {
          if (data) {
            setVisitDate(data?.vitalsignGraph?.datetime.split(","));
            setData(data?.vitalsignGraph?.temp.split(","));
          }
        });
      });
    } catch (err) {
      console.log(err);
      setErrorText(err);
    }
  };

  useEffect(() => {
   
    getQTValueApi();
  }, []);

  useEffect(() => {
    console.log(data);
    console.log(visitDate);

    for (let i = 0; i < data.length; i++) {
      graphData.push({ label: `${visitDate[i]}`, y: parseFloat(data[i]) });
    }

    setOptions({
       width:Dimensions.width,//in pixels
      height:Dimensions.height,//in pixels
       legend: {
     horizontalAlign: "center", // left, center ,right 
     verticalAlign: "top",  // top, center, bottom
   },
      dataPointMaxWidth: 20,
      axisX:{
         title: "Visit Date",
            labelAngle: 0,
        labelWrap :true,
        labelAutoFit:true,
       },
       axisY:{
        title: "Fahrenheit",
       },
      data: [
             {
          type: "column",
          color:"#36a9f7",
          dataPoints: graphData,
        },
      ],
    });

console.log(graphData);
  }, [data, visitDate]);

  return (
    
        <CanvasJSChart
          options={options}
        />
    
  );
};

export default MobileGraph;
