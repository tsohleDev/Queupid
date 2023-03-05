

const APPEND = 'queue/APPEND';
const REMOVE = 'queue/REMOVE';
const UPDATE = 'queue/UPDATE';

export const appendToQueue = (client) => ({ type: APPEND, client });
export const removeFromQueue = (id) => ({ type: REMOVE, id });
export const updateQueue = (queue) => ({ type: UPDATE, queue });

const append = (profile, list) => {
    const {id} = profile
    const index = list.findIndex(client => client.id === id);
    if (index === -1) {
        return [...list, {id}];
    }

    list[index] = profile;
    return [...list];
}

export default function reducer(state = [], action) {
    switch (action.type) {
      case APPEND:
        return append(action.client, state);
      case REMOVE:
        return [...state.filter(client => client.id !== action.id)];
      case UPDATE:
        return action.queue;
      default:
        return state;
    }
}