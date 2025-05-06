import {createSlice} from "@reduxjs/toolkit";
import {Task} from "@types_app/task";
import {IconBackgroundColor, Room, RoomIcon} from "@types_app/room";

type InitialStateType = {
  rooms: Room[],
  mockTasks: Task[]
}

let initialState: InitialStateType = {
  rooms: [{
    title: 'Кухня',
    backgroundColor: IconBackgroundColor.Cyan,
    icon: RoomIcon.Shower,
  }, {
    title: 'Весь дом',
    backgroundColor: IconBackgroundColor.Green,
    icon: RoomIcon.Home,
  }, {
    title: 'Гостиная',
    backgroundColor: IconBackgroundColor.Red,
    icon: RoomIcon.Tv,
  }],
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
  reducers: {}
});

export const {} = tasksSlice.actions;
export default tasksSlice.reducer