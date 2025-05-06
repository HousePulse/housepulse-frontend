import {createSlice} from "@reduxjs/toolkit";
import {Task} from "@types_app/task";

type InitialStateType = {
  mockTasks: Task[]
}

let initialState: InitialStateType = {
  mockTasks: [
    {
      id: 't1',
      title: 'Протереть туалетный столик в ванной',
      room: 'Кухня',
      date: new Date(2025, 4, 6),
      description: '123'
    },
    {
      id: 't2',
      title: 'Протереть стол',
      room: 'Гостиная',
      date: new Date(2025, 4, 7),
      description: '123'
    },
  ]
}

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
  }
});

export const {

} = tasksSlice.actions;
export default tasksSlice.reducer