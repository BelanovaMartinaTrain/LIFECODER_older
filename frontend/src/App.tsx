import { useEffect, useState } from "react";
import { InterfaceLifeco } from "./models/lifeco";
import Lifeco from "./components/Lifeco";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import styles from "./styles/Dashboard.module.css";
import * as LifecosApi from "../network/lifecos_api";
import AddEditLifecoDialog from "./components/AddEditLifecoDialog";
import { Button } from "react-bootstrap";
import styleUtils from "./styles/utils.module.css";

function App() {
  const [lifecos, setLifecos] = useState<InterfaceLifeco[]>([]);
  const [lifecosLoading, setLifecosLoading] = useState(true);
  const [showLifecosLoadingError, setShowLifecosLoadingError] = useState(false);
  const [showAddLifecoDialog, setShowAddLifecoDialog] = useState(false);
  const [lifecoToEdit, setLifecoToEdit] = useState<InterfaceLifeco | null>(
    null
  );

  useEffect(() => {
    async function loadLifecos() {
      try {
        setShowLifecosLoadingError(false);
        setLifecosLoading(true);
        const lifecos = await LifecosApi.fetchLifecos();
        setLifecos(lifecos);
      } catch (error) {
        console.error(error);
        setShowLifecosLoadingError(true);
      } finally {
        setLifecosLoading(false);
      }
    }
    loadLifecos();
  }, []);

  async function deleteNote(lifeco: InterfaceLifeco) {
    try {
      await LifecosApi.deleteLifeco(lifeco._id!);
      setLifecos(
        lifecos.filter((existingLifeco) => existingLifeco._id !== lifeco._id)
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const LifecosGrid = () => {
    return (
      <Row xs={2} md={3} xl={4} className="g-2">
        {lifecos.map((lifeco) => (
          <Col key={lifeco._id}>
            <Lifeco
              lifeco={lifeco}
              className={styles.lifeco}
              onLifecoClicked={setLifecoToEdit}
              onDeleteLifecoClicked={deleteNote}
            />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Container>
      <Button
        onClick={() => setShowAddLifecoDialog(true)}
        className={`mb-2 ${styleUtils.blockCenter}`}
      >
        Add New LIFECO
      </Button>
      {lifecosLoading && <Spinner animation="border" variant="primary" />}
      {showLifecosLoadingError && (
        <p>Something went wrong, try to refresh the page</p>
      )}
      {!lifecosLoading && !showLifecosLoadingError && (
        <>
          {lifecos.length > 0 ? (
            <LifecosGrid></LifecosGrid>
          ) : (
            <p>You don't have any LIFECOs yet</p>
          )}
        </>
      )}
      {showAddLifecoDialog && (
        <AddEditLifecoDialog
          onDismiss={() => setShowAddLifecoDialog(false)}
          onLifecoSaved={(newLifeco) => {
            setLifecos([...lifecos, newLifeco]);
            setShowAddLifecoDialog(false);
          }}
        />
      )}
      {lifecoToEdit && (
        <AddEditLifecoDialog
          lifecoToEdit={lifecoToEdit}
          onDismiss={() => setLifecoToEdit(null)}
          onLifecoSaved={(updatedLifeco) => {
            setLifecos(
              lifecos.map((existingLifeco) =>
                existingLifeco._id === updatedLifeco._id
                  ? updatedLifeco
                  : existingLifeco
              )
            );
            setLifecoToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
