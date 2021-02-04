import React from "react";
import { Container } from "@material-ui/core";
import Profile from "../components/account/Profile";

export const Account = () => {
  return (
    <div>
      <Container maxWidth="lg">
        <Profile />
      </Container>
    </div>
  );
};
