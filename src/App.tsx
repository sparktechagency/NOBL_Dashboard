import "./App.css";

import { Provider } from "react-redux";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import store from "../redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
