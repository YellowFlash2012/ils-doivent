import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    return (
        <main className="py-3">
            <Container>
                <Outlet />
            </Container>
        </main>
    );
};
export default PrivateRoutes;
