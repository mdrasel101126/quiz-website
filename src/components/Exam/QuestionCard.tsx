/* import React, { useState } from 'react';

interface CarouselProps {
    items: string[];
  }

const QuestionCard = ({ items }:any) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };
  
    return (
      <div className="carousel-container">
        <div className="carousel">
          {items.map((item:any, index:number) => (
            <div
              key={index}
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            >
              {item}
            </div>
          ))}
        </div>
        <button onClick={nextSlide}>Next</button>
      </div>
    );
};

export default QuestionCard; */