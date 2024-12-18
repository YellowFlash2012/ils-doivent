
import { ToastContainer } from "react-toastify";

import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "react-toastify/dist/ReactToastify.css";

function App() {

  

  return (
      <>
        
              <ToastContainer />
              {/* <Navbar /> */}
              <main className="py-3">
                  <Container>
                      <Outlet />
                  </Container>
              </main>
              {/* <Footer /> */}
        
      </>
  );
}

export default App
