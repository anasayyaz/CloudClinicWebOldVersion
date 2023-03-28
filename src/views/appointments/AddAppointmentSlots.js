import React, { useEffect, useRef, useState, useContext } from "react";
import XLSX from "xlsx";
import list, { post } from "../../_helper/api";
import LoadingSpinner from "../Components/LoadingSpinner";
import SchedulerService from "./SchedulerService";
import { v4 as uuid } from "uuid";
import TranslationContext from "../../context/translation";

const createTimeSlots = (startDateFormat, endDateFormat, date, duration) => {
  let slotsArray = [];

  const addMinutes = (date, minutes) => {
    return new Date(date?.getTime() + minutes * 60000);
  };

  while (true) {
    if (slotsArray.length === 0) 
    {
      slotsArray.push({
        start: startDateFormat,
        end: addMinutes(startDateFormat, duration),
      });
      // console.log("if 1")
    }
    if (slotsArray.length > 0 &&  endDateFormat.getTime() !== slotsArray[slotsArray.length - 1].end.getTime() ) {
      // console.log(slotsArray.length > 0 )
      // console.log(endDateFormat.getTime())
      //   console.log(slotsArray[slotsArray.length - 1].end.getTime())
      
      slotsArray.push({
        start: slotsArray[slotsArray.length - 1].end,
        end: addMinutes(slotsArray[slotsArray.length - 1].end, duration),
      });
      // console.log("if 2")
      // console.log(endDateFormat.getTime())
      // console.log(slotsArray[slotsArray.length - 1].end.getTime() )
    }
     if ( endDateFormat.getTime() === slotsArray[slotsArray.length - 1].end.getTime()  ) 

    {
      // console.log("if 3")
  
      // console.log(slotsArray);
      break;
    }
  }
  return slotsArray;
};
let range;
let totalSlotsArray = [];
const AddAppointmentSlots = () => {
  const [excelData, setExcelData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gapiLoading, setGapiLoading] = useState(false);
  const [slotsArray, setSlotsArray] = useState([]);
  const [error, setError] = useState("");
  const { translate } = useContext(TranslationContext);

  useEffect(() => {}, []);

  const addEventHandler = async () => {
    // console.log(totalSlotsArray);
    setError("");
    if (totalSlotsArray.length === 0) {
      setError("Please create slots before adding events.");
      return;
    }
    const ss = new SchedulerService();
    // setGapiLoading(true);
    let temp = 0;
    let totalSlots = 0;
    for (let i = 0; i < totalSlotsArray.length; i++) {
      totalSlots += totalSlotsArray[i].slots.length;
      for (let j = 0; j < totalSlotsArray[i].slots.length; j++) {
        // console.log("Hello from here");
        var event = {
          calendarId: totalSlotsArray[i].calendar_ID,
          summary: "Vacant Slot",
          start: {
            dateTime: totalSlotsArray[i].slots[j].start,
            timeZone: "America/Los_Angeles",
          },
          end: {
            dateTime: totalSlotsArray[i].slots[j].end,
            timeZone: "America/Los_Angeles",
          },
        };
        // console.log(event);
        const response = ss.AddThisEvent(event);
        await response.execute(async (event) => {
          // console.log(event);
          post(
            "visit",
            JSON.stringify({
              Title: "Vacant Slot",
              Patient_NationalID: null,
              Consultant_NationalID: totalSlotsArray[i].consultant_ID,
              SummaryNotes: null,
              StartDateTime: totalSlotsArray[i].slots[j].start,
              EndDateTime: totalSlotsArray[i].slots[j].end,
              meetinglink: event.id,
              VitalSignID: null,
              HistoryID: null,
              status: 0,
              meetingType: "Virtual",
              eventID: event.id,
            })
          ).then(() => {
            temp++;
            // console.log(temp);
            if (totalSlots === temp) {
              // setTimeout(window.location.reload(), 1000);
              // console.log(totalSlots, " ", temp);
            }
          });
        });
      }
    }
  };

  const getCalendarIDHandler = async () => {
    setError("");
    if (excelData.length === 0) {
      setError("Please upload a file.");
      return;
    }

    totalSlotsArray = [];
    // setIsLoading(true);
    for (let i = 0; i < excelData.length; i++) {
    //  console.log("one",i)
      const response = await list(
        `physician/${excelData[i].Consultant_National_ID}`
      );
  
     
      totalSlotsArray.push({
        consultant_ID: excelData[i]?.Consultant_National_ID,
        name: `${response?.data?.titles} ${response?.data?.name}`,
        calendar_ID: response?.data?.calendarID,
      });
    
    }
  
    
    for (let i = 0; i < excelData.length; i++) {
      // console.log("two",i)
      
       range = await createTimeSlots(

        excelData[i]?.Start_time,
        excelData[i]?.End_time,
        excelData[i]?.Date,
         30
      );

        totalSlotsArray[i].slots = range;
      //  console.log( totalSlotsArray[i].slots);
        // totalSlotsArray.push(range);
    }
// console.log("done");
    // setIsLoading(false);
    // console.log(totalSlotsArray);
    setTimeout(() => {
      addEventHandler();
  }, 1000);
  
  };

  const readExcel = (file) => {
    setError("");
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {
          type: "buffer",
          cellDates: true,
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
        // console.log(data);
        setExcelData(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      // console.log(d);
    });
  };

  return (
    <React.Fragment>
      {error && <h6 className="text-danger">{error}</h6>}
      <input
        type="file"
        id="xls_input"
        className="form-control py-1 px-1"
        onChange={(e) => readExcel(e.target.files[0])}
      />
   
       <a className=" btn cc-btn float-left mt-5" href="avatars/PhysicianSchedule.xlsx" download>{translate("DOWNLOAD_SAMPLE")}</a>
      <div className="d-flex justify-content-end mt-5">
     
        <button
          className="btn cc-btn pt-2 mr-2"
          onClick={getCalendarIDHandler}
        >
          {translate("CREATE_SLOTS")}
        </button>
      </div>
    </React.Fragment>
  );
};

export default AddAppointmentSlots;
