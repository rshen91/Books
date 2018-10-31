import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";

class Success extends Component {
  
  render() {
    return (
      <Fragment>
        <button
          onClick={() => {
            this.props.alert.error("You just broke something!");
          }}
          className='hidden'
        >
          Oops, an error
        </button>
        <button
          onChange={() => {
            this.props.alert.success("Book Added!");
          }}
          className='hidden'
        >
          Success!
        </button>
      </Fragment>
    );
  }
}

export default withAlert(Success);