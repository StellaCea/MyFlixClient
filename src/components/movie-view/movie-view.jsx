import './movie-view.scss';
import { Card, Button } from "react-bootstrap";

export const MovieView= ({ movie, onBackClick }) => {
    return (
        <Card className="mt-1 mb-1 h-100 bg-secondary text-white">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Description: {movie.description}</Card.Text>
                <Card.Text>Director: {movie.director.name}</Card.Text>
                <Card.Text>Bio: {movie.director.bio}</Card.Text>
                <Card.Text>Genre: {movie.genre.name}</Card.Text>
                <Card.Text>Description: {movie.genre.description}</Card.Text>
            </Card.Body>
            <button onClick={onBackClick} className="back-button"style={{ cursor: pointer }}>Back</button>
        </Card>
    );

};