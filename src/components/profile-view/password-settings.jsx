import React, {useState} from "react";
import {Form, Button, FormGroup, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";

export const PasswordSettings = ({user, token, updateUser}) => {
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password===controlPassword) {
            var data = {
                username: username,
                password: password,
                email: email,
                birthday: birthday
            }
        } else {
            alert("Not matching passwords")
            return;
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
                alert("Failed to change password");
                return false;
            }
        })
        .then(user => {
            if(user) {
                alert("Password changed successfully");
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
                <FormGroup controlId="formNewPassword" as={Col} sm={{offset: 2}} md={{offset: 4}}>
                    <Form.Label>New password:</Form.Label>
                    <Form.Control
                        style={{backgroundColor:"white"}}
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter new password" 
                    />
                </FormGroup>
                <Col sm={{offset: 2}} md={{offset: 3}} className="desktop"></Col>
            </Row>
            <Row className="mb-3">            
                <FormGroup controlId="formControlPassword" as={Col} sm={{offset: 2}} md={{offset: 4}}>
                    <Form.Label>Enter new password again:</Form.Label>
                    <Form.Control
                        style={{backgroundColor:"white"}}
                        type="password"
                        value={controlPassword}
                        onChange={(e) => setControlPassword(e.target.value)}
                        placeholder="Enter new password again"
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