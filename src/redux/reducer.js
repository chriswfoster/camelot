import axios from 'axios';

//action types
const LOAD_USER='LOAD_USER'
const GET_USER="GET_USER"
const SELECT_ACCOUNT="SELECT_ACCOUNT"
const CHAR_LIST = "CHAR_LIST"


//initial state
const initialState = {
user: {},
selectedAccount: "",
characterList: []
}

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_USER + "_PENDING":
        return Object.assign({}, state, { isLoading: true })
        case LOAD_USER + "_FULFILLED":
          return Object.assign({}, state, {
            isLoading: false,
            user: action.payload })
        case GET_USER:
        return Object.assign({}, state, {user: action.payload})
        case SELECT_ACCOUNT:
        return Object.assign({}, state, {selectedAccount: action.payload})
      
        default:
        return state;
    }
  }

  
//action creator
export function loadUserInfo(user) {
    console.log("fired off with ", user)
  return {
    type: GET_USER,
    payload: user.data
  }
}
export function selectedAccount(account){
  return{
    type: SELECT_ACCOUNT,
    payload: account
  }
}
export function getCharacterList(account){
  return{
    type: CHAR_LIST,
    payload: axios.put('/api/characterList')
  }
}
// export function loadAccountData
