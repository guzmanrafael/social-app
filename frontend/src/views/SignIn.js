import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LinkMaterial from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch } from "react-redux";
import { login, startLogin } from "../actions/auth";
import { useForm } from "../hooks/useForm";
import { validateEmail } from "../hooks/validation";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignIn = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [formValues, handleInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const data = await startLogin(email, password);
      if (!data) {
        console.log("error");
      } else {
        dispatch(login(data.token, data.name, data.image));
        window.location.href = "/";
      }
    }
  };

  const isFormValid = () => {
    if (!validateEmail(email)) {
      Swal.fire("Error", "El correo es requerido", "error");
      return false;
    } else if (password.length < 5) {
      Swal.fire("Error", "Contraseña mayor 5 caracteres", "error");
      console.log("Entra aquiii");
      return false;
    }

    return true;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicio de Sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electronico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item>
              <LinkMaterial
                component={Link}
                to="/auth/signup"
                variant="body2"
                color="secondary"
              >
                {"¿No tienes una cuenta? ¡Registrate!"}
              </LinkMaterial>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
