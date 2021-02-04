import { types } from "../types/types";
import axios from "axios";
import { postLogout } from "./post";

export const startRegister = async (name, email, password, image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const res = await axios.post("http://localhost:3000/api/user", formData);

    const data = {
      token: res.data.token,
      name: res.data.user.name,
      image: res.data.user.imageUrl,
    };
    localStorage.setItem("userInfo", JSON.stringify(data));

    return {
      status: true,
      token: res.data.token,
      name: res.data.user.name,
      image: res.data.user.imageUrl,
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
    };
  }
};

export const startLogin = async (email, password) => {
  try {
    const formData = {
      email: email,
      password: password,
    };

    const res = await axios.post("http://localhost:3000/api/login", formData);

    const data = {
      token: res.data.token,
      name: res.data.user.name,
      image: res.data.user.imageUrl,
    };
    localStorage.setItem("userInfo", JSON.stringify(data));

    return {
      status: true,
      token: res.data.token,
      name: res.data.user.name,
      image: res.data.user.imageUrl,
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
    };
  }
};

export const login = (token, name, image) => {
  return {
    type: types.login,
    payload: {
      token,
      name,
      image,
    },
  };
};

export const startLogout = () => {
  localStorage.clear();
  return async (dispatch) => {
    dispatch(logout());
    dispatch(postLogout());
  };
};

export const logout = () => ({
  type: types.logout,
});
