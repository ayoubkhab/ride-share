import React from "react";
import Trip from "./Trip";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TripsList = () => {
	const trips = useSelector((state) => state.trips.trips);
	return (
		<div className="trips">
			{trips.map((trip) => {
				console.log("trip: ", trip);
				const { id, start, destination, price, driver } = trip;
				return (
					<Link to={`/trip/${id}`} key={id}>
						<Trip
							start={start}
							destination={destination}
							price={price}
							driver={driver}
						/>
					</Link>
				);
			})}
		</div>
	);
};

export default TripsList;
