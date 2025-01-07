import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useGetAllStudentsQuery } from "../features/studentSlice";
import Layout from "../components/Layout";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Students from "../components/Students";

const Home = () => {
    const { keyword } = useParams();

    const { data, isLoading, error } = useGetAllStudentsQuery({ keyword });

    console.log(data);

    return (
        <Layout>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error?.error}
                </Message>
            ) : (
                <Row>
                    {data?.data?.map((student) => (
                        <Col key={student._id} sm={12} md={6} lg={4} xl={3}>
                            <Students student={student} />
                        </Col>
                    ))}
                </Row>
            )}
        </Layout>
    );
};
export default Home;
