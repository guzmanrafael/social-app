import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateProfile } from "../../actions/user";
import { login } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import { startLoadingPost } from "../../actions/post";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { name, image } = useSelector((state) => state.auth);
  const user = {
    avatar: `http://localhost:3000${image}`,
  };

  const [newImage, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  const [formValuesUpdate, handleInputChangeUpdate] = useForm({
    nameInput: name,
  });

  var { nameInput } = formValuesUpdate;

  const handleChangeImage = () => {
    if (preview === null || preview === undefined) {
      return user.avatar;
    } else {
      return preview;
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (nameInput.trim().length === 0) {
      Swal.fire("Error", "El nombre es requerido", "error");
      return false;
    } else {
      if (newImage === undefined) {
        const data = await updateProfile(nameInput, null);
        console.log(data);
        dispatch(login(data.token, data.name, data.image));
        dispatch(startLoadingPost());
      } else {
        const data = await updateProfile(nameInput, newImage);
        console.log(data);
        dispatch(login(data.token, data.name, data.image));
        dispatch(startLoadingPost());
      }
    }
  };

  useEffect(() => {
    if (newImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(newImage);
    } else {
      setPreview(null);
    }
  }, [newImage]);

  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={6} xs={12}>
        <Card className={classes.root}>
          <CardContent>
            <Box alignItems="center" display="flex" flexDirection="column">
              <Avatar className={classes.avatar} src={handleChangeImage()} />
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="text"
              onClick={(event) => {
                event.preventDefault();
                fileInputRef.current.click();
              }}
            >
              Cambiar Fotografia
            </Button>
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
          </CardActions>
        </Card>
      </Grid>
      <Grid item lg={8} md={6} xs={12}>
        <form
          autoComplete="off"
          noValidate
          className={classes.root}
          onSubmit={handleUpdate}
        >
          <Card>
            <CardHeader
              subheader="La información es completamente modificable"
              title="Mi Perfil"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="nameInput"
                    value={nameInput}
                    onChange={handleInputChangeUpdate}
                    required
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="contained" type="submit">
                Guardar
              </Button>
            </Box>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
