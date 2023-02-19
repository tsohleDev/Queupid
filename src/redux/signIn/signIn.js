import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../user/user';

const SIGN_IN = 'signIn/SIGN_IN';
const SIGN_UP = 'signIn/SIGN_UP';
const AUTH = 'signIn/AUTH';

export const login = (form) => ({ type: SIGN_IN, form });
export const register = (form) => ({ type: SIGN_UP, form });

export const authenticate = createAsyncThunk(
  AUTH,
  async (args, thunkAPI) => {
    try {
      const url = args.method === 'login' ? 'https://cutting-edge.onrender.com/login' : 'https://cutting-edge.onrender.com/register';

      const { data } = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args.form),
      });

      console.log(data);
      if (data) {
        thunkAPI.dispatch(getUser(data));
        return data;
      }
      
      return thunkAPI.rejectWithValue('Invalid method', args.method);
    } catch (error) {
      return thunkAPI.rejectWithValue(error, args.method);
    }
  },
);