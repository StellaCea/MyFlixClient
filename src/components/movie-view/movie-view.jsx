import './movie-view.scss';
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView= ({ movies }) => {

    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId); 

    return (
        <Card className="mt-1 mb-1 h-100 bg-secondary text-white">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Description: {movie.description}</Card.Text>
                <Card.Text>Director: {movie.director.name}</Card.Text>
                <Card.Text>Genre: {movie.genre.name}</Card.Text>
            </Card.Body>
            <Link to={`/`}>
                <button className="back-button">
                    Back
                </button>
            </Link>

        </Card>
    );

};