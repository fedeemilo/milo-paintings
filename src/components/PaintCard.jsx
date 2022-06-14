import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button
} from "reactstrap";

const PaintCard = ({ id, img, title, text }) => {
    return (
        <Card>
            <CardImg alt={id} src={img} top width="100%" />
            <CardBody>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Card subtitle
                </CardSubtitle>
                <CardText>{text}</CardText>
                <Button>Más Info</Button>
            </CardBody>
        </Card>
    );
};

export default PaintCard;
