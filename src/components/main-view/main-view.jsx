import React, { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user,setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    // fetch data from API
    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://myflixapi.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((doc) => {
                //populate the component
                return {
                    id: doc._id,
                    title: doc.Title,
                    description: doc.Description,
                    genre: {
                        name: doc.Genre.Name,
                        description: doc.Genre.Description,
                    },
                    image: doc.ImagePath,
                    director: {
                        name: doc.Director.Name,
                        bio: doc.Director.Bio,
                    }
                };
            });
            setMovies(moviesFromApi);
        });
    }, [token]);

    return (
        <Row>
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}/>
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
            ) : movies.length === 0 ? (
                    <Col>The list is empty</Col>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard
                                movie = {movie}
                                onMovieClick = {(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
            { user && (
                <Col md={1}>
                    <Button variant="secondary" onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}>
                        Logout
                    </Button>
                </Col>
            )}
        </Row>
    );
};