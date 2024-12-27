import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <Container className="text-center">
                <Row>
                    <Col className="py-3">
                        <p className="col-12">&copy; ils-doivent - {currentYear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
export default Footer;
