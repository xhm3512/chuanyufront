
const INITIAL_STATE = {
  locationData: '',


};

export default function counter(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'location':
      return {
        ...state,
        locationData: action.data,
      };
  
    default:
      return state;
  }
}
