import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import ErrorIcon from "@material-ui/icons/Error";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "black",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Error404 = ({ props }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ErrorIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Pagina no encontrada
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          component={Link}
          to="/"
        >
          Regresar!
        </Button>
      </div>
    </Container>
  );
};
