import {
    CHECK_AUTH,
  } from '../actions/authAction';

const initialState = {
    isConnected : false
}

export default function authReducer(state = initialState, action) {
    switch(action.type) {
      case CHECK_AUTH:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
            ...state,
            isConnected : action.payload.isConnected
        };

      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
}