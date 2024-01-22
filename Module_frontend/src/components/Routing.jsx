import React from "react";
import Managerment from "../pages/Managerment";
import LiveChat from "../pages/LiveChat";
import Setting from "../pages/Setting";
import Report from "../pages/Report";

import ScheduleList from "./Schedule/ScheduleList";
import DetailSchedule from "./Schedule/DetailSchedule/DetailSchedule"
import EditSchedule from "./Schedule/EditSchedule/EditSchedule"

import { Redirect, Route, Switch } from "react-router-dom/cjs/react-router-dom";
import Users from "../pages/Users";
import UserDetail from "./UserManagerment/DetailUser/UserDetail";
import EditUser from "./UserManagerment/EditUser/EditUser";
import Students from "./StudentManagerment/Student/Students";
import AutoChat from "./AutoChatMana/AutoChat";
import ViewAutoChat from "./AutoChatMana/DetailAutoChat/ViewAutoChat";
import EditAutoChat from "./AutoChatMana/EditAutoChat/EditAutoChat";
import Profile from "../pages/Profile";

const Routing = ({ role }) => {

  return (
    <Switch>
      <Route path="/" exact component={Managerment} />
        <Route path='/profile' exact component={Profile} />
      <Route path="/live" exact component={LiveChat} />
      <Route path="/settings" exact component={Setting} />
      <Route path="/reports" exact component={Report} />
      
      
      {role !== 'ROLE_USER' ? (<>
        <Route path="/admin/schedule" exact component={ScheduleList} />
        <Route path="/admin/schedule/viewSchedule/:id" exact component={DetailSchedule} />
        <Route path="/admin/schedule/editSchedule/:id" exact component={EditSchedule} />
        <Route path="/admin/user/editUser/:id" exact component={EditUser} />
        <Route path="/admin/user" exact component={Users} />
        <Route path="/admin/user/viewUser/:id" exact component={UserDetail} />
        <Route path="/admin/user/editUser/:id" exact component={EditUser} />
        <Route path="/admin/students" exact component={Students} />
        <Route path="/admin/auto-chat" exact component={AutoChat} />
        <Route path="/admin/auto-chat/:id" exact component={ViewAutoChat} />
        <Route path="/admin/auto-chat/update/:id" exact component={EditAutoChat} />
      </>
      ) : <>
        <Redirect to='/not-found' />
      </>}
    </Switch>
  );
};

export default Routing;
