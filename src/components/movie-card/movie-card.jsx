import React from "react";
import PropTypes from "prop-types";
import { Button, Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return(
            <Card className="h-100" border="primary" text-center bg-info>
                <Card.Img variant="top" src={movie.image} />
                <Card.Body className="h-100 d-flex flex-column">
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.director.name}</Card.Text>
                    <Card.Text>{movie.description}</Card.Text>
                    <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="mt-auto" >
                        <Button className="me-3" variant="primary">
                            See more
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
/*        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired, */
    }).isRequired
};