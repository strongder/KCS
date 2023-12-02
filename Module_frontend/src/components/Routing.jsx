import React from "react";


import Customers from "../pages/Customers";
import Managerment from "../pages/Managerment";
import LiveChat from "../pages/LiveChat";
import Setting from "../pages/Setting";
import Report from "../pages/Report";
import Schedule from "./Schedule/Schedule";
import { Route, Switch } from "react-router-dom"

const Routing = () => {
  return (
    <Switch>
      <Route path="/admin" exact component={Managerment} />
      <Route path="/live" exact component={LiveChat} />
      <Route path="/settings" exact component={Setting} />
      <Route path="/reports" exact component={Report} />
      <Route path="/customers" exact component={Customers} />
      <Route path="/admin/timeline" exact component={Schedule} />
    </Switch>
  );
};

export default Routing;
