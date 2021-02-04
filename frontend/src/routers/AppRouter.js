import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Error404 } from "../components/Error404";
import { Account } from "../views/Account";
import { Dashboard } from "../views/Dashboard";
import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRouter";
import { PrivateRoute } from "./PrivateRouter";
import { login } from "../actions/auth";
import { CircularProgress } from "@material-ui/core";
import { startLoadingPost } from "../actions/post";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("entra aqui");
    const getToken = async () => {
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      console.log(userInfo);
      if (userInfo === null) {
        setIsLoggedIn(false);
      } else {
        dispatch(login(userInfo.token, userInfo.name, userInfo.image));
        dispatch(startLoadingPost());
        setIsLoggedIn(true);
      }
    };
    getToken();
    setChecking(false);
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <CircularProgress />;
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          path="/auth"
          isAuthenticated={isLoggedIn}
          component={AuthRouter}
        />

        <PrivateRoute
          exact
          isAuthenticated={isLoggedIn}
          path="/account"
          component={Account}
        />

        <PrivateRoute
          exact
          isAuthenticated={isLoggedIn}
          path="/"
          component={Dashboard}
        />

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
};
