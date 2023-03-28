import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Dropdown } from "react-bootstrap";
import { uuid } from "uuidv4";
import list, { post } from "../../_helper/api";

const AddEventModal = ({ show, handleClose, calendars }) => {
  const [formData, setFormData] = useState({
    Id: uuid(),
    Title: "",
    SummaryNotes: "",
    Consultant_NationalID: "",
    Patient: "",
    StartDateTime: "2020-08-25T09:00:00-05:00",
    EndDateTime: "2020-08-25T10:00:00-05:00",
    meetinglink: "2020-08-25T10:00:00-05:00",
  });
  const [isreload, setisreload] = useState(false);
  const [ConsultantName, setConsultantName] = useState("");
  const [Cdata, setCdata] = useState([]);

  const {
    Id,
    Title,
    SummaryNotes,
    Consultant_NationalID,
    Patient,
    StartDateTime,
    EndDateTime,
    meetinglink,
  } = formData;
  // console.log("Form Data", formData);

  useEffect(function effectFunction() {
    list("physician").then((response) => {
      setCdata(response.data);
    });
  }, []);

  function createVisit(e) {
    post("visit", e);
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    props.history.push("appointments/Appointmens");
    e.preventDefault();
    // console.log(formData);
    createVisit("Create Visit Form Data", formData);
    setisreload(true);
    handleClose();
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: white;
      color: #3c4b64;
    }
    `}
      </style>
      <Button
        className="form-control"
        variant="flat"
        size="space"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        &#x25bc;
      </Button>
    </>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul
            className="list-unstyled"
            style={{ minWidth: "33em", textAlign: "left", paddingLeft: "2em" }}
          >
            {children.map((child) => {
              return (
                <>
                  <a
                    href="#top"
                    style={{
                      color: "#736767",
                      borderBottom: "1px solid darkgrey",
                      minWidth: "33em !important",
                    }}
                    id="ConsultantId"
                    name="ConsultantId"
                    value={child.props.eventKey}
                    onClick={(e) => {
                      e.preventDefault();
                      // console.log(child.props.eventKey);
                      setFormData({
                        ...formData,
                        Consultant_NationalID: child.props.eventKey,
                      });
                      setConsultantName(child.props.children);
                    }}
                  >
                    {child.props.children}
                  </a>
                  <br />
                </>
              );
            })}
          </ul>
        </div>
      );
    }
  );
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              id="Title"
              name="Title"
              value={Title}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Patient">Patient</label>
            <input
              type="text"
              id="Patient"
              name="Patient"
              value={Patient}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Patient">Calendar</label>
            <input
              type="text"
              id="Patient"
              name="Patient"
              value={Patient}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Patient">Consultant</label>
            <Dropdown>
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              >
                {!ConsultantName ? "Select a Consultant" : ConsultantName}
              </Dropdown.Toggle>

              <Dropdown.Menu as={CustomMenu}>
                {Cdata.map((item) => {
                  return (
                    <Dropdown.Item
                      eventKey={item.NationalID}
                      key={item.NationalID}
                      className="form-control"
                    >
                      {item.Name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="form-group">
            <label htmlFor="SummaryNotes">Summary Notes</label>
            <input
              type="text"
              id="SummaryNotes"
              name="SummaryNotes"
              value={SummaryNotes}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="StartDateTime">Start Date</label>
            <input
              type="text"
              id="StartDateTime"
              name="StartDateTime"
              value={(StartDateTime, meetinglink)}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="EndDateTime">End Date</label>
            <input
              type="text"
              id="EndDateTime"
              name="EndDateTime"
              value={EndDateTime}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddEventModal;
