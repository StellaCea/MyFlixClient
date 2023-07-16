import { useState } from "react"
import { Container, Col, Card, Form, FormGroup, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const EmailSettings = (user, token, updateUser) => {
    const [email, setEmail] = useState("");
    const [controlEmail, setControlEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email === controlEmail) {
            var data = {
                username,
                password,
                email,
                birthday
            }
        }else{
            alert("Emails don't match");
        }

        fetch(`https://myflixapi.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/JSON",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }else{
                alert("Failed to change email");
                return false;
            }
        })
        .then(user => {
            if(user) {
                alert("Email changed successfully");
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    return (
        <Form onSubmit={handleSubmit} className="mt-2">
            <Row className="mb-3">
                <FormGroup controlId="formNewEmail" as={Col} sm={{offset: 2}} md={{offset: 4}}>
                    <Form.Label>New Email:</Form.Label>
                    <Form.Control
                        style={{backgroundColor:"white"}}
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter new email" 
                    />
                </FormGroup>
                <Col sm={{offset: 2}} md={{offset: 3}} className="desktop"></Col>
            </Row>
            <Row className="mb-3">            
                <FormGroup controlId="formControlEmail" as={Col} sm={{offset: 2}} md={{offset: 4}}>
                    <Form.Label>Enter new email again:</Form.Label>
                    <Form.Control
                        style={{backgroundColor:"white"}}
                        type="email"
                        value={controlEmail}
                        onChange={(e) => setControlEmail(e.target.value)}
                        placeholder="Enter new email again"
                    />
                </FormGroup>
                <Col sm={{offset: 1}} md={{offset: 3}} className="desktop desktop-long"></Col>
            </Row>
            <Row className="mb-3">
                <Col sm={{offset: 2}} md={{offset: 4}} >
                    <Button variant="primary" type="submit">Submit</Button>
                    <Link to="/users">
                        <Button variant="outline-primary">Cancel</Button></Link>
                </Col>
            </Row>
        </Form>
    )
}