import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
   AppBar,
   Toolbar,
   IconButton,
   Button,
   Typography,
   Box,
   Menu,
   MenuItem,
   Badge,
} from "@mui/material";
import {
   Menu as MenuIcon,
   Search as SearchIcon,
   AddCircleOutline as AddIcon,
   AccountCircle as AccountIcon,
   KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/users/usersSlice";

const Navbar = () => {
   const [anchorEl, setAnchorEl] = useState(null);
   const [anchorElLeft, setAnchorElLeft] = useState(null);

   const loadingUI = useSelector((state) => state.users.loadingUI);
   const user = useSelector((state) => state.users.user);
   const dispatch = useDispatch();
   const match = useMediaQuery("(min-width:520px)");

   const handleMenu = (e) => {
      setAnchorEl(e.currentTarget);
   };

   const handleMenuLeft = (e) => {
      setAnchorElLeft(e.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
      setAnchorElLeft(null);
   };

   const handleLogout = () => {
      dispatch(logoutUser());
      setAnchorEl(null);
   };

   return (
      <AppBar
         position="static"
         sx={{ gridColumn: "full-start / full-end", gridRow: "1 / 2" }}
      >
         <Toolbar
            sx={{
               display: "flex",
               alignItems: "center",
               ...(!match && { paddingX: "0px" }),
            }}
         >
            {!match && (
               <>
                  <Button color="inherit" onClick={handleMenuLeft}>
                     <MenuIcon fontSize="large" />
                  </Button>
                  <Menu
                     id="leftMenu-appbar"
                     anchorEl={anchorElLeft}
                     open={Boolean(anchorElLeft)}
                     onClose={handleClose}
                     anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                     }}
                  >
                     <MenuItem display="flex" alignItems="center">
                        <Link to="/search">
                           <Box display="flex" alignItems="center">
                              <SearchIcon />
                              <Typography variant="button" ml={1}>
                                 Search
                              </Typography>
                           </Box>
                        </Link>
                     </MenuItem>
                     <MenuItem>
                        <Link to="/add-trip">
                           <Box display="flex" alignItems="center">
                              <AddIcon />
                              <Typography variant="button" ml={1}>
                                 Publish a ride
                              </Typography>
                           </Box>
                        </Link>
                     </MenuItem>
                  </Menu>
               </>
            )}
            <Button>
               <Link to="/">
                  <Typography
                     variant="h5"
                     color="white"
                     sx={{ textTransform: "none" }}
                  >
                     RideShare
                  </Typography>
               </Link>
            </Button>
            {match && (
               <Box marginLeft="auto">
                  <Link to="/search">
                     <Button color="inherit">
                        <SearchIcon />
                        <Typography variant="button" ml={1}>
                           Search
                        </Typography>
                     </Button>
                  </Link>
                  <Link to="/add-trip">
                     <Button color="inherit">
                        <AddIcon />
                        <Typography variant="button" ml={1}>
                           Publish a ride
                        </Typography>
                     </Button>
                  </Link>
               </Box>
            )}
            <Button
               color="inherit"
               onClick={handleMenu}
               sx={{ marginLeft: match ? "0px" : "auto" }}
            >
               <Badge
                  sx={{ "& .MuiBadge-badge": { outline: "3px solid white" } }}
                  variant="dot"
                  color="success"
                  invisible={!user}
               >
                  <AccountIcon fontSize="large" />
               </Badge>
               <ArrowDownIcon />
            </Button>
            <Menu
               id="menu-appbar"
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={handleClose}
               anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
               }}
               keepMounted
               transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
               }}
            >
               {user && (
                  <MenuItem onClick={handleClose}>{user.displayName}</MenuItem>
               )}
               {user && <MenuItem onClick={handleClose}>Profile</MenuItem>}
               {!user && (
                  <MenuItem onClick={handleClose}>
                     <Link to="/login">Login</Link>
                  </MenuItem>
               )}
               {user && (
                  <MenuItem disabled={loadingUI} onClick={handleLogout}>
                     {!loadingUI ? "Logout" : "Loging out.."}
                  </MenuItem>
               )}
            </Menu>
         </Toolbar>
      </AppBar>
   );
};

export default Navbar;
