import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import TranslationContext from "../../context/translation";

export class LabResultsModal extends Component {
  static contextType = TranslationContext;
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { translate } = this.context;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {translate("LAB_RESULTs")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              position: "relative",
              padding: "15px",
              width: "100%",
              overflow: "auto",
              height: "auto",
              borderradius: "10px",
            }}
          ></div>
        </Modal.Body>
      </Modal>
    );
  }
}
