import React, { Component } from 'react';

export default class Success extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleDismiss = this.handleDismiss.bind(this);
      this.handleShow = this.handleShow.bind(this);
  
      this.state = {
        show: true
      };
    }
  
    handleDismiss() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
      if (this.state.show) {
        return (
          <alert bsStyle="success" onDismiss={this.handleDismiss}>
            <h4>Book Successfully Added!</h4>
            <p>
              <button onClick={this.handleDismiss}>Hide Alert</button>
            </p>
          </alert>
        );
      }
  
      return <button onClick={this.handleShow}>Show Alert</button>;
    }
  }
  
//   render(
//     <Success />
//   );