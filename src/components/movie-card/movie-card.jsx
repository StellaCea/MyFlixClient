import PropTypes from "prop-types";

export const MovieCard = ({movie, onMovieClick}) => {
    return(
        <div>
            {movie.title}
        </div>
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