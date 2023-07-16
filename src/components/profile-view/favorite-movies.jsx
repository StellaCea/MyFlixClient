import { Row, Col} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({movies, user, updateUser}) => {

    const favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie.id));

    return (
        <Row className="justify-content-center">
            {favoriteMovies.length > 0 ? (
                favoriteMovies.map(movie => (
                    <Col key={movie.id}>
                        <MovieCard movie={movie} user={user} updateUser={updateUser} />
                    </Col>
                ))) : <p>No favorite movies added yet</p>
            }
        </Row>
    )
};