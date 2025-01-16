import { Link, useParams } from "react-router-dom";
import { Row, Button, ListGroup, Form, Card, Col } from "react-bootstrap";

import Layout from "../components/Layout";
import { useGetOneStudentQuery } from "../features/studentSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Student = () => {

  const { id } = useParams();

  const { data, error, isLoading } = useGetOneStudentQuery(id);

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
                      <Col md={5}></Col>

                      <Col md={4}>
                          <ListGroup variant="flush">
                              <ListGroup.Item>
                                  <h3>student.name</h3>
                              </ListGroup.Item>

                              <ListGroup.Item></ListGroup.Item>

                              <ListGroup.Item>Price:</ListGroup.Item>
                              <ListGroup.Item>Description:</ListGroup.Item>
                          </ListGroup>
                      </Col>

                      <Col md={3}>
                          <Card>
                              <ListGroup variant="flush">
                                  <ListGroup.Item>
                                      <Row>
                                          <Col>Montant dû:</Col>

                                          <Col>
                                              <strong>
                                                  student.outstanding_debt
                                              </strong>
                                          </Col>
                                      </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                      <Row>
                                          <Col>Status:</Col>

                                          <Col>
                                              <strong></strong>
                                          </Col>
                                      </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                      <Button
                                          className="btn-block"
                                          type="button"
                                          variant="success"
                                          // disabled={

                                          // }
                                      >
                                          Add To Cart
                                      </Button>
                                  </ListGroup.Item>
                              </ListGroup>
                          </Card>
                      </Col>
                  </Row>

                  {/* comment section */}
                  <Row className="review">
                      <Col md={6}>
                          <h2>Commentaires</h2>
                          {/* {product.reviews.length === 0 && (
                                <Message>Aucun commentaire</Message>
                            )} */}

                          <ListGroup variant="flush">
                              {/* {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>

                                        <Rating value={review.rating} />

                                        <p>
                                            {review.createdAt.substring(0, 10)}
                                        </p>

                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))} */}

                              <ListGroup.Item>
                                  <h2>Laisser un commentaire</h2>

                                  {/* {userInfo ? (
                                        <Form onSubmit={submitReviewHandler}>
                                            <FormGroup
                                                controlId="rating"
                                                className="my-2"
                                            >
                                                <Form.Label>Rating</Form.Label>

                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select...
                                                    </option>

                                                    <option value="1">
                                                        1 - Poor
                                                    </option>

                                                    <option value="2">
                                                        2 - Fair
                                                    </option>

                                                    <option value="3">
                                                        3 - Good
                                                    </option>

                                                    <option value="4">
                                                        4 - Very Good
                                                    </option>

                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </FormGroup>

                                            <FormGroup
                                                controlId="comment"
                                                className="my-2"
                                            >
                                                <Form.Label>Comment</Form.Label>

                                                <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </FormGroup>

                                            <Button
                                                variant="primary"
                                                disabled={reviewLoading}
                                                        style={{ width: "100%" }}
                                                        type="submit"
                                            >
                                                {reviewLoading ? (
                                                    <Spinner
                                                        animation="border"
                                                        role="status"
                                                    />
                                                ) : (
                                                    "Submit Your review"
                                                )}
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant="danger">
                                            <Link to="/login">Login</Link> to
                                            submit a review
                                        </Message>
                                    )} */}
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
