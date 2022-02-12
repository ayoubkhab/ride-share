import React, { useEffect } from "react";
import TripInfo from "./pages/TripInfo";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddTrip from "./pages/AddTrip";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import RequireAuth from "./utils/RequireAuth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import {
	authenticateUser,
	unauthenticateUser,
} from "./features/users/usersSlice";

import { Grid } from "@mui/material";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		let unsubFromAuth;
		const authStateChangeHandler = async () => {
			unsubFromAuth = await onAuthStateChanged(auth, (user) => {
				if (user) {
					dispatch(authenticateUser(user));
				} else {
					dispatch(unauthenticateUser());
				}
			});
		};
		authStateChangeHandler();
		return unsubFromAuth;
	}, [dispatch]);

	return (
		<Router>
			<Grid container>
				<Grid item xs={12}>
					<Navbar />
				</Grid>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/search" element={<Search />} />
					<Route
						path="/add-trip"
						element={
							<RequireAuth redirectTo="/login">
								<Grid
									container
									item
									justifyContent="center"
									alignContent="center"
									xs={12}
								>
									<Grid item xs={10} md={8} lg={6}>
										<AddTrip />
									</Grid>
								</Grid>
							</RequireAuth>
						}
					/>
					<Route path="/trip/:id" element={<TripInfo />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Grid>
		</Router>
	);
};

export default App;
