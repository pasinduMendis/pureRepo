import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emitter from './EventEmitter';

class EventProvider extends Component {
  getChildContext() {
    return {
      emitter: emitter
    };
  }

  render() {
    return this.props.children;
  }
}

EventProvider.childContextTypes = {
  emitter: PropTypes.object
};

export default EventProvider;
