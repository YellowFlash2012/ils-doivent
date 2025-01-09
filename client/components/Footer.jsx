import { Col, Container, Row } from "react-bootstrap";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineDiscord } from "react-icons/ai";
import Button from "react-bootstrap/Button";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <Container className="text-center">
                <Row >
                    <Col className="d-flex justify-content-center my-2">
                        <FaInstagram className="social-icons" />
                        <FaFacebookF className="mx-2 social-icons" />
                        <FaLinkedinIn className="social-icons" />
                        <FaXTwitter className="mx-2 social-icons" />
                        <AiOutlineDiscord className="social-icons" />
                    </Col>
                </Row>

                <Row>
                    <Col className="py-3">
                        <p className="col-12">
                            &copy; ils-doivent - {currentYear}
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
export default Footer;
