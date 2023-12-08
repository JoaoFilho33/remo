// Carousel.tsx
import React from "react";
import "./style.css"
import { Link } from "react-router-dom";

interface FeedFilmsProps {
    items: any[];
    linkTo: (item: any) => string;
}

const FeedFilms: React.FC<FeedFilmsProps> = ({ items, linkTo }) => {
    const slicedItems = items.slice(0, 5);

    return (
        <div className="feed_melhor-avaliado">
            {slicedItems.map((item: any) => (
                <Link key={item.id} to={linkTo(item)} className="list-feed__item-container">
                    <div className="list-feed__item">
                        <div className="list-feed__image-wrapper">
                            <div className="list-feed__image-container">
                                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                            </div>
                        </div>
                        <div className="feed__sinopse-container">
                            <p className="feed__sinopse">{item.overview.slice(0, 60)}...</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default FeedFilms;