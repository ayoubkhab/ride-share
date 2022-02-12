import React from "react";
import { Grid } from "@mui/material";
import Searchbar from "../components/Searchbar";

const Landing = () => {
	return (
		<Grid
			item
			container
			justifyContent="center"
			alignContent="center"
			xs={12}
			sx={{ minHeight: "30rem", backgroundColor: "hsl(216, 70%, 40%)" }}
		>
			<Grid item xs={10} lg={8}>
				<Searchbar />
			</Grid>
		</Grid>
	);
};

export default Landing;
