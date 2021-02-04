import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { startUpdatePost } from "../../actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#E8E8E8",
  },
}));

export const UpdatePost = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newImage, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();

  const [formValuesUpdate, handleInputChangeUpdate] = useForm({
    description: props.post.description,
  });

  var { description } = formValuesUpdate;

  const post = {
    avatar: `http://localhost:3000${props.post.path}`,
  };

  const handleChangeImage = () => {
    if (preview === null || preview === undefined) {
      return post.avatar;
    } else {
      return preview;
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    if (description.trim().length === 0) {
      Swal.fire("Error", "La descripción es requerida", "error");
      return false;
    } else {
      if (newImage === undefined) {
        dispatch(startUpdatePost(props.post._id, description, null));
      } else {
        dispatch(startUpdatePost(props.post._id, description, newImage));
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
    <div>
      <Card variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item lg={12} md={12} xs={12} sm={12}>
              <Typography
                color="textSecondary"
                variant="h6"
                gutterBottom
                align="center"
              >
                Editar publicación
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} xs={12} sm={12}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Grid container>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <div className="imtcontainer">
                        <div className="textarea">
                          <textarea
                            id="description"
                            name="description"
                            placeholder="Agrega una descripción"
                            value={description}
                            onChange={handleInputChangeUpdate}
                          ></textarea>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <form noValidate>
                        <Card className={classes.root}>
                          <CardContent>
                            <Box
                              alignItems="center"
                              display="flex"
                              flexDirection="column"
                            >
                              <Avatar
                                className={classes.avatar}
                                src={handleChangeImage()}
                              />
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
                                if (
                                  file &&
                                  file.type.substr(0, 5) === "image"
                                ) {
                                  setImage(file);
                                } else {
                                  setImage(null);
                                }
                              }}
                            />
                          </CardActions>
                        </Card>

                        <Grid container justify="flex-end">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleUpdatePost}
                          >
                            Editar
                          </Button>
                        </Grid>
                      </form>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
