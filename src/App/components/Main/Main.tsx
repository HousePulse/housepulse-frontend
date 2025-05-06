import React, {FC, useState} from 'react';
import * as style from './Main.module.css'
import {useAppDispatch, useAppSelector} from "@store/store";
import Sidebar from "@components/Sidebar/Sidebar";
import Schedule from "@components/Schedule/Schedule";
import Fab from "@components/UI/Fab/Fab";

const Main: FC = (props) => {
  const global = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const [activeView, setActiveView] = useState<'schedule' | 'all' | 'history' | 'stats'>('schedule');

  return (
      <div className={style.wrapper}>
        <Sidebar activeView={activeView} onChangeView={setActiveView}/>
        <main className={style.main}>
          {activeView === 'schedule' && <Schedule/>}

          <Fab onClick={() => {/* TODO: open new‑task modal */
          }}/>
        </main>
      </div>
  );
}

export default Main;