import { useState } from "react";

import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import {Link} from "react-router-dom"
import FormContainer from "../components/FormContainer";
import "./login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const isLoading = false;

    const loginHandler = () => { }
    
    return (
        <FormContainer>
            <h1>Se connecter</h1>

            <Form onSubmit={loginHandler}>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Adresse email</Form.Label>

                    <Form.Control
                        type="email"
                        placeholder="Saisir l'adresse email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Mot de Passe</Form.Label>

                    <Form.Control
                        type="password"
                        placeholder="Saisir le mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="mt-2"
                    disabled={isLoading}
                    style={{ width: "100%" }}
                >
                    {isLoading ? (
                        <Spinner animation="border" role="status" />
                    ) : (
                        "Se connecter"
                    )}
                </Button>
            </Form>

            
        </FormContainer>
    );
};
export default Login;
