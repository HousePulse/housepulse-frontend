import React, {FC} from "react";
import {createHashRouter, Navigate, RouterProvider} from "react-router-dom";
import {RootState, useAppSelector} from "@store/store";
import Main from "./components/Main/Main";


const App: FC = () => {
  const globalStore = useAppSelector((state: RootState) => state.global);

  const router = createHashRouter([
    {
      path: '/',
      element: <Main/>,
    },
    {
      path: '*',
      element: <Navigate to="/" replace/>,
    },
  ], {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
    },
  });

  return <RouterProvider router={router}/>;
}

export default App;