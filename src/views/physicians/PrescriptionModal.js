import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';




export class PrescriptionModal extends Component {
    constructor(props) {
        super(props);


        this.state = {

        };



    }






    render() {
        return (
            <Modal

                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Please write your prescription
        </Modal.Title>
                </Modal.Header >
                <Modal.Body >
                    <div style={{
                        position: "relative", padding: "15px", width: "100%", overflow: "auto",
                        height: "400px", borderradius: "10px"
                    }}

                    >
                        <textarea style={{ padding: "20px", height: "100%", width: "100%" }} ></textarea>

                    </div>
                    <input type="button" value="Save" className="btn btn-primary pull-right" />
                </Modal.Body>

            </Modal>
        );
    }
}