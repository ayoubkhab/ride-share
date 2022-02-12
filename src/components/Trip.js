import React from "react";
import { Card, Typography, Avatar, Box } from "@mui/material";
import { StarRate } from "@mui/icons-material";

const Trip = ({ start, destination, price, driver: { name, rating } }) => {
	return (
		<Card sx={{ padding: 2, marginBottom: 2 }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: 2,
				}}
			>
				<Box sx={{ display: "block" }}>
					<Box sx={{ display: "flex", alignItems: "flex-start" }}>
						<Typography variant="h6">18:00</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Box
								component="span"
								sx={{
									width: "12px",
									height: "12px",
									borderRadius: "50px",
									border: "3px solid gray",
									backgroundColor: "white",
									margin: "10px 8px 0px 8px",
								}}
							/>
							<Box
								component="span"
								sx={{ width: "3px", height: "30px", backgroundColor: "gray" }}
							/>
						</Box>
						<Typography variant="h6">{start}</Typography>
					</Box>
					<Box sx={{ display: "flex" }}>
						<Typography variant="h6">21:45</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Box
								component="span"
								sx={{ width: "3px", height: "10px", backgroundColor: "gray" }}
							/>
							<Box
								component="span"
								sx={{
									width: "12px",
									height: "12px",
									borderRadius: "50px",
									border: "3px solid gray",
									backgroundColor: "white",
									margin: "0px 8px 0px 8px",
								}}
							/>
						</Box>
						<Typography variant="h6">{destination}</Typography>
					</Box>
				</Box>
				<Box component="span">{price}$</Box>
			</Box>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Avatar alt="Jack Mills">{name[0]}</Avatar>
				<Box sx={{ display: "block", marginLeft: 1 }}>
					<Typography variant="h6">{name}</Typography>
					<Box sx={{ display: "flex", alignItems: "center", marginTop: -1 }}>
						<StarRate />
						<Typography sx={{ marginLeft: 0.5 }} variant="h6">
							{rating}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Card>
	);
};

export default Trip;
