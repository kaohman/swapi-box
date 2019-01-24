import React, { Component } from 'react';

class ControlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null
    }
  }
  handleClick = (event) => {
    this.setState({
      active: event.target.id
    });
    this.props.getData(event.target.id);
  }

  render() {
    const buttonLabels = ['People', 'Planets', 'Vehicles'];
    return (
      <div id='button-container'>
      {
        buttonLabels.map(label => {
          return (
            <button 
              onClick={this.handleClick}
              key={label}
              id={label.toLowerCase()}
              className= {
                this.state.active === label.toLowerCase() ? 'active' : 'inactive'
              }
            >{label}</button>
          )
        })
      }
        <button 
          onClick={this.handleClick}
          id='favorites'
          className={this.state.active === 'favorites' ? 'active' : 'inactive'}
        >
          View {this.props.favoritesCount} Favorites
        </button>
      </div>
    );
  }
}

export default ControlForm;