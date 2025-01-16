import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Students = ({ student }) => {
    const navigate = useNavigate();
    return (
        <Card
            className={
                student.outstanding_debt < 30000
                    ? `my-3 py-3 rounded border border-warning student-card`
                    : `my-3 py-3 rounded border border-danger student-card`
            }
            onClick={() => navigate(`/students/${student._id}`)}
        >
            <Card.Body>
                <Card.Title as="div" className="product-title">
                    <strong>{student?.school?.name}</strong>
                </Card.Title>

                <Card.Text as="div">
                    <Link to={`/students/${student._id}`}>
                        {student?.student_name}
                    </Link>
                </Card.Text>

                <Card.Text as="h3">{student?.academic_year}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default Students;
