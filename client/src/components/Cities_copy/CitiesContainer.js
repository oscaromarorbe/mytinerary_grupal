import React from "react";
import { Component } from "react";
import CitiesDisplay2 from "./CitiesDisplay2";
import CityInput from "./CityInput";
import "./CitiesComponent.css";

import FeaturedCity from "./FeaturedCity";
import { Route, Switch } from "react-router-dom";
/* import { connect } from "http2"; */

import { connect } from 'react-redux';
import getCities from '../../store/actions/cityActions';

import PropTypes from 'prop-types';

class CitiesContainer extends Component {
  static propTypes = {
    getCities: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired
  }

  static defaultProps = {
    cities: []
  }

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      input: ""
    };
  }

  sendStateToParent = value => {
    this.setState(value);
  };

  componentDidMount() {
    getData("/api/cities", null, data => {
      this.setState({ data });
      //CALL//
    });
  }

  render() {
    console.log(this.state.data)
    var mainCallback = this.props.callback;
    var ciudades;
    var letra = this.state.input;

    if (this.state.data != "") {
      ciudades = this.state.data;
      if (letra != "") {
        ciudades = filterCitiesByFirstLetter(ciudades, letra);
      }
    }

    return (
      <Switch>
        <Route exact path={"/cities"}>
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-3">
                <h1>Destination</h1>
                <CityInput callbackFromParent={this.sendStateToParent} />
              </div>
              <div className="container">
                <div className="row">
                  <CitiesDisplay2
                    className="col-6"
                    data={ciudades}
                    callbackFromParent={mainCallback}
                  />
                </div>
              </div>
            </div>
          </div>
        </Route>
        <Route exact path={`/Barcelona`}>
          <FeaturedCity text="hola" />
        </Route>
      </Switch>
    );
  }
}

const getData = async (url, init, callback) => {
  const response = await fetch(url, init);
  const data = await response.json();
  const call = await callback(data);

  return call;
};

const filterCitiesByFirstLetter = (items, letter) => {
  let cities = items;
  cities = cities.filter(
    city =>
      city.name.slice(0, letter.length).toUpperCase() ==
      letter.slice(0, letter.length).toUpperCase()
  );
  return cities;
};

const mapStateToProps = (state) => ({
  data: state.data
})

const dispatchToProps = (dispatch) => {
  return getData('/api/cities', null, data => {
    dispatch(getCities(data));
})}

export default connect(mapStateToProps, dispatchToProps)(CitiesContainer);
