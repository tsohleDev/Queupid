const STORE = 'options/STORE';

export const setOptionsToBarber = (bool) => ({ type: STORE, bool });

export default function reducer(state = true, action) {
    switch (action.type) {
      case STORE:
        return action.bool;
      default:
        return state;
    }
}