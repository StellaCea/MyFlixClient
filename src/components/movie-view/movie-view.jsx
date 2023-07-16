import './movie-view.scss';
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { FavoriteMovies } from '../profile-view/favorite-movies';


export const MovieView= ({ movies, user, updateUser }) => {
    const [favorite, setFavorite] = useState(false);
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId); 


    useEffect(() => {
        if(user.favoriteMovies && movie.id) {
            setFavorite(user.favoriteMovies.includes(movie.id))
        }
    }, [movie]);

    const addFavorite = () => {
        const token = localStorage.getItem("token");
        fetch(`https://myflixapi.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
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
        const token = localStorage.getItem("token");
        fetch(`https://myflixapi.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
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
        <Card className="mt-1 mb-1 h-100 bg-secondary text-white">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Description: {movie.description}</Card.Text>
                <Card.Text>Director: {movie.director}</Card.Text>
                <Card.Text>Genre: {movie.genre}</Card.Text>
            </Card.Body>
            {favorite ? (
                <Button 
                    onClick={removeFavorite}
                    variant="warning"
                    className='movie-fav-button mt-4'
                >
                    Remove from Favorites
                </Button>
            ) : (
                <Button 
                    onClick={addFavorite}
                    variant="success"
                >
                    Add to Favorites
                </Button>
            )}
            <Link to={`/`}>
                <button variant="outline-primary" className="back-button">
                    Back
                </button>
            </Link>
        </Card>
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