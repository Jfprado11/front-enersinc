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
    addPerson: (state, action) => {
      console.log(action.payload);
      state.person.push(action.payload);
    },
    setPerson: (state, action) => {
      state.person = action.payload;
    },

    updatePerson: (state, action) => {
      const updatedPeople = state.person.filter((person) => person.id !== action.payload.id);
      state.person = [...updatedPeople, action.payload];
    },

    destroyPerson: (state, action) => {
      console.log(action.payload);
      state.person = state.person.filter((person) => person.id !== action.payload.id);
    },
  },
});

export const { setPerson, addPerson, updatePerson, destroyPerson } = dataSlice.actions;

export default dataSlice.reducer;
