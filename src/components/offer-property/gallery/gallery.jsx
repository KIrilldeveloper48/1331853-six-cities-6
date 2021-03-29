import React from 'react';
import {PropTypes} from 'prop-types';

const Gallery = ({images}) => (
  <div className="property__gallery" data-testid="gallery">
    {
      images.map((image, i) => (
        <div key={i + image} className="property__image-wrapper">
          <img className="property__image" src={image} alt="Photo studio" data-testid={`gallery-image-${i + 1}`}/>
        </div>))
    }
  </div>
);

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Gallery;
