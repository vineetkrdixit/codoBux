import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  date: new Date(),
  time: new Date(),
};

const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setNewDate:(state, action)=>{
      state.date=action.payload
    },
    setNewTime:(state, action)=>{
      state.time=action.payload
    }
  },
});

export const { setFirstName, setLastName, setEmail,setNewDate,setNewTime } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;