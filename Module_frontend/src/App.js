import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path = '/' render={(props) => <Layout {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
