import React from "react";
import { Stack, Grid } from "@mui/material";
import Searchbar from "../components/Searchbar";
import TripsList from "../components/TripsList";

const Search = () => {
	return (
		<Grid container justifyContent="center" alignContent="center" item xs={12}>
			<Grid item xs={10} lg={8}>
				<Stack spacing={2}>
					<Searchbar />
					<TripsList />
				</Stack>
			</Grid>
		</Grid>
	);
};

export default Search;
