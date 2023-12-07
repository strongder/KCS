import React from "react";
import Managerment from "../pages/Managerment";
import LiveChat from "../pages/LiveChat";
import Setting from "../pages/Setting";
import Report from "../pages/Report";

import Schedule from "./Schedule/Schedule";

import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Users from "../pages/Users";
import UserDetail from "./UserManagerment/DetailUser/UserDetail";
import EditUser from "./UserManagerment/EditUser/EditUser";
import Students from "./StudentManagerment/Student/Students";

const Routing = () => {
  return (
    <Switch>
      <Route path="/admin" exact component={Managerment} />
      <Route path="/live" exact component={LiveChat} />
      <Route path="/settings" exact component={Setting} />
      <Route path="/reports" exact component={Report} />
      {/* <Route path="/customers" exact component={Customers} /> */}
      <Route path="/admin/timeline" exact component={Schedule} />
      <Route path="/admin/user" exact component={Users}/>
        <Route path="/admin/user/viewUser/:id" exact component={UserDetail} />
        <Route path="/admin/user/editUser/:id" exact component={EditUser} />

      <Route path="/admin/students" exact component={Students} />
    </Switch>
  );
};

export default Routing;
