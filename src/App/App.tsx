import React, {FC, Reducer} from "react";
import {createHashRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import TasksPage from "@components/Task/TasksPage/TasksPage";
import * as style from "./App.module.css";
import Sidebar from "@components/Sidebar/Sidebar";
import Schedule from "@components/Schedule/Schedule";
import Header from "@components/Header/Header";

export const pageRoutersName = {
  schedule: 'schedule',
  all_tasks: 'all-tasks',
  history: 'history',
  statistics: 'statistics',
}

export interface PageRouter {
  path: string;
  element: React.ReactNode,
  title: string,
}

export const pageRoutes: PageRouter[] = [
  {
    title: 'График',
    path: `/${pageRoutersName.schedule}`,
    element: <Schedule/>,
  },
  {
    title: 'Все задачи',
    path: `/${pageRoutersName.all_tasks}`,
    element: <TasksPage/>,
  },
  {
    title: 'История',
    path: `/${pageRoutersName.history}`,
    element: <TasksPage/>
  },
  {
    title: 'Статистика',
    path: `/${pageRoutersName.statistics}`,
    element: <TasksPage/>
  }
]

const Layout: FC = () => (
    <div className={style.wrapper}>
      <Sidebar/>
      <main className={style.main}>
        <Header/>
        <Outlet/>
      </main>
    </div>
);

const router = createHashRouter([
  {
    element: <Layout/>,
    children: [
      ...pageRoutes,
      {index: true, element: <Navigate to={"/" + pageRoutersName.schedule} replace/>},
      {path: '*', element: <Navigate to="/" replace/>},
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
  },
});


const App: FC = () => <RouterProvider router={router}/>;

export default App;