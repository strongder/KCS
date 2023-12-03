import React from "react";
import Managerment from "../pages/Managerment";
import LiveChat from "../pages/LiveChat";
import Setting from "../pages/Setting";
import Report from "../pages/Report";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Users from "../pages/Users";
import UserDetail from "./UserManagerment/DetailUser/UserDetail";
import EditUser from "./UserManagerment/EditUser/EditUser";


const Routing = () => {
  return (
    
    <Switch>
      <Route path="/admin" exact component={Managerment} />
      <Route path="/live" exact component={LiveChat} />
      <Route path="/settings" exact component={Setting} />
      <Route path="/reports" exact component={Report} />
      <Route path="/admin/user" exact component={Users} />
      <Route path="/admin/user/viewUser/:id" exact component={UserDetail} />
      <Route path="/admin/user/editUser/:id" exact component={EditUser} />
    </Switch>
  );
};

export default Routing;
