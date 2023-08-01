import React, { useState, useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Link } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { UsernameSettings } from "../profile-view/username-settings";
import { PasswordSettings } from "../profile-view/password-settings";
import { EmailSettings } from "../profile-view/email-settings";
import { BirthdaySettings } from "../profile-view/birthday-settings";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user,setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [movies, setMovies] = useState([]);
    const [searchMovies, setSearchMovies] = useState(movies);

    const updateUser = (user) => {
        delete user.password;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }


    // fetch data from API
    useEffect(() => {
        if (!token) {
            return;
        }
        fetch(`https://myflixapi.herokuapp.com/movies`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                //populate the component
                return {
                    id: movie._id,
                    title: movie.Title,
                    description: movie.Description,
                    genre: movie.Genre.Name,
                    genreDescription: movie.Genre.Description,
                    director: movie.Director.Name,
                    directorBio: movie.Director.Bio,
                    image: movie.ImagePath,
                };
            });
            setMovies(moviesFromApi);
        });
    }, [token]);

    useEffect(() => {
        setSearchMovies(movies);
    }, [movies]);

    return (
        <BrowserRouter>
            <NavigationBar 
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                onSearch={(query) => {
                    setSearchMovies(movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())));
                }}
            />
            <Container>
                <Row className="justify-content-md-center">
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <SignupView />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <LoginView onLoggedIn={(user, token) => {
                                                setUser(user); 
                                                setToken(token);
                                            }} />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route 
                            path="/users"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => {
                                            setUser(null);
                                            setToken(null);
                                            localStorage.clear();
                                        }}updateUser={updateUser} />
                                    )}
                                </>
                            }
                        />
                        <Route 
                            path="/users/settings/username"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <UsernameSettings user={user} token={token} movies=
                                        {movies} onLoggedOut={() => {
                                            setUser(null);
                                            setToken(null);
                                            localStorage.clear();
                                        }}updateUser={updateUser} />
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/users/settings/password"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <PasswordSettings user={user} token={token}
                                        updateUser={() => {
                                            setUser(null),
                                            setToken(null),
                                            localStorage.clear();
                                        }}
                                        />
                                    )
                                }
                                </>
                            }
                        />
                        <Route 
                            path="/users/settings/email"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <EmailSettings user={user} token={token}
                                        updateUser={() => {
                                            setUser(null),
                                            setToken(null),
                                            localStorage.clear();
                                        }}
                                        />
                                    )
                                } 
                                </>
                            }
                        />
                        <Route 
                            path="/users/settings/birthday"
                            element={
                                <>
                                    {! user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <BirthdaySettings user={user} token={token}
                                        updateUser={() => {
                                            setUser(null),
                                            setToken(null),
                                            localStorage.clear();
                                        }}
                                        />
                                    )
                                }
                                </>
                            }
                        />
                        <Route 
                            path="/movies/:movieId"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty</Col>
                                    ) : (
                                        <Col md={12}>
                                            <MovieView movies={movies} user={user} token={token} updateUser={updateUser} />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route 
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty</Col>
                                    ) : (
                                        <>
                                            {searchMovies.map((movie) => (
                                                <Col className="mb-5" key={movie.id} sm={6} md={4} xl={3}>
                                                    <MovieCard movie={movie} />
                                                </Col>
                                            ))}
                                        </>
                                    )}
                                </>
                            }
                        />
                    </Routes>
                </Row>
            </Container>
        </BrowserRouter>

    );
};