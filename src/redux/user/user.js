const user = {
    username : 'test',
    firstName : 'first',
    lastName  : 'last',
    email : 'mail#mail.com',
    phone : '555-555-5555',
    admin : false
}

const GET_USER = 'user/GET_USER';
export const getUser = () => ({ type: GET_USER });

export default function reducer(state = null, action) {
    switch (action.type) {
      case GET_USER:
        return user;
      default:
        return state;
    }
}