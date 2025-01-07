import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Students = ({ student }) => {
    return (
        
        <Card className="my-3 py-3 rounded" onClick={`/students/${student._id}`}>
    

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
