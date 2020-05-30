import React from "react";
import {Modal} from "react-bootstrap";

function ModalComponent(props) {
	return (
		<Modal
      size="md"
      show={props.show}
      onHide={props.closeModal}
			aria-labelledby="example-modal-sizes-title-sm"
	  >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{props.children}</div>
      </Modal.Body>
	  </Modal>
	);
}

export default ModalComponent;