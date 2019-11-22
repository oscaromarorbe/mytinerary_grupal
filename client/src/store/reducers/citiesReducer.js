import {GET_CITIES} from '../actions/cityActions';

const citiesReducer = (state = ['loading'], {type, payload}) => {
  switch(type) {
    case GET_CITIES:
      return payload;
      break;
    default:
      return state;
      break;
  }
}

export default citiesReducer;
