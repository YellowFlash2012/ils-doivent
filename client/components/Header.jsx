
import { LinkContainer } from "react-router-bootstrap";
Link
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaShoppingCart, FaUser } from "react-icons/fa";

// import { logout } from "../features/authSlice";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

const Header = () => {
    

    const userInfo = "";

    const logoutHandler = () => { }
    
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ils-doivent</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <SearchBox />
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    {/* admin user config */}
                                    {userInfo.isAdmin && (
                                        <>
                                            <LinkContainer to="/admin/products-list">
                                                <NavDropdown.Item>
                                                    Ecoles
                                                </NavDropdown.Item>
                                            </LinkContainer>

                                            <LinkContainer to="/admin/users-list">
                                                <NavDropdown.Item>
                                                    Users
                                                </NavDropdown.Item>
                                            </LinkContainer>

                                            <LinkContainer to="/admin/orders-list">
                                                <NavDropdown.Item>
                                                    Orders
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}

                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Déconnecter
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaUser /> Se connecter
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};
export default Header;
