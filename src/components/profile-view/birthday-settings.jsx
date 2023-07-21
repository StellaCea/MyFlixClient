import { useState } from "react"
import { Col, Card, Form, FormGroup, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const BirthdaySettings = (user, token, updateUser) => {
    const [birthday, setBirthday] = useState("");
    const [controlBirthday, setControlBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (birthday === controlBirthday) {
            var data = {
                username,
                password,
                email,
                birthday
            }
        } else {
            alert ("Birthday doesn't match");
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
                alert("Failed to change birthday");
                return false;
            }
        })
        .then(user => {
            if(user) {
                alert("Birthday changed successfully");
                localStorage.setItem("user", null)
                localStorage.setItem("token", null)
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
                <FormGroup controlId="formNewBirthday" as={Col} sm={{offset: 2}} md={{offset: 4}}>
                    <Form.Label>New birthday:</Form.Label>
                    <Form.Control
                        style={{backgroundColor:"white"}}
                        type="date" 
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </FormGroup>
                <Col sm={{offset: 2}} md={{offset: 3}} className="desktop"></Col>
            </Row>
            <Row className="mb-3">            
                <FormGroup controlId="formControlBirthday" as={Col} sm={{offset: 2}} md={{offset: 4}}>
                    <Form.Label>Enter new birthday again:</Form.Label>
                    <Form.Control 
                        style={{backgroundColor:"white"}}
                        type="date"
                        value={controlBirthday}
                        onChange={(e) => setControlBirthday(e.target.value)}
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