import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) => {
    return(
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};
//Define prop constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string
        }),
        genre: PropTypes.shape({
            name: PropTypes.string,
            descriprion: PropTypes.string
        }),
        image: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick:PropTypes.func.isRequired
};