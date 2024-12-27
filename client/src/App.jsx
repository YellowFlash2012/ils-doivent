import { ToastContainer } from "react-toastify";

import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";


import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <ToastContainer />
    
            <main className="py-3">
                <Container>
                    <Outlet />
                </Container>
            </main>
        
        </>
    );
}

export default App;
