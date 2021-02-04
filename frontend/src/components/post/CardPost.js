import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { red } from "@material-ui/core/colors";
import jwt_decode from "jwt-decode";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { startDeletePost } from "../../actions/post";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { UpdatePost } from "./UpdatePost";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginTop: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export const CardPost = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const imageUrl = "http://localhost:3000";

  const [postUpdate, setPostUpdate] = useState();

  // Modal
  const [open, setOpen] = useState(false);
  const onOpenModal = (post) => {
    setPostUpdate(post);
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  var decoded = jwt_decode(userInfo.token);

  const isValid = (id) => {
    if (decoded.user._id === id) {
      return true;
    } else {
      return false;
    }
  };

  const handleDeletePost = async (id) => {
    confirmAlert({
      title: "Confirmar para eliminar",
      message: "¿Estas Seguro de Eliminar el Post?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            dispatch(startDeletePost(id));
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={`${imageUrl}${props.post.idUser.path}`}
            />
          }
          action={
            isValid(props.post.idUser._id) ? (
              <div>
                <IconButton
                  aria-label="Editar"
                  onClick={() => onOpenModal(props.post)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="Eliminar"
                  onClick={() => handleDeletePost(props.post._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : (
              <div></div>
            )
          }
          title={props.post.idUser.name}
          subheader={props.post.created_at}
        />
        <CardMedia
          className={classes.media}
          image={`${imageUrl}${props.post.path}`}
          title="Post"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Modal open={open} onClose={onCloseModal} center>
        <UpdatePost post={postUpdate} />
      </Modal>
    </div>
  );
};
