// Carousel.tsx
import React from "react";
import AliceCarousel, { OnSlideChangedEventHandler } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";

interface CarouselProps {
  items: any[];
  slideToIndex: number;
  onSlideChanged: OnSlideChangedEventHandler;
  customProps: any;
  backdrop_path: string ;
  linkTo: (item: any) => string;
}

const Carousel: React.FC<CarouselProps> = ({ items, slideToIndex, onSlideChanged, customProps, linkTo }) => {
  return (
    <AliceCarousel {...customProps}>
      {items.map((item: any) => (
        <Link key={item.id} to={linkTo(item)} className="list-feed__item-container">
          <div className="list-feed__item">
            <div className="list-feed__image-wrapper">
              <div className="list-feed__image-container">
                <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
              </div>
            </div>
            <div className="list-feed__sinopse-container">
              <p className="list-feed__sinopse">{item.overview.slice(0, 100)}...</p>
            </div>
          </div>
        </Link>
      ))}
    </AliceCarousel>
  );
};

export default Carousel;
