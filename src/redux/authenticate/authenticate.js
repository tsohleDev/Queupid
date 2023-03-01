import { createAsyncThunk } from '@reduxjs/toolkit';

const SIGN_IN = 'signIn/SIGN_IN';
const SIGN_UP = 'signIn/SIGN_UP';
const AUTH = 'signIn/AUTH';
const GET_USER = 'user/GET_USER';
const SET_USER = 'user/SET_USER';


export const getUser = () => ({ type: GET_USER });
export const setUser = (user) => ({ type: SET_USER, user });
export const login = (form) => ({ type: SIGN_IN, form });
export const register = (form) => ({ type: SIGN_UP, form });

export const authenticate = createAsyncThunk(
  AUTH,
  async (args, thunkAPI) => {
    console.log('args', args);
    try {
      const url = args.method === 'login' ? 'https://cutting-edge.onrender.com/login' : 'https://cutting-edge.onrender.com/register';

      const data = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args.form),
      });

      console.log('data', data);
      if (data) {
        thunkAPI.dispatch(setUser(data));
        return data;
      }
      
      return thunkAPI.rejectWithValue('Invalid method', args.method);
    } catch (error) {
      return thunkAPI.rejectWithValue(error, args.method);
    }
  },
);

const usera = {
  username : 'test',
  firstName : 'first',
  lastName  : 'last',
  email : 'mail#mail.com',
  phone : '555-555-5555',
  admin : false
}

export default function reducer(state = usera, {type, user}) {
  switch (type) {
    case GET_USER:
      return state;
    case SET_USER:
      return user;
    default:
      return state;
  }
}