import React, {useState} from "react";
import {Point} from "@types_app/general";

export function useContextPoint(): [Point | null, (e: React.MouseEvent) => void, () => void] {
  const [point, setPoint] = useState<Point | null>(null);
  const open = (e: React.MouseEvent) => setPoint({x: e.clientX, y: e.clientY});
  const close = () => setPoint(null);
  return [point, open, close];
}
