import { useState } from "react";

import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate} from "react-router-dom";

import FormContainer from "../components/FormContainer";
import "./login.css";
import { useRegisterMutation } from "../features/authApiSlice";
import { toast } from "react-toastify";

const Register = () => {
    const [name, setName] = useState("");
    const [school_principal, setSchool_principal] = useState("");
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const registerHandler = async (e) => {
        e.preventDefault()
        
        if (!name||!school_principal||!email||!password||!cpassword) {
            toast.error("Ces champs sont obligatoires!");
        };

        if (password!==cpassword) {
            toast.error("Les mots de passes ne sont pas conformes!");
        };

        try {
            const res = await register({ name, school_principal, email, password }).unwrap();

            toast.success(res?.message)

            navigate("/admin")
        } catch (error) {
            toast.error(error?.data?.message || error?.error);
        }
    };

    return (
        <FormContainer>
            <FormContainer>
                <h1>Créer une nouvelle école</h1>

                <Form onSubmit={registerHandler}>
                    <Form.Group controlId="name" className="my-3">
                        <Form.Label>Nom de l'école</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Saisir le nom de l'école"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="school_principal" className="my-3">
                        <Form.Label>Directeur</Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Saisir le nom du directeur"
                            value={school_principal}
                            onChange={(e) =>
                                setSchool_principal(e.target.value)
                            }
                        />
                    </Form.Group>
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

                    <Form.Group controlId="cpassword" className="my-3">
                        <Form.Label>Confirmer Mot de Passe</Form.Label>

                        <Form.Control
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            value={cpassword}
                            onChange={(e) => setCPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button
                        type="button"
                        variant="danger"
                        size="lg"
                        style={{ width: "100%" }}
                    onClick={()=>navigate("/admin")}
                    >
                        
                        Annuler

                        
                    </Button>

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
                            "S'inscrire"
                        )}
                    </Button>
                </Form>
            </FormContainer>
        </FormContainer>
    );
};
export default Register;
