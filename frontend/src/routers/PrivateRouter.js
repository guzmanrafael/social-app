import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import NavBar from "../components/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route
          {...rest}
          component={(props) =>
            isAuthenticated ? (
              <Component {...props} />
            ) : (
              <Redirect to="/auth/signin" />
            )
          }
        />
      </main>
    </div>
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
