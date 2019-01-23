import React from 'react';
import PropTypes from 'prop-types';

const Landing = ({ text, title, date }) => {

  return (
    <div id='landing-container'>
      <h3>{text}</h3>
      <h3>- {title}</h3>
      <h3>- {date}</h3>
      <h4>SELECT A CATEGORY</h4>
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