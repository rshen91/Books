import React, { Component } from 'react';

export default class Success extends Component {
  constructor() {
    super()
  
    this.state = {
      showStore: false,
    }
  }
  getInitialState() {
    return { showStore: false };
  }

  causeSuccess() {
      alert("made it");
      this.setState({ showStore: true });
  }

  render() {
    return(
      <div className="success" style={{display: this.state.showStore ? 'block': 'none' }}>
        <span>You got the right answer!</span>
      </div>
      );
    }
};
