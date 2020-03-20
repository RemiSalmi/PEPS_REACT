import {
    FETCH_USER_BEGIN,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE
  } from '../actions/userAction';
  
  const initialState = {
    byId : {},
    allIds : [],
    loading: false,
    error: null
  };
  
  export default function userReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_USER_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
            ...state,
            loading: true,
            error: null
        };
  
      case FETCH_USER_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        let newById = {}
        action.payload.users.map(user => {
            return newById[user.idUser] = user
        })

        let newAllIds = []
        action.payload.users.map(user => {
            return newAllIds.push(user.idUser)
        })

        return {
            ...state,
            loading: false,
            byId : newById,
            allIds : newAllIds
        };
  
      case FETCH_USER_FAILURE:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have items to display anymore, so set `items` empty.
        //
        // This is all up to you and your app though:
        // maybe you want to keep the items around!
        // Do whatever seems right for your use case.
        return {
            ...state,
            loading: false,
            error: action.payload.error,
            byId : {},
            allIds : [],
        };

      case DELETE_USER_SUCCESS:
        let byIdRemoveUser = state.byId
        let allIdsRemoveUser = state.allIds
        delete byIdRemoveUser[action.payload.idUser]
        allIdsRemoveUser.splice(allIdsRemoveUser.indexOf(parseInt(action.payload.idUser)),1)
        return {
          ...state,
          loading: false,
          byId : byIdRemoveUser,
          allIds : allIdsRemoveUser,
        };
      
        case DELETE_USER_FAILURE:
          return{
            ...state,
            loading: false,
            error: action.payload.error,
          };
      case ADD_USER_SUCCESS:
        let byIdAddUser = state.byId
        let allIdsAddUser = state.allIds
        byIdAddUser[action.payload.user.idUser] = action.payload.user
        allIdsAddUser.push(action.payload.user.idUser)
        return{
          ...state,
          loading: false,
          byId: byIdAddUser,
          allIds: allIdsAddUser,
        };
      case ADD_USER_FAILURE:
        return{
          ...state,
          loading:false,
          error: action.payload.error,
        }

      
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }