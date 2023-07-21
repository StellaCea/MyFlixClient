import React, {useEffect, useState} from "react";
import { Row, Button, Card, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = ({ user, token, movies, updateUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [favorite, setFavorite] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: user.username,
            Password: user.password,
            Email: user.email,
            Birthday: user.birthday
        }

        fetch("https://myflixapi.herokuapp.com/users/${user.Username}", {
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
                alert("Failed to change data");
                return false;
            }
        })
        .then(user => {
            if(user) {
                alert("Data changed successfully");
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const deleteAccount = () => {
        fetch("https://myflixapi.herokuapp.com/users/${user.Username}", {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`}
        })
        .then (response => {
            if(response.ok) {
                alert("Account has been deleted!");
                onLoggedOut();
            } else {
                alert("Can not delete account");
            }
        })
        .catch(e => {
            alert(e);
        })
    }

    return (
        <>
            <Row className="row-cols-1 row-cols-md-2 g-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h3>Your information</h3></Card.Title>
                                <Col>
                                    <p >Username: {user.Username}</p>
                                    <p>Password: ********</p>
                                    <p>E-mail: {user.Email}</p>
                                    <p>Birthday: {user.Birthday}</p>
                                </Col>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h3>Edit your information</h3></Card.Title>
                            <Col>
                                <Link to={`/users/settings/username`}>Change username</Link>
                                <p></p>
                                <Link to={`/users/settings/password`}>Change password</Link>
                                <p></p>
                                <Link to={`/users/settings/email`}>Change email</Link>
                                <p></p>
                                <Link to={`/users/settings/birthday`}>Change birthday</Link>
                                <p></p>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Button variant="danger" className="centered" onClick={() => {
                        if(confirm("Are you sure you want to delete your account?")) {
                            deleteAccount();
                        }
                        }}>Delete account</Button>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3">
                    <h3>Your favorite movies:</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FavoriteMovies movies={movies} user={user} />
                </Col>
            </Row>
        </>
    );
}