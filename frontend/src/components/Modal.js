import { Modal, Button } from "react-bootstrap";
import axios from "axios";

export function MyVerticallyCenteredModal({ show, onHide, type, id }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cancel {type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontSize: "18px" }}>
          <b>Are you sure you want to cancel?</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
