import jwt_decode from "jwt-decode";
import axios from "axios";

export const updateProfile = async (name, image) => {
  const userInfo = await JSON.parse(localStorage.getItem("userInfo"));
  var decoded = jwt_decode(userInfo.token);
  const headers = {
    "Content-Type": "Application/json",
    authorization: "Bearer " + userInfo.token,
  };
  var user;
  if (image === null) {
    user = {
      name: name,
    };
  } else {
    user = new FormData();
    user.append("image", image);
    user.append("name", name);
  }
  const res = await axios.put(
    `http://localhost:3000/api/user/${decoded.user._id}`,
    user,
    { headers }
  );
  const data = {
    token: userInfo.token,
    name: res.data.user.name,
    image: res.data.user.path,
  };
  localStorage.setItem("userInfo", JSON.stringify(data));
  return data;
};
