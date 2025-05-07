import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "@types_app/task";
import {IconBackgroundColor, Room, RoomIcon} from "@types_app/room";

type InitialStateType = {
  rooms: Room[],
  mockTasks: Task[]
}

let initialState: InitialStateType = {
  rooms: [{
    id: 1,
    title: 'Кухня',
    backgroundColor: IconBackgroundColor.Cyan,
    icon: RoomIcon.Shower,
    tasks: [1]
  }, {
    id: 2,
    title: 'Весь дом',
    backgroundColor: IconBackgroundColor.Green,
    icon: RoomIcon.Home,
  }, {
    id: 3,
    title: 'Гостиная',
    backgroundColor: IconBackgroundColor.Red,
    icon: RoomIcon.Tv,
    tasks: [2, 3]
  }],
  mockTasks: [
    {
      id: 1,
      title: 'Протереть туалетный столик в ванной',
      room: 'Кухня',
      date: new Date(2025, 4, 5),
      description: '123',
      done: false
    },
    {
      id: 2,
      title: 'Протереть стол',
      room: 'Гостиная',
      date: new Date(2025, 4, 7),
      description: '123',
      done: true
    },
    {
      id: 3,
      title: 'Пропылесосить',
      room: 'Гостиная',
      date: new Date(2025, 4, 7),
      description: '12356789',
      done: false
    },
  ]
}

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = state.mockTasks.find(t => t.id === action.payload.id);
      if (!task) {
        return;
      }
      Object.assign(task, action.payload);
    }
  }
});

export const {
  updateTask
} = tasksSlice.actions;
export default tasksSlice.reducer