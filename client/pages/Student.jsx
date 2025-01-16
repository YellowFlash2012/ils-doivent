import { useState } from "react";
import { useSelector} from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Row, Button, ListGroup, Form, Card, Col, FormGroup } from "react-bootstrap";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import { useAddACommentMutation, useGetOneStudentQuery } from "../features/studentSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Student = () => {
    const { id } = useParams();
    const [commentTitle, setCommentTitle] = useState("");
    const [commentBody, setCommentBody] = useState("");

    const { data, error, isLoading, refetch } = useGetOneStudentQuery(id);

    const [addAComment, { isLoading: commentLoading }] = useAddACommentMutation();

    const { userInfo } = useSelector(store => store.auth);

    const submitCommentHandler = async (e) => {
        e.preventDefault()

        const data = { commentTitle, commentBody };

        try {
            const res = await addAComment({ id, data }).unwrap();

            refetch();

            toast.success(res?.message);

        
            setCommentTitle("");
            setCommentBody("");
        } catch (error) {
            toast.error(error?.data?.message || error?.message);
        }
    }

    return (
        <Layout>
            <Link to="/" className="btn btn-light my-3">
                Retour
            </Link>

            {isLoading ? (
                <Row className="mt-3">
                    <Loader />
                </Row>
            ) : error ? (
                <Row className="mt-3">
                    <Message variant="danger">
                        {error?.data?.message || error.error}
                    </Message>
                </Row>
            ) : (
                <>
                    <Row>
                        <Col md={4}>
                            <ListGroup.Item>
                                <h2>École : {data?.data?.school?.name}</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h3>
                                    Directeur de l'école:{" "}
                                    {data?.data?.school?.school_principal}
                                </h3>
                            </ListGroup.Item>
                        </Col>

                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Nom de l'élève :{" "}
                                        {data?.data?.student_name}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>
                                        NIP de l'élève :{" "}
                                        {data?.data?.student_nip}
                                    </h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h3>
                                        Nom du parent d'élève :{" "}
                                        {data?.data?.parent_name}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>
                                        NIP du parent d'élève :{" "}
                                        {data?.data?.parent_nip}
                                    </h3>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card
                                className={
                                    data?.data?.outstanding_debt < 30000
                                        ? `my-3 py-3 rounded border border-warning student-card`
                                        : `my-3 py-3 rounded border border-danger student-card`
                                }
                            >
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <h3>
                                                    Montant dû :
                                                    <strong>
                                                        {
                                                            data?.data
                                                                ?.outstanding_debt
                                                        }
                                                    </strong>
                                                </h3>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    {/* comment section */}
                    <Row className="review">
                        <Col md={6}>
                            <h2>Commentaires</h2>
                            {data?.data?.comments.length === 0 && (
                                <Message>Aucun commentaire</Message>
                            )}

                            <ListGroup variant="flush">
                                {data?.data?.comments.map((comment) => (
                                    <ListGroup.Item key={comment._id}>
                                        <strong>{comment?.school?.name}</strong>

                                        <p>{comment?.title}</p>

                                        <p>
                                            {comment?.createdAt.substring(
                                                0,
                                                10
                                            )}
                                        </p>

                                        <p>{comment?.comment}</p>
                                    </ListGroup.Item>
                                ))}

                                <ListGroup.Item>
                                    <h2>Laisser un commentaire</h2>

                                    {userInfo ? (
                                        <Form onSubmit={submitCommentHandler}>
                                            <FormGroup
                                                controlId="commentTitle"
                                                className="my-2"
                                            >
                                                <Form.Label>
                                                    Titre (facultatif)
                                                </Form.Label>

                                                <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    value={commentTitle}
                                                    onChange={(e) =>
                                                        setCommentTitle(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </FormGroup>

                                            <FormGroup
                                                controlId="commentBody"
                                                className="my-2"
                                            >
                                                <Form.Label>
                                                    Commentaire (obligatoire)
                                                </Form.Label>

                                                <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    value={commentBody}
                                                    onChange={(e) =>
                                                        setCommentBody(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </FormGroup>

                                            <Button
                                                variant="primary"
                                                disabled={commentLoading}
                                                style={{ width: "100%" }}
                                                type="submit"
                                            >
                                                {commentLoading ? (
                                                    <Spinner
                                                        animation="border"
                                                        role="status"
                                                    />
                                                ) : (
                                                    "Soumettre votre commentaire"
                                                )}
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant="danger">
                                            <Link to="/login">
                                                Connectez-vous
                                            </Link>{" "}
                                            pour soumettre un commentaire
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </Layout>
    );
};
export default Student;
