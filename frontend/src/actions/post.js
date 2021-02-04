import axios from "axios";
import { types } from "../types/types";
import jwt_decode from "jwt-decode";

export const startNewPost = (description, image) => {
  return async (dispatch) => {
    try {
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      var decoded = jwt_decode(userInfo.token);
      const headers = {
        "Content-Type": "Application/json",
        authorization: "Bearer " + userInfo.token,
      };
      const formData = new FormData();
      formData.append("image", image);
      formData.append("description", description);
      formData.append("idUser", decoded.user._id);

      await axios.post("http://localhost:3000/api/post", formData, {
        headers,
      });
      dispatch(startLoadingPost());
    } catch (err) {
      console.log(err);
      return {
        status: false,
      };
    }
  };
};

export const addNewPost = (id, post) => ({
  type: types.postAddNew,
  payload: {
    id,
    ...post,
  },
});

export const refreshPost = (id, post) => ({
  type: types.notesUpdated,
  payload: {
    id,
    post: {
      id,
      ...post,
    },
  },
});

export const startLoadingPost = () => {
  return async (dispatch) => {
    try {
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      const headers = {
        "Content-Type": "Application/json",
        authorization: "Bearer " + userInfo.token,
      };

      const res = await axios.get("http://localhost:3000/api/post", {
        headers,
      });

      const post = res.data;

      const posts = [];
      post.forEach((snapHijo) => {
        posts.push({
          id: snapHijo._id,
          ...snapHijo,
        });
      });

      dispatch(setPost(posts));
    } catch (err) {
      console.log(err);
      return {
        status: false,
      };
    }
  };
};

export const startDeletePost = (id) => {
  return async (dispatch) => {
    try {
      const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
      const headers = {
        "Content-Type": "Application/json",
        authorization: "Bearer " + userInfo.token,
      };

      const res = await axios.delete(`http://localhost:3000/api/post/${id}`, {
        headers,
      });
      dispatch(deletePost(id));
      dispatch(startLoadingPost());
    } catch (err) {
      console.log(err);
      return {
        status: false,
      };
    }
  };
};

export const startUpdatePost = (id, description, image) => {
  return async (dispatch) => {
    const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
    const headers = {
      "Content-Type": "Application/json",
      authorization: "Bearer " + userInfo.token,
    };
    var post;
    if (image === null) {
      post = {
        description: description,
      };
    } else {
      post = new FormData();
      post.append("image", image);
      post.append("description", description);
    }
    console.log(post);
    const res = await axios.put(`http://localhost:3000/api/post/${id}`, post, {
      headers,
    });
    dispatch(startLoadingPost());
  };
};

export const deletePost = (id) => ({
  type: types.postDeleted,
  payload: id,
});

export const setPost = (post) => ({
  type: types.postLoad,
  payload: post,
});

export const postLogout = () => ({
  type: types.postLogoutCleaning,
});
