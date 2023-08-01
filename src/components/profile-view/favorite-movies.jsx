import { Row, Col} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({movies, user, updateUser, token}) => {
    const favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie.id));

    return (
        <Row className="justify-content-center">
            { favoriteMovies.map((movie) => {
                return (
                    <Col className="mb-4" xl={2} lg={3} md={4} xs={6} key={movie.id}>
                    <MovieCard movie={movie} user={user} updateUser={updateUser} />
                </Col>
                )
            })
            }
            { !favoriteMovies && (
                <Col>No favorite movies added yet </Col>
            )}
        </Row>
    );
};