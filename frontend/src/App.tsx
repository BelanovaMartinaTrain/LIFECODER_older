import { useEffect, useState } from "react";
import { InterfaceLifeco } from "./models/lifeco";
import Lifeco from "./components/Lifeco";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles/Dashboard.module.css";
import * as LifecosApi from "../network/lifecos_api";
import AddLifecoDialog from "./components/AddLifecoDialog";
import { Button } from "react-bootstrap";

function App() {
  const [lifecos, setLifecos] = useState<InterfaceLifeco[]>([]);
  const [showAddLifecoDialog, setShowAddLifecoDialog] = useState(false);

  useEffect(() => {
    async function loadLifecos() {
      try {
        const lifecos = await LifecosApi.fetchLifecos();
        setLifecos(lifecos);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadLifecos();
  }, []);

  return (
    <Container>
      <Button onClick={() => setShowAddLifecoDialog(true)}>
        Add New LIFECO
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {lifecos.map((lifeco) => (
          <Col key={lifeco._id}>
            <Lifeco lifeco={lifeco} className={styles.lifeco} />
          </Col>
        ))}
      </Row>
      {showAddLifecoDialog && (
        <AddLifecoDialog onDismiss={() => setShowAddLifecoDialog(false)} />
      )}
    </Container>
  );
}

export default App;
