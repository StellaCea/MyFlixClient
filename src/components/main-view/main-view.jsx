import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1, 
            title: "Don't Worry Darling",
            description: "1950s housewife suspects her husband’s glamorous company could be hiding disturbing secrets in a utopian experimental community.",
            genre: "Mystery",
            image: "https://upload.wikimedia.org/wikipedia/en/4/4c/Don't_Worry_Darling_Poster_2.jpg", 
            director: "Olivia Wilde"
        },
        {
            id: 2,
            title: "The Menu",
            description: "A young couple travels to a remote island to eat at an exclusive restaurant where the chef has prepared a lavish menu, with some shocking surprises.",
            genre: "Thriller",
            image: "https://assets.scriptslug.com/live/img/posters/x/_posterPageWebp/37443/the-menu-2022.webp",
            director: "Mark Mylod"
        },
        {
            id: 3,
            title: "The Lost City",
            description: "A reclusive romance novelist on a book tour with her cover model gets swept up in a kidnapping attempt that lands them both in a cutthroat jungle adventure.",
            genre: "Action",
            image: "https://i-viaplay-com.akamaized.net/viaplay-prod/423/48/1654609764-0cabda4843344aa48c94f6233040f683bfd4b6f3.jpg?width=400&height=600",
            director: "Adam Nee"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return(
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if(movies.length === 0) {
        return <div>The list is empty</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key = {movie.id}
                    movie = {movie}
                    onMovieClick = {(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>

    );
};