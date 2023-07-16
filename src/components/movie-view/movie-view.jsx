import './movie-view.scss';

export const MovieView= ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title:</span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description:</span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre:</span>
                <span>{movie.genre.name}</span>
                <div>
                    <span>Description:</span>
                    <span>{movie.genre.description}</span>
                </div>
            </div>
            <div>
                <span>Director:</span>
                <span>{movie.director.name}</span>
                <div>
                    <span>Bio:</span>
                    <span>{movie.director.bio}</span>
                </div>
            </div>
            <button onClick={onBackClick} className="back-button"style={{ cursor: pointer }}>Back</button>
        </div>
    );

};