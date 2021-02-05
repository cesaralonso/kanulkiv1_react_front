import React, { Component } from "react";
import PropTypes from "prop-types";

import * as Constants from "../../constants/constants";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>
          <a href={Constants.URLBASE}>{Constants.TITLEAPP}</a> &copy; 2019.
        </span>

        <span className="ml-auto">
          Powered by <a href="https://vanillasys.com">VanillaSys</a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
