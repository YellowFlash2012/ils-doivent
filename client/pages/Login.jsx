import { useState } from "react";

import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom"
import FormContainer from "../components/FormContainer";
import "./login.css"
import { toast } from "react-toastify";
import { useLoginMutation } from "../features/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const loginHandler = async (e) => { 
        e.preventDefault()

        if (!email || !password) {
            return toast.error("Veuillez renseigner ces champs pour continuer !");
        }

        try {

            const data = { email, password };

            const res = await login(
                data
            ).unwrap();

            dispatch(setCredentials({ ...res?.data }))
            
            toast.success(res?.message)

            if (res?.data?.isAdmin) {
                navigate("/admin")
            } else {
                navigate("/")
            }
            
        } catch (error) {
            toast.error(error?.data?.message || error?.error);
        }
    }
    
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
