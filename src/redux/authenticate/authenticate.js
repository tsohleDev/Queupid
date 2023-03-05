import { createAsyncThunk } from '@reduxjs/toolkit';

const SIGN_IN = 'signIn/SIGN_IN';
const SIGN_UP = 'signIn/SIGN_UP';
const AUTH = 'signIn/AUTH';
const GET_USER = 'user/GET_USER';
const SET_USER = 'user/SET_USER';


export const getUser = () => ({ type: GET_USER });
export const setUser = (data) => ({ type: SET_USER, data });
export const login = (form) => ({ type: SIGN_IN, form });
export const register = (form) => ({ type: SIGN_UP, form });

export const authenticate = createAsyncThunk(
  AUTH,
  async ({form, method}, thunkAPI) => {
    form.sex = form.sex === 'male' ? 1 : 0;

    try {
      const url = method === 'login' ? 'https://cutting-edge.onrender.com/login' : 'https://cutting-edge.onrender.com/register';

      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const {status} = response;

      const data = await response.json();

      if (status === 200) {
        thunkAPI.dispatch(setUser(data));
        return status;
      }
      
      return thunkAPI.rejectWithValue({code:status});
    } catch (error) {
      console.log('error', error);
      return thunkAPI.rejectWithValue({code:500, message:error.message});
    }
  },
);

export default function reducer(state = {user:null, loading:false, ok:false}, {type, data}) {
  const {user, ok} = state;
  switch (type) {
    case GET_USER:
      return state;
    case SET_USER:
      return {...state, user:data};
    case authenticate.rejected.type:
      return {user:null, loading:false, ok:false};
    case authenticate.fulfilled.type:
      return {user, loading:false, ok:true};
    case authenticate.pending.type:
      return {user, loading:true, ok};
    default:
      return state;
  }
}