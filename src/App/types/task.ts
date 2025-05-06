export enum TaskRepeat {
  Day = 0,
  Week = 1,
  Month = 3,
  Year = 4
}

export interface ITaskRepeat {
  repeat: TaskRepeat,
  repeatInterval: number
}

export interface Task {
  id: string;
  title: string;
  room: string;
  date: Date;
  description: string,
  repeat?: ITaskRepeat,
  done: boolean
}

