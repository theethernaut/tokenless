import _ from 'lodash';
import {
  CONNECT_MARKET,
  GET_PREDICTION_PREVIEW,
  FORGET_PREVIEW,
  UPDATE_MARKET
} from './actions';

const initialState = {
  contract: undefined,
  isConnected: false,
  previews: {} // mapping address => preview
};

export default function(state = initialState, action) {
  // console.log('MarketReducer', state, action);

  let newState;
  let market;

  switch(action.type) {

  case CONNECT_MARKET:
    market = action.payload;
    newState = {
      ...state,
      ...market,
      isConnected: true
    };
    break;

  case UPDATE_MARKET:
    market = action.payload;
    newState = {
      ...state,
      ...market
    };
    break;

  case GET_PREDICTION_PREVIEW:
    const preview = action.payload;
    newState = {
      ...state,
      previews: {
        ...state.previews,
        [preview.address]: preview
      }
    };
    break;

  case FORGET_PREVIEW:
    const address = action.payload;
    newState = {
      ...state,
      previews: _.omit(state.previews, address)
    };
    break;

  default:
    newState = state;
    break;
  }

  // console.log('newState:', newState);

  return newState;
}
