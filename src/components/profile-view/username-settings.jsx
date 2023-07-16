import React, {useState} from "react";
import { Container, Col, Card, Form, FormGroup, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const UsernameSettings = ({user, token, updateUser}) => {
    const [username, setUsername] = useState("");
    const [controlUsername, setControlUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if(username === controlUsername){
            var data = {
            username: username,
            password: password,
            email: email,
            birthday: birthday
            }
        } else {
            alert("Usernames don't match");
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
                alert("Failed to change username");
                return false;
            }
        })
        .then(user => {
            if(user) {
                alert("Username changed successfully");
                updateUser(user, username);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    return (
        <Form onSubmit={handleSubmit} className="mt-2">
            <Row className="mb-3">
                <FormGroup controlId="formNewUsername" as={Col} sm={{offset: 2}} md={{offset: 4}}>
                    <Form.Label>New username:</Form.Label>
                    <Form.Control
                        style={{backgroundColor:"white"}}
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter new username" 
                    />
                </FormGroup>
                <Col sm={{offset: 2}} md={{offset: 3}} className="desktop"></Col>
            </Row>
            <Row className="mb-3">            
                <FormGroup controlId="formControlUsername" as={Col} sm={{offset: 2}} md={{offset: 4}}>
                    <Form.Label>Enter new username again:</Form.Label>
                    <Form.Control 
                        style={{backgroundColor:"white"}}
                        type="text"
                        value={controlUsername}
                        onChange={(e) => setControlUsername(e.target.value)}
                        placeholder="Enter new username again"
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