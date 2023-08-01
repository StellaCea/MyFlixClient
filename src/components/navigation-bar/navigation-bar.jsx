import { Navbar, Container, Nav, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
    const [query, setQuery] = useState("");

    const logo = new URL (
        "../../img/logo.png",
        import.meta.url
    ); 

    useEffect(() => {
        onSearch(query);
    }, [query]);

    return (
        <Navbar fluid="true" style={{borderBottom: "1px solid purple", backgroundColor: "rgba(52, 55, 121, 1)"}} expand="lg" variant="dark" className="mb-4 navbar-container" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" onClick={() => setQuery("")}>
                    <img src={logo} className="png-logo" alt="myflix"/>
                    {""}MyFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}

                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/users">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                    {user && (
                        <Form className="d-flex">
                            <FormControl 
                                style={{color:"dark", backgroundColor:"white"}}
                                type="search"
                                placeholder="Search a movie..."
                                className="me-2"
                                aria-label="search"
                                value={query}
                                onChange={e => {
                                    setQuery(e.target.value);
                                }}
                            />
                            <Link to={"/"}>
                                <Button variant="outline-secondary" onClick={() => {
                                    onSearch(query);
                                }}>Search</Button>
                            </Link>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}