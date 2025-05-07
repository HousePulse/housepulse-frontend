export enum TaskRepeat {
  Day = 0,
  Week = 1,
  Week2 = 2,
  Month = 3,
  Month3 = 4,
  Month6 = 5,
}

export interface ITaskRepeat {
  repeat: TaskRepeat,
  repeatInterval: number
}

export interface Task {
  id: number;
  title: string;
  room: string;
  date: Date;
  description: string,
  repeat?: ITaskRepeat,
  done: boolean
}

