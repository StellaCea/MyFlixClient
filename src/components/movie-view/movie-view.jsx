import PropTypes from "prop-types";
import { Button, Row, Col, Image, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';


export const MovieView= ({ movies, user, token, updateUser }) => {
    const { movieId } = useParams();
    const movie = movies.find(m => m.id === movieId); 
    const [isFavorite, setFavorite] = useState(false);
    
    useEffect(() => {
        setFavorite(user.FavoriteMovies.includes(movie.id));
        window.scroll(0,0);
    }, [movieId])

    const addFavorite = () => {
        fetch(`https://myflixapi.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: { 
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Added to favorites!");
                setFavorite(true);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const removeFavorite = () => {
        fetch(`https://myflixapi.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}`
            },
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Removed from favorites!");
                setFavorite(false);
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    return (
        <>
            <Row>
                <Col xs={12} md={6} lg={4} className="mb-4" >
                    <Image className="img-fluid h-auto" src={movie.image} /> 
                </Col>

                <Col xs={12} md={6} lg={8} className="mt-4">
                    <h2>{movie.title}</h2>
                    <h5>Description:</h5>
                    <p>{movie.description}</p>
                    <h5>Genre:</h5>
                    <h6>{movie.genre}</h6>
                    <p>{movie.genreDescription}</p>
                    <h5>Director:</h5>
                    <h6>{movie.director}</h6>
                    <p>{movie.directorBio}</p>

                    {isFavorite ? (
                        <Button
                            onClick={removeFavorite}
                            variant="warning"
                            className="movie-fav-button mt-4">
                            Remove from list
                        </Button>
                    ): (
                        <Button
                            onClick={addFavorite}
                            variant="primary"
                            className="movie-fav-button mt-4">
                            Add to favorites
                        </Button>
                    )}
                    <Link to="/">
                        <Button
                            variant="outline-primary"
                            className="mt-4">
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>
        </>
    
    );
};
//Defining prop types constraints:
MovieView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired,
            director: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired
        }).isRequired
    ),
};