import { Modal, Form, FormGroup, Button } from "react-bootstrap";

interface AddLifecoDialogProps {
  onDismiss: () => void;
}

const AddLifecoDialog = ({ onDismiss }: AddLifecoDialogProps) => {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add LIFECO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addLifecoForm">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>
          <FormGroup className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={5} placeholder="description" />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addLifecoForm">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLifecoDialog;
