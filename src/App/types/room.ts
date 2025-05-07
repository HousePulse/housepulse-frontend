import React from "react";
import {Task} from "@types_app/task";
export enum RoomIcon {
  Shower = 'shower',
  Home = 'home',
  Tv = 'tv',
}

export enum IconBackgroundColor {
  Red = '#fd7053',
  Orange = '#f79f4d',
  Yellow = '#f9ba1e',
  Green = '#81c43e',
  Blue = '#458cea',
  Purple = '#9b7de4',
  Cyan = '#46ccde',
}

export interface Room {
  id: number;
  title: string;
  icon: RoomIcon;
  backgroundColor: IconBackgroundColor;
  tasks?: number[];
}