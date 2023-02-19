const TOOGLE = 'menutoogle/TOOGLE';
const WRITE_HOME = 'menutoogle/WRITE_HOME';

export const toogle = (bool) => ({ type: TOOGLE, bool });
export const writeHomeRoute = (path) => ({ type: WRITE_HOME, path });

export default function reducer(state = {path: '/', openMenu: false}, action) {
    switch (action.type) {
      case TOOGLE:
        return {...state, openMenu:action.bool};
      case WRITE_HOME:
        return {path:action.path, openMenu: false};
      default:
        return state;
    }
}