import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { SignIn } from "../views/SignIn";
import { SignUp } from "../views/SignUp";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/signin">
        <SignIn />
      </Route>
      <Route exact path="/auth/signup">
        <SignUp />
      </Route>
      <Redirect to="/auth/signin" />
    </Switch>
  );
};
