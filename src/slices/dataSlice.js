import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPerson } from '../services/personData';
import { setLoading } from './uiSlice';

const initialState = {
  person: [],
};

export const fetchPersonAll = createAsyncThunk('data/fetchPersonAll', async (_, { dispatch }) => {
  dispatch(setLoading(true));
  const personRes = await getPerson();
  dispatch(setPerson(personRes));
  dispatch(setLoading(false));
});

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setPerson: (state, action) => {
      state.person = action.payload;
    },
  },
});

export const { setPerson } = dataSlice.actions;

export default dataSlice.reducer;
