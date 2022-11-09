import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageCarousel = ({ photos }) => {
  return (
    <Carousel indicators={false}>
      <Carousel.Item>

        <img
          className='d-block w-50 h-50  mx-auto'
          src={photos[0]}
          alt='First slide'
          width={50}
          height={50}


        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-50 h-50 mx-auto'
          src={photos[1]}
          alt='Second slide'
          width={50}
          height={50}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-50 h-50 mx-auto'
          src={photos[2]}
          alt='Third slide'
          width={50}
          height={50}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel;
