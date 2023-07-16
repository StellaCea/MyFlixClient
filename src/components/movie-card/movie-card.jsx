import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({movie}) => {
    return(
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Card.Text>{movie.description}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">
                        Open
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
//Define prop constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string,
            descriprion: PropTypes.string
        }),
        director: PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string
        }),
        image: PropTypes.string.isRequired,
    }).isRequired
};