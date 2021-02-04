import React, { useEffect, useRef, useState } from "react";
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
import { validateEmail } from "../hooks/validation";
import { useForm } from "../hooks/useForm";
import { login, startRegister } from "../actions/auth";
import Swal from "sweetalert2";
import { IconButton } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useDispatch } from "react-redux";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  const [formValues, handleInputChange] = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = formValues;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const fullName = `${firstName} ${lastName}`;
      const data = await startRegister(fullName, email, password, image);
      if (!data) {
        console.log("error");
      } else {
        dispatch(login(data.token, data.name, data.image));
        window.location.href = "/";
      }
    }
  };

  const isFormValid = () => {
    if (firstName.trim().length === 0) {
      Swal.fire("Error", "El nombre es requerido", "error");
      return false;
    } else if (lastName.trim().length === 0) {
      Swal.fire("Error", "El apellido es requerido", "error");
      return false;
    } else if (image === null || image === undefined) {
      Swal.fire("Error", "La imagen es requerida", "error");
      return false;
    } else if (!validateEmail(email)) {
      Swal.fire("Error", "El correo es requerido", "error");
      return false;
    } else if (password.length < 5) {
      Swal.fire("Error", "Contraseña mayor 5 caracteres", "error");
      console.log("Entra aquiii");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                value={firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo Electronico"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
              >
                {preview ? (
                  <img
                    src={preview}
                    style={{
                      width: 135,
                      height: 100,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setImage(null);
                    }}
                    alt="imagen"
                  />
                ) : (
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="secondary"
                      aria-label="upload picture"
                      component="span"
                      onClick={(event) => {
                        event.preventDefault();
                        fileInputRef.current.click();
                      }}
                    >
                      <PhotoCamera fontSize="large" />
                    </IconButton>
                  </label>
                )}
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file && file.type.substr(0, 5) === "image") {
                      setImage(file);
                    } else {
                      setImage(null);
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <LinkMaterial
                component={Link}
                to="/"
                variant="body2"
                color="secondary"
              >
                ¿Ya tienes una cuenta? ¡Pulsa Aqui!
              </LinkMaterial>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
