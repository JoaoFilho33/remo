// Carousel.tsx
import React from "react";
import "./style.css"
import { Link } from "react-router-dom";

interface LayoutFilmsProps {
    items: any[];
    linkTo: (item: any) => string;
}

export const LayoutFilms: React.FC<LayoutFilmsProps> = ({ items, linkTo }) => {
    // const slicedItems = items.slice(0, 20);

    return (
        <div className="timeline-main">
            {items.map((item: any) => (
                <Link key={item.id} to={linkTo(item)} className="timeline-item_container">
                    <div className="timeline-item">
                        <div className="timeline-image_wrapper">
                            <div className="timeline-image_container">
                                <div className="timeline-overlay"></div>
                                <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt={item.title} />
                                <div className="timeline-sinopse_container">
                                    <p className="timeline-sinopse">{item.title.slice(0, 50)}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </Link>
            ))}
        </div>
    );
};