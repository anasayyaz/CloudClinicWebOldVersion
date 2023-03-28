import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControlLabel,
    Switch,
  } from "@material-ui/core";
const PreviousVisits = (props) => {
 
  const token = useSelector((state) => state.userReducer.token);
 

  const getPIValueApi = async () => {
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
            setData(data?.vitalsignGraph?.pi.split(","));
          }
        });
      });
    } catch (err) {
    setErrorText(err);
    }
  };

  useEffect(() => {
    getPIValueApi();
  }, []);

  useEffect(() => {
 

 

  }, []);

  return (
    <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Visit ID</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Doctors Name</TableCell>
                    <TableCell align="left">Prescription</TableCell>
                    <TableCell align="left">Assessment</TableCell>
                    <TableCell align="left">Referred To</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 &&
                    rows.map((row) => {
                      return (
                        <TableRow key={row.patient_id}>

                          <TableCell align="left">{row.id}</TableCell>
                          <TableCell align="left">{row.title}</TableCell>
                          <TableCell align="left">
                            {row.consultant_name}
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="btn cc-btn"
                              onClick={() => {
                               getP(row.id);

                                setIsOpenPrescriptionTable(true);
                              }}
                            >
                              Prescription
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="btn  cc-btn"
                              onClick={() => {
                                getA(row.id,row.initialComplain);
                                setIsOpenA(true);
                              }}
                            >
                              {translate("DIAG_PLAN")}
                            </Button>
                          </TableCell>
                          <TableCell align="left">{row.refered_to}</TableCell>
                          <TableCell align="left">
                            <span>
                              {new Date(row.start_date).toLocaleString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="btn cc-btn"
                              onClick={() => {
                                getIntake(row.id);
                                setIsOpenIntakeHistory(true);
                              }}
                            >
                              {translate("INTAKE_HISTORY")}
                            </Button>
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              className="btn cc-btn"
                              onClick={() => {
                                getVitals(row.id);

                              }}
                            >
                              Vital Signs
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
  );
};

export default PreviousVisits;
