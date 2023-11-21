import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const CustomPrevArrow: React.FC<any> = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow prev" onClick={onClick}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    );  
  };
  
  export const CustomNextArrow: React.FC<any> = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-arrow next" onClick={onClick}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    );
  };

// Componente de seta anterior
// export const CustomPrevArrow: React.FC<any> = (props) => {
//   const { onClick } = props;
//   return (
//     <div className="custom-arrow prev" onClick={onClick}>
//       <FaChevronLeft />
//     </div>
//   );
// };

// // Componente de seta seguinte
// export const CustomNextArrow: React.FC<any> = (props) => {
//   const { onClick } = props;
//   return (
//     <div className="custom-arrow next" onClick={onClick}>
//       <FaChevronRight />
//     </div>
//   );
// };