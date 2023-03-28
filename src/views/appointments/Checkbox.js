import React from "react";
import { Row, Col } from "react-bootstrap";
import {FormControlLabel, Checkbox as InputCheck} from '@material-ui/core';


export const CheckBox = (props) => {
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log("Event Style Box", event);
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: event.backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };
  return (
      <li
        className="list-group-item text-break"
      >
        <FormControlLabel
          style={{margin:"-25px -20px"}}
          key={props.id}
          control={
            <InputCheck 
              style={{color: props.backgroundColor}}
              checked={props.isChecked} 
              defaultChecked={props.defaultChecked ? props.defaultChecked : false}
              value={props.id}
              onChange={props.handleCheckChildElement}
            />
          }
          label={props.name}
          labelPlacement="end"
        />
      </li>
  );
};

export default CheckBox;
