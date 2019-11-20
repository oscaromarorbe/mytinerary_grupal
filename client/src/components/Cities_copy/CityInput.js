import React from "react";
import { Component } from "react";
import {DebounceInput} from 'react-debounce-input';

export default class CityInput extends Component {
  sendToParent = object => {
    this.props.callbackFromParent(object);
  };

  handleChange(event) {
    this.sendToParent({ input: event.target.value });
  }

  render() {
    return <DebounceInput 
    minLength={1}
    debounceTimeout={500}
    onChange={this.handleChange.bind(this)}
   />;
  }
}

