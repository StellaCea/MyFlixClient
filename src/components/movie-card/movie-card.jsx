import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return(
        <CardGroup>
            <Card className="h-100" border="primary">
                <Card.Img variant="top" src={movie.image} />
                <Card.Body className="h-100 d-flex flex-column">
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.director.name}</Card.Text>
                    <Card.Text>{movie.description}</Card.Text>
                    <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                        <Button variant="primary">
                            See more
                        </Button>
                    </Link>
                </Card.Body>
            </Card>
        </CardGroup>
        
    );
};
//Define prop constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
/*        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired, */
    }).isRequired
};