import { Col, Container, Row } from "react-bootstrap";
import "./formContainer.css"

const FormContainer = ({children}) => {
    return (
        <Container>
            <Row className="login-register justify-content-md-center ">
                <Col xs={12} md={6} lg={9}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};
export default FormContainer;
