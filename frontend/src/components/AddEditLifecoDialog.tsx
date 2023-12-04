import { Modal, Form, Button } from "react-bootstrap";
import { InterfaceLifeco } from "../models/lifeco";
import { useForm } from "react-hook-form";
import * as LifecoApi from "../../network/lifecos_api";

interface AddEditLifecoDialogProps {
  lifecoToEdit?: InterfaceLifeco;
  onDismiss: () => void;
  onLifecoSaved: (lifeco: InterfaceLifeco) => void;
}

const AddEditLifecoDialog = ({
  lifecoToEdit,
  onDismiss,
  onLifecoSaved,
}: AddEditLifecoDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InterfaceLifeco>({
    defaultValues: {
      title: lifecoToEdit?.title || "",
      desc: lifecoToEdit?.desc || "",
    },
  });

  async function onSubmit(input: InterfaceLifeco) {
    try {
      let lifecoResponse: InterfaceLifeco;

      if (lifecoToEdit) {
        lifecoResponse = await LifecoApi.updateLifeco(lifecoToEdit._id!, input);
      } else {
        lifecoResponse = await LifecoApi.createLifeco(input);
      }

      onLifecoSaved(lifecoResponse);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{lifecoToEdit ? "Edit LIFECO" : "Add LIFECO"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditLifecoForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="description"
              {...register("desc")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="addEditLifecoForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditLifecoDialog;
