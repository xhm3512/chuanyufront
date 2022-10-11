import { UESRINFO, USERLOGINCODE, EVENTLISTS, TASKTYPES, ADDUSER, TASKLISTS, SENDTYPES } from '../constants';

const INITIAL_STATE = {
  userInfoData: null,
  eventListsData: null,
  taskTypesData: null,
  userInfoData: null,
  taskListsData: null,
  sendTypesData: null,

};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UESRINFO:
      return {
        ...state,
        userInfoData: action.data,
      };
    case USERLOGINCODE:
      return {
        ...state,
        userLoginCodeData: action.data,
      };
    case ADDUSER:
      return {
        ...state,
        addUserData: action.data,
      };
    case EVENTLISTS:
      return {
        ...state,
        eventListsData: action.data,
      };
    case TASKTYPES:
      return {
        ...state,
        taskTypesData: action.data,
      };
    case TASKLISTS:
      return {
        ...state,
        taskListsData: action.data,
      };
    case SENDTYPES:
      return {
        ...state,
        sendTypesData: action.data,
      };
    default:
      return state;
  }
}
