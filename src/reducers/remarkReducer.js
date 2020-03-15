import {
    FETCH_REMARK_BEGIN,
    FETCH_REMARK_SUCCESS,
    FETCH_REMARK_FAILURE,
    ADD_REMARK_SUCCESS
  } from '../actions/remarkAction';
  
  var jwt = require('jsonwebtoken');

  const initialState = {
    byId : {},
    allIds : [],
    loading: false,
    error: null
  };
  
  export default function userReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_REMARK_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
            ...state,
            loading: true,
            error: null
        };
  
      case FETCH_REMARK_SUCCESS:
        // All done: set loading "false".
        // Also, replace the items with the ones from the server
        let newById = {}
        action.payload.remarks.map(remark => {
            remark.answers = []
            remark.encounters = []
            remark.dateCreation = new Date(remark.dateCreation).toLocaleDateString()
            return newById[remark.idRemark] = remark
        })

        let newAllIds = []
        action.payload.remarks.map(remark => {
            return newAllIds.push(remark.idRemark)
        })

        action.payload.answers.map(answer => {
            return newById[answer.idRemark].answers.push(answer.idAnswer)    
        })

        action.payload.encounters.map(encounter => {
            return newById[encounter.idRemark].encounters.push(encounter.idUser)
            
        })
        return {
            ...state,
            loading: false,
            byId : newById,
            allIds : newAllIds
        };
  
      case FETCH_REMARK_FAILURE:
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

      case ADD_REMARK_SUCCESS:
        let byIdAdd = state.byId
        let remarkToAdd = action.payload.remark
        remarkToAdd.answers = []
        remarkToAdd.encounters = []
        remarkToAdd.idUser = jwt.decode(remarkToAdd.token).idUser
        delete remarkToAdd.token
        remarkToAdd.dateCreation = new Date().toLocaleDateString()
        byIdAdd[action.payload.remark.idRemark] = remarkToAdd
        console.log(byIdAdd)

        let allIdsAdd = state.allIds
        allIdsAdd.push(action.payload.remark.idRemark)
        console.log(allIdsAdd)
        
        
        return {
            ...state,
            loading: false,
            error: null,
            byId : byIdAdd,
            allIds : allIdsAdd
        };
  
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }