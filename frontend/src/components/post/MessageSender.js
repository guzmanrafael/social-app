import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useRef, useState } from "react";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { startNewPost } from "../../actions/post";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#E8E8E8",
  },
  rootCard: {
    minWidth: 275,
  },
}));

export const MessageSender = () => {
  const classes = useStyles();
  const [newImage, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const { image } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  var [formValues, handleInputChange] = useForm({
    description: "",
  });

  var { description } = formValues;

  const user = {
    avatar: `http://localhost:3000${image}`,
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (description.trim().length === 0) {
      Swal.fire("Error", "La descripción es requerida", "error");
      return false;
    } else if (newImage === null || newImage === undefined) {
      Swal.fire("Error", "La imagen es requerida", "error");
      return false;
    }
    dispatch(startNewPost(description, newImage));
    description = "";
    formValues.description = "";
    setImage(null);
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
      <Card className={classes.rootCard} variant="outlined">
        <CardContent>
          <Grid container>
            <Grid item lg={12} md={12} xs={12} sm={12}>
              <Typography
                color="textSecondary"
                variant="h6"
                gutterBottom
                align="center"
              >
                Crear publicación
              </Typography>
            </Grid>

            <Grid item lg={2} md={2}></Grid>
            <Grid item lg={8} md={8} xs={12} sm={12}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Grid container>
                    <Grid item lg={1} md={2} xs={3} sm={3}>
                      <div className="imtcontainer">
                        <div className="img">
                          <Avatar src={user.avatar} />
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={11} md={10} xs={9} sm={9}>
                      <div className="imtcontainer">
                        <div className="textarea">
                          <textarea
                            id="description"
                            name="description"
                            placeholder="Agrega una descripción"
                            value={description}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item lg={12} md={12} xs={12} sm={12}>
                      <form noValidate>
                        <CardContent>
                          <Grid container justify="center" alignItems="center">
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
                          </Grid>
                        </CardContent>

                        <Grid container justify="flex-end">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleCreatePost}
                          >
                            Crear
                          </Button>
                        </Grid>
                      </form>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={2} md={2}></Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
