import React from "react";
import { Grid } from "@material-ui/core";
import { MessageSender } from "../components/post/MessageSender";
import { useSelector } from "react-redux";
import { CardPost } from "../components/post/CardPost";

export const Dashboard = () => {
  const { post } = useSelector((state) => state.post);

  return (
    <div>
      <MessageSender />
      <Grid container>
        <Grid item lg={2} md={2} sm={2}></Grid>
        <Grid item lg={1}></Grid>
        <Grid item lg={7} md={8} sm={8} xs={12}>
          {post.map((post) => (
            <CardPost post={post} key={post._id} />
          ))}
        </Grid>
        <Grid item lg={2} md={2} sm={2}></Grid>
      </Grid>
    </div>
  );
};
