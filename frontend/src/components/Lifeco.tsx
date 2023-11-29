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

interface LifecoProps {
  lifeco: LifecoModel;
  className?: string;
}

const Lifeco = ({ lifeco, className }: LifecoProps) => {
  const { title, desc, category, tags, createdAt, updatedAt } = lifeco;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card className={`${styles.lifecoCard} ${className}`}>
      <CardBody className={styles.cardBody}>
        <CardHeader>{category}</CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardText className={styles.cardText}>{desc}</CardText>
      </CardBody>
      <CardFooter>{createdUpdatedText}</CardFooter>
    </Card>
  );
};

export default Lifeco;
