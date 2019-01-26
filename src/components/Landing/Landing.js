import React from 'react';
import PropTypes from 'prop-types';

const Landing = ({ text, title, date }) => {

  return (
    <div id='landing-container'>
      <div id='scroll-text-container'>
        <h3 className='landing-text'>{text}</h3>
        <h3 className='landing-text right-justify'>- {title}</h3>
        <h3 className='landing-text right-justify'>- {date}</h3>
      </div>
    </div>
  );
}

Landing.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string
}

Landing.defaultProps = {
  text: 'DEFAULT TEXT',
  title: 'DEFAULT TITLE',
  date: '00-00-0000'
}

export default Landing;