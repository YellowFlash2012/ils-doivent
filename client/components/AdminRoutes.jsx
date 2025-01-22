import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const AdminRoutes = () => {
    const { userInfo } = useSelector(store => store.auth);

    return (
        <main className="py-3">
            <Container>
                {userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />}
            </Container>
        </main>
    );
};
export default AdminRoutes;
