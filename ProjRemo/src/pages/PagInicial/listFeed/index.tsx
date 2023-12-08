// Carousel.tsx
import React from "react";
import "./style.css"
import { Link } from "react-router-dom";

interface ListFeedProps {
    items: any[];
    linkTo: (item: any) => string;
}

const ListFeed: React.FC<ListFeedProps> = ({ items, linkTo }) => {
    const slicedItems = items.slice(0, 6);

    return (
            <div className="list-feed">
                {slicedItems.map((item: any) => (
                    <Link key={item.id} to={linkTo(item)} className="list-feed__item-container">
                        <div className="list-feed__item">
                            <div className="list-feed__image-wrapper">
                                <div className="list-feed__image-container">
                                    <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                                </div>
                            </div>
                            <div className="list-feed__sinopse-container">
                                <p className="list-feed__sinopse">{item.title.slice(0, 50)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
    );
};

export default ListFeed;