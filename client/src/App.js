import { BrowserRouter, Routes, Route } from "react-router-dom";
import { configureStore } from "./Stores/store";
import { Provider } from "react-redux";

import "./App.css";

import Authorization from "./Pages/Authentication/Authorization/Authorization";
import Dashboard from './Pages/Dashboard/Dashboard';

const store = configureStore();

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Authorization />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
