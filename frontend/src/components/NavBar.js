import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useState } from "react";
import { Avatar, Box, Divider, Grid, ListItemIcon } from "@material-ui/core";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { Link } from "react-router-dom";
import { startLogout } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
  logo: {
    width: 135,
    height: 43.54,
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  name: {
    fontSize: 15,
  },
}));

function NavBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { name, image } = useSelector((state) => state.auth);

  const user = {
    avatar: `http://localhost:3000${image}`,
    name: name,
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(startLogout());
    window.location.href = "/";
  };

  const drawer = (
    <div>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <ExploreOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Explorar" />
        </ListItem>

        <ListItem button component={Link} to="/account">
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Mi perfil" />
        </ListItem>

        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid justify={"center"} alignItems={"center"} container>
            <Grid style={{ justifySelf: "flex-start" }} item>
              <img
                className={classes.logo}
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                }
                alt="Bosch Logo"
              />
            </Grid>
            <Grid item>
              <Grid container justify={"center"}>
                <Typography variant="h6" noWrap>
                  Nombre de la app
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              p={2}
            >
              <Avatar
                className={classes.avatar}
                component={Link}
                src={user.avatar}
                to="/account"
              />
              <Typography
                className={classes.name}
                color="textPrimary"
                variant="h6"
              >
                {user.name}
              </Typography>
            </Box>
            <Divider />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};

export default NavBar;
