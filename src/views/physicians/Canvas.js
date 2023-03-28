import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const token = useSelector((state) => state.userReducer.token);
let x,y;
  const [errorText, setErrorText] = useState();
  const [data, setData] = useState([]);
  const getECGValueApi = async () => {
    try {
      const response = await fetch(
        `https://cloudclinicdevapi.azurewebsites.net/api/vitalsign/getPatientVitalSignbyVisit/${props.id}`,
        {
          method: "GET",
          body: null,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((response) => {
        response.json().then((data) => {
            if (data == "Sorry, no luck, No Data Found in our system!") {
              setErrorText("No ECG Data Found in our system!");
            } else {
              setData(data.ecg && data.ecg.split(","));
            }
        });
      });
    } catch (err) {
      // alert(err);
    }
  };

  useEffect(() => {
    getECGValueApi();
  }, []);

  useEffect(() => {
    // console.log(data);

     const canvas = canvasRef.current;
      var ctx = canvas.getContext("2d"),
      w = canvas.width,
      h = canvas.height,
      px = 0,
      opx = 0,
      speed = 1,
      py = h * 0.8,
      opy = py,
      scanBarWidth = 20;
      //  ctx.transform(1, 0, 0, -1, 0, canvas.height);
      ctx.strokeStyle = "#202020";
           ctx.lineWidth = 1;
       
 
  // for (x=0;x<=w;x+=40) {
  //       for (y=0;y<=h;y+=40) {
  //           ctx.moveTo(x, 0);
  //           ctx.lineTo(x, h);
  //           ctx.stroke();
  //           ctx.moveTo(0, y);
  //           ctx.lineTo(w, y);
  //           ctx.stroke();
  //       }
  //   }


    var i = 0;
    function PYval() {
      py = -data[i] /10+200;
      i=i+4;
      if (i == data.length - 1) i = 0;
    }
    loop();


    function loop() {
    
  

    ctx.strokeStyle = "#00bd00";
    ctx.lineWidth = 4;
      PYval();
      px=px+2;
      ctx.beginPath();
      ctx.moveTo(opx, opy);
      ctx.lineTo(px, py);
      ctx.stroke();
      
      

      opx = px;
      opy = py;
      if (opx-80 == w) {
         ctx.clearRect(0, 0, w, h);
        px = opx = 0;
   
           ctx.strokeStyle = "#202020";
     ctx.lineWidth = 1;
  // for (x=0;x<=w;x+=40) {
  //       for (y=0;y<=h;y+=40) {
  //           ctx.moveTo(x, 0);
  //           ctx.lineTo(x, h);
  //           ctx.stroke();
  //           ctx.moveTo(0, y);
  //           ctx.lineTo(w, y);
  //           ctx.stroke();
  //       }
  //   }
     
      }

      requestAnimationFrame(loop);
     

    }
  }, [data]);

  return (
    <React.Fragment>
      <canvas
        ref={canvasRef}
        width="800"
        height="400"
        style={{
          backgroundColor: "black",
        }}
      />
    </React.Fragment>
  );
};

export default Canvas;
