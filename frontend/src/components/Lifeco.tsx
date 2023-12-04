import styles from "../styles/Lifeco.module.css";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
} from "react-bootstrap";
import { InterfaceLifeco as LifecoModel } from "../models/lifeco";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface LifecoProps {
  lifeco: LifecoModel;
  onLifecoClicked: (lifeco: LifecoModel) => void;
  onDeleteLifecoClicked: (lifeco: LifecoModel) => void;
  className?: string;
}

const Lifeco = ({
  lifeco,
  className,
  onDeleteLifecoClicked,
  onLifecoClicked,
}: LifecoProps) => {
  const { title, desc, category, tags, createdAt, updatedAt } = lifeco;

  let createdUpdatedText: string;
  if (updatedAt! > createdAt!) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt!);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt!);
  }

  return (
    <Card
      className={`${styles.lifecoCard} ${className}`}
      onClick={() => onLifecoClicked(lifeco)}
    >
      <CardBody className={styles.cardBody}>
        <CardHeader className={styles.cardHeader}>
          {category}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteLifecoClicked(lifeco);
              e.stopPropagation();
            }}
          />
        </CardHeader>
        <CardTitle className={styles.cardTitle}>{title}</CardTitle>
        <CardText className={styles.cardText}>{desc}</CardText>
      </CardBody>
      <CardFooter className={styles.cardFooter}>
        {createdUpdatedText}
      </CardFooter>
    </Card>
  );
};

export default Lifeco;
